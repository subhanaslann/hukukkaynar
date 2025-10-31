'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n';
import { Icons } from '@/components/shared/Icons';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const locale = useLocale() as Locale;
  const tCommon = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();

  const buildHref = React.useCallback(
    (targetLocale: Locale) => {
      const segments = pathname.split('/');
      if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
        segments[1] = targetLocale;
        const basePath = segments.join('/') || '/';
        const queryString = searchParams?.toString();
        return queryString ? `${basePath}?${queryString}` : basePath;
      }

      const rest = segments.slice(1).filter(Boolean);
      const basePath = `/${targetLocale}${rest.length ? `/${rest.join('/')}` : ''}`;
      const queryString = searchParams?.toString();
      return queryString ? `${basePath}?${queryString}` : basePath;
    },
    [pathname, searchParams]
  );

  const handleLocaleChange = (targetLocale: Locale) => {
    router.push(buildHref(targetLocale) as any);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[hsl(var(--card))]/80"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={tCommon('changeLanguage')}
      >
        <Icons.globe className="h-4 w-4" />
        <span>{localeNames[locale]}</span>
        <Icons.chevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-lg">
            <ul role="listbox" aria-label={tCommon('changeLanguage')}>
              {locales.map((loc) => (
                <li key={loc}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={loc === locale}
                    onClick={() => handleLocaleChange(loc)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-[hsl(var(--gold))]/10 ${
                      locale === loc
                        ? 'bg-[hsl(var(--gold))]/10 font-semibold text-[hsl(var(--gold))]'
                        : 'text-foreground'
                    }`}
                  >
                    {locale === loc && <Icons.check className="h-4 w-4" />}
                    <span className={locale !== loc ? 'ml-7' : ''}>{localeNames[loc]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

