/**
 * Read access to the machine park in company.json.
 *
 * The `machines` object is a verbatim drop-in of the client's machines.json
 * export: areas keyed by slug, each with a label and items. A `null` field
 * means "not known yet" and renders as an em dash — never invent a value.
 */
import company from '../data/company.json';

export interface Machine {
  make: string | null;
  model: string | null;
  count: number | null;
  year: number | null;
  control: string | null;
  range: string | null;
  tolerance: string | null;
  capacity: string | null;
  note?: string | null;
}

export interface Area {
  key: string;
  label: string;
  items: Machine[];
}

const raw = company.machines as Record<string, { label: string; items: Machine[] }>;

export const areas: Area[] = Object.entries(raw).map(([key, a]) => ({
  key,
  label: a.label,
  items: a.items,
}));

export const allMachines: Machine[] = areas.flatMap((a) => a.items);

export function area(key: string): Area | undefined {
  return areas.find((a) => a.key === key);
}

/** First machine in an area whose make matches (case-insensitive). */
export function findMachine(areaKey: string, make: string): Machine | undefined {
  return area(areaKey)?.items.find(
    (m) => (m.make ?? '').toLowerCase().includes(make.toLowerCase())
  );
}

/** Field value or em dash — the §8 empty-cell convention. */
export function dash(v: string | number | null | undefined): string {
  return v === null || v === undefined || String(v).trim() === '' ? '—' : String(v);
}

/** Number of null fields across the park — the open-data count for build warnings. */
export function nullFieldCount(): number {
  return allMachines.reduce(
    (n, m) => n + Object.values(m).filter((v) => v === null).length,
    0
  );
}
