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

// Type scale, rem. ~1.25 ratio. `figure` is reserved for the key-numbers strip.
export const typeScale = {
  figure: ['5.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
  display: ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  h1: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
  h2: ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
  h3: ['1.5rem', { lineHeight: '1.3' }],
  body: ['1.0625rem', { lineHeight: '1.65' }],
  small: ['0.875rem', { lineHeight: '1.5' }],
  // Uppercase labels: section eyebrows, table headers.
  label: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
};

export const layout = {
  // Content max-width. Photography breaks out to full bleed.
  maxWidth: '72rem',
  // Vertical rhythm between sections (Tailwind classes used in Section wrappers).
  sectionY: 'py-20 md:py-28',
  // Corner radius: sharp everywhere; 2px on form fields only.
  radius: { none: '0', field: '2px' },
};
