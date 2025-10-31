'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/shared/Container';
import { Icons } from '@/components/shared/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  return (
    <footer className="border-t gold-line bg-[hsl(var(--card))]">
      <Container>
        {/* Main Footer */}
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 gold-border flex items-center justify-center bg-[hsl(var(--bg))]">
                <Icons.scale className="h-5 w-5 gold-text" />
              </div>
              <div>
                <div className="text-lg font-serif font-bold text-foreground">{t('about')}</div>
                <div className="text-xs text-muted">{t('brandTagline')}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted max-w-md">
              {t('aboutDesc')}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted hover:text-gold transition-colors"
              >
                <Icons.facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted hover:text-gold transition-colors"
              >
                <Icons.twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted hover:text-gold transition-colors"
              >
                <Icons.instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted hover:text-gold transition-colors"
              >
                <Icons.linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t('quickLinks')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/hakkimizda` as any} className="text-muted hover:text-gold transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calisma-alanlari` as any} className="text-muted hover:text-gold transition-colors">
                  {tNav('practiceAreas')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ekibimiz` as any} className="text-muted hover:text-gold transition-colors">
                  {tNav('team')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/iletisim` as any} className="text-muted hover:text-gold transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t('contactInfo')}</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <Icons.mapPin className="h-4 w-4 gold-text mt-0.5 flex-shrink-0" />
                <span>
                  {tContact('addressText')}
                  <br />
                  {tContact('cityText')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.phone className="h-4 w-4 gold-text flex-shrink-0" />
                <a href={`tel:${tContact('phoneNumber')}`} className="hover:text-gold transition-colors">
                  {tContact('phoneNumber')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icons.mail className="h-4 w-4 gold-text flex-shrink-0" />
                <a href={`mailto:${tContact('emailAddress')}`} className="hover:text-gold transition-colors">
                  {tContact('emailAddress')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t gold-line py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
            <p>&copy; {currentYear} {t('copyright')}</p>
            <p className="text-center sm:text-right">
              {t('disclaimerText')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
