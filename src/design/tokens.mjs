/**
 * DESIGN TOKENS — the single place to adjust the visual direction.
 *
 * Everything visual flows from this file into tailwind.config.mjs.
 * Change a value here and it changes everywhere.
 *
 * Plain .mjs (not .ts) so the Tailwind config can import it at build time.
 */

export const colors = {
  // Near-black. Headings and body text on light backgrounds.
  ink: '#16181D',
  // Secondary text, captions, table meta.
  steel: '#4A5058',
  // Hairline rules, table borders, card outlines.
  line: '#D9DCE0',
  // Page background.
  paper: '#FFFFFF',
  // Alternate section background.
  mist: '#F3F4F6',
  // Dark sections: proof band, footer.
  graphite: '#1E2126',
  // Text on graphite.
  fog: '#B7BCC3',
  // The single accent. RFQ button, links, key figures. Use sparingly.
  signal: '#E8600A',
  // Accent hover/active.
  signalDark: '#C74F05',
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
