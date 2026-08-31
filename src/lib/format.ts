/**
 * Typographic formatting for technical values.
 *
 * Content JSON stays plain ASCII; the non-breaking space before units is
 * applied at render time so "Ø32 mm" or "63 t" never breaks across lines.
 */

const UNIT_PATTERN = /(\d|²|\.) (mm|cm|m\/min|m²|m|t|kWp|kW|kg)(?![a-zA-Z])/g;

export function nbspUnits(value: string): string {
  return value.replace(UNIT_PATTERN, '$1 $2');
}

/**
 * Replace {token} placeholders in content strings with values pulled from
 * company.json at build time — so a process limit is defined once in the
 * data layer and can never diverge between pages. Unknown tokens are left
 * in place so they surface visibly instead of failing silently.
 */
export function interpolate(value: string, vars: Record<string, string>): string {
  return value.replace(/\{(\w+)\}/g, (match, key) => vars[key] ?? match);
}
