'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/shared/Container';
import { Icons } from '@/components/shared/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  return (
    <footer className="border-t border-[hsl(var(--gold))]/15 bg-[hsl(var(--card))]">
      <Container>
        {/* Main Footer */}
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-col items-start gap-4">
              <Image
                src="/logo.svg"
                alt="Kaynar Hukuk Bürosu"
                width={160}
                height={44}
                style={{ height: 44, width: 'auto' }}
              />
              <span className="h-px w-20 bg-[hsl(var(--gold))]/40" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground">{t('about')}</h3>
                <p className="text-xs text-muted">{t('brandTagline')}</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">{t('aboutDesc')}</p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="rounded-full p-2 text-muted transition-colors hover:bg-gold/10 hover:text-[hsl(var(--gold))]">
                <Icons.facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full p-2 text-muted transition-colors hover:bg-gold/10 hover:text-[hsl(var(--gold))]">
                <Icons.twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full p-2 text-muted transition-colors hover:bg-gold/10 hover:text-[hsl(var(--gold))]">
                <Icons.instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-full p-2 text-muted transition-colors hover:bg-gold/10 hover:text-[hsl(var(--gold))]">
                <Icons.linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t('quickLinks')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={"/hakkimizda" as any}
                  className="inline-flex w-full items-center justify-between rounded-md px-3 py-2 text-muted transition-colors hover:bg-gold/10 hover:text-foreground"
                >
                  {tNav('about')}
                  <Icons.arrowRight className="h-4 w-4 text-[hsl(var(--gold))]" />
                </Link>
              </li>
              <li>
                <Link
                  href={"/calisma-alanlari" as any}
                  className="inline-flex w-full items-center justify-between rounded-md px-3 py-2 text-muted transition-colors hover:bg-gold/10 hover:text-foreground"
                >
                  {tNav('practiceAreas')}
                  <Icons.arrowRight className="h-4 w-4 text-[hsl(var(--gold))]" />
                </Link>
              </li>
              <li>
                <Link
                  href={"/ekibimiz" as any}
                  className="inline-flex w-full items-center justify-between rounded-md px-3 py-2 text-muted transition-colors hover:bg-gold/10 hover:text-foreground"
                >
                  {tNav('team')}
                  <Icons.arrowRight className="h-4 w-4 text-[hsl(var(--gold))]" />
                </Link>
              </li>
              <li>
                <Link
                  href={"/makaleler" as any}
                  className="inline-flex w-full items-center justify-between rounded-md px-3 py-2 text-muted transition-colors hover:bg-gold/10 hover:text-foreground"
                >
                  {tNav('articles')}
                  <Icons.arrowRight className="h-4 w-4 text-[hsl(var(--gold))]" />
                </Link>
              </li>
              <li>
                <Link
                  href={"/iletisim" as any}
                  className="inline-flex w-full items-center justify-between rounded-md px-3 py-2 text-muted transition-colors hover:bg-gold/10 hover:text-foreground"
                >
                  {tNav('contact')}
                  <Icons.arrowRight className="h-4 w-4 text-[hsl(var(--gold))]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t('contactInfo')}</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2 rounded-md px-2 py-2 transition-colors hover:bg-gold/10">
                <Icons.mapPin className="mt-0.5 h-4 w-4 text-[hsl(var(--gold))]" />
                <span>
                  {tContact('addressText')}
                  <br />
                  {tContact('cityText')}
                </span>
              </li>
              <li className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-gold/10">
                <Icons.phone className="h-4 w-4 text-[hsl(var(--gold))]" />
                <a href={`tel:${tContact('phoneNumber')}`} className="hover:text-[hsl(var(--gold))]">
                  {tContact('phoneNumber')}
                </a>
              </li>
              <li className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-gold/10">
                <Icons.mail className="h-4 w-4 text-[hsl(var(--gold))]" />
                <a href={`mailto:${tContact('emailAddress')}`} className="hover:text-[hsl(var(--gold))]">
                  {tContact('emailAddress')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[hsl(var(--gold))]/15 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
            <p>{t('copyright', { year: currentYear })}</p>
            <p className="text-center sm:text-right">{t('disclaimerText')}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
