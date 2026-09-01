# Design-authority project exceptions — GS Trubna Mebel

> Canonical, version-controlled copy of §15 of the `gstm-site-design` skill.
> The skill copy served into an agent session lives in an ephemeral per-session
> cache — an edit there does not persist. Paste this section into the skill's
> real source whenever the skill is updated, and treat this file as the record.

## 15. Project exceptions — ruled in PROMPT_08, do not raise again

These are deliberate, recorded overrides of this skill for the GSTM project. A future review must treat them as compliant.

1. **Minimum order quantity is never published (overrides §10 "state limits plainly").** Business ruling: a published MOQ acts as both a floor and a ceiling — a buyer with a smaller run disqualifies themselves before writing, and a large buyer reads it as small-scale. Volume is discussed one-to-one through the RFQ form. The MOQ field in `company.json` is internal-only and must never be rendered.

2. **RFQ field list deviates from §7.** (a) No *target unit price band* field — it is the highest-friction field on the form and anchors the buyer downward before they have seen an assessment; the mechanism runs the other way: GSTM returns the indicative price. (b) *Role* is present but optional — purchasing vs engineering changes how the reply is written. (c) Five required fields, not four, with *message* conditionally required — required only when no file is attached, since a buyer sending a drawing often has nothing to write.

3. **`graphite` is a documented section ground (extends §4's role table).** The dark bands — robotics, the proof band, the footer — give the page rhythm and read as industrial, which is correct for this audience. This is a system extension, not an exception to be fixed: every text and border colour used on a graphite ground must pass its contrast limit (white 13.10:1 AA, steel-300 5.87:1 AA, ember 3.09:1 large-text-only for figures, steel-600/40 hairlines are decorative). The footer descriptor line is set in `steel-300`, not the §9 `steel-600`, because steel-600 measures 2.13:1 on graphite.

Related implementation notes, also settled: the justified client-side-JS list (§2.6) contains exactly one entry — the RFQ form script (inline per-field validation, the file list with per-file remove, the sending state, the anti-spam timestamp; no CSS equivalent exists, and the form posts and validates server-side without JS). The `white` token exists for form-control fills, the sticky header chrome and the overlay nav panel only — it is not a section or card ground.
