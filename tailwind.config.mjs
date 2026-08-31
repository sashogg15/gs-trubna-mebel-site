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
      // Two-tone accent — see the rule in src/design/tokens.mjs before
      // using: ember for text-sized elements and button fills,
      // ember-bright ONLY for large text and non-text UI.
      ember: {
        DEFAULT: colors.ember,
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
    fontSize: {
      figure: typeScale.figure,
      display: typeScale.display,
      h1: typeScale.h1,
      h2: typeScale.h2,
      h3: typeScale.h3,
      body: typeScale.body,
      small: typeScale.small,
      label: typeScale.label,
    },
    borderRadius: {
      none: layout.radius.none,
      field: layout.radius.field,
    },
    extend: {
      maxWidth: {
        site: layout.maxWidth,
      },
    },
  },
  plugins: [],
};
