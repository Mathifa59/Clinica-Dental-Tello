import type { Metadata } from 'next';

const BASE_URL = 'https://www.dentaltello.com';
const LOCALES = ['es', 'en'] as const;

/** Canonical + hreflang alternates para una página dada (path sin locale, ej. '/servicios'). */
export function buildAlternates(locale: string, path: string): Pick<Metadata, 'alternates'> {
  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ),
    },
  };
}
