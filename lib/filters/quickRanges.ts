export type DateRangeOption = 'today' | 'last7' | 'thisMonth' | 'thisYear' | 'custom';

import type { Locale } from '@/i18n';

export interface DateRange {
  start: string; // ISO date format YYYY-MM-DD
  end: string;
}

export const QUICK_RANGE_OPTIONS: DateRangeOption[] = ['today', 'last7', 'thisMonth', 'thisYear', 'custom'];

/**
 * Hızlı tarih aralığı hesaplamaları
 */
export function getQuickRange(option: DateRangeOption): DateRange | null {
  const now = new Date();
  const today = formatDateISO(now);

  switch (option) {
    case 'today':
      return { start: today, end: today };

    case 'last7': {
      const past = new Date(now);
      past.setDate(past.getDate() - 6); // Bugün dahil 7 gün
      return { start: formatDateISO(past), end: today };
    }

    case 'thisMonth': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start: formatDateISO(start), end: formatDateISO(end) };
    }

    case 'thisYear': {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      return { start: formatDateISO(start), end: formatDateISO(end) };
    }

    case 'custom':
      return null; // Kullanıcı manuel girecek

    default:
      return null;
  }
}

/**
 * Date nesnesini ISO formatına çevir (YYYY-MM-DD)
 */
function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Kullanıcı girdisi için locale bazlı tarih formatı (ISO giriş -> locale string)
 */
export function formatDateInput(isoDate: string, locale: Locale): string {
  const [year, month, day] = isoDate.split('-');
  const paddedDay = day.padStart(2, '0');
  const paddedMonth = month.padStart(2, '0');

  switch (locale) {
    case 'en':
      return `${paddedMonth}/${paddedDay}/${year}`;
    case 'ar':
      return `${paddedDay}/${paddedMonth}/${year}`;
    case 'tr':
    default:
      return `${paddedDay}.${paddedMonth}.${year}`;
  }
}

/**
 * Kullanıcı girdisini ISO formatına çevir
 */
export function parseDateInput(value: string, locale: Locale): string | null {
  if (!value) return null;

  const normalized = value.replace(/\s+/g, '');
  const separatorMatch = normalized.match(/[\.\-\/]/);
  const separator = separatorMatch ? separatorMatch[0] : null;
  const parts = separator ? normalized.split(separator) : null;

  if (!parts || parts.length !== 3) return null;

  let day: string;
  let month: string;
  let year: string;

  switch (locale) {
    case 'en':
      [month, day, year] = parts;
      break;
    default:
      [day, month, year] = parts;
      break;
  }

  if (day.length === 1) day = day.padStart(2, '0');
  if (month.length === 1) month = month.padStart(2, '0');

  const numericDay = Number.parseInt(day, 10);
  const numericMonth = Number.parseInt(month, 10);
  const numericYear = Number.parseInt(year, 10);

  if (
    Number.isNaN(numericDay) ||
    Number.isNaN(numericMonth) ||
    Number.isNaN(numericYear) ||
    numericMonth < 1 ||
    numericMonth > 12 ||
    numericDay < 1 ||
    numericDay > 31 ||
    year.length !== 4
  ) {
    return null;
  }

  const iso = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return iso;
}

/**
 * Tarih aralığı doğrulama
 */
export type DateRangeValidationError = 'required' | 'invalidFormat' | 'endBeforeStart';

export function validateDateRange(
  start: string,
  end: string
): { valid: true } | { valid: false; error: DateRangeValidationError } {
  if (!start || !end) {
    return { valid: false, error: 'required' };
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return { valid: false, error: 'invalidFormat' };
  }

  if (startDate > endDate) {
    return { valid: false, error: 'endBeforeStart' };
  }

  return { valid: true };
}
