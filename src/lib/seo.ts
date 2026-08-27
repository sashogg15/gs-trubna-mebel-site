import company from '../data/company.json';

const SITE_URL = 'https://gstrubnamebel.eu';

export interface PageMeta {
  title: string;
  description: string;
  /** Path of the page, e.g. '/capabilities' — used for canonical + og:url. */
  path: string;
  /** Optional page-specific OG image path (root-relative). */
  ogImage?: string;
  /** Page language, defaults to 'en'. The careers page is 'bg'. */
  lang?: string;
}

export function canonicalUrl(path: string): string {
  const clean = path === '/' ? '/' : path.replace(/\/?$/, '/');
  return new URL(clean, SITE_URL).href;
}

/** JSON-LD Organization schema, built from company.json. */
export function organizationSchema() {
  const sameAs = [company.social?.linkedin].filter(
    (v): v is string => typeof v === 'string' && !v.includes('[[TODO')
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.identity.brandName,
    legalName: company.identity.legalName,
    url: SITE_URL,
    foundingDate: String(company.identity.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.contacts.address.street,
      addressLocality: company.contacts.address.city,
      postalCode: company.contacts.address.postalCode,
      addressCountry: company.contacts.address.countryCode,
    },
    email: company.contacts.email,
    telephone: company.contacts.phone,
    ...(sameAs.length ? { sameAs } : {}),
  };
}
