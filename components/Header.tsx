'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { HEADER_LINKS } from '@/lib/constants';
import { localizedHref } from '@/lib/i18n/navigation';
import NavLink from './NavLink';
import AnimationToggle from './AnimationToggle';

export default function Header() {
  const locale = useLocale();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last;
      setHidden(down && y > 80);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobil menü açıkken scroll'u engelle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 border-b border-primary-100/70 bg-white/95 backdrop-blur transition-transform duration-300',
          hidden ? '-translate-y-full' : 'translate-y-0'
        ].join(' ')}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={localizedHref(locale, '/') as any}
            className="flex items-center gap-3"
            aria-label="Kaynar Hukuk Bürosu ana sayfa"
          >
            <Image
              src="/logo.svg"
              alt="Kaynar Hukuk Bürosu"
              width={140}
              height={40}
              priority
              style={{ width: 'auto', height: '40px' }}
            />
          </Link>

          {/* Desktop Navigation - Büyük ekranlarda */}
          <div className="hidden lg:flex items-center gap-4">
            <nav aria-label="Ana menü" className="flex items-center gap-2">
              {HEADER_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <AnimationToggle />
          </div>

          {/* Mobile Menu Controls - Küçük ekranlarda */}
          <div className="flex items-center gap-3 lg:hidden">
            <AnimationToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-primary-700 hover:bg-primary-100 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accentBlue-500 min-h-[44px] min-w-[44px]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              <span className="sr-only">{mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}</span>
              {/* Hamburger Icon */}
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Basit versiyon */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-primary-100 bg-white">
            <nav className="px-4 py-4 space-y-1">
              {HEADER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={localizedHref(locale, link.href) as any}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-primary-700 hover:bg-primary-50 hover:text-accentBlue-700 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Backdrop - Menü açıkken */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-primary-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
