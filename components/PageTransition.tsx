'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAnim } from './AnimationProvider';
import { animVariants } from '@/lib/animPolicy';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { effectiveDensity } = useAnim();

  // Get animation config based on density
  const config = animVariants[effectiveDensity];

  // For 'off' mode, no animation
  if (effectiveDensity === 'off') {
    return <div key={pathname}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={config.initial}
        animate={config.animate}
        exit={config.exit}
        transition={config.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
