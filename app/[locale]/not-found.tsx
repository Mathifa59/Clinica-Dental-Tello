'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <div className="page-hero">
      <div className="container">
        <span className="eyebrow">{t('eyebrow')}</span>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
          <Link href={localePath('/')} className="btn btn--light">{t('cta_home')}</Link>
          <Link href={localePath('/servicios')} className="btn btn--ghost-light">{t('cta_services')}</Link>
          <Link href={localePath('/citas')} className="btn btn--ghost-light">{t('cta_appointments')}</Link>
        </div>
      </div>
    </div>
  );
}
