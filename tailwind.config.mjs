import { colors, fonts, typeScale, layout } from './src/design/tokens.mjs';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: colors.ink,
      graphite: colors.graphite,
      steel: {
        600: colors.steel600,
        300: colors.steel300,
        100: colors.steel100,
      },
      paper: colors.paper,
      white: colors.white,
      // Three-tone accent — see the rule in src/design/tokens.mjs:
      // ember = large text ≥24px, ember-deep = accent text <24px and
      // inline links, ember-bright = fills only (with ink text), never text.
      ember: {
        DEFAULT: colors.ember,
        deep: colors.emberDeep,
        bright: colors.emberBright,
      },
      tint: {
        metal: colors.tintMetal,
        wood: colors.tintWood,
      },
    },
    fontFamily: {
      heading: fonts.heading.split(',').map((s) => s.trim()),
      body: fonts.body.split(',').map((s) => s.trim()),
    },
    fontSize: { ...typeScale },
    borderRadius: {
      none: layout.radius.none,
      field: layout.radius.field,
    },
    extend: {
      maxWidth: {
        site: layout.maxWidth,
        prose: layout.proseMeasure,
      },
    },
  },
  plugins: [],
};
