'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { TeamMember as ContentTeamMember } from '@/content/team';

export type TeamDetailMember = Pick<ContentTeamMember, 'name' | 'university' | 'areas' | 'avatar' | 'bio' | 'email'> & {
  title?: string;
};

interface TeamDetailProps {
  member: TeamDetailMember;
  variant?: 'page' | 'modal';
}

export function TeamDetail({ member, variant = 'page' }: TeamDetailProps) {
  const tCard = useTranslations('team.card');

  const roleLabel = member.title ?? tCard('role');
  const areas = Array.isArray(member.areas) ? member.areas : [];
  const normalizedAreas = areas
    .map((area: any) => {
      if (!area) return null;
      if (typeof area === 'string') return area;
      if (typeof area === 'object') {
        if ('title' in area && typeof area.title === 'string') return area.title;
        if ('name' in area && typeof area.name === 'string') return area.name;
        if ('label' in area && typeof area.label === 'string') return area.label;
      }
      return String(area);
    })
    .filter(Boolean) as string[];

  const avatarSrc = member.avatar ?? (member as unknown as { image?: string }).image;

  const containerClass = cn(
    'bg-[hsl(var(--card))] text-[hsl(var(--fg))]',
    variant === 'page'
      ? 'rounded-3xl border border-[hsl(var(--border))] p-8 shadow-xl sm:p-10 lg:p-12'
      : 'rounded-2xl p-6 sm:p-8'
  );

  return (
    <article className={containerClass}>
      <header className="mb-8">
        <div className="h-1 w-12 rounded-full bg-[hsl(var(--gold))]" aria-hidden />
        <div className="mt-6 flex flex-col gap-2 text-left">
          <h1
            className={cn(
              'font-serif font-bold tracking-tight text-[hsl(var(--fg))]',
              variant === 'page' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl'
            )}
          >
            {member.name}
          </h1>
          <div className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">{roleLabel}</div>
          {member.university && (
            <p className="text-sm text-[hsl(var(--muted))]">{member.university}</p>
          )}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(220px,260px)_1fr] lg:items-start lg:gap-12">
        <div className="mx-auto flex w-full max-w-xs flex-col items-center">
          <div className="relative h-60 w-60 overflow-hidden rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--bg))]">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={member.name}
                width={260}
                height={260}
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 240px, 280px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[hsl(var(--bg))] text-4xl font-semibold text-[hsl(var(--gold))]">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {normalizedAreas.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">
                {tCard('specialties')}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {normalizedAreas.map((area) => (
                  <span
                    key={area}
                    aria-label={`${tCard('specialties')}: ${area}`}
                    className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--gold))]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </section>
          )}

          {member.bio && (
            <section className="space-y-3">
              {member.bio
                .split(/\n{2,}/)
                .map((paragraph, idx) => (
                  <p key={idx} className="text-base leading-relaxed text-[hsl(var(--muted))]">
                    {paragraph}
                  </p>
                ))}
            </section>
          )}

          {member.email && (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">
                {tCard('contact')}
              </h3>
              <a
                href={`mailto:${member.email}`}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--gold))] transition-colors hover:text-[hsl(var(--gold))]/80 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
              >
                <span aria-hidden className="h-2 w-2 rounded-full bg-[hsl(var(--gold))]" />
                {member.email}
              </a>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
