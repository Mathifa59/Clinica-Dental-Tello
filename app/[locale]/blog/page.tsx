import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import BlogCard from '@/components/ui/BlogCard';
import Reveal from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });
  return {
    title: 'Blog',
    description: t('hero_subtitle'),
    openGraph: {
      title: `${t('hero_title')} | Dental Tello`,
      description: t('hero_subtitle'),
    },
  };
}

const blogImages = [
  { key: 'post1', imageSrc: '/images/blog/frecuencia-visitas.jpg',  placeholder: 'images/blog/frecuencia-visitas.jpg' },
  { key: 'post2', imageSrc: '/images/blog/implantes-dentales.jpg',  placeholder: 'images/blog/implantes-dentales.jpg' },
  { key: 'post3', imageSrc: '/images/blog/estres-salud-bucal.jpg', placeholder: 'images/blog/estres-salud-bucal.jpg' },
] as const;

export default function BlogPage() {
  const t = useTranslations('blog');

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow animate-fade-up">{t('hero_title')}</span>
          <h1 className="animate-fade-up animate-delay-1">{t('hero_title')}</h1>
          <p className="animate-fade-up animate-delay-2">{t('hero_subtitle')}</p>
        </div>
      </div>

      <section className="section--blue">
        <div className="container">
          <div className="grid-3">
            {blogImages.map(({ key, imageSrc, placeholder }, i) => (
              <Reveal key={key} delay={i * 100} direction="scale">
                <BlogCard
                  title={t(`posts.${key}.title`)}
                  excerpt={t(`posts.${key}.excerpt`)}
                  category={t(`posts.${key}.category`)}
                  date={t(`posts.${key}.date`)}
                  readMore={t('read_more')}
                  imageSrc={imageSrc}
                  imageAlt={t(`posts.${key}.title`)}
                  placeholderLabel={placeholder}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
