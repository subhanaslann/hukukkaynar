'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import TeamModal from '@/components/TeamModal';
import type { TeamDetailMember } from '@/components/team/TeamDetail';
import type { TeamMember } from '@/content/team';

interface TeamCardMiniProps {
  member: TeamMember;
}

export function TeamCardMini({ member }: TeamCardMiniProps) {
  const t = useTranslations('team');
  const tCard = useTranslations('team.card');
  const tCommon = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);

  const areas = Array.isArray(member.areas) ? member.areas : [];
  const displayedAreas = areas.slice(0, 3);
  const remainingCount = Math.max(areas.length - displayedAreas.length, 0);

  const modalPayload = useMemo<TeamDetailMember>(
    () => ({
      name: member.name,
      title: tCard('role'),
      university: member.university,
      areas,
      bio: member.bio,
      avatar: member.avatar,
      email: member.email
    }),
    [areas, member.avatar, member.bio, member.email, member.name, member.university, tCard]
  );

  const detailLabel = tCommon('viewDetails');
  const quickViewLabel = tCommon('quickView');

  return (
    <>
      <div
        className="group overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none sm:p-6"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4 h-36 w-36 overflow-hidden rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--bg))]">
            {member.avatar ? (
              <Image
                src={member.avatar}
                alt={member.name}
                width={150}
                height={150}
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 160px, 200px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[hsl(var(--bg))] text-3xl font-semibold text-[hsl(var(--gold))]">
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          <h3 className="text-lg font-serif font-bold text-[hsl(var(--fg))]">{member.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">
            {tCard('role')}
          </p>
          {member.university && (
            <p className="mt-1 text-xs text-[hsl(var(--muted))]">{member.university}</p>
          )}

          {displayedAreas.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {displayedAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--gold))]"
                >
                  {area}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--muted))]">
                  {t('moreCount', { count: remainingCount })}
                </span>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row">
            <Link
              href={`/ekibimiz/${member.slug}`}
              className="inline-flex items-center rounded-md border border-[hsl(var(--gold))]/40 px-3 py-1.5 text-xs font-semibold text-[hsl(var(--gold))] transition-colors hover:bg-[hsl(var(--gold))]/10 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
              aria-label={`${member.name} – ${detailLabel}`}
            >
              {detailLabel}
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center rounded-md border border-transparent px-3 py-1.5 text-xs font-semibold text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--gold))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
              aria-label={`${member.name} – ${quickViewLabel}`}
            >
              {quickViewLabel}
            </button>
          </div>
        </div>
      </div>

      <TeamModal member={modalPayload} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
