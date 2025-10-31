'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import CookiePreferences from './CookiePreferences';
import type { CookieConsent } from '@/lib/cookies';
import { COOKIE_NAME, defaultConsent, serializeConsentCookie } from '@/lib/cookies';

interface CookieConsentContextValue {
  consent: CookieConsent;
  hasChoice: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openPreferences: () => void;
  updateConsent: (consent: CookieConsent) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
}

interface CookieConsentProviderProps {
  initialConsent: CookieConsent | null;
  children: React.ReactNode;
}

export default function CookieConsentProvider({ initialConsent, children }: CookieConsentProviderProps) {
  const tCookies = useTranslations('cookies');
  const tCategories = useTranslations('cookies.categories');

  const [consent, setConsent] = useState<CookieConsent>(initialConsent ?? defaultConsent);
  const [hasChoice, setHasChoice] = useState(Boolean(initialConsent));
  const [showPreferences, setShowPreferences] = useState(false);

  const persistConsent = (nextConsent: CookieConsent) => {
    const updated: CookieConsent = { ...nextConsent, necessary: true, updatedAt: new Date().toISOString() };
    setConsent(updated);
    setHasChoice(true);
    setShowPreferences(false);
    const serialized = serializeConsentCookie(updated);
    const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE_NAME}=${serialized}; Path=/; Max-Age=31536000; SameSite=Lax${secureFlag}`;
  };

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasChoice,
      acceptAll: () =>
        persistConsent({
          ...consent,
          necessary: true,
          statistics: true,
          functional: true,
          updatedAt: new Date().toISOString()
        }),
      rejectNonEssential: () =>
        persistConsent({
          ...consent,
          necessary: true,
          statistics: false,
          functional: false,
          updatedAt: new Date().toISOString()
        }),
      openPreferences: () => setShowPreferences(true),
      updateConsent: persistConsent
    }),
    [consent, hasChoice]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {!hasChoice && (
        <div className="fixed inset-x-0 bottom-0 z-30 bg-white shadow-2xl">
          <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-900">{tCookies('banner.title')}</p>
              <p className="mt-2 text-sm text-primary-700">
                {tCookies('banner.description', {
                  statistics: tCategories('statistics.name'),
                  functional: tCategories('functional.name')
                })}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={value.rejectNonEssential}
                className="rounded-md border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                {tCookies('banner.reject')}
              </button>
              <button
                type="button"
                onClick={value.openPreferences}
                className="rounded-md border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                {tCookies('banner.preferences')}
              </button>
              <button
                type="button"
                onClick={value.acceptAll}
                className="rounded-md bg-primary-800 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              >
                {tCookies('banner.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
      <CookiePreferences
        isOpen={showPreferences}
        consent={consent}
        onClose={() => setShowPreferences(false)}
        onSave={persistConsent}
      />
    </CookieConsentContext.Provider>
  );
}
