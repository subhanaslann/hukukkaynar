'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimEnabled } from './AnimationProvider';
import { TeamDetail, type TeamDetailMember } from '@/components/team/TeamDetail';

interface TeamModalProps {
  member: TeamDetailMember;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamModal({ member, isOpen, onClose }: TeamModalProps) {
  const tCommon = useTranslations('common');
  const animEnabled = useAnimEnabled('lite');
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeRef.current?.focus(), 0);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
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
            className="fixed inset-0 z-50 bg-[hsl(var(--bg))]/80 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={animEnabled ? { scale: 0.96, opacity: 0, y: 20 } : { opacity: 0 }}
              animate={animEnabled ? { scale: 1, opacity: 1, y: 0 } : { opacity: 1 }}
              exit={animEnabled ? { scale: 0.96, opacity: 0, y: 20 } : { opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4, damping: 18 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-[hsl(var(--bg))] text-[hsl(var(--gold))] shadow-md transition-colors hover:bg-[hsl(var(--gold))]/15 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
                aria-label={tCommon('close')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6">
                <TeamDetail member={member} variant="modal" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
