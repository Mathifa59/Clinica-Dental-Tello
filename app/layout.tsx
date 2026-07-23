import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import './globals.css';

// Fraunces → var(--font-jakarta) (títulos) · Figtree → var(--font-inter) (cuerpo).
// Se conservan los nombres de variable para no tocar cada CSS Module.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-jakarta',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dental Tello',
  description: 'Clínica odontológica de alta especialidad en Lima.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${figtree.variable}`}>{children}</body>
    </html>
  );
}
