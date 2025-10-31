'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { AnimDensity, AnimPolicy } from '@/lib/animPolicy';
import {
  defaultPolicy,
  getEffectiveDensity,
  loadDensity,
  saveDensity,
  prefersReducedMotion
} from '@/lib/animPolicy';

interface AnimationContextValue {
  density: AnimDensity;
  effectiveDensity: AnimDensity;
  setDensity: (density: AnimDensity) => void;
  respectMotion: boolean;
}

const AnimationContext = createContext<AnimationContextValue | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [policy, setPolicy] = useState<AnimPolicy>(defaultPolicy);
  const [mounted, setMounted] = useState(false);

  // Load saved density on mount
  useEffect(() => {
    const savedDensity = loadDensity();
    setPolicy((prev) => ({ ...prev, density: savedDensity }));
    setMounted(true);

    // Listen for reduced-motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setPolicy((prev) => ({ ...prev, respectMotion: true }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setDensity = (density: AnimDensity) => {
    setPolicy((prev) => ({ ...prev, density }));
    saveDensity(density);
  };

  const effectiveDensity = useMemo(
    () => getEffectiveDensity(policy),
    [policy]
  );

  // Apply global class to body
  useEffect(() => {
    if (!mounted) return;

    const body = document.body;
    body.classList.remove('anim-off', 'anim-lite', 'anim-rich', 'anim-max');
    body.classList.add(`anim-${effectiveDensity}`);
  }, [effectiveDensity, mounted]);

  const value: AnimationContextValue = {
    density: policy.density,
    effectiveDensity,
    setDensity,
    respectMotion: policy.respectMotion
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

// Hook to use animation context
export function useAnim() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnim must be used within AnimationProvider');
  }
  return context;
}

// Helper hook to check if animations are enabled
export function useAnimEnabled(minDensity: AnimDensity = 'lite'): boolean {
  const { effectiveDensity } = useAnim();

  const densityLevels: Record<AnimDensity, number> = {
    off: 0,
    lite: 1,
    rich: 2,
    max: 3
  };

  return densityLevels[effectiveDensity] >= densityLevels[minDensity];
}
