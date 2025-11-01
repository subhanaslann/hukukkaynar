'use client';

import Image from 'next/image';
import Reveal, { RevealItem, RevealStagger } from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/shared/Section';
import { REFERENCE_COMPANIES } from '@/content/references/companies';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function CompanyLogos() {
  const t = useTranslations('references.logos');

  return (
    <Section className="bg-[hsl(var(--bg))]">
      <Reveal>
        <SectionHeader align="center" title={t('title')} description={t('subtitle')} />
      </Reveal>

      <RevealStagger className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {REFERENCE_COMPANIES.map((company) => (
          <RevealItem key={company.id}>
            <article
              className={cn(
                'group flex h-full items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center transition-all duration-200',
                'filter grayscale opacity-80 hover:-translate-y-0.5 hover:opacity-100 hover:shadow-lg hover:grayscale-0'
              )}
              aria-label={company.name}
            >
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={160}
                  height={80}
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/5 font-semibold tracking-wide text-[hsl(var(--gold))]">
                  {getInitials(company.name)}
                </span>
              )}
            </article>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}

