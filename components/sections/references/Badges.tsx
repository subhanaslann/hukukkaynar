'use client';

import Reveal, { RevealItem, RevealStagger } from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';
import { REFERENCE_BADGES } from '@/content/references/badges';
import { useTranslations } from 'next-intl';

export function Badges() {
  const t = useTranslations('references.badges');

  return (
    <Section className="bg-[hsl(var(--card))]">
      <Reveal>
        <SectionHeader align="center" title={t('title')} />
      </Reveal>

      <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {REFERENCE_BADGES.map((badge) => {
          const Icon = Icons[badge.icon];
          return (
            <RevealItem key={badge.id}>
              <article className="h-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/10">
                  <Icon className="h-6 w-6 text-[hsl(var(--gold))]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--fg))]">{badge.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted))]">{t(badge.description)}</p>
              </article>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </Section>
  );
}
