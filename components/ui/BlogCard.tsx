import Link from 'next/link';
import styles from './BlogCard.module.css';

type BlogCardProps = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMore: string;
  href?: string;
};

export default function BlogCard({
  title,
  excerpt,
  category,
  date,
  readMore,
  href = '/blog',
}: BlogCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imgPlaceholder}>
        <span>{category}</span>
      </div>
      <div className={styles.body}>
        <span className={styles.badge}>{category}</span>
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
