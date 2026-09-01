<?php
/**
 * RFQ form handler — GS Trubna Mebel.
 *
 * Plain PHP for cPanel shared hosting. No dependencies, no database, no
 * third-party services. Receives the POST from /request-a-quote,
 * rate-limits, validates, logs every rejection, sends mail with uploaded
 * drawings attached, and redirects to /thank-you/.
 *
 * CONFIGURE BEFORE LAUNCH (see DEPLOY.md pre-launch checklist):
 *   - $RECIPIENT: the mailbox that receives enquiries
 *     [[TODO: set the real recipient email — same value as
 *       contacts.rfqRecipientEmail in src/data/company.json]]
 *   - $FROM: an address on THIS domain (SuperHosting rejects mail() whose
 *     envelope sender is not on the hosting account's domain). The mailbox
 *     website@gstrubnamebel.eu must exist in cPanel before the form works.
 */

declare(strict_types=1);

$RECIPIENT = 'CHANGE-ME@gstrubnamebel.eu';   // [[TODO: recipient email]]
$FROM      = 'website@gstrubnamebel.eu';     // [[TODO: create this mailbox in cPanel]]
$SUBJECT   = 'RFQ from gstrubnamebel.eu';
$THANKS    = '/thank-you/';
$HOME      = '/request-a-quote/';

$MAX_UPLOAD_TOTAL = 10 * 1024 * 1024; // 10 MB total — matches the note on the form
$ALLOWED_EXT  = ['pdf', 'dwg', 'dxf', 'step', 'stp', 'igs', 'iges', 'jpg', 'jpeg', 'png', 'zip'];
$MIN_SECONDS  = 5;   // submissions faster than this are treated as bots
$RATE_LIMIT   = 5;   // max submissions per IP...
$RATE_WINDOW  = 3600; // ...per hour

// --- Log location ------------------------------------------------------------
// Preferred: one level above the web root (public_html/../rfq-logs), so the
// files are not reachable over HTTP at all. If that is not writable, fall
// back to a directory inside the web root protected by its own .htaccess.
// DEPLOY.md includes a check that the log is not publicly readable.

function logDir(): string
{
    $outside = dirname(__DIR__) . '/rfq-logs';
    if (is_dir($outside) || @mkdir($outside, 0700, true)) {
        if (is_writable($outside)) {
            return $outside;
        }
    }
    $inside = __DIR__ . '/rfq-logs';
    if (!is_dir($inside)) {
        @mkdir($inside, 0700, true);
        // Deny direct HTTP access (Apache 2.4 and 2.2 syntaxes).
        @file_put_contents(
            $inside . '/.htaccess',
            "Require all denied\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n"
        );
    }
    return $inside;
}

/**
 * Every rejection is recorded: a lost enquiry from a European brand is
 * expensive. One JSON line per event with timestamp, reason, IP and the
 * submitted fields (file contents excluded, values truncated).
 */
function logRejection(string $reason): void
{
    $fields = [];
    foreach ($_POST as $key => $value) {
        if (is_string($value)) {
            $fields[$key] = mb_substr($value, 0, 300);
        }
    }
    $fileNames = [];
    if (!empty($_FILES['drawings']['name']) && is_array($_FILES['drawings']['name'])) {
        $fileNames = array_slice(array_filter($_FILES['drawings']['name']), 0, 10);
    }
    $line = json_encode([
        'ts'     => gmdate('c'),
        'reason' => $reason,
        'ip'     => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'fields' => $fields,
        'files'  => $fileNames,
    ], JSON_UNESCAPED_UNICODE);
    @file_put_contents(logDir() . '/rejections.log', $line . "\n", FILE_APPEND | LOCK_EX);
}

// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: ' . $HOME, true, 303);
    exit;
}

function clean(string $key, int $maxLen = 500): string
{
    $v = trim((string)($_POST[$key] ?? ''));
    // Strip CR/LF to block header injection via any field.
    $v = str_replace(["\r", "\n"], ' ', $v);
    return mb_substr($v, 0, $maxLen);
}

function fail(string $reason): void
{
    // Log first, then redirect to the thank-you page — bots get no signal,
    // and genuine enquiries that trip validation leave a trace to recover.
    logRejection($reason);
    global $THANKS;
    header('Location: ' . $THANKS, true, 303);
    exit;
}

// --- Rate limiting: max $RATE_LIMIT submissions per IP per $RATE_WINDOW. ----
// File-based counter — one file per IP hash holding recent timestamps.

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = logDir() . '/ratelimit';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/' . sha1($ip);
$now = time();
$stamps = [];
if (is_file($rateFile)) {
    $stamps = array_filter(
        array_map('intval', file($rateFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: []),
        fn($t) => ($now - $t) < $RATE_WINDOW
    );
}
if (count($stamps) >= $RATE_LIMIT) {
    fail('rate-limited: ' . count($stamps) . ' submissions in the last hour');
}
$stamps[] = $now;
@file_put_contents($rateFile, implode("\n", $stamps) . "\n", LOCK_EX);

// --- Spam protection ---------------------------------------------------------

// 1. Honeypot: hidden "website" field must be empty.
if (clean('website') !== '') {
    fail('honeypot filled');
}

// 2. Time check: reject submissions faster than a human could type.
//    form_ts is set by JS; an empty value (no JS) is allowed through.
$formTs = (int)($_POST['form_ts'] ?? 0);
if ($formTs > 0 && ($now - $formTs) < $MIN_SECONDS) {
    fail('submitted in under ' . $MIN_SECONDS . 's');
}

// --- Uploaded drawings ---------------------------------------------------------

$attachments = []; // each: ['name' => ..., 'content' => ...]
if (!empty($_FILES['drawings']) && is_array($_FILES['drawings']['name'])) {
    $total = 0;
    $count = count($_FILES['drawings']['name']);
    for ($i = 0; $i < min($count, 10); $i++) {
        if (($_FILES['drawings']['error'][$i] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            continue;
        }
        $tmp  = $_FILES['drawings']['tmp_name'][$i];
        $name = basename((string)$_FILES['drawings']['name'][$i]);
        $size = (int)$_FILES['drawings']['size'][$i];
        $ext  = strtolower(pathinfo($name, PATHINFO_EXTENSION));

        if (!in_array($ext, $ALLOWED_EXT, true)) continue;
        $total += $size;
        if ($total > $MAX_UPLOAD_TOTAL) break;
        if (!is_uploaded_file($tmp)) continue;

        $attachments[] = [
            'name'    => preg_replace('/[^A-Za-z0-9._-]/', '_', $name),
            'content' => (string)file_get_contents($tmp),
        ];
    }
}

// --- Validation --------------------------------------------------------------

$company      = clean('company', 200);
$country      = clean('country', 100);
$contactName  = clean('contact_name', 200);
$email        = clean('email', 200);
$phone        = clean('phone', 50);
$role         = clean('role', 100);
$whatYouNeed  = clean('what_you_need', 20);
$annualVolume = clean('annual_volume', 300);
$timeline     = clean('timeline', 300);
$message      = trim(mb_substr((string)($_POST['message'] ?? ''), 0, 5000));

$NEED_LABELS = [
    'metal'    => 'Metal parts or frames',
    'wood'     => 'Wood or panel parts',
    'complete' => 'Complete product (metal + wood)',
    'unsure'   => 'Not sure yet',
];

$errors = [];
if ($company === '')                                 $errors[] = 'company missing';
if ($country === '')                                 $errors[] = 'country missing';
if ($contactName === '')                             $errors[] = 'contact name missing';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))      $errors[] = 'email invalid';
if (!isset($NEED_LABELS[$whatYouNeed]))              $errors[] = 'what_you_need invalid';
if ($message === '' && !$attachments)                $errors[] = 'message missing (and no file attached)';

if ($errors) {
    // Real users are stopped earlier by client-side validation; reaching
    // this point means a malformed submission — logged either way so a
    // genuine enquiry can be recovered from the log.
    fail('validation: ' . implode(', ', $errors));
}

// --- Build and send the mail ---------------------------------------------------

$bodyLines = [
    'New RFQ from gstrubnamebel.eu',
    '',
    'Company:        ' . $company,
    'Country:        ' . $country,
    'Contact:        ' . $contactName,
    'Email:          ' . $email,
    'Phone:          ' . ($phone !== '' ? $phone : '—'),
    'Role:           ' . ($role !== '' ? $role : '—'),
    'What they need: ' . $NEED_LABELS[$whatYouNeed],
    'Annual volume:  ' . ($annualVolume !== '' ? $annualVolume : '—'),
    'Timeline:       ' . ($timeline !== '' ? $timeline : '—'),
    '',
    'Message:',
    $message,
    '',
    'Attachments:    ' . (count($attachments) ?: 'none'),
    'Submitted:      ' . gmdate('Y-m-d H:i') . ' UTC',
    'IP:             ' . $ip,
];
$textBody = implode("\n", $bodyLines);

$headers = [];
$headers[] = 'From: GS Trubna Mebel website <' . $FROM . '>';
$headers[] = 'Reply-To: ' . $contactName . ' <' . $email . '>';
$headers[] = 'MIME-Version: 1.0';

if ($attachments) {
    $boundary = 'b' . bin2hex(random_bytes(16));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    $body  = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $textBody . "\r\n";

    foreach ($attachments as $att) {
        $body .= "--$boundary\r\n";
        $body .= 'Content-Type: application/octet-stream; name="' . $att['name'] . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= 'Content-Disposition: attachment; filename="' . $att['name'] . "\"\r\n\r\n";
        $body .= chunk_split(base64_encode($att['content'])) . "\r\n";
    }
    $body .= "--$boundary--";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $body = $textBody;
}

$subject = '=?UTF-8?B?' . base64_encode($SUBJECT . ' — ' . $company) . '?=';

$sent = mail($RECIPIENT, $subject, $body, implode("\r\n", $headers), '-f' . $FROM);
if (!$sent) {
    // mail() refused locally — record it so the enquiry is recoverable.
    logRejection('mail() returned false — check sender mailbox and PHP mail configuration');
}

header('Location: ' . $THANKS, true, 303);
exit;
