'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/Section';
import { LogoMarquee } from './LogoMarquee';

export function Partners() {
  const t = useTranslations('partners');
  const logos = (t.raw('items') as string[]) ?? [];

  return (
    <Section className="border-t gold-line bg-[hsl(var(--card))]" noPadding>
      <div className="py-12 sm:py-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t('label')}
          </p>
        </div>
        <LogoMarquee logos={logos.map((name) => ({ name }))} />
      </div>
    </Section>
  );
}
