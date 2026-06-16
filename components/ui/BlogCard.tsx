import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';

type BlogCardProps = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMore: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderLabel?: string;
};

export default function BlogCard({
  title,
  excerpt,
  category,
  date,
  readMore,
  href = '/blog',
  imageSrc,
  imageAlt,
  placeholderLabel,
}: BlogCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageArea}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {placeholderLabel && <span className={styles.placeholderLabel}>{placeholderLabel}</span>}
          </div>
        )}
        <span className={styles.badge}>{category}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <time className={styles.date}>{date}</time>
          <Link href={href} className={styles.link}>
            {readMore}
          </Link>
        </div>
      </div>
    </article>
  );
}
