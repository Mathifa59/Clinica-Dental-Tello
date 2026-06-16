import Image from 'next/image';
import Link from 'next/link';
import styles from './ServiceCard.module.css';

type ServiceCardProps = {
  icon: React.ReactNode;
  name: string;
  description: string;
  learnMore: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderLabel?: string;
};

export default function ServiceCard({
  icon,
  name,
  description,
  learnMore,
  href = '/servicios',
  imageSrc,
  imageAlt,
  placeholderLabel,
}: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {placeholderLabel && <span>{placeholderLabel}</span>}
          </div>
        )}
        <div className={styles.imageOverlay} />
        <div className={styles.iconBadge}>{icon}</div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <Link href={href} className={styles.link}>
          {learnMore}
        </Link>
      </div>
    </div>
  );
}
