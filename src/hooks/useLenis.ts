import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface UseLenisOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}

export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Don't initialize smooth scroll for users who prefer reduced motion
      return;
    }

    const lenis = new Lenis({
      lerp: options.lerp ?? 0.1,
      duration: options.duration ?? 1.2,
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 1,
      touchMultiplier: options.touchMultiplier ?? 2,
      infinite: options.infinite ?? false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options.lerp, options.duration, options.smoothWheel, options.wheelMultiplier, options.touchMultiplier, options.infinite]);

  return lenisRef;
}

export default useLenis;
