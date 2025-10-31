"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '@/components/CookieBanner';
import { CONTACT_INFO, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  const { openPreferences } = useCookieConsent();
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6 px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl text-xs sm:text-sm leading-relaxed text-primary-700">
            <p>{t('disclaimer')}</p>
            <div className="mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-3 text-xs text-primary-500">
              <button
                type="button"
                onClick={openPreferences}
                className="underline transition-colors duration-200 hover:text-primary-700"
              >
                {t('cookiePreferences')}
              </button>
            </div>
            <p className="mt-1 sm:mt-2 text-xs text-primary-500">{t('secondaryNotice')}</p>
          </div>
          <div className="text-xs sm:text-sm text-primary-700">
            <p>
              <strong>{t('addressLabel')}:</strong> {CONTACT_INFO.address}
            </p>
            <p>
              <strong>{t('phoneLabel')}:</strong>{' '}
              <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-primary-900">
                {CONTACT_INFO.phone}
              </a>
            </p>
            <p>
              <strong>{t('emailLabel')}:</strong>{' '}
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary-900">
                {CONTACT_INFO.email}
              </a>
            </p>
          </div>
        </div>
        <nav aria-label={t('linksAria')} className="flex flex-wrap gap-3 text-sm text-primary-600">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary-900">
              {link.name}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-primary-400">{t('copyright', { year: currentYear })}</p>
      </div>
    </footer>
  );
}
