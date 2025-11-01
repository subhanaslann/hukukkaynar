'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n';
import { Icons } from '@/components/shared/Icons';
import { Link, localizedHref } from '@/lib/i18n/navigation';

const LOCALE_LABEL: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
  ar: 'AR'
};

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const tCommon = useTranslations('common');
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();

  const buildHref = React.useCallback(
    (targetLocale: Locale) => {
      const basePath = localizedHref(targetLocale, pathname);
      const queryString = searchParams?.toString();
      return queryString ? `${basePath}?${queryString}` : basePath;
    },
    [pathname, searchParams]
  );

  const onShowPreload = () => {
    try {
      window.dispatchEvent(new Event('preload:show'));
    } catch {
      // ignore
    }
  };

  const handleLocaleClick = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    onShowPreload();
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
        className="flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[hsl(var(--gold))]/10"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={tCommon('changeLanguage')}
      >
        <Icons.globe className="h-4 w-4" />
        <span key={currentLocale}>{LOCALE_LABEL[currentLocale] ?? currentLocale.toUpperCase()}</span>
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
                  <Link
                    href={buildHref(loc) as any}
                    role="option"
                    aria-selected={loc === currentLocale}
                    onClick={() => handleLocaleClick(loc)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-[hsl(var(--gold))]/10 ${
                      currentLocale === loc
                        ? 'bg-[hsl(var(--gold))]/10 font-semibold text-[hsl(var(--gold))]'
                        : 'text-foreground'
                    }`}
                  >
                    {currentLocale === loc && <Icons.check className="h-4 w-4" />}
                    <span className={currentLocale !== loc ? 'ml-7' : ''}>{LOCALE_LABEL[loc] ?? loc.toUpperCase()}</span>
                    <span className="ml-auto text-xs text-[hsl(var(--muted))]">{localeNames[loc]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
