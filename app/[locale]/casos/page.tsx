import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import CaseCarousel from '@/components/ui/CaseCarousel';
import Reveal from '@/components/ui/Reveal';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'cases' });
  return {
    title: 'Casos',
    description: t('hero_subtitle'),
    openGraph: {
      title: `${t('hero_title')} | Dental Tello`,
      description: t('hero_subtitle'),
    },
  };
}

const CASE_DATA = [
  { key: 'desgasteDental', slug: 'desgaste-dental', images: ['01-antes.jpg', '02-detalle.jpg', '03-despues.jpg'] },
  { key: 'resinaAnterior', slug: 'resina-anterior', images: ['01-antes.jpg', '02-despues.jpg'] },
  { key: 'resinasMolares', slug: 'resinas-molares', images: ['01-antes.jpg', '02-despues.jpg'] },
  { key: 'reparacionCuellos', slug: 'reparacion-cuellos', images: ['01-antes.jpg', '02-despues.jpg'] },
  { key: 'incrustacionesResina', slug: 'incrustaciones-resina', images: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'] },
  { key: 'pernoCorona', slug: 'perno-corona', images: ['01-antes.jpg', '02-proceso.jpg'] },
  { key: 'protesisTotal', slug: 'protesis-total', images: ['01-comparacion.jpg'] },
  { key: 'protocoloImplantes', slug: 'protocolo-implantes', images: ['01-modelo.jpg', '02-prueba.jpg', '03-sonrisa.jpg', '04-sonrisa-detalle.jpg'] },
  { key: 'resinaEstetica', slug: 'resina-estetica', images: ['01-antes.jpg', '02-proceso.jpg'] },
] as const;

export default function CasosPage() {
  const t = useTranslations('cases');

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow animate-fade-up">{t('eyebrow')}</span>
          <h1 className="animate-fade-up animate-delay-1">{t('hero_title')}</h1>
          <p className="animate-fade-up animate-delay-2">{t('hero_subtitle')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Reveal direction="fade">
            <p className={styles.disclaimer}>{t('disclaimer')}</p>
          </Reveal>

          <div className={styles.grid}>
            {CASE_DATA.map(({ key, slug, images }, i) => (
              <Reveal key={slug} delay={i * 70} direction="scale">
                <article className={styles.card}>
                  <div className={styles.imageArea}>
                    <CaseCarousel
                      images={images.map((f) => `/images/casos/${slug}/${f}`)}
                      alt={t(`items.${key}.title` as Parameters<typeof t>[0])}
                    />
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.cardTitle}>
                      {t(`items.${key}.title` as Parameters<typeof t>[0])}
                    </h3>
                    <p className={styles.cardDescription}>
                      {t(`items.${key}.description` as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
