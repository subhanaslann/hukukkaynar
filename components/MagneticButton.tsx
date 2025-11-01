'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAnimEnabled } from './AnimationProvider';
import { isExternal, ensureLocalized } from '@/lib/i18n/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}

/**
 * MagneticButton - Button with magnetic effect on hover
 * Only works on pointer: fine devices (not touch)
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 8,
  href,
  onClick
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animEnabled = useAnimEnabled('rich');
  const router = useRouter();
  const locale = useLocale();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!animEnabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * (strength / 100));
    y.set(distanceY * (strength / 100));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Determine if this is an internal or external link
  const isExternalLink = href && isExternal(href);

  // For internal links, we need to localize the href
  const localizedHref = href && !isExternalLink ? ensureLocalized(href, locale as any) : href;

  // Handle internal link clicks with router.push
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }

    // For internal links, use router.push for client-side navigation
    if (href && !isExternalLink) {
      e.preventDefault();
      router.push(localizedHref as any);
    }
  };

  const commonProps = {
    ref: ref as any,
    onClick: handleClick,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    className: `relative inline-block transition-transform ${className}`
  };

  const motionProps = {
    style: {
      x: animEnabled ? springX : 0,
      y: animEnabled ? springY : 0
    },
    whileHover: animEnabled ? { scale: 1.02 } : {},
    whileTap: animEnabled ? { scale: 0.98 } : {}
  };

  // For links (both internal and external)
  if (href) {
    return (
      <motion.a
        {...commonProps}
        {...motionProps}
        href={localizedHref || href}
      >
        {children}
      </motion.a>
    );
  }

  // For buttons
  return (
    <motion.button
      {...commonProps}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
