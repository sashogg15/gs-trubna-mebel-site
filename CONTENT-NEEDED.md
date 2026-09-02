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

## 🚫 LAUNCH BLOCKERS — nothing goes live before these

1. **Enquiry email domain.** The old site published `office@gs-bg.eu` — a
   different domain from `gstrubnamebel.eu`. A buyer who submits a form on
   one domain and gets a reply from another reads it as disorganised, and
   cross-domain replies hurt deliverability. Decide: a mailbox on
   `gstrubnamebel.eu`, or a documented reason to keep `gs-bg.eu`.
   **No `gs-bg.eu` address may be published until decided.**
2. **Sender mailbox for the form.** `website@gstrubnamebel.eu` must exist in
   cPanel or SuperHosting rejects every enquiry mail. See DEPLOY.md §3a.
3. ~~Employees / production area conflict~~ — RESOLVED by the April 2026
   presentation: 65+ employees, 9,000 m² production footprint.
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
client's `machines.json` rebuilt from the April 2026 company profile presentation (primary source; the old website only where the presentation is silent). A `null` field renders as an em dash
on `/equipment`; nothing is invented. Two corrections already applied in
that export and NOT to be reverted from the old website: LT5 square tube is
**12×12–100×100 mm** (old site: 120×120); the wide belt sander has **no
make** (“Centorrino” was the supplier). LT5 wall thickness stays null — it
depends on laser power.

**Next step:** photograph the machine plates, fill the nulls, send a new
`machines.json`; it replaces the whole `machines` object as-is. Year and
Tolerance return to the /equipment table automatically once populated —
the columns are dropped only while they would be all dashes.

**Still open (blocking):**
- [ ] Powder coating line → launch blocker 4 (existing line vs new EU-funded one)

**Null fields per machine (44 rows, from the data; `note` is optional and not counted):**
- [ ] Cutting — Tube laser cutting (BLM Group LT5): tolerance
- [ ] Cutting — Automatic tube cutting (BLM Group Adige): range
- [ ] Cutting — Horizontal saw, inclined frame (OL 330A): make, year, control, tolerance
- [ ] Cutting — Horizontal saw, inclined frame (ZIP21): make, year, control, tolerance
- [ ] Cutting — Universal cutter: make, model, year, control, tolerance
- [ ] Cutting — Abrasive disc cutting and angle grinding: make, model, year, range, tolerance, capacity
- [ ] Cutting — Press, forming, bending, punching and cutting (PE63A): make, year, control, tolerance
- [ ] Cutting — Edge bending: make, model, year, control, range, tolerance, capacity
- [ ] Cutting — Shot blasting: make, model, year, control, tolerance
- [ ] Cutting — Trough vibratory finishing: make, model, year, control, tolerance, capacity
- [ ] Cutting — Polishing: make, model, year, control, tolerance
- [ ] Bending — 5-axis spatial bending centre (Crippa CA 532): year, tolerance
- [ ] Bending — Tube bending, X and Y axis: make, model, year, tolerance
- [ ] Bending — Double bending: make, model, year, tolerance
- [ ] Bending — Three-roller bending: make, model, year, control, tolerance
- [ ] Bending — Specialised bending: make, model, year, control, tolerance
- [ ] Drilling and wire — Column drilling: make, model, year, control, range, tolerance
- [ ] Drilling and wire — Hydraulic drilling: make, model, year, control, range, tolerance
- [ ] Drilling and wire — Hydraulic punching, hole punching and embossing: make, model, year, range, tolerance, capacity
- [ ] Drilling and wire — Wire bending: make, model, year, control, tolerance, capacity
- [ ] Drilling and wire — Coning: make, model, year, control, tolerance
- [ ] Drilling and wire — Nut inserting, thick nuts: make, model, year, control, tolerance, capacity
- [ ] Welding — Welding robot (1360): make, year, range, tolerance
- [ ] Welding — Welding robot (1420): make, year, range, tolerance
- [ ] Welding — Welding robot (1860): make, year, range, tolerance
- [ ] Welding — MIG / MAG welding: make, model, year, range, tolerance, capacity
- [ ] Welding — TIG welding: make, model, year, range, tolerance, capacity
- [ ] Welding — Brazing: make, model, year, range, tolerance, capacity
- [ ] Welding — Laser welding: make, model, year, control, range, tolerance, capacity
- [ ] Welding — Spot and press welding: make, model, year, control, range, tolerance, capacity
- [ ] Surface and coating — Powder coating line: make, model, year, range, tolerance
- [ ] Surface and coating — Spray degreasing and phosphating: make, model, year, control, range, tolerance, capacity
- [ ] Surface and coating — Wet paint finishing: make, model, year, control, range, tolerance, capacity
- [ ] Surface and coating — Robotic sanding (KUKA): model, year, range, tolerance, capacity
- [ ] Wood machining — CNC nesting, two stations (HOMAG / Weeke): model, year, range, tolerance, capacity
- [ ] Wood machining — CNC machining centre, two stations (HOMAG / Weeke Venture): year, range, tolerance, capacity
- [ ] Wood machining — CNC panel saw (Mayer): model, year, range, tolerance, capacity
- [ ] Wood machining — Edgebander (Fravol): model, year, control, range, tolerance
- [ ] Wood machining — Spindle moulder (Paoloni): model, year, range, tolerance, capacity
- [ ] Wood machining — Thicknesser (Paoloni): model, year, range, tolerance, capacity
- [ ] Wood machining — Combined jointer-thicknesser (Paoloni): model, year, range, tolerance, capacity
- [ ] Wood sanding and finishing — Wide belt sander, calibrating and finish sanding: make, model, year, control, range, tolerance, capacity
- [ ] Wood sanding and finishing — Brush sander (Slipcon): model, year, control, range, tolerance, capacity
- [ ] Wood sanding and finishing — MDF spray painting line (Superfici): model, year, range, tolerance, capacity

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
- [ ] Launch blocker 1 above (email domain)
- [ ] **Permission to name clients.** Old site listed 18 names incl.
      Calligaris and Norr11. Written permission per client → then flip
      `clients.permissionToDisplay` in company.json and fill `named[]`;
      the logo wall renders automatically. Until then Version B (no names).
- [ ] Who reads enquiries + typical response time (RFQ page element and
      thank-you page step 3 — both auto-omitted from production until filled)
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
