import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['tr', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  ar: 'العربية'
};

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  tr: 'ltr',
  en: 'ltr',
  ar: 'rtl'
};

export const defaultLocale: Locale = 'tr';

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return localeDirections[locale] ?? 'ltr';
}

export default getRequestConfig(async ({ locale }) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[i18n] getRequestConfig locale =', locale);
  }

  const incoming = typeof locale === 'string' ? (locale as string) : '';

  // If a locale is provided but invalid, return 404.
  if (incoming && !locales.includes(incoming as Locale)) {
    notFound();
  }

  // Fallback to defaultLocale when locale is missing (e.g., for non-localized routes like /og).
  const activeLocale: Locale = (incoming && locales.includes(incoming as Locale)
    ? (incoming as Locale)
    : defaultLocale) as Locale;

  return {
    locale: activeLocale,
    messages: (await import(`./messages/${activeLocale}.json`)).default
  };
});
