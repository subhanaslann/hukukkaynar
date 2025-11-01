'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Icons } from '@/components/shared/Icons';

export function Hero() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brand-navy))]/95 via-[hsl(var(--bg))]/82 to-[hsl(var(--bg))]/62" />
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
                href={"/iletisim" as any}
                className="btn-primary gold-focus px-8 py-3.5"
              >
                {t('ctaAppointment')}
              </Link>
              <a
                href={`tel:${tContact('phoneNumber')}`}
                className="btn-outline gold-focus px-8 py-3.5"
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
