'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/shared/Section';
import { TEAM } from '@/content/team';

export function Attorneys() {
  const t = useTranslations('team');
  const tCard = useTranslations('team.card');

  const gridClass =
    TEAM.length <= 2
      ? 'grid gap-6 sm:grid-cols-2 lg:gap-8'
      : TEAM.length <= 4
      ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8'
      : 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-8';

  return (
    <Section id="avukatlar" className="bg-[hsl(var(--card))]">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className={gridClass}>
        {TEAM.map((member) => (
          <div
            key={member.slug}
            className="group overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] transition-all duration-200 hover:border-gold/50 hover:shadow-xl"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-serif font-bold text-foreground">{member.name}</h3>
              <p className="mt-1 text-xs gold-text">{tCard('role')}</p>
              {member.university && <p className="mt-1 text-xs text-muted">{member.university}</p>}

              {member.areas && member.areas.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {member.areas.slice(0, 3).map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center rounded-full border gold-border bg-gold/5 px-2 py-0.5 text-[10px] font-medium text-foreground"
                    >
                      {area}
                    </span>
                  ))}
                  {member.areas.length > 3 && (
                    <span className="inline-flex items-center rounded-full border gold-border bg-gold/5 px-2 py-0.5 text-[10px] font-medium text-muted">
                      {t('moreCount', { count: member.areas.length - 3 })}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
