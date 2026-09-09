import type { Metadata } from 'next';

const BASE_URL = 'https://www.dentaltello.com';
const LOCALES = ['es', 'en'] as const;

/** Imagen usada en las tarjetas de vista previa (WhatsApp, Facebook, Twitter/X, etc.). */
export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Dental Tello — Dr. Daniel Tello',
};

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
