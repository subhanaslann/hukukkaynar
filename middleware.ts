import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except Next.js internals and static files
  // Also exclude some known non-localized routes like /og and common dot-files
  matcher: [
    '/((?!api|_next|_vercel|og|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)'
  ]
};
