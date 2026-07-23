import type { Metadata } from 'next';
import Image from 'next/image';
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

const HERO_IMAGE = '/images/home/hero.jpg';
const CLINIC_IMAGE = '/images/home/clinica-interior.jpg';

const SERVICE_KEYS = ['orthodontics', 'implants', 'cleaning', 'whitening', 'pediatric', 'emergency'] as const;

const serviceIcons = {
  orthodontics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5L8 14h2l.5 2h3l.5-2h2l1-3.5c.5-1 1-2 1-3.5C17 4.5 15.5 2 12 2z" />
      <path d="M9 7h6" /><path d="M9 10h6" />
    </svg>
  ),
  implants: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v10" /><path d="M9 5l3-3 3 3" />
      <path d="M8 12h8l1 8H7l1-8z" /><path d="M10 16h4" />
    </svg>
  ),
  cleaning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

/* Separa la última palabra del título para darle el acento en itálica/gradiente */
function splitTitle(title: string): [string, string] {
  const words = title.trim().split(' ');
  const last = words.pop() ?? '';
  return [words.join(' '), last];
}

export default function HomePage() {
  const t = useTranslations('home');
  const tServices = useTranslations('services');

  const [titleStart, titleEnd] = splitTitle(t('title'));

  const stats = [
    { value: t('stats.years'), label: t('stats.years_label') },
    { value: t('stats.patients'), label: t('stats.patients_label') },
    { value: t('stats.specialties'), label: t('stats.specialties_label') },
  ];

  const featuredServices = [
    { key: 'orthodontics', icon: serviceIcons.orthodontics, imageSrc: '/images/services/orthodontics.jpg', placeholder: 'images/services/orthodontics.jpg' },
    { key: 'implants',     icon: serviceIcons.implants,     imageSrc: '/images/services/implants.jpg',     placeholder: 'images/services/implants.jpg' },
    { key: 'cleaning',     icon: serviceIcons.cleaning,     imageSrc: '/images/services/cleaning.jpg',     placeholder: 'images/services/cleaning.jpg' },
  ];

  const marqueeNames = SERVICE_KEYS.map((key) =>
    tServices(`items.${key}.name` as Parameters<typeof tServices>[0])
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>{t('eyebrow')}</span>
            <h1 className={styles.heroTitle}>
              {titleStart}{' '}
              <span className={styles.titleAccent}>{titleEnd}</span>
            </h1>
            <p className={styles.heroSubtitle}>{t('subtitle')}</p>
            <div className={styles.heroCtas}>
              <Link href="citas" className="btn btn--light">{t('cta_primary')}</Link>
              <Link href="servicios" className="btn btn--ghost-light">{t('cta_secondary')}</Link>
            </div>
            <div className={styles.statsRow}>
              {stats.map((s) => <StatCard key={s.label} value={s.value} label={s.label} onDark />)}
            </div>
          </div>

          {/* Hero image — arco */}
          <div className={styles.heroImage}>
            <div className={styles.imgWrap}>
              {HERO_IMAGE ? (
                <Image
                  src={HERO_IMAGE}
                  alt={t('photo_label')}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className={styles.imgPlaceholder}>
                  <span>{t('photo_label')}</span>
                  <small>images/home/hero.jpg</small>
                </div>
              )}
            </div>
            <div className={styles.floatBadge}>
              <div className={styles.floatBadgeIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <strong>{t('stats.patients')}</strong>
                <small>{t('stats.patients_label')}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee de servicios ─────────────────────────────────────────── */}
      <div className={styles.marqueeStrip}>
        <div className="marquee">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <span key={copy} className={styles.marqueeItem} aria-hidden={copy === 1}>
                {marqueeNames.map((name) => (
                  <span key={name} className={styles.marqueeItem}>
                    {name} <span className={styles.marqueeStar}>✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Clinic strip ─────────────────────────────────────────────────── */}
      <section className={styles.clinicStrip}>
        <div className={styles.clinicInner}>
          <Reveal direction="scale">
            <div className={styles.clinicImageWrap}>
              {CLINIC_IMAGE ? (
                <Image
                  src={CLINIC_IMAGE}
                  alt="Interior Clínica Dental Tello"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className={styles.clinicPlaceholder}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>images/home/clinica-interior.jpg</span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className={styles.clinicText}>
              <span className="eyebrow">Nuestra clínica</span>
              <h2>Un espacio diseñado para tu <em className="gradient-text">comodidad</em></h2>
              <p>
                Instalaciones modernas, equipos de última generación y un ambiente cálido
                pensado para que tu visita al dentista sea una experiencia agradable.
              </p>
              <Link href="nosotros" className="btn btn--secondary" style={{ marginTop: '0.5rem' }}>
                Conoce más sobre nosotros
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Services ─────────────────────────────────────────────── */}
      <section className="section--gradient">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>{t('featured_services_title')}</h2>
              <p>{t('featured_services_subtitle')}</p>
            </div>
          </Reveal>
          <div className="grid-3">
            {featuredServices.map(({ key, icon, imageSrc, placeholder }, i) => (
              <Reveal key={key} delay={i * 100} direction="scale">
                <ServiceCard
                  icon={icon}
                  name={tServices(`items.${key}.name` as Parameters<typeof tServices>[0])}
                  description={tServices(`items.${key}.description` as Parameters<typeof tServices>[0])}
                  learnMore={tServices('learn_more')}
                  href="servicios"
                  imageSrc={imageSrc}
                  imageAlt={tServices(`items.${key}.name` as Parameters<typeof tServices>[0])}
                  placeholderLabel={placeholder}
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
