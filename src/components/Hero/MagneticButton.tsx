import { ReactNode, memo } from 'react';

interface ProfessionalButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  href?: string;
}

export const ProfessionalButton = memo(function ProfessionalButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  href
}: ProfessionalButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClass} ${className}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

// Keep the old export name for backwards compatibility
export const MagneticButton = ProfessionalButton;
export default ProfessionalButton;

