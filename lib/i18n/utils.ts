import { locales, type Locale } from '@/i18n';

/**
 * Normalizes a path to always start with /
 */
function normalizePath(path: string): string {
  if (!path) return '';
  const trimmed = path.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/**
 * Creates a localized href by adding or replacing the locale prefix
 * This is a pure function that can be used in both client and server components
 */
export function localizedHref(locale: string, path: string): string {
  const normalizedPath = normalizePath(path);
  const segments = normalizedPath.split('/').filter(Boolean);

  const localeKey = locale as Locale;

  if (segments.length === 0) {
    return `/${localeKey}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = localeKey;
  } else {
    segments.unshift(localeKey);
  }

  return `/${segments.join('/')}`;
}

/**
 * Checks if a href is an external link (http, https, mailto, tel, # anchor)
 */
export function isExternal(href: string): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#')
  );
}

/**
 * Checks if a href already contains a locale prefix
 */
export function isLocalized(href: string): boolean {
  const normalized = normalizePath(href);
  const segments = normalized.split('/').filter(Boolean);
  return segments.length > 0 && locales.includes(segments[0] as Locale);
}

/**
 * Ensures a href is localized. Returns the href as-is if it's external or already localized.
 */
export function ensureLocalized(href: string, locale: Locale): string {
  if (isExternal(href)) {
    return href;
  }
  if (isLocalized(href)) {
    return href;
  }
  return localizedHref(locale, href);
}
