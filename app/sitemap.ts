import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.dentaltello.com';
const LOCALES = ['es', 'en'] as const;

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/servicios', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/casos', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/nosotros', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/citas', priority: 0.9, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}/es${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
      ),
    },
  }));
}
