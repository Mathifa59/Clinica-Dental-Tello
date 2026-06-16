import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import StatCard from '@/components/ui/StatCard';
import Reveal from '@/components/ui/Reveal';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' });
  return {
    title: 'Nosotros',
    description: t('hero_subtitle'),
    openGraph: {
      title: `${t('hero_title')} | Dental Tello`,
      description: t('hero_subtitle'),
    },
  };
}

export default function AboutPage() {
  const t = useTranslations('about');

  const stats = [
    { value: t('stats.years'), label: t('stats.years_label') },
    { value: t('stats.patients'), label: t('stats.patients_label') },
    { value: t('stats.specialties'), label: t('stats.specialties_label') },
  ];

  const values = [
    {
      key: 'trust',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      key: 'technology',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      key: 'warmth',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow animate-fade-up">{t('hero_title')}</span>
          <h1 className="animate-fade-up animate-delay-1">{t('hero_title')}</h1>
          <p className="animate-fade-up animate-delay-2">{t('hero_subtitle')}</p>
        </div>
      </div>

      {/* Doctor Section */}
      <section className="section">
        <div className="container">
          <div className={styles.doctorGrid}>
            <Reveal direction="scale">
              <div className={styles.doctorPhoto}>
                <div className={styles.photoPlaceholder}>
                  <span>{t('photo_label')}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className={styles.doctorInfo}>
                <span className="eyebrow">{t('doctor_subtitle')}</span>
                <h2>{t('doctor_title')}</h2>
                <p className={styles.bio}>{t('doctor_bio')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section--gradient">
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} direction="scale">
                <StatCard value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>{t('values_title')}</h2>
            </div>
          </Reveal>
          <div className={styles.valuesGrid}>
            {values.map(({ key, icon }, i) => (
              <Reveal key={key} delay={i * 110} direction="scale">
                <div className={styles.valueCard}>
                  <div className={styles.valueIcon}>{icon}</div>
                  <h3>{t(`values.${key}.title` as Parameters<typeof t>[0])}</h3>
                  <p>{t(`values.${key}.description` as Parameters<typeof t>[0])}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
