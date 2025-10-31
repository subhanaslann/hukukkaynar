'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Icons } from '@/components/shared/Icons';

export function Hero() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const tContact = useTranslations('contact');

  return (
    <section className="relative isolate min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--bg))]/95 via-[hsl(var(--bg))]/80 to-[hsl(var(--bg))]/60" />
      </div>

      {/* Gold accent line */}
      <div className="absolute left-0 top-1/2 h-px w-24 gold-line -translate-y-1/2 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              {t('title')}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl lg:mt-8">
              {t('subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Link
                href={`/${locale}/iletisim` as any}
                className="inline-flex items-center justify-center rounded-md border-2 gold-border bg-gold px-8 py-3.5 text-sm font-semibold text-[hsl(var(--bg))] shadow-md hover:bg-gold/90 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {t('ctaAppointment')}
              </Link>
              <a
                href={`tel:${tContact('phoneNumber')}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 gold-border bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-gold/10 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Icons.phone className="h-5 w-5" />
                <span>{t('ctaCall')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
