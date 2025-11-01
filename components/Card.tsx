'use client';

import { Link } from '@/lib/i18n/navigation';
import { PropsWithChildren, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimEnabled } from './AnimationProvider';

interface CardProps extends PropsWithChildren {
  title: string;
  description: string;
  href?: string;
}

export default function Card({ title, description, href, children }: CardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animEnabled = useAnimEnabled('rich');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!animEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const inner = (
    <motion.div
      className="group relative flex h-full flex-col justify-between rounded-xl bg-white p-4 sm:p-6 shadow-md transition-shadow duration-300 hover:shadow-xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={animEnabled ? {
        rotateX: mousePosition.y * 0.5,
        rotateY: mousePosition.x * 0.5,
        z: animEnabled ? 20 : 0
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Gradient border */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-accentBlue-400 via-accentSaffron-400 to-accentEmerald-400 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-[2px] -z-10 rounded-[10px] bg-white" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shine" />

      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-primary-900 transition-colors group-hover:text-accentBlue-700">
          {title}
        </h3>
        <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-primary-700">{description}</p>
      </div>
      {children && <div className="mt-3 sm:mt-4 text-sm text-primary-600">{children}</div>}
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href as any}
        aria-label={`${title} sayfasına git`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentBlue-400 focus-visible:ring-offset-2 rounded-xl"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
