/**
 * DESIGN TOKENS — the single place to adjust the visual direction.
 *
 * Everything visual flows from this file into tailwind.config.mjs.
 *
 * Palette principle: we are a contract manufacturer — factory photography
 * is the hero, and the products in it belong to our clients. Neutral base
 * (slightly cool, to sit against the grey-blue of steel in the photos),
 * ONE accent used sparingly. The accent carries navigation and action,
 * never mood.
 *
 * Plain .mjs (not .ts) so the Tailwind config can import it at build time.
 */

export const colors = {
  // ---- Neutrals — roughly 90% of every page --------------------------------
  // Logo, headings, primary body text.
  ink: '#16181C',
  // Secondary text and table borders on tinted grounds — AND, as a
  // documented PROJECT EXTENSION of the design authority (ruling of
  // PROMPT_08): a section ground for the dark bands (robotics, proof band,
  // footer). The bands give the page rhythm and read as industrial, which
  // is correct for this audience. Every text/border colour used on a
  // graphite ground must pass its contrast limit (white 13.1:1, steel-300
  // 5.87:1; ember only for large figures at 3.09:1).
  graphite: '#2C3138',
  // Secondary text, captions, labels.
  steel600: '#5A6270',
  // Borders, disabled states, dividers on dark.
  steel300: '#A8AEB8',
  // Dividers, table row separators, card borders.
  steel100: '#E6E8EB',
  // Default page background.
  paper: '#F7F8F9',
  // Cards, elevated surfaces.
  white: '#FFFFFF',

  // ---- Accent — roughly 10%, and sparingly ---------------------------------
  // THREE-TONE ACCENT RULE — hard accessibility requirement, do not undo:
  //   · ember (#D4500A, 3.99:1 on paper) — large accent text and figures,
  //     24 px and above ONLY.
  //   · ember-deep (#C24805, 4.68:1 on paper) — ALL accent text below
  //     24 px: inline links, form errors, small accent numbers.
  //   · ember-bright (#F26A0C) — FILLS ONLY, never as text. Button pairing
  //     is INK on ember-bright (5.79:1); white on ember-bright fails at
  //     3.07:1.
  // Accent budget: at most ONE accent element visible per viewport.
  // Never accent on section headings, section backgrounds, or borders
  // (interaction-state outlines/invalid-field borders excepted per §11).
  ember: '#D4500A',
  emberDeep: '#C24805',
  emberBright: '#F26A0C',

  // ---- Section tint pair — structural, not decorative -----------------------
  // Barely-cool vs barely-warm backgrounds that signal, below conscious
  // notice, the move between the two production chains. Used ONLY on:
  // /capabilities #metal + #wood, /equipment metal + wood groupings, and
  // the home page Metal + Wood capability blocks. Never anywhere else,
  // and never add further tints — two is the whole system.
  tintMetal: '#F4F6F8',
  tintWood: '#F8F6F2',
};

export const fonts = {
  // Headings and large numbers. Grotesque, technical character, full Cyrillic.
  heading: "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif",
  // Body. Maximum legibility at small sizes, full Cyrillic.
  body: "'Inter Variable', 'Helvetica Neue', Arial, sans-serif",
};

// Type scale — the design authority's ten tokens, px in comments.
// The *-m tokens are the mobile downshifts (used mobile-first with a
// md: override, e.g. `text-display-1-m md:text-display-1`).
// Faces: display/figure/heading = Archivo (700 for display+figures,
// 600 for headings), text = Inter (400, 500 for label).
export const typeScale = {
  'display-1': ['3.5rem', { lineHeight: '3.75rem', letterSpacing: '-0.02em' }], // 56/60
  'display-1-m': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }], // 36/40
  'display-2': ['2.5rem', { lineHeight: '2.75rem', letterSpacing: '-0.015em' }], // 40/44
  'display-2-m': ['1.75rem', { lineHeight: '2rem', letterSpacing: '-0.015em' }], // 28/32
  'heading-1': ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.01em' }], // 28/34
  'heading-2': ['1.25rem', { lineHeight: '1.625rem' }], // 20/26
  'body-lg': ['1.125rem', { lineHeight: '1.875rem' }], // 18/30 — lead paragraph, max one per section
  body: ['1rem', { lineHeight: '1.625rem' }], // 16/26
  'body-sm': ['0.875rem', { lineHeight: '1.375rem' }], // 14/22
  label: ['0.8125rem', { lineHeight: '1rem', letterSpacing: '0.01em' }], // 13/16
  'figure-xl': ['4rem', { lineHeight: '4rem' }], // 64/64 — the one big number in a section
  'figure-xl-m': ['2.75rem', { lineHeight: '2.875rem' }], // 44/46
  figure: ['2rem', { lineHeight: '2.25rem' }], // 32/36 — figures inside a strip or table
};

export const layout = {
  // Content max-width: 1200px. Prose measure capped at 68ch.
  maxWidth: '75rem',
  proseMeasure: '68ch',
  // Section rhythm: 96px desktop / 64px mobile — one value site-wide.
  sectionY: 'py-16 md:py-24',
  // Corner radius: 0 on structural surfaces; 2px on interactive controls
  // (buttons, inputs, selects).
  radius: { none: '0', field: '2px' },
};
