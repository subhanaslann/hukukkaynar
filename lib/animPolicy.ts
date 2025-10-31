/**
 * Animation Policy System
 * Manages animation density across the app with respect to user preferences
 */

export type AnimDensity = 'off' | 'lite' | 'rich' | 'max';

export interface AnimPolicy {
  density: AnimDensity;
  respectMotion: boolean;
}

// Default animation policy
export const defaultPolicy: AnimPolicy = {
  density: 'rich',
  respectMotion: true
};

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get effective density (respects reduced-motion preference)
export function getEffectiveDensity(policy: AnimPolicy): AnimDensity {
  if (policy.respectMotion && prefersReducedMotion()) {
    return 'off';
  }
  return policy.density;
}

// Animation variant configs for framer-motion
export const animVariants = {
  off: {
    initial: {},
    animate: {},
    exit: {},
    transition: {}
  },
  lite: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  rich: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  max: {
    initial: { opacity: 0, y: 30, scale: 0.9, rotateX: 10 },
    animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    exit: { opacity: 0, scale: 0.95, rotateX: -5 },
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
} as const;

// Stagger children animation
export const staggerVariants = {
  off: {
    animate: {}
  },
  lite: {
    animate: {
      transition: { staggerChildren: 0.05 }
    }
  },
  rich: {
    animate: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  },
  max: {
    animate: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  }
};

// Helper to get Tailwind animation classes based on density
export function getAnimClass(density: AnimDensity, baseClass: string = ''): string {
  const classes: string[] = [baseClass];

  switch (density) {
    case 'off':
      return baseClass;
    case 'lite':
      classes.push('motion-reduce:transition-none');
      break;
    case 'rich':
      classes.push('motion-reduce:transition-none', 'transition-all', 'duration-500');
      break;
    case 'max':
      classes.push('motion-reduce:transition-none', 'transition-all', 'duration-700');
      break;
  }

  return classes.filter(Boolean).join(' ');
}

// Storage keys
export const STORAGE_KEY = 'kaynar-anim-density';

// Save/load density from localStorage
export function saveDensity(density: AnimDensity): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, density);
  }
}

export function loadDensity(): AnimDensity {
  if (typeof window === 'undefined') return defaultPolicy.density;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && ['off', 'lite', 'rich', 'max'].includes(saved)) {
    return saved as AnimDensity;
  }

  return defaultPolicy.density;
}
