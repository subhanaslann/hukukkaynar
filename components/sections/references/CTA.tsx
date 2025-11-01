'use client';

import { Link } from '@/lib/i18n/navigation';
import Reveal from '@/components/Reveal';
import { Section } from '@/components/shared/Section';
import { useTranslations } from 'next-intl';

export function CTA() {
  const t = useTranslations('references.cta');

  return (
    <Section className="bg-[hsl(var(--bg))]">
      <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-10 text-center shadow-lg">
        <h2 className="font-serif text-2xl font-bold text-[hsl(var(--fg))] sm:text-3xl">
          {t('title')}
        </h2>

        <Link
          href="/iletisim"
          className="mt-6 inline-flex items-center justify-center rounded-md border border-[hsl(var(--gold))] px-6 py-3 text-sm font-semibold text-[hsl(var(--gold))] transition-all duration-200 hover:bg-[hsl(var(--gold))]/10 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--card))]"
        >
          {t('button')}
        </Link>
      </Reveal>
    </Section>
  );
}
