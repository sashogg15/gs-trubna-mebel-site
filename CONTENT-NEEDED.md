# CONTENT-NEEDED.md — working document

Grouped by **who can answer**, so it can be walked through the factory.
Every open item is also a `[[TODO:]]` marker in the code; verify completion
with:

```bash
grep -rn "\[\[TODO" src public
```

Every `npm run build` prints the current distance to launch (open TODOs,
unconfirmed figures, blocked pages).

---

## 🚫 LAUNCH BLOCKERS — nothing goes live before these four

1. **Enquiry email domain.** The old site published `office@gs-bg.eu` — a
   different domain from `gstrubnamebel.eu`. A buyer who submits a form on
   one domain and gets a reply from another reads it as disorganised, and
   cross-domain replies hurt deliverability. Decide: a mailbox on
   `gstrubnamebel.eu`, or a documented reason to keep `gs-bg.eu`.
   **No `gs-bg.eu` address may be published until decided.**
2. **Sender mailbox for the form.** `website@gstrubnamebel.eu` must exist in
   cPanel or SuperHosting rejects every enquiry mail. See DEPLOY.md §3a.
3. **Employees / production area conflict.** Old site: 66 employees,
   5,000 m². Later statements: two ~9,000 m² sites, ~60 in production.
   Both versions are blocked from publication until resolved.
4. **Powder coating line.** An EU-funded project (~BGN 930,000) for a new
   powder coating facility + welding robot was approved. Is the listed line
   the existing one (new one separate) or the upgraded one? The equipment
   entry must not go live unclarified.
5. **Original vector logo.** Obtain the original vector logo (.ai, .eps,
   .svg or .pdf) from the designer, the trademark registration documents,
   or existing print materials. The current file is a raster reconstruction
   with visible alignment differences from the registered mark and must not
   be used on production materials. Swapping it in is a 1:1 file
   replacement in `public/images/logo/` (same filenames) plus regenerating
   the favicon set — no code change.

---

## 1. Production floor

**Machine park** — `company.json → machines` is a verbatim drop-in of the
client's `machines.json` (2026-09-02). A `null` field renders as an em dash
on `/equipment`; nothing is invented. Two corrections already applied in
that export and NOT to be reverted from the old website: LT5 square tube is
**12×12–100×100 mm** (old site: 120×120); the wide belt sander has **no
make** (“Centorrino” was the supplier). LT5 wall thickness stays null — it
depends on laser power.

**Next step:** photograph the machine plates, fill the nulls, send a new
`machines.json`; it replaces the whole `machines` object as-is.

**Still open (blocking):**
- [ ] Powder coating line → launch blocker 4 (existing line vs new EU-funded one)

**Null fields per machine (23 rows, from the data):**
- [ ] Tube cutting — BLM Group LT5: tolerance, capacity
- [ ] Tube cutting — BLM Group Adige: range
- [ ] Tube cutting — Belt cutting machines: make, model, year, range, tolerance, capacity
- [ ] Tube cutting — Abrasive disc cutting and angle grinding: make, model, year, range, tolerance, capacity
- [ ] Tube bending — Crippa CA 532: year, tolerance, capacity
- [ ] Tube bending — Alfa: model, year, range, tolerance, capacity
- [ ] Tube bending — Three-roll bending: make, model, year, control, range, tolerance, capacity
- [ ] Punching and forming — Hydraulic punching: make, model, year, range, tolerance, capacity
- [ ] Punching and forming — Presses: make, model, year, control, tolerance, capacity
- [ ] Welding — Fanuc: model, year, range, tolerance, capacity
- [ ] Metal sanding — KUKA: model, year, range, tolerance, capacity
- [ ] Powder coating — Two stations: pretreatment chamber: make, model, year, range, tolerance
- [ ] Powder coating — Shot blasting: make, model, year, control, range, tolerance, capacity
- [ ] Wood machining — HOMAG / Weeke: model, year, range, tolerance, capacity
- [ ] Wood machining — HOMAG / Weeke Venture: year, range, tolerance, capacity
- [ ] Wood machining — Mayer: model, year, range, tolerance, capacity
- [ ] Wood machining — Fravol: model, year, control, range, tolerance
- [ ] Wood machining — Paoloni: model, year, range, tolerance, capacity
- [ ] Wood machining — Paoloni: model, year, range, tolerance, capacity
- [ ] Wood machining — Paoloni: model, year, range, tolerance, capacity
- [ ] Wood sanding and finishing — Wide belt sander: make, model, year, control, range, tolerance, capacity
- [ ] Wood sanding and finishing — Slipcon: model, year, control, range, tolerance, capacity
- [ ] Wood sanding and finishing — Superfici: model, year, range, tolerance, capacity

**Process limits (for /capabilities):**
- [ ] Max wall thickness on the tube laser (depends on laser power)
- [ ] Welding processes offered + do welders hold EN ISO 9606-1?
- [ ] Max part dimensions through the powder coating line
- [ ] RAL range / client-specified powder brands — yes/no
- [ ] Max panel dimensions (nesting/sawing)
- [ ] Edge materials supported (ABS, PVC, veneer, solid lipping)
- [ ] Spray line: finish types and max part dimensions

---

## 2. Galin / management

**Decisions:**
- [ ] Launch blockers 1 and 3 above (email domain; employees/area figures)
- [ ] **Permission to name clients.** Old site listed 18 names incl.
      Calligaris and Norr11. Written permission per client → then flip
      `clients.permissionToDisplay` in company.json and fill `named[]`;
      the logo wall renders automatically. Until then Version B (no names).
- [ ] Who reads enquiries + typical response time (RFQ page element and
      thank-you page step 3 — both auto-omitted from production until filled)
- [ ] Confirm the two 2025-interview figures on the home page:
      200,000 chairs/year · 35–45 t metal/month
- [ ] Phone number for enquiries

**For the blocked pages:**
- [ ] /quality — certifications held: name, issuing body, certificate
      number, valid until, scope (+ certificate PDFs for /downloads);
      in-process QC points; product testing standards (EN 1728 etc.)
- [ ] /sustainability — solar installations (site, kWp, year, share of
      consumption %); CO₂ data; CSRD/Scope 3 supplier reporting readiness
- [ ] /references — case studies (sector, product type, volumes, lead time,
      market, 2–4 sentence story each; anonymised entries allowed)
- [ ] /about — timeline milestones from 1990; two sites with areas and
      functions; ownership and team paragraph; "one of the last tubular
      furniture manufacturers in Europe" positioning facts
- [ ] Commercial terms for /capabilities table: general tolerances,
      prototype/series/tooling lead times, packing options, Incoterms,
      assembly offered

---

## 3. Administration

- [ ] Registered legal name **exactly as in the commercial register**
      (NOT the trading name "GS Trubna Mebel" used in site copy — both are
      needed: trading name in copy, registered name on /legal; never guess
      one from the other or from the domain)
- [ ] UIC / EIK number
- [ ] VAT number (BG…)
- [ ] Registered office address (may differ from the office address)
- [ ] Managing director(s) as recorded in the register
- [ ] Confirm current: office ul. Angel Stoyanov 1, Dobrich 9300 ·
      production bul. 25 Septemvri 51 (both from the old site)
- [ ] Second production site address (about/legal mention two sites)
- [ ] Data retention period for enquiries and submitted files (/legal)
- [ ] Email address for data access/deletion requests (/legal)
- [ ] **Original vector logo** (→ launch blocker 5): source the registered
      mark's vector artwork from the designer, the trademark registration
      documents, or existing print materials

---

## 4. External / to be produced

**Photography (all factory / machine / process / product-in-production /
people-at-work — NEVER furnished interiors, styled product or lifestyle
shots; that is the clients' territory):**
- [ ] Hero, 16:7 — wide shot of a production hall with people at work
- [ ] Home capability blocks, 3:2 ×3 — LT5 cutting · panels on the HOMAG ·
      packed pallets
- [ ] Equipment highlight machines, 4:3 ×8 — BLM LT5, ADIGE, Crippa CA 532,
      Fanuc cells, Kuka cell, powder line, HOMAG nesting, SUPERFICI line
- [ ] Capabilities process shots, 3:2 ×8 — cutting, bending, welding,
      coating / nesting, edging, spray line / metal + wood together or
      packed product
- [ ] Reference case-study photos, 4:3 — product in production or packed
- [ ] OG image 1200×630 (`public/images/og-default.jpg`)
- [ ] Favicon — replace the placeholder "GS" mark

**Documents (for /downloads — footer link stays disabled until the first
file exists; re-enable in Footer.astro, marked with a comment):**
- [ ] Capability brochure PDF
- [ ] Certificate PDFs
- [ ] Datasheets

**Editorial:**
- [ ] Native English copy review of all pages
- [ ] Privacy notice legal review (/legal)
- [ ] Closing-CTA / shared strings final pass (`shared.json`)
