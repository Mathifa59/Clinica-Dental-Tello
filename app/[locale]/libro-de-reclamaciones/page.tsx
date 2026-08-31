import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';
import ComplaintBookForm from './ComplaintBookForm';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'complaintBook' });
  const title = params.locale === 'en' ? 'Complaints Book' : 'Libro de Reclamaciones';
  return {
    title,
    description: t('hero_subtitle'),
    robots: { index: false, follow: true },
    ...buildAlternates(params.locale, '/libro-de-reclamaciones'),
  };
}

export default async function ComplaintBookPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'complaintBook' });

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{t('hero_title')}</h1>
          <p>{t('hero_subtitle')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.intro}>
            <p>{t('intro')}</p>
          </div>
          <ComplaintBookForm />
        </div>
      </section>
    </>
  );
}
