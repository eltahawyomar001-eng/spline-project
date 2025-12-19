import { useCallback, useRef, MouseEvent } from 'react';

interface UseMagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement>(options: UseMagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const elementRef = useRef<T>(null);

  const handleMouseMove = useCallback((e: MouseEvent<T>) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const translateX = distanceX * strength;
      const translateY = distanceY * strength;
      element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;
    elementRef.current.style.transform = 'translate(0px, 0px)';
  }, []);

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

export default useMagnetic;
