<?php
/**
 * RFQ form handler — GS Trubna Mebel.
 *
 * Plain PHP for cPanel shared hosting. No dependencies, no third-party
 * services. Receives the POST from /request-a-quote, validates, sends
 * mail with any uploaded drawings attached, and redirects to /thank-you/.
 *
 * CONFIGURE BEFORE LAUNCH:
 *   - $RECIPIENT: the mailbox that receives enquiries
 *     [[TODO: set the real recipient email — same value as
 *       contacts.rfqRecipientEmail in src/data/company.json]]
 *   - $FROM: an address on THIS domain (SuperHosting requires the
 *     envelope sender to belong to the hosting account's domain,
 *     otherwise mail() is rejected). Create e.g. website@gstrubnamebel.eu.
 */

declare(strict_types=1);

$RECIPIENT = 'CHANGE-ME@gstrubnamebel.eu';   // [[TODO: recipient email]]
$FROM      = 'website@gstrubnamebel.eu';     // [[TODO: create this mailbox or an alias in cPanel]]
$SUBJECT   = 'RFQ from gstrubnamebel.eu';
$THANKS    = '/thank-you/';
$HOME      = '/request-a-quote/';

$MAX_UPLOAD_TOTAL = 10 * 1024 * 1024; // 10 MB total, matches the label on the form
$ALLOWED_EXT  = ['pdf', 'dwg', 'dxf', 'step', 'stp', 'zip'];
$MIN_SECONDS  = 5; // submissions faster than this are treated as bots

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

function fail(): void
{
    // Silent redirect back — do not tell bots why they were rejected.
    global $THANKS;
    header('Location: ' . $THANKS, true, 303);
    exit;
}

// --- Spam protection --------------------------------------------------------

// 1. Honeypot: hidden "website" field must be empty.
if (clean('website') !== '') {
    fail();
}

// 2. Time check: reject submissions faster than a human could type.
//    form_ts is set by JS; an empty value (no JS) is allowed through.
$formTs = (int)($_POST['form_ts'] ?? 0);
if ($formTs > 0 && (time() - $formTs) < $MIN_SECONDS) {
    fail();
}

// --- Validation -------------------------------------------------------------

$company      = clean('company', 200);
$country      = clean('country', 100);
$contactName  = clean('contact_name', 200);
$email        = clean('email', 200);
$phone        = clean('phone', 50);
$productType  = clean('product_type', 300);
$material     = clean('material', 20);
$annualVolume = clean('annual_volume', 200);
$timeline     = clean('timeline', 200);
$message      = trim(mb_substr((string)($_POST['message'] ?? ''), 0, 5000));

$errors = [];
if ($company === '')                                    $errors[] = 'company';
if ($country === '')                                    $errors[] = 'country';
if ($contactName === '')                                $errors[] = 'contact name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))         $errors[] = 'email';
if ($productType === '')                                $errors[] = 'product type';
if (!in_array($material, ['metal', 'wood', 'both'], true)) $errors[] = 'material';
if ($annualVolume === '')                               $errors[] = 'annual volume';
if ($message === '')                                    $errors[] = 'message';

if ($errors) {
    // Real users are stopped earlier by the browser's `required` attributes;
    // reaching this point means a malformed/bot submission.
    fail();
}

// --- Uploaded drawings ------------------------------------------------------

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

// --- Build and send the mail -------------------------------------------------

$bodyLines = [
    'New RFQ from gstrubnamebel.eu',
    '',
    'Company:        ' . $company,
    'Country:        ' . $country,
    'Contact:        ' . $contactName,
    'Email:          ' . $email,
    'Phone:          ' . ($phone !== '' ? $phone : '—'),
    'Product type:   ' . $productType,
    'Material:       ' . $material,
    'Annual volume:  ' . $annualVolume,
    'Timeline:       ' . ($timeline !== '' ? $timeline : '—'),
    '',
    'Message:',
    $message,
    '',
    'Attachments:    ' . (count($attachments) ?: 'none'),
    'Submitted:      ' . gmdate('Y-m-d H:i') . ' UTC',
    'IP:             ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
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

mail($RECIPIENT, $subject, $body, implode("\r\n", $headers), '-f' . $FROM);

header('Location: ' . $THANKS, true, 303);
exit;
