'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useAnimEnabled } from './AnimationProvider';

export default function ScrollTop() {
  const [show, setShow] = useState(false);
  const animEnabled = useAnimEnabled('lite');
  const t = useTranslations('common');

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('scrollToTop')}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={animEnabled ? { scale: 1.1 } : {}}
          whileTap={animEnabled ? { scale: 0.9 } : {}}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
          className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accentBlue-500 to-accentBlue-600 text-white shadow-lg shadow-accentBlue-500/30 hover:shadow-xl hover:shadow-accentBlue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentBlue-400 focus-visible:ring-offset-2"
        >
          <svg
            className="h-6 w-6 transform transition-transform group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
