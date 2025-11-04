'use client';

import * as React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { cn } from '@/lib/utils';
import { locales, type Locale } from '@/i18n';

type NavItem = {
  key: string;
  label: string;
  href: string;
};

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = React.useMemo<NavItem[]>(() => {
    return [
      { key: 'about', label: t('about'), href: '/hakkimizda' },
      {
        key: 'services',
        label: t('services'),
        href: '/calisma-alanlari'
      },
      { key: 'team', label: t('team'), href: '/ekibimiz' },
      {
        key: 'references',
        label: t('references'),
        href: '/referanslar'
      },
      {
        key: 'articles',
        label: t('articles'),
        href: '/makaleler'
      },
      {
        key: 'news',
        label: t('news'),
        href: '/aktuel'
      },
      {
        key: 'archive',
        label: t('archive'),
        href: '/arsiv'
      },
      { key: 'contact', label: t('contact'), href: '/iletisim' }
    ];
  }, [t]);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const stripLocale = (p: string) => {
    const segs = (p || '').split('/').filter(Boolean);
    if (segs.length && locales.includes(segs[0] as Locale)) {
      segs.shift();
    }
    return '/' + segs.join('/');
  };

  const isActive = (href: string) => {
    const current = stripLocale(pathname ?? '');
    const normalized = href.replace(/\/+$/, '');
    return current === normalized || current.startsWith(`${normalized}/`);
  };

  const linkBase =
    'relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent';
  const linkHover =
    'text-[hsl(var(--muted))] hover:text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10';
  const linkActive =
    'text-[hsl(var(--fg))] bg-[hsl(var(--gold))]/10 border-[hsl(var(--gold))] shadow-[inset_0_-2px_0_hsl(var(--gold))]';

  const tCommon = useTranslations('common');

  return (
    <nav
      role="navigation"
      aria-label={t('mainMenuAria')}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        isScrolled
          ? 'border-[hsl(var(--line))] bg-[hsl(var(--bg))]/95 backdrop-blur-md shadow-sm'
          : 'border-transparent bg-[hsl(var(--bg))]'
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href={"/" as any} className="flex items-center gap-3" aria-label={tCommon('homeLinkAria')}>
            <Image
              src="/logo.svg"
              alt={tCommon('logoAlt')}
              width={160}
              height={44}
              priority
              style={{ height: 44, width: 'auto' }}
            />
            <span className="hidden text-base font-semibold tracking-tight text-[hsl(var(--fg))] sm:block">
              {tCommon('siteName')}
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-4">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href as any}
                      className={cn(linkBase, active ? linkActive : linkHover)}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-3">
              <Link href={"/iletisim" as any} className="btn-primary gold-focus px-5 py-2.5">
                {t('appointment')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className="rounded-md p-2 text-[hsl(var(--muted))] transition-colors hover:bg-[hsl(var(--gold))]/10 hover:text-[hsl(var(--fg))] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={t('menuToggle')}
          >
            <span className="sr-only">{t('menuToggle')}</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div id="mobile-nav" className="border-t border-[hsl(var(--line))] py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href as any}
                      onClick={closeMenu}
                      className={cn(
                        'block rounded-md px-3 py-3 text-base transition-colors',
                        active
                          ? 'border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 text-[hsl(var(--fg))]'
                          : 'text-[hsl(var(--muted))] hover:bg-[hsl(var(--gold))]/10 hover:text-[hsl(var(--fg))]'
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-3 flex items-center justify-between gap-3 px-3">
                <Link
                  href={"/iletisim" as any}
                  onClick={closeMenu}
                  className="btn-primary gold-focus px-4 py-2"
                >
                  {t('appointment')}
                </Link>
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
