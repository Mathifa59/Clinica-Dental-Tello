import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates, OG_IMAGE } from '@/lib/seo';
import AppointmentForm from './AppointmentForm';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'appointments' });
  const title = params.locale === 'en' ? 'Book Your Dental Appointment in Los Olivos' : 'Reserva tu Cita Dental en Los Olivos';
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
    ...buildAlternates(params.locale, '/citas'),
  };
}

export default function AppointmentsPage() {
  return <AppointmentForm />;
}
