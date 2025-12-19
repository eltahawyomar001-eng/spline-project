import { ReactNode, useRef, useState, useCallback, memo, MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const MagneticButton = memo(function MagneticButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary' 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate(0px, 0px)');

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.15;
    const distanceY = (e.clientY - centerY) * 0.15;
    setTransform(`translate(${distanceX}px, ${distanceY}px)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('translate(0px, 0px)');
  }, []);

  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <div 
      ref={ref}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.2s ease-out' }}
    >
      <button
        className={`${baseClass} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
});

export default MagneticButton;
