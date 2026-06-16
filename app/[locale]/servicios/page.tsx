import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ServiceCard from '@/components/ui/ServiceCard';
import Reveal from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'services' });
  return {
    title: 'Servicios',
    description: t('hero_subtitle'),
    openGraph: {
      title: `${t('hero_title')} | Dental Tello`,
      description: t('hero_subtitle'),
    },
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
    placeholderLabel: 'images/services/implants.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v10" /><path d="M9 5l3-3 3 3" />
        <path d="M8 12h8l1 8H7l1-8z" /><path d="M10 16h4" />
      </svg>
    ),
  },
  {
    key: 'cleaning',
    imageSrc: '/images/services/cleaning.jpg',
    placeholderLabel: 'images/services/cleaning.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'whitening',
    imageSrc: '/images/services/whitening.jpg',
    placeholderLabel: 'images/services/whitening.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    key: 'pediatric',
    imageSrc: '/images/services/pediatric.jpg',
    placeholderLabel: 'images/services/pediatric.jpg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
];

export default function ServicesPage() {
  const t = useTranslations('services');

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow animate-fade-up">{t('hero_title')}</span>
          <h1 className="animate-fade-up animate-delay-1">{t('hero_title')}</h1>
          <p className="animate-fade-up animate-delay-2">{t('hero_subtitle')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {serviceData.map(({ key, icon, imageSrc, placeholderLabel }, i) => (
              <Reveal key={key} delay={i * 80} direction="scale">
                <ServiceCard
                  icon={icon}
                  name={t(`items.${key}.name` as Parameters<typeof t>[0])}
                  description={t(`items.${key}.description` as Parameters<typeof t>[0])}
                  learnMore={t('learn_more')}
                  imageSrc={imageSrc}
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
