import Link from 'next/link';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

export default function Button({
  href,
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  disabled,
  className = '',
}: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
