'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAnimEnabled } from './AnimationProvider';

/**
 * ParallaxBlobs - Animated blob shapes with mouse parallax
 * GPU-friendly, respects animation density
 */
export default function ParallaxBlobs() {
  const animEnabled = useAnimEnabled('lite');
  const richAnim = useAnimEnabled('rich');
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const blob1X = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), springConfig);
  const blob1Y = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), springConfig);
  const blob2X = useSpring(useTransform(mouseX, [-1, 1], [15, -15]), springConfig);
  const blob2Y = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), springConfig);
  const blob3X = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), springConfig);
  const blob3Y = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), springConfig);

  useEffect(() => {
    setMounted(true);

    if (!richAnim) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [richAnim, mouseX, mouseY]);

  if (!mounted || !animEnabled) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Blob 1 - Blue/Purple */}
      <motion.div
        className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-accentBlue-400/30 to-accentFuchsia-400/20 blur-3xl"
        style={{
          x: blob1X,
          y: blob1Y
        }}
        animate={animEnabled ? {
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0]
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Blob 2 - Orange/Yellow */}
      <motion.div
        className="absolute right-10 top-40 h-80 w-80 rounded-full bg-gradient-to-br from-accentSaffron-400/25 to-accentEmerald-300/15 blur-3xl"
        style={{
          x: blob2X,
          y: blob2Y
        }}
        animate={animEnabled ? {
          scale: [1, 1.15, 1],
          rotate: [0, -90, 0]
        } : {}}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Blob 3 - Emerald/Blue */}
      <motion.div
        className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-accentEmerald-400/20 to-accentBlue-300/25 blur-3xl"
        style={{
          x: blob3X,
          y: blob3Y
        }}
        animate={animEnabled ? {
          scale: [1, 1.2, 1],
          rotate: [0, 120, 0]
        } : {}}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}
