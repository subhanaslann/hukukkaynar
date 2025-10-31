import { cookies } from 'next/headers';
import { COOKIE_NAME, parseConsentCookie, type CookieConsent } from './cookies';

export function getServerConsent(): CookieConsent | null {
  const cookieStore = cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  return parseConsentCookie(raw);
}
