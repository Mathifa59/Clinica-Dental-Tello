import type { Metadata } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ServiceCard from '@/components/ui/ServiceCard';
import StatCard from '@/components/ui/StatCard';
import Reveal from '@/components/ui/Reveal';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });
  return {
    title: 'Inicio',
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | Dental Tello`,
      description: t('subtitle'),
    },
  };
}

const serviceIcons = {
  orthodontics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5L8 14h2l.5 2h3l.5-2h2l1-3.5c.5-1 1-2 1-3.5C17 4.5 15.5 2 12 2z" />
      <path d="M9 7h6" />
      <path d="M9 10h6" />
    </svg>
  ),
  implants: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v10" />
      <path d="M9 5l3-3 3 3" />
      <path d="M8 12h8l1 8H7l1-8z" />
      <path d="M10 16h4" />
    </svg>
  ),
  cleaning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

export default function HomePage() {
  const t = useTranslations('home');
  const tServices = useTranslations('services');

  const stats = [
    { value: t('stats.years'), label: t('stats.years_label') },
    { value: t('stats.patients'), label: t('stats.patients_label') },
    { value: t('stats.specialties'), label: t('stats.specialties_label') },
  ];

  const featuredServices = [
    { key: 'orthodontics', icon: serviceIcons.orthodontics },
    { key: 'implants', icon: serviceIcons.implants },
    { key: 'cleaning', icon: serviceIcons.cleaning },
  ];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1>{t('title')}</h1>
            <div className={styles.gradientAccent} />
            <p className={styles.heroSubtitle}>{t('subtitle')}</p>
            <div className={styles.heroCtas}>
              <Link href="citas" className="btn btn--primary">{t('cta_primary')}</Link>
              <Link href="servicios" className="btn btn--secondary">{t('cta_secondary')}</Link>
            </div>
            <div className={styles.statsRow}>
              {stats.map((s) => (
                <StatCard key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imgPlaceholder}>
              <span>{t('photo_label')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section--gradient">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>{t('featured_services_title')}</h2>
              <p>{t('featured_services_subtitle')}</p>
            </div>
          </Reveal>
          <div className="grid-3">
            {featuredServices.map(({ key, icon }, i) => (
              <Reveal key={key} delay={i * 100} direction="scale">
                <ServiceCard
                  icon={icon}
                  name={tServices(`items.${key}.name` as Parameters<typeof tServices>[0])}
                  description={tServices(`items.${key}.description` as Parameters<typeof tServices>[0])}
                  learnMore={tServices('learn_more')}
                  href="servicios"
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className={styles.viewAll}>
              <Link href="servicios" className={styles.viewAllLink}>{t('view_all')}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
