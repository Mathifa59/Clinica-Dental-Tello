import Link from 'next/link';
import styles from './ServiceCard.module.css';

type ServiceCardProps = {
  icon: React.ReactNode;
  name: string;
  description: string;
  learnMore: string;
  href?: string;
};

export default function ServiceCard({
  icon,
  name,
  description,
  learnMore,
  href = '/servicios',
}: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>{icon}</div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <Link href={href} className={styles.link}>
        {learnMore}
      </Link>
    </div>
  );
}
