'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Header.module.css';

const NAV_KEYS = ['home', 'services', 'about', 'blog', 'appointments', 'contact'] as const;

const NAV_ROUTES: Record<string, string> = {
  home: '/',
  services: '/servicios',
  about: '/nosotros',
  blog: '/blog',
  appointments: '/citas',
  contact: '/contacto',
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const localePath = (path: string) => `/${locale}${path === '/' ? '' : path}`;

  const isActive = (path: string) => {
    const full = localePath(path);
    if (path === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  };

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const currentPath = pathname.replace(`/${locale}`, '') || '/';
  const otherLocalePath = `/${otherLocale}${currentPath === '/' ? '' : currentPath}`;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href={localePath('/')} className={styles.logo} onClick={() => setMenuOpen(false)} aria-label="Dental Tello — Inicio">
          <Image
            src="/images/brand/logo-horizontal.png"
            alt="Dental Tello — Implantología y Rehabilitación Oral"
            width={190}
            height={134}
            priority
            className={styles.logoImg}
          />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_KEYS.map((key) => (
            <Link
              key={key}
              href={localePath(NAV_ROUTES[key])}
              className={`${styles.navLink} ${isActive(NAV_ROUTES[key]) ? styles.navActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href={localePath('/citas')}
            className={`btn btn--primary ${styles.ctaMobile}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('cta')}
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link href={otherLocalePath} className={styles.langToggle} aria-label="Cambiar idioma">
            {otherLocale.toUpperCase()}
          </Link>
          <Link href={localePath('/citas')} className={`btn btn--primary ${styles.ctaDesktop}`}>
            {t('cta')}
          </Link>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
