'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Section, SectionHeader } from '@/components/shared/Section';
import { TEAM } from '@/content/team';
import { TeamCardMini } from '@/components/team/TeamCardMini';

export function OurTeam() {
  const t = useTranslations('team');

  const previewCount = Math.min(TEAM.length, 4);
  const previewMembers = TEAM.slice(0, previewCount);

  return (
    <Section id="ekibimiz" className="bg-[hsl(var(--card))]">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {previewMembers.map((member) => (
          <TeamCardMini key={member.slug} member={member} />
        ))}
      </div>

      {TEAM.length > previewCount && (
        <div className="mt-8 flex justify-end">
          <Link
            href={"/ekibimiz" as any}
            className="inline-flex items-center rounded-md border border-[hsl(var(--gold))]/50 px-4 py-2 text-sm font-semibold text-[hsl(var(--gold))] transition-colors hover:bg-[hsl(var(--gold))]/10 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
          >
            {t('viewAll')}
          </Link>
        </div>
      )}
    </Section>
  );
}
