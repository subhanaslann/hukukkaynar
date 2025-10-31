'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { localizedHref } from '@/lib/i18n/navigation';
import { useAnimEnabled } from './AnimationProvider';

interface NavLinkProps {
  href: string;
  children: PropsWithChildren['children'];
}

export default function NavLink({ href, children }: NavLinkProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const localized = localizedHref(locale, href);
  const isActive = pathname === localized || (localized !== `/${locale}` && pathname?.startsWith(`${localized}/`));
  const animEnabled = useAnimEnabled('lite');

  return (
    <Link
      href={localized as any}
      aria-current={isActive ? 'page' : undefined}
      className={[
        'relative rounded px-3 py-2 text-sm font-medium transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentBlue-400 focus-visible:ring-offset-2',
        isActive ? 'text-accentBlue-700' : 'text-primary-700 hover:text-accentBlue-600'
      ].join(' ')}
    >
      <span className="relative z-10">{children}</span>

      {/* Animated gradient underline */}
      {animEnabled ? (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accentBlue-500 via-accentSaffron-500 to-accentEmerald-500 rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0
          }}
          whileHover={{
            scaleX: 1,
            opacity: 1
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ originX: 0 }}
        />
      ) : (
        isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accentBlue-600 rounded-full" />
        )
      )}
    </Link>
  );
}
