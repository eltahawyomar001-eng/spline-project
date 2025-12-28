import { useState, useEffect } from 'react';

/**
 * Hook to detect if the screen is mobile-sized
 * Uses matchMedia for better performance than resize listeners
 */
export function useIsMobile(breakpoint: number = 640): boolean {
    const [isMobile, setIsMobile] = useState(() => {
        // Default to true on SSR/initial load to prevent Spline loading
        if (typeof window === 'undefined') return true;
        return window.innerWidth < breakpoint;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        // Set initial value
        handleChange(mediaQuery);

        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [breakpoint]);

    return isMobile;
}

export default useIsMobile;
