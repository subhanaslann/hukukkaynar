import { defaultLocale, type Locale } from '@/i18n';

function resolveLocale(locale: Locale): string {
  switch (locale) {
    case 'tr':
      return 'tr-TR';
    case 'en':
      return 'en-US';
    case 'ar':
      return 'ar';
    default:
      return 'tr-TR';
  }
}

export function formatDate(
  dateStr: string,
  format: 'long' | 'short' = 'long',
  locale: Locale = defaultLocale
): string {
  try {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;

    const options: Intl.DateTimeFormatOptions =
      format === 'long'
        ? { day: 'numeric', month: 'long', year: 'numeric' }
        : { day: 'numeric', month: 'short', year: 'numeric' };

    return new Intl.DateTimeFormat(resolveLocale(locale), options).format(date);
  } catch {
    return dateStr;
  }
}

export function getRelativeTime(dateStr: string, locale: Locale = defaultLocale): string {
  try {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;

    const diffInSeconds = Math.round((date.getTime() - Date.now()) / 1000);
    const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
      ['year', 60 * 60 * 24 * 365],
      ['month', 60 * 60 * 24 * 30],
      ['week', 60 * 60 * 24 * 7],
      ['day', 60 * 60 * 24],
      ['hour', 60 * 60],
      ['minute', 60],
      ['second', 1]
    ];

    const rtf = new Intl.RelativeTimeFormat(resolveLocale(locale), { numeric: 'auto' });

    for (const [unit, secondsInUnit] of units) {
      if (Math.abs(diffInSeconds) >= secondsInUnit || unit === 'second') {
        const value = Math.round(diffInSeconds / secondsInUnit);
        return rtf.format(value, unit);
      }
    }

    return dateStr;
  } catch {
    return dateStr;
  }
}
