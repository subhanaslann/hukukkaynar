'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useAnim } from './AnimationProvider';
import type { AnimDensity } from '@/lib/animPolicy';

const densityIcons: Record<AnimDensity, string> = {
  off: '○',
  lite: '◔',
  rich: '◑',
  max: '●'
};

export default function AnimationToggle() {
  const { density, effectiveDensity, setDensity } = useAnim();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('animation');

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: AnimDensity[] = ['off', 'lite', 'rich', 'max'];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border border-primary-200 bg-white px-3 py-1.5 text-sm text-primary-700 transition-colors hover:bg-primary-50 hover:text-primary-900"
        aria-label={t('settingsAria')}
        title={t('settingsTitle')}
      >
        <span className="text-base">{densityIcons[effectiveDensity]}</span>
        <span className="hidden sm:inline">{t('label')}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-primary-100 bg-white shadow-lg">
          <div className="p-1">
            <div className="border-b border-primary-100 px-3 py-2 text-xs font-medium text-primary-500">
              {t('menuHeading')}
            </div>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setDensity(option);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors ${
                  density === option
                    ? 'bg-primary-100 text-primary-900 font-medium'
                    : 'text-primary-700 hover:bg-primary-50'
                }`}
              >
                <span className="text-base">{densityIcons[option]}</span>
                <span>{t(`density.${option}`)}</span>
              </button>
            ))}
          </div>
          {effectiveDensity === 'off' && density !== 'off' && (
            <div className="border-t border-primary-100 px-3 py-2 text-xs text-primary-500">
              {t('reducedMotionWarning')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
