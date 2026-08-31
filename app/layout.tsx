import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

// Fraunces → var(--font-heading) (títulos) · Figtree → var(--font-body) (cuerpo).
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dentaltello.com'),
  title: 'Dental Tello',
  description: 'Clínica odontológica de alta especialidad en Lima.',
  openGraph: {
    siteName: 'Dental Tello',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Dental Tello — Dr. Daniel Tello' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // getLocale() depende del contexto de middleware de next-intl; la ruta
  // /_not-found sintética que Next.js genera al buildear no pasa por ahí.
  let locale = 'es';
  try {
    locale = await getLocale();
  } catch {
    // fuera de contexto de middleware — se mantiene el fallback 'es'
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fraunces.variable} ${figtree.variable}`}>{children}</body>
    </html>
  );
}
