export const COOKIE_NAME = 'cookie_consent';

export type CookieCategoryKey = 'necessary' | 'statistics' | 'functional';

export interface CookieConsent {
  necessary: true;
  statistics: boolean;
  functional: boolean;
  updatedAt: string;
}

export const defaultConsent: CookieConsent = {
  necessary: true,
  statistics: false,
  functional: false,
  updatedAt: ''
};

export function parseConsentCookie(value?: string | null): CookieConsent | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<CookieConsent>;
    if (typeof parsed !== 'object' || parsed === null) {
      return null;
    }

    return {
      necessary: true,
      statistics: Boolean(parsed.statistics),
      functional: Boolean(parsed.functional),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString()
    };
  } catch (error) {
    console.warn('Cookie consent parse error', error);
    return null;
  }
}

export function serializeConsentCookie(consent: CookieConsent): string {
  return encodeURIComponent(JSON.stringify(consent));
}
