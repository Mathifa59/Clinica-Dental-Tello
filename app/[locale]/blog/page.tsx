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

export default function BlogPage() {
  const t = useTranslations('blog');
  const posts = ['post1', 'post2', 'post3'] as const;

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
            {posts.map((postKey, i) => (
              <Reveal key={postKey} delay={i * 100} direction="scale">
                <BlogCard
                  title={t(`posts.${postKey}.title`)}
                  excerpt={t(`posts.${postKey}.excerpt`)}
                  category={t(`posts.${postKey}.category`)}
                  date={t(`posts.${postKey}.date`)}
                  readMore={t('read_more')}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
