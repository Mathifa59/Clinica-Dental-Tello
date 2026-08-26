import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
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
