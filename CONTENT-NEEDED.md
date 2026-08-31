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

### Key figures strip (home page)
Four real figures are live: 97% exported · 200,000 chairs/year · 35–45 t
metal/month · since 1990. The build warns until the two interview-sourced
ones are confirmed.
- [ ] **Confirm 200,000 chairs per year** (source: 2025 interview)
- [ ] **Confirm 35–45 t metal processed per month** (source: 2025 interview)
- [ ] **Resolve the employees/area conflict** — old site said 66 employees and
      5,000 m²; later statements say two ~9,000 m² sites and ~60 in
      production. Both numbers are blocked from publication until resolved.
      Once resolved they can join the strip (recorded in company.json →
      keyFigures.pending).

### Production sites (×2)
- [ ] Site 1: name, location, area m², function
- [ ] Site 2: name, location, area m², function

### Machine park — CHECKLIST FOR PRODUCTION (take this to the factory floor)

All 23 machines are entered in `company.json` from the old website's data
(last updated ~2020) and every entry carries `needsConfirmation: true`.
The build prints the full open list on every `npm run build`.

**A. Confirm for ALL 23 machines** (then remove `needsConfirmation`):
- [ ] Machine still in operation (old site is ~6 years old — anything retired? anything new to add?)
- [ ] Specs as listed are still correct

**B. Two blocking questions — page must not go live without answers:**
- [ ] **Powder coating line:** an EU-funded project (~BGN 930,000) for a new
      powder coating facility + welding robot was approved. Is the listed line
      the existing one (new one separate), or the upgraded line?
- [ ] **Paoloni planing:** old site described the surface planer as a
      "combined surfacer-thicknesser", but the thicknesser is listed as a
      separate machine. One combined machine or two separate ones?

**C. Missing values per machine** (marked `[[TODO]]` in company.json):
- [ ] ADIGE tube cutting — exact model designation
- [ ] Band cutting (×3) — manufacturer, year
- [ ] Additional cutting (×4) — manufacturer, year
- [ ] Alfa benders (×6) — year
- [ ] Three-roll bending (×2) — manufacturer, year
- [ ] Hydraulic punching (×7) — year
- [ ] Presses 63 t (×3) — manufacturer, year
- [ ] Fanuc robotic welding (×2) — exact model, year, welding process (MIG/MAG/TIG)
- [ ] Kuka robotic sanding — exact model, year
- [ ] Shot blasting — manufacturer, year
- [ ] Powder coating line — line manufacturer, year, max part dimensions
- [ ] HOMAG WEEKE nesting centre — year, count, max panel dimensions
- [ ] HOMAG WEEKE Venture — year, count
- [ ] Mayer panel saw — year, count
- [ ] FRAVOL edgebander — year, count
- [ ] Paoloni spindle moulder — year, count
- [ ] Paoloni thicknesser — year, count
- [ ] Paoloni surface planer — year, count (see question B)
- [ ] Centorrino belt sander — year, count
- [ ] Slip Con Perfection brush sander — year, count
- [ ] SUPERFICI spray line — year, max part dimensions, throughput

**D. Photography for highlighted machines** (4:3, WebP):
- [ ] BLM Group LT5 · ADIGE cutting · Crippa CA 532 · Fanuc robots ·
      Kuka robot · powder coating line · HOMAG nesting centre · SUPERFICI line

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
Copy is written. Remaining:
- [ ] Hero photo (16:7) — wide shot of a production hall, people at work
- [ ] Capability block photos (3:2 ×3) — LT5 cutting / panels on the HOMAG /
      packed pallets or powder line. **Factory, machine, process or
      people-at-work subjects only — never furnished interiors or styled
      product shots** (that is the clients' territory)
- [ ] Solar figure for "Why a European partner" — capacity in kWp and share
      of consumption covered
- [ ] Closing CTA: role/name of who reads enquiries + typical response time
- [ ] **Client names (Version A)** — old site listed 18 client/partner names
      incl. Calligaris and Norr11. Get written permission per client; then set
      `clients.permissionToDisplay: true` + fill `clients.named[]` in
      company.json and the named logo wall renders automatically. Until then
      Version B (no names) ships.
- (200,000 and 35–45 t confirmations → section 1 above)

## 3. Capabilities — `src/content/en/capabilities.json`
Copy is written; limits interpolate from company.json. The build prints the
full open list on every `npm run build`. Remaining, grouped:

**Process limits to supply (ask production):**
- [ ] Welding processes available (MIG / MAG / TIG) + whether welders hold
      EN ISO 9606-1 qualification
- [ ] Max part dimensions through the powder coating line
- [ ] RAL range / colour availability / client-specified powder brands — yes/no
- [ ] Maximum panel dimensions (nesting/sawing)
- [ ] Edge material types supported (ABS, PVC, veneer, solid lipping)
- [ ] Finish types on the spray line (matt/satin/gloss, lacquer systems,
      client-specified paint systems — yes/no)
- [ ] Max part dimensions through the spray line

**Commercial terms (company.json → productionTerms):**
- [ ] General tolerances held, or standard referenced
- [ ] Prototype / series / tooling lead times (weeks)
- [ ] Packing options (bulk, retail-ready, flat-pack, client-specified)
- [ ] Incoterms offered
- [ ] Assembly offered (assembled / partly assembled / flat-pack)
- Note: MOQ is deliberately NEVER published — internal field only.

**Photography (3:2, process shots only):**
- [ ] Metal: LT5 cutting · tube in the CNC bender · sparks at a welding
      cell · parts on the powder conveyor
- [ ] Wood: panels on the nesting centre · panel through the edgebander ·
      SUPERFICI spray line running
- [ ] Complete programmes: metal frame + wooden top together, or a packed
      finished product on a pallet

## 4. Equipment — `src/content/en/equipment.json`
- [x] Meta title + description — written from confirmed machine data
- [x] Page intro, section copy, machine descriptions — written
- (open machine data gaps → section 1.C above; all copy final pending
  production's confirmation of the underlying facts)

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
Copy, form and PHP handler are done. Remaining:

- [ ] **🚫 LAUNCH BLOCKER — enquiries email domain.** The old site published
      `office@gs-bg.eu`, a **different domain** from `gstrubnamebel.eu`.
      A buyer who submits a form on one domain and gets a reply from another
      reads it as disorganised, and cross-domain replies hurt deliverability.
      Decide before launch: either create an enquiries mailbox on
      `gstrubnamebel.eu`, or document the reason to keep `gs-bg.eu`.
      **No `gs-bg.eu` address may be published until this is decided.**
      (Also drives `$RECIPIENT` in contact.php and the sender mailbox —
      see DEPLOY.md §3a.)
- [ ] Who reads enquiries + typical response time — fills the highlighted
      element beside the form AND step 3 on the thank-you page. Until
      filled, both are omitted from production builds automatically.
- [ ] Phone number for enquiries
- [ ] Confirm both addresses are current: office ul. Angel Stoyanov 1,
      Dobrich 9300 · production bul. 25 Septemvri 51 (both from the old site)

## 10. Downloads — `src/content/en/downloads.json`
- [ ] Meta title + description + intro sentence
- [ ] Capability brochure PDF (file + title + size)
- [ ] Datasheets (files + titles + sizes)
- [ ] Certificate PDFs (files + titles + sizes)
- [ ] Upload the actual files to `public/downloads/`

## 11. Legal — `src/content/en/legal.json`
- [ ] Meta title + description
- [ ] Privacy notice (GDPR — form data, legal basis, retention, rights).
      Have this legally reviewed.

## 12. Thank-you — `src/content/en/thank-you.json`
- [ ] Response-time sentence

## 13. Shared strings — `src/content/en/shared.json`
- [ ] Closing CTA heading + supporting sentence (used on most pages)

---

## 14. Non-content items

- [ ] `public/contact.php`: set `$RECIPIENT` and `$FROM` (see DEPLOY.md)
- [ ] `public/.htaccess`: paste old WordPress URL 301 redirect list into the
      marked block
- [ ] `public/favicon.svg`: replace placeholder "GS" mark with the real one
- [ ] OG image `public/images/og-default.jpg` (1200×630) — referenced in
      `src/layouts/Base.astro`
- [ ] Professional photography (WebP): hero 16:7, capabilities 3:2 ×3,
      case studies 4:3, client logos, certification logos
