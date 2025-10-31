'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { COOKIE_CATEGORY_KEYS, type CookieCategoryKey } from '@/lib/constants';
import type { CookieConsent } from '@/lib/cookies';

type OptionalCategoryKey = Exclude<CookieCategoryKey, 'necessary'>;

const OPTIONAL_CATEGORIES: OptionalCategoryKey[] = COOKIE_CATEGORY_KEYS.filter(
  (key): key is OptionalCategoryKey => key !== 'necessary'
);

interface CookiePreferencesProps {
  isOpen: boolean;
  consent: CookieConsent;
  onClose: () => void;
  onSave: (consent: CookieConsent) => void;
}

export default function CookiePreferences({ isOpen, consent, onClose, onSave }: CookiePreferencesProps) {
  const tCookies = useTranslations('cookies');
  const tCategories = useTranslations('cookies.categories');
  const tCommon = useTranslations('common');

  const [localConsent, setLocalConsent] = useState<CookieConsent>(consent);

  useEffect(() => {
    if (isOpen) {
      setLocalConsent(consent);
    }
  }, [consent, isOpen]);

  const toggle = (key: OptionalCategoryKey) => {
    setLocalConsent((prev) => ({ ...prev, [key]: !prev[key], updatedAt: new Date().toISOString() }));
  };

  const handleSave = () => {
    onSave({ ...localConsent, necessary: true, updatedAt: new Date().toISOString() });
  };

  const overlayProps = useMemo(
    () => ({
      role: 'dialog' as const,
      'aria-modal': true
    }),
    []
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4" {...overlayProps}>
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <header className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-primary-900">{tCookies('preferences.title')}</h2>
              <p className="mt-2 text-sm text-primary-600">{tCookies('preferences.description')}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-primary-500 transition-colors hover:bg-primary-50 hover:text-primary-700"
              aria-label={tCommon('close')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <ul className="space-y-4">
          <li className="rounded-md border border-primary-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-primary-800">{tCategories('necessary.name')}</h3>
                <p className="mt-1 text-xs text-primary-600">{tCategories('necessary.description')}</p>
              </div>
              <span className="text-xs font-medium text-primary-500">{tCookies('preferences.active')}</span>
            </div>
          </li>

          {OPTIONAL_CATEGORIES.map((key) => (
            <li key={key} className="rounded-md border border-primary-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-primary-800">{tCategories(`${key}.name`)}</h3>
                  <p className="mt-1 text-xs text-primary-600">{tCategories(`${key}.description`)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  className={`inline-flex h-6 w-12 items-center rounded-full border border-primary-200 px-1 transition-colors duration-200 ${
                    localConsent[key] ? 'bg-primary-600' : 'bg-primary-100'
                  }`}
                  aria-pressed={localConsent[key]}
                  aria-label={tCategories(`${key}.name`)}
                >
                  <span
                    className={`block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      localConsent[key] ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
          >
            {tCookies('preferences.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-primary-800 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            {tCookies('preferences.save')}
          </button>
        </div>
      </div>
    </div>
  );
}
