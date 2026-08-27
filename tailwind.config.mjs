import { colors, fonts, typeScale, layout } from './src/design/tokens.mjs';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: colors.ink,
      steel: colors.steel,
      line: colors.line,
      paper: colors.paper,
      mist: colors.mist,
      graphite: colors.graphite,
      fog: colors.fog,
      signal: {
        DEFAULT: colors.signal,
        dark: colors.signalDark,
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
