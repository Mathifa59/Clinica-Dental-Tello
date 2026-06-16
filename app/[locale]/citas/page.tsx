import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AppointmentForm from './AppointmentForm';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'appointments' });
  return {
    title: 'Reservar Cita',
    description: t('hero_subtitle'),
    openGraph: {
      title: `${t('hero_title')} | Dental Tello`,
      description: t('hero_subtitle'),
    },
  };
}

export default function AppointmentsPage() {
  return <AppointmentForm />;
}
