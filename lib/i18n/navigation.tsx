'use client';

import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n';
import * as React from 'react';

// Re-export pure utility functions from utils.ts (can be used in server components)
export { localizedHref, isExternal, isLocalized, ensureLocalized } from '@/lib/i18n/utils';
import { localizedHref, isExternal } from '@/lib/i18n/utils';

function normalizePath(path: string): string {
  if (!path) return '';
  const trimmed = path.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

// Custom Link component that automatically includes locale in href
export const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.ComponentProps<typeof NextLink>, 'href'> & { href: string }
>(({ href, ...props }, ref) => {
  const locale = useLocale();

  // Respect pre-localized hrefs (e.g. "/en/..."), otherwise localize.
  let hrefToUse: typeof href = href as any;
  if (typeof href === 'string') {
    const normalized = normalizePath(href);

    // Skip external links
    if (isExternal(normalized)) {
      hrefToUse = normalized as any;
    } else {
      const segs = normalized.split('/').filter(Boolean);
      if (segs.length > 0 && locales.includes(segs[0] as Locale)) {
        hrefToUse = normalized as any;
      } else {
        // Internal link without locale - add it
        hrefToUse = localizedHref(locale, normalized) as any;

        // Optional dev warning (enable with NEXT_PUBLIC_I18N_DEBUG=1)
        if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_I18N_DEBUG === '1') {
          // eslint-disable-next-line no-console
          console.warn('[i18n] Missing locale in href, auto-localizing:', normalized, '→', hrefToUse);
        }
      }
    }
  }

  return <NextLink ref={ref} href={hrefToUse as any} {...props} />;
});

Link.displayName = 'LocalizedLink';
