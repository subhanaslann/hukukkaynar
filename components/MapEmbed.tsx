'use client';

import { motion } from 'framer-motion';
import { useCookieConsent } from './CookieBanner';
import { useAnimEnabled } from './AnimationProvider';

export default function MapEmbed() {
  const { consent, openPreferences } = useCookieConsent();
  const animEnabled = useAnimEnabled('lite');

  if (!consent.functional) {
    return (
      <div className="rounded-lg border border-primary-100 bg-white p-6 text-sm text-primary-700">
        <p>Harita gösterebilmek için işlevsel çerezlere izin vermeniz gerekir.</p>
        <button
          type="button"
          onClick={openPreferences}
          className="mt-3 inline-flex items-center rounded-md border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
        >
          Çerez Tercihlerini Aç
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={animEnabled ? { opacity: 0, y: 20 } : {}}
      animate={animEnabled ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="overflow-hidden rounded-lg border border-primary-200 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <iframe
        title="Kaynar Hukuk Bürosu Konumu"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.7518449699547!2d28.9079198!3d41.0127749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabbb715362555%3A0xe3e9f6d9b24f7f9!2sKaynar%20Hukuk%20B%C3%BCrosu!5e0!3m2!1str!2str!4v1730241234567!5m2!1str!2str"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
    </motion.div>
  );
}
