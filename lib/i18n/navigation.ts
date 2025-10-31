import { locales, type Locale } from '@/i18n';

function normalizePath(path: string): string {
  if (!path) return '';
  const trimmed = path.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

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
