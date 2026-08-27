# CONTENT-NEEDED.md — everything left to collect

Every `[[TODO:]]` in the project, grouped by where it lives. Fill the values in
the named files — never in page templates. When everything below is done,
verify with:

```bash
grep -rn "\[\[TODO" src public
```

(must return nothing), then rebuild.

---

## 1. Company facts — `src/data/company.json` (single source of truth)

These numbers appear on multiple pages; each is defined once here.

### Identity & legal
- [ ] Full registered legal name (e.g. "GS Trubna Mebel OOD")
- [ ] VAT / EIK number
- [ ] Street address, postal code (HQ, Dobrich)
- [ ] Sales/enquiry email address
- [ ] Phone number (international format)
- [ ] RFQ recipient email (also set in `public/contact.php` — two places)
- [ ] LinkedIn company page URL (or remove the entry)

### Key figures strip (home page — 5–6 exact numbers)
- [ ] Years in operation (or confirm computing from 1990)
- [ ] Export share, % (brief says 97% — confirm)
- [ ] Units produced per year + what unit (e.g. chairs)
- [ ] Total production area, m²
- [ ] Team size
- [ ] Solar capacity, kWp

### Production sites (×2)
- [ ] Site 1: name, location, area m², function
- [ ] Site 2: name, location, area m², function

### Machine park (one entry per machine — primary credibility asset)
For **each** machine: name, manufacturer, exact model, year, and 2–4 exact
parameters (e.g. max tube diameter, wall thickness, working length, axes).
Placeholder entries exist for:
- [ ] Tube laser (e.g. ADIGE LT5 — max tube diameter, max wall thickness)
- [ ] Tube bending machine(s)
- [ ] Welding (manual stations + robotic cells)
- [ ] Powder coating line (max part dimensions)
- [ ] Panel processing (CNC, edgebanding…)
- [ ] Add every other machine worth naming — duplicate the JSON object

### Certifications (×N)
For each: name, issuing body, certificate number, valid-until date, scope,
logo file.
- [ ] ISO / other certificates — full list

### Production terms (capabilities spec table)
- [ ] Minimum order quantity
- [ ] Typical batch size
- [ ] Prototype lead time
- [ ] Series lead time
- [ ] Standard tolerances / referenced standard

### Sustainability
- [ ] Solar installations: site, kWp, year commissioned, share of consumption %
- [ ] CO₂ statement: measured Scope 1/2 emissions, baseline, reduction
- [ ] CSRD / Scope 3 readiness statement (what data clients receive, format)

---

## 2. Home — `src/content/en/home.json`
- [ ] Meta title + meta description
- [ ] Hero supporting line
- [ ] Hero background photo (16:7) + alt text
- [ ] Capability blocks: one paragraph each — Metal / Wood / Complete programmes
- [ ] How we work: 1–2 sentences per step (co-design, prototype,
      industrialisation, series production, packing & shipping)
- [ ] "Why a European partner" section copy (tariffs, proximity, Scope 3)
- [ ] Proof band heading
- [ ] Closing CTA heading + sentence

## 3. Capabilities — `src/content/en/capabilities.json`
- [ ] Meta title + description
- [ ] Page intro (2–3 sentences)
- [ ] Metal section: paragraph + photo (3:2) + 1–2 sentences per operation
      (tube laser cutting, tube bending, welding, powder coating)
- [ ] Wood section: paragraph + photo + operations (panel processing, …)
- [ ] Complete programmes section: paragraph + photo

## 4. Equipment — `src/content/en/equipment.json`
- [ ] Meta title + description
- [ ] Page intro (2–3 sentences)
- [ ] Optional closing paragraph (maintenance regime / planned investments)
- (machine data itself → section 1, company.json)

## 5. Quality — `src/content/en/quality.json`
- [ ] Meta title + description
- [ ] Page intro
- [ ] In-process QC: paragraph + 3+ concrete control points
- [ ] Testing: paragraph + list of standards tested to (code + scope),
      in-house vs external lab

## 6. Sustainability — `src/content/en/sustainability.json`
- [ ] Meta title + description
- [ ] Page intro
- [ ] Solar section intro paragraph
- [ ] Optional extra CSRD paragraph
- (figures → section 1, company.json)

## 7. References — `src/content/en/references.json`
- [ ] Meta title + description
- [ ] Page intro (incl. NDA note)
- [ ] Named client logos: name + logo file per client (permission confirmed)
- [ ] Case studies (≥2): sector, product type, volumes, lead time, market,
      2–4 sentence story, photo (4:3). Mark `anonymised: true` for NDA clients.

## 8. About — `src/content/en/about.json`
- [ ] Meta title + description
- [ ] Page intro
- [ ] Timeline milestones from 1990 (year + event, ~5 entries)
- [ ] Ownership & team paragraph
- [ ] "One of the last in Europe" section copy
- (site data → section 1, company.json)

## 9. Request a quote — `src/content/en/request-a-quote.json`
- [ ] Meta title + description
- [ ] Page intro (who reads it, response time)
- [ ] Reassurance line under the form (e.g. NDA on request)

## 10. Downloads — `src/content/en/downloads.json`
- [ ] Meta title + description + intro sentence
- [ ] Capability brochure PDF (file + title + size)
- [ ] Datasheets (files + titles + sizes)
- [ ] Certificate PDFs (files + titles + sizes)
- [ ] Upload the actual files to `public/downloads/`

## 11. Careers (Bulgarian) — `src/content/en/careers.json`
- [ ] Мета заглавие + описание
- [ ] Интро (2–3 изречения)
- [ ] Свободни позиции (или съобщение при липса + спонтанна кандидатура)
- [ ] Как да кандидатствате: текст, имейл, телефон

## 12. Legal — `src/content/en/legal.json`
- [ ] Meta title + description
- [ ] Privacy notice (GDPR — form data, legal basis, retention, rights).
      Have this legally reviewed.

## 13. Thank-you — `src/content/en/thank-you.json`
- [ ] Response-time sentence

## 14. Shared strings — `src/content/en/shared.json`
- [ ] Closing CTA heading + supporting sentence (used on most pages)

---

## 15. Non-content items

- [ ] `public/contact.php`: set `$RECIPIENT` and `$FROM` (see DEPLOY.md)
- [ ] `public/.htaccess`: paste old WordPress URL 301 redirect list into the
      marked block
- [ ] `public/favicon.svg`: replace placeholder "GS" mark with the real one
- [ ] OG image `public/images/og-default.jpg` (1200×630) — referenced in
      `src/layouts/Base.astro`
- [ ] Professional photography (WebP): hero 16:7, capabilities 3:2 ×3,
      case studies 4:3, client logos, certification logos
