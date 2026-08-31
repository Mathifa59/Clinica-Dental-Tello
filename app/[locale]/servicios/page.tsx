import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ServiceCard from '@/components/ui/ServiceCard';
import Reveal from '@/components/ui/Reveal';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'services' });
  const title = params.locale === 'en' ? 'Dental Services in Los Olivos, Lima' : 'Servicios Dentales en Los Olivos, Lima';
  return {
    title,
    description: t('hero_subtitle'),
    openGraph: {
      title: `${t('hero_title')} | Dental Tello`,
      description: t('hero_subtitle'),
      images: ['/og-image.jpg'],
    },
    ...buildAlternates(params.locale, '/servicios'),
  };
}

const serviceData = [
  {
    key: 'orthodontics',
    imageSrc: '/images/services/orthodontics.jpg',
    placeholderLabel: 'images/services/orthodontics.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5L8 14h2l.5 2h3l.5-2h2l1-3.5c.5-1 1-2 1-3.5C17 4.5 15.5 2 12 2z" />
        <path d="M9 7h6" /><path d="M9 10h6" />
      </svg>
    ),
  },
  {
    key: 'implants',
    imageSrc: '/images/services/implants.jpg',
    imagePosition: 'center 65%',
    placeholderLabel: 'images/services/implants.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v10" /><path d="M9 5l3-3 3 3" />
        <path d="M8 12h8l1 8H7l1-8z" /><path d="M10 16h4" />
      </svg>
    ),
  },
  {
    key: 'emergency',
    imageSrc: '/images/services/emergency.jpg',
    placeholderLabel: 'images/services/emergency.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    key: 'oralRehab',
    imageSrc: '/images/services/oral-rehab.jpg',
    placeholderLabel: 'images/services/oral-rehab.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
        <path d="M5 18h14" />
      </svg>
    ),
  },
  {
    key: 'aesthetics',
    imageSrc: '/images/services/aesthetics.jpg',
    placeholderLabel: 'images/services/aesthetics.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l3 6 3-6M9 9l3 12 3-12" />
      </svg>
    ),
  },
  {
    key: 'surgery',
    imageSrc: '/images/services/surgery.jpg',
    placeholderLabel: 'images/services/surgery.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20L14 10" />
        <path d="M14 10l6-6a2 2 0 0 0-3-3l-6 6" />
        <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: 'endodontics',
    imageSrc: '/images/services/endodontics.jpg',
    placeholderLabel: 'images/services/endodontics.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-3 0-5 2-5 4.5 0 2 .8 3 1.3 4.5L9 19l1.5-4h3L15 19l.7-7c.5-1.5 1.3-2.5 1.3-4.5C17 5 15 3 12 3z" />
        <path d="M12 8v9" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  const t = useTranslations('services');

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="animate-fade-up">{t('hero_title')}</h1>
          <p className="animate-fade-up animate-delay-1">{t('hero_subtitle')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {serviceData.map(({ key, icon, imageSrc, imagePosition, placeholderLabel }, i) => (
              <Reveal key={key} delay={i * 80} direction="scale">
                <ServiceCard
                  icon={icon}
                  name={t(`items.${key}.name` as Parameters<typeof t>[0])}
                  description={t(`items.${key}.description` as Parameters<typeof t>[0])}
                  learnMore={t('learn_more')}
                  imageSrc={imageSrc}
                  imagePosition={imagePosition}
                  imageAlt={t(`items.${key}.name` as Parameters<typeof t>[0])}
                  placeholderLabel={placeholderLabel}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
