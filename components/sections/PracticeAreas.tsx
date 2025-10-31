'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';
import { PRACTICE_AREA_DEFINITIONS } from '@/lib/areas';

export function PracticeAreas() {
  const locale = useLocale();
  const t = useTranslations('practiceAreas');
  const tItems = useTranslations('practiceAreas.items');
  const tCommon = useTranslations('common');

  return (
    <Section id="calisma-alanlari" className="bg-[hsl(var(--card))]">
      <SectionHeader
        label={t('label')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRACTICE_AREA_DEFINITIONS.map((area) => {
          const Icon = Icons[area.icon as keyof typeof Icons];
          const href = `/${locale}/calisma-alanlari/${area.segment}`;
          return (
            <Link
              key={area.key}
              href={href as any}
              className="group relative block cursor-pointer rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-6 transition-all duration-200 hover:border-gold/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border gold-border bg-[hsl(var(--card))] transition-colors group-hover:bg-gold/10">
                <Icon className="h-6 w-6 gold-text" />
              </div>

              <h3 className="mb-2 text-lg font-serif font-bold text-foreground">
                {tItems(`${area.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {tItems(`${area.key}.description`)}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold">
                <span>{tCommon('viewDetails')}</span>
                <Icons.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
