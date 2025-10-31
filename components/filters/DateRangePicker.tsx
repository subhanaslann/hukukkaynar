'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import type { DateRange } from '@/lib/filters/quickRanges';
import { formatDateInput, parseDateInput, validateDateRange } from '@/lib/filters/quickRanges';
import type { Locale } from '@/i18n';

interface DateRangePickerProps {
  value: DateRange | null;
  onChange: (range: DateRange | null) => void;
  onClose: () => void;
}

export default function DateRangePicker({ value, onChange, onClose }: DateRangePickerProps) {
  const t = useTranslations('filters');
  const locale = useLocale() as Locale;
  const [startTR, setStartTR] = useState(() => (value ? formatDateInput(value.start, locale) : ''));
  const [endTR, setEndTR] = useState(() => (value ? formatDateInput(value.end, locale) : ''));
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const startInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStartTR(value ? formatDateInput(value.start, locale) : '');
    setEndTR(value ? formatDateInput(value.end, locale) : '');
  }, [value, locale]);

  // Dialog açıldığında ilk input'a focus
  useEffect(() => {
    if (startInputRef.current) {
      startInputRef.current.focus();
    }
  }, []);

  // Dialog dışına tıklandığında kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Escape tuşu ile kapat
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  function handleApply() {
    setError(null);

    const startISO = parseDateInput(startTR, locale);
    const endISO = parseDateInput(endTR, locale);

    if (!startISO || !endISO) {
      setError(t('date.custom.errors.invalidFormat'));
      return;
    }

    const validation = validateDateRange(startISO, endISO);
    if (!validation.valid) {
      setError(t(`date.custom.errors.${validation.error}`));
      return;
    }

    onChange({ start: startISO, end: endISO });
    onClose();
  }

  function handleCancel() {
    onChange(null);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/30"
        aria-hidden="true"
      />

      {/* Dialog */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-label={t('date.custom.ariaLabel')}
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary-200 bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary-900">{t('date.custom.title')}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-primary-400 hover:bg-primary-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accentBlue-500"
            aria-label={t('date.custom.close')}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Start date */}
          <div>
            <label htmlFor="start-date" className="mb-2 block text-sm font-semibold text-primary-700">
              {t('date.custom.startLabel')}
            </label>
            <input
              ref={startInputRef}
              id="start-date"
              type="text"
              value={startTR}
              onChange={(e) => {
                setStartTR(e.target.value);
                setError(null);
              }}
              placeholder={t('date.custom.placeholder')}
              className="w-full rounded-lg border border-primary-300 px-4 py-2.5 text-sm focus:border-accentBlue-500 focus:outline-none focus:ring-2 focus:ring-accentBlue-500/30"
              maxLength={10}
            />
          </div>

          {/* End date */}
          <div>
            <label htmlFor="end-date" className="mb-2 block text-sm font-semibold text-primary-700">
              {t('date.custom.endLabel')}
            </label>
            <input
              id="end-date"
              type="text"
              value={endTR}
              onChange={(e) => {
                setEndTR(e.target.value);
                setError(null);
              }}
              placeholder={t('date.custom.placeholder')}
              className="w-full rounded-lg border border-primary-300 px-4 py-2.5 text-sm focus:border-accentBlue-500 focus:outline-none focus:ring-2 focus:ring-accentBlue-500/30"
              maxLength={10}
            />
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-lg border border-primary-300 bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {t('date.custom.cancel')}
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 rounded-lg bg-accentBlue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accentBlue-700 focus:outline-none focus:ring-2 focus:ring-accentBlue-500 focus:ring-offset-2"
            >
              {t('date.custom.apply')}
            </button>
          </div>
        </div>

        {/* Helper text */}
        <p className="mt-4 text-xs text-primary-500">{t('date.custom.helpText')}</p>
      </motion.div>
    </>
  );
}
