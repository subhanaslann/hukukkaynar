'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import type { TeamMember } from './TeamCard';
import { useAnimEnabled } from './AnimationProvider';

interface TeamModalProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamModal({ member, isOpen, onClose }: TeamModalProps) {
  const tCard = useTranslations('team.card');
  const tCommon = useTranslations('common');
  const animEnabled = useAnimEnabled('lite');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-primary-900/80 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={animEnabled ? { scale: 0.9, opacity: 0, y: 20 } : { opacity: 0 }}
              animate={animEnabled ? { scale: 1, opacity: 1, y: 0 } : { opacity: 1 }}
              exit={animEnabled ? { scale: 0.9, opacity: 0, y: 20 } : { opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow-lg backdrop-blur-sm transition-colors hover:bg-white hover:text-primary-900"
                aria-label={tCommon('close')}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative bg-gradient-to-br from-accentBlue-600 to-accentBlue-800 p-8 text-white">
                <div>
                  <h2 className="text-3xl font-bold">{member.name}</h2>
                  <p className="mt-2 text-lg text-accentBlue-100">{member.title || tCard('role')}</p>
                  {member.university && (
                    <p className="mt-1 text-sm text-accentBlue-200">{member.university}</p>
                  )}
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-8">
                {member.areas && member.areas.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-500">
                      {tCard('specialties')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.areas.map((area, index) => (
                        <motion.span
                          key={area}
                          initial={animEnabled ? { scale: 0, opacity: 0 } : {}}
                          animate={animEnabled ? { scale: 1, opacity: 1 } : {}}
                          transition={{ delay: index * 0.05 }}
                          className="rounded-full bg-gradient-to-r from-accentBlue-100 to-accentEmerald-100 px-4 py-2 text-sm font-medium text-accentBlue-800"
                        >
                          {area}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {member.bio && (
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-500">
                      {tCard('about')}
                    </h3>
                    <p className="leading-relaxed text-primary-700">{member.bio}</p>
                  </div>
                )}

                {member.email && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-500">
                      {tCard('contact')}
                    </h3>
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-accentBlue-600 transition-colors hover:text-accentBlue-700"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {member.email}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
