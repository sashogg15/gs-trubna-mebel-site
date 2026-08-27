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

1. **Mail for the RFQ form.** Open `contact.php` before the first upload and set:
   - `$RECIPIENT` — the mailbox that receives enquiries
   - `$FROM` — an address **on this domain** (e.g. `website@gstrubnamebel.eu`).
     Create it in cPanel → Email Accounts (or as a forwarder). SuperHosting
     rejects PHP mail() with a foreign sender address.
2. **Test the form** after the first deploy: submit a real test enquiry with an
   attachment and confirm it arrives (check spam folder on first delivery).
3. **PHP version**: any PHP ≥ 7.4 works. Set in cPanel → Select PHP Version.
4. **Old URL redirects**: paste the WordPress URL list into the marked section
   of `.htaccess` (see the `BEGIN OLD URL REDIRECTS` block) **in the source
   file `public/.htaccess`**, then rebuild — never edit only the server copy,
   or the next deploy will overwrite it.

## 4. Before going live — checklist

- [ ] Full backup of the current WordPress site (files + database) taken
- [ ] Old URL redirect list pasted into `public/.htaccess` and rebuilt
- [ ] `contact.php` recipient configured and form tested end-to-end
- [ ] All `[[TODO:]]` markers replaced (see CONTENT-NEEDED.md) — search the
      built output: `grep -r "TODO" dist/ --include="*.html"` must return nothing
- [ ] Real photography uploaded and referenced in the content files
- [ ] Delete WordPress files from `public_html` only **after** the new site is
      confirmed working (move them to a `_old/` folder first, don't delete)
