'use client';

import Reveal from '@/components/Reveal';
import { Section } from '@/components/shared/Section';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('references.hero');

  return (
    <Section className="bg-[hsl(var(--card))]">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl lg:text-5xl">
          {t('title')}
        </h1>

        <p className="mt-4 text-lg text-[hsl(var(--muted))] sm:mt-6">{t('subtitle')}</p>

        <div className="gold-line mx-auto mt-8 h-1 w-20 rounded-full" />
      </Reveal>
    </Section>
  );
}
