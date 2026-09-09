import type { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import StatCard from '@/components/ui/StatCard';
import Reveal from '@/components/ui/Reveal';
import { buildAlternates, OG_IMAGE } from '@/lib/seo';
import styles from './page.module.css';

const DOCTOR_IMAGE = '/images/about/doctor-tello.png';

const TEAM_KEYS = ['member1', 'member2', 'member3'] as const;

const FACILITY_PHOTOS = [
  { key: 'team1', src: '/images/clinic/equipo-01.jpg' },
  { key: 'team2', src: '/images/clinic/equipo-02.jpg' },
  { key: 'instruments1', src: '/images/clinic/equipo-03.jpg' },
  { key: 'instruments2', src: '/images/clinic/equipo-04.jpg' },
  { key: 'room', src: '/images/clinic/equipo-05.jpg' },
  { key: 'team3', src: '/images/clinic/equipo-06.jpg' },
] as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' });
  const title = params.locale === 'en' ? 'Implantology with Dr. Daniel Tello' : 'Implantología con el Dr. Daniel Tello';
  return {
    title,
    description: t('hero_subtitle'),
    openGraph: {
      title: `${t('hero_title')} | Dental Tello`,
      description: t('hero_subtitle'),
      siteName: 'Dental Tello',
      type: 'website',
      images: [OG_IMAGE],
    },
    ...buildAlternates(params.locale, '/nosotros'),
  };
}

export default function AboutPage() {
  const t = useTranslations('about');

  const stats = [
    { value: t('stats.years'), label: t('stats.years_label') },
    { value: t('stats.patients'), label: t('stats.patients_label') },
    { value: t('stats.specialties'), label: t('stats.specialties_label') },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="animate-fade-up">{t('hero_title')}</h1>
          <p className="animate-fade-up animate-delay-1">{t('hero_subtitle')}</p>
        </div>
      </div>

      {/* Doctor Section */}
      <section className="section">
        <div className="container">
          <div className={styles.doctorGrid}>
            <Reveal direction="scale">
              <div className={styles.doctorPhoto}>
                <div className={styles.photoWrap}>
                  {DOCTOR_IMAGE ? (
                    <Image
                      src={DOCTOR_IMAGE}
                      alt={t('photo_label')}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                      <span>{t('photo_label')}</span>
                      <small>images/about/doctor-tello.jpg</small>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className={styles.doctorInfo}>
                <span className="eyebrow">{t('doctor_subtitle')}</span>
                <h2>{t('doctor_title')}</h2>
                <span className={styles.credentials}>{t('doctor_credentials')}</span>
                <p className={styles.bio}>{t('doctor_bio')}</p>
                <span className={styles.educationTitle}>{t('doctor_education_title')}</span>
                <ul className={styles.educationList}>
                  <li>{t('doctor_education.degree')}</li>
                  <li>{t('doctor_education.spec1')}</li>
                  <li>{t('doctor_education.spec2')}</li>
                </ul>
                <div className={styles.doctorStats}>
                  {stats.map((s, i) => (
                    <Reveal key={s.label} delay={i * 90} direction="scale">
                      <StatCard value={s.value} label={s.label} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section--dark">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>{t('team_title')}</h2>
              <p>{t('team_subtitle')}</p>
            </div>
          </Reveal>
          <div className={styles.teamGrid}>
            {TEAM_KEYS.map((key, i) => (
              <Reveal key={key} delay={i * 100} direction="scale">
                <div className={styles.teamCard}>
                  <div className={styles.teamAvatar}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className={styles.teamName}>{t(`team.${key}.name` as Parameters<typeof t>[0])}</span>
                  <span className={styles.teamRole}>{t(`team.${key}.role` as Parameters<typeof t>[0])}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section--gradient">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>{t('facilities_title')}</h2>
              <p>{t('facilities_subtitle')}</p>
            </div>
          </Reveal>
          <div className={styles.facilitiesGrid}>
            {FACILITY_PHOTOS.map(({ key, src }, i) => (
              <Reveal key={key} delay={i * 90} direction="scale">
                <div className={styles.facilityPhoto}>
                  <Image
                    src={src}
                    alt={t(`facilities.${key}` as Parameters<typeof t>[0])}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
