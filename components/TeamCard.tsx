'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import TeamModal from './TeamModal';
import type { TeamDetailMember } from '@/components/team/TeamDetail';

export interface TeamMember {
  name: string;
  title?: string;
  university?: string;
  areas?: string[];
  bio?: string;
  image?: string;
  email?: string;
}

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const tCard = useTranslations('team.card');
  const tCommon = useTranslations('common');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalMember: TeamDetailMember = {
    name: member.name,
    title: member.title,
    university: member.university ?? '',
    areas: member.areas ?? [],
    avatar: member.image ?? '',
    bio: member.bio ?? '',
    email: member.email
  };

  return (
    <>
      <div className="group overflow-hidden rounded-xl bg-[hsl(var(--card))] shadow-md transition-all duration-300 hover:shadow-xl border border-[hsl(var(--border))]">
        <div className="flex flex-col md:flex-row">
          {/* Image - Left Side */}
          <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden bg-[hsl(var(--bg))] flex-shrink-0">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-700 to-primary-900 text-[hsl(var(--gold))] text-6xl font-bold">
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info - Right Side */}
          <div className="flex-1 p-6 md:p-8">
            {/* Name and Title */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-[hsl(var(--fg))] mb-1">{member.name}</h3>
              <p className="text-lg text-[hsl(var(--gold))] font-medium">{member.title || tCard('role')}</p>
            </div>

            {/* University */}
            {member.university && (
              <div className="mb-4">
                <p className="text-sm text-[hsl(var(--muted))] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[hsl(var(--gold))]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {member.university}
                </p>
              </div>
            )}

            {/* Bio */}
            {member.bio && (
              <div className="mb-4">
                <p className="text-[hsl(var(--muted))] leading-relaxed text-sm">{member.bio}</p>
              </div>
            )}

            {/* Expertise Areas */}
            {member.areas && member.areas.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-[hsl(var(--fg))] mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[hsl(var(--gold))]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tCard('specialties')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.areas.map((area, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border border-[hsl(var(--gold))]/30 hover:bg-[hsl(var(--gold))]/20 transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center rounded-md border border-[hsl(var(--gold))]/40 px-4 py-2 text-sm font-semibold text-[hsl(var(--gold))] transition-colors hover:bg-[hsl(var(--gold))]/10 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
              >
                {tCommon('learnMore')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <TeamModal member={modalMember} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
