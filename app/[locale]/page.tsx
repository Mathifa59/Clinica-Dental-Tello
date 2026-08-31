import type { Metadata } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ServiceCard from '@/components/ui/ServiceCard';
import StatCard from '@/components/ui/StatCard';
import Reveal from '@/components/ui/Reveal';
import { buildAlternates } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });
  const title = params.locale === 'en' ? 'Dental Clinic in Los Olivos, Lima' : 'Clínica Dental en Los Olivos, Lima';
  return {
    title,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | Dental Tello`,
      description: t('subtitle'),
      images: ['/og-image.jpg'],
    },
    ...buildAlternates(params.locale, ''),
  };
}

const HERO_VIDEO = '/videos/hero.mp4';
const CLINIC_VIDEO = '/videos/clinica.mp4';

const SERVICE_KEYS = ['orthodontics', 'implants', 'emergency', 'oralRehab', 'aesthetics', 'surgery', 'endodontics'] as const;

const serviceIcons = {
  oralRehab: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
      <path d="M5 18h14" />
    </svg>
  ),
  aesthetics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M9 3l3 6 3-6M9 9l3 12 3-12" />
    </svg>
  ),
  surgery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L14 10" />
      <path d="M14 10l6-6a2 2 0 0 0-3-3l-6 6" />
      <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none" />
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
    { key: 'oralRehab',  icon: serviceIcons.oralRehab,  imageSrc: '/images/services/oral-rehab.jpg', placeholder: 'images/services/oral-rehab.jpg' },
    { key: 'aesthetics', icon: serviceIcons.aesthetics, imageSrc: '/images/services/aesthetics.jpg', placeholder: 'images/services/aesthetics.jpg' },
    { key: 'surgery',    icon: serviceIcons.surgery,    imageSrc: '/images/services/surgery.jpg',    placeholder: 'images/services/surgery.jpg' },
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

          {/* Hero video — arco */}
          <div className={styles.heroImage}>
            <div className={styles.imgWrap}>
              <video
                className={styles.heroVideo}
                src={HERO_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate nofullscreen"
                aria-label={t('photo_label')}
              />
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
              <video
                className={styles.clinicVideo}
                src={CLINIC_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate nofullscreen"
                aria-label="Interior Clínica Dental Tello"
              />
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
              <Link href="casos" className={styles.viewAllLink}>{t('view_cases')}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
