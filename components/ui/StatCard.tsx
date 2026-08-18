import styles from './StatCard.module.css';

type StatCardProps = {
  value: string;
  label: string;
  onDark?: boolean;
};

export default function StatCard({ value, label, onDark = false }: StatCardProps) {
  return (
    <div className={`${styles.card} ${onDark ? styles.cardDark : ''}`}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
