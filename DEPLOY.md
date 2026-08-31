# DEPLOY.md — publishing to SuperHosting (cPanel, FTP)

The site is fully static. Deployment = build locally, upload the contents of
one folder over FTP. No Node, no CI, nothing runs on the server except
`contact.php`.

## 1. Build

```bash
npm install     # first time only
npm run build
```

This produces a **`dist/`** folder. Everything the server needs is inside it —
including `.htaccess`, `contact.php`, `robots.txt` and the generated
`sitemap-index.xml`.

## 2. What goes where

Upload the **contents of `dist/`** (not the folder itself) into **`public_html/`**:

```
dist/index.html            →  public_html/index.html
dist/capabilities/…        →  public_html/capabilities/…
dist/_astro/…              →  public_html/_astro/…
dist/.htaccess             →  public_html/.htaccess
dist/contact.php           →  public_html/contact.php
…and so on for everything in dist/
```

Notes:

- `.htaccess` is a hidden file — enable "show hidden files" in your FTP client
  (in FileZilla: Server → Force showing hidden files), otherwise it will be
  silently skipped and redirects/HTTPS forcing will not work.
- Upload in **binary mode** (FileZilla default is fine).
- On re-deploys, upload the whole `dist/` contents again and allow overwrite.
  Old `_astro/*` files with hashed names can be deleted from the server
  occasionally, but leaving them does no harm.

## 3. One-time server configuration

1. **PHP version**: any PHP ≥ 7.4 works. Set in cPanel → Select PHP Version.
2. **Old URL redirects**: paste the WordPress URL list into the marked section
   of `.htaccess` (see the `BEGIN OLD URL REDIRECTS` block) **in the source
   file `public/.htaccess`**, then rebuild — never edit only the server copy,
   or the next deploy will overwrite it.

## 3a. RFQ form — pre-launch checklist (the form does not work without these)

- [ ] **Create the sender mailbox `website@gstrubnamebel.eu`** in cPanel →
      Email Accounts. SuperHosting rejects PHP `mail()` whose sender is not
      on the hosting account's domain — without this mailbox, no enquiry
      mail is ever delivered. `$FROM` in `contact.php` must match it.
- [ ] **Set `$RECIPIENT` in `contact.php`** to the mailbox that receives
      enquiries (same value as `contacts.rfqRecipientEmail` in
      `src/data/company.json`). Note the open domain decision in
      CONTENT-NEEDED.md (`gs-bg.eu` vs `gstrubnamebel.eu`) — resolve it first.
- [ ] **Test a real submission with an attachment** (a PDF and a STEP file)
      from the live site and confirm it arrives with the attachment intact.
      Check the spam folder on first delivery.
- [ ] **Verify rejection logging works**: submit once with the hidden
      "website" field filled (use browser dev tools), then confirm a line
      was written to `rfq-logs/rejections.log`. The handler writes to
      `public_html/../rfq-logs/` (outside the web root) when possible, else
      to `public_html/rfq-logs/` protected by its own `.htaccess`.
- [ ] **Verify the log is NOT publicly readable**: request
      `https://gstrubnamebel.eu/rfq-logs/rejections.log` — it must return
      403/404, never the file contents.
- [ ] **Verify rate limiting**: a 6th submission from the same IP within an
      hour must not deliver mail (it lands in the rejection log instead).

## 4. Before going live — checklist

- [ ] Full backup of the current WordPress site (files + database) taken
- [ ] Old URL redirect list pasted into `public/.htaccess` and rebuilt
- [ ] `contact.php` recipient configured and form tested end-to-end
- [ ] All `[[TODO:]]` markers replaced (see CONTENT-NEEDED.md) — search the
      built output: `grep -r "TODO" dist/ --include="*.html"` must return nothing
- [ ] Real photography uploaded and referenced in the content files
- [ ] Delete WordPress files from `public_html` only **after** the new site is
      confirmed working (move them to a `_old/` folder first, don't delete)
