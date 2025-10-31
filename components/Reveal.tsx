'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useAnim } from './AnimationProvider';
import { animVariants } from '@/lib/animPolicy';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  width?: 'fit' | 'full';
}

/**
 * Reveal component - Shows children with scroll-based animation
 * Respects animation density settings
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  width = 'full'
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { effectiveDensity } = useAnim();
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Get animation config based on density
  const config = animVariants[effectiveDensity];

  // If animations are off, just render children
  if (effectiveDensity === 'off') {
    return (
      <div ref={ref} className={className} style={{ width: width === 'full' ? '100%' : 'fit-content' }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ width: width === 'full' ? '100%' : 'fit-content' }}>
      <motion.div
        initial={config.initial}
        animate={isInView ? config.animate : config.initial}
        transition={{
          ...config.transition,
          delay
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * RevealStagger - Container for staggered reveal animations
 */
interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function RevealStagger({
  children,
  className = '',
  staggerDelay = 0.1
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { effectiveDensity } = useAnim();
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (effectiveDensity === 'off') {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealItem - Child of RevealStagger
 */
export function RevealItem({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { effectiveDensity } = useAnim();
  const config = animVariants[effectiveDensity];

  if (effectiveDensity === 'off') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        initial: config.initial,
        animate: config.animate
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
