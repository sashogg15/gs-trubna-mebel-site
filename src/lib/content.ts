/**
 * Locale-aware content loader.
 *
 * Today the site is English-only at the root. To add German later:
 *   1. Copy src/content/en/ → src/content/de/ and translate the values.
 *   2. Add thin src/pages/de/*.astro files that render the same page
 *      templates with lang="de".
 * Templates are never touched.
 */

const modules = import.meta.glob<Record<string, unknown>>('../content/**/*.json', {
  eager: true,
});

export type Lang = 'en';
export const DEFAULT_LANG: Lang = 'en';

export function loadPage<T = Record<string, any>>(page: string, lang: string = DEFAULT_LANG): T {
  const key = `../content/${lang}/${page}.json`;
  const mod = modules[key];
  if (!mod) {
    throw new Error(`Missing content file: src/content/${lang}/${page}.json`);
  }
  return (('default' in mod ? mod.default : mod) as unknown) as T;
}

export function loadShared(lang: string = DEFAULT_LANG) {
  return loadPage<{
    nav: Record<string, string>;
    footer: Record<string, string>;
    cta: Record<string, string>;
    misc: Record<string, string>;
  }>('shared', lang);
}

/** True when a content value is still an unfilled [[TODO: ...]] marker. */
export function isTodo(value: unknown): boolean {
  return typeof value === 'string' && value.includes('[[TODO');
}
