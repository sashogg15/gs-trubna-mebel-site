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
