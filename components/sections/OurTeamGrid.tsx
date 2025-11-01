'use client';

import { TEAM, type TeamMember } from '@/content/team';
import { TeamCardMini } from '@/components/team/TeamCardMini';

interface OurTeamGridProps {
  members?: TeamMember[];
}

export function OurTeamGrid({ members = TEAM }: OurTeamGridProps) {
  if (!members || members.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => (
        <TeamCardMini key={member.slug} member={member} />
      ))}
    </div>
  );
}
