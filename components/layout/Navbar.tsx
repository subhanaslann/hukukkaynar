'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/shared/Container';
import { Icons } from '@/components/shared/Icons';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const locale = useLocale();
  const t = useTranslations('nav');

  const navigation = [
    { name: t('about'), href: `/${locale}/hakkimizda` },
    { name: t('practiceAreas'), href: `/${locale}/calisma-alanlari` },
    { name: t('team'), href: `/${locale}/ekibimiz` },
    { name: t('news'), href: `/${locale}/aktuel` },
    { name: t('articles'), href: `/${locale}/makaleler` },
    { name: t('contact'), href: `/${locale}/iletisim` }
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        isScrolled
          ? 'border-[hsl(var(--line))] bg-[hsl(var(--bg))]/95 backdrop-blur-md shadow-sm'
          : 'border-transparent bg-[hsl(var(--bg))]'
      )}
    >
      <Container>
        <div className="flex items-center justify-between py-4 lg:py-5">
          {/* Logo */}
          <Link href={`/${locale}` as any} className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-full border-2 gold-border flex items-center justify-center bg-[hsl(var(--card))] group-hover:bg-gold/10 transition-colors">
              <Icons.scale className="h-5 w-5 gold-text" />
            </div>
            <div>
              <div className="text-lg font-serif font-bold text-foreground">Kaynar Hukuk</div>
              <div className="text-xs text-muted">{t('brandSubtitle')}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href as any}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={`/${locale}/iletisim` as any}
              className="rounded-md gold-border border px-5 py-2.5 text-sm font-semibold gold-text hover:bg-gold/10 transition-all duration-200"
            >
              {t('appointment')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-md p-2 text-muted hover:text-foreground hover:bg-card transition-colors"
            aria-expanded={isOpen}
            aria-label={t('menuToggle')}
          >
            {isOpen ? <Icons.close className="h-6 w-6" /> : <Icons.menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-[hsl(var(--line))] py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href as any}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted hover:text-foreground hover:bg-card transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={`/${locale}/iletisim` as any}
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-md gold-border border px-5 py-2.5 text-center text-sm font-semibold gold-text hover:bg-gold/10 transition-all"
              >
                {t('appointment')}
              </Link>
              <div className="mt-3 px-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
