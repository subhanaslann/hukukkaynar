'use client';

import { useEffect } from 'react';
import { useAnimEnabled } from './AnimationProvider';

export default function SmoothScroll() {
  const animEnabled = useAnimEnabled('lite');

  useEffect(() => {
    // Only enable smooth scroll if animations are enabled
    if (!animEnabled) return;

    // Dynamically import Lenis to avoid SSR issues
    let lenis: any = null;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenis?.destroy();
    };
  }, [animEnabled]);

  return null;
}
