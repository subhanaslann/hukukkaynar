'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface AdvancedFiltersProps {
  types: string[];
  sources: string[];
  selectedTypes: string[];
  selectedSources: string[];
  searchQuery: string;
  onToggleType: (type: string) => void;
  onToggleSource: (source: string) => void;
  onSearchChange: (query: string) => void;
}

const TYPE_ICONS: Record<string, string> = {
  haber: '📰',
  duyuru: '📢',
  analiz: '📚',
  news: '📰',
  announcement: '📢',
  analysis: '📚',
  'خبر': '📰',
  'إعلان': '📢',
  'تحليل': '📚'
};

function resolveTypeIcon(type: string): string {
  const normalized = type.trim().toLowerCase();
  return TYPE_ICONS[normalized] ?? '📄';
}

export default function AdvancedFilters({
  types,
  sources,
  selectedTypes,
  selectedSources,
  searchQuery,
  onToggleType,
  onToggleSource,
  onSearchChange
}: AdvancedFiltersProps) {
  const t = useTranslations('filters.advanced');
  const [isOpen, setIsOpen] = useState(false);

  const activeAdvancedCount = useMemo(
    () => selectedTypes.length + selectedSources.length + (searchQuery ? 1 : 0),
    [selectedTypes.length, selectedSources.length, searchQuery]
  );

  const panelId = 'advanced-filters-panel';

  return (
    <div className="mt-4">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-primary-300 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition-all hover:border-accentBlue-400 hover:bg-accentBlue-50 focus:outline-none focus:ring-2 focus:ring-accentBlue-500"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={t('toggleAria')}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>{t('toggle')}</span>
        {activeAdvancedCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-full bg-accentBlue-600 px-2 py-0.5 text-xs font-bold text-white"
            aria-hidden="true"
          >
            {activeAdvancedCount}
          </motion.span>
        )}
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={t('panelAria')}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-6 rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 shadow-sm">
              {/* Search */}
              <div>
                <label htmlFor="search-input" className="mb-2 block text-sm font-semibold text-primary-900">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {t('search.label')}
                  </div>
                </label>
                <input
                  id="search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full rounded-lg border border-primary-300 px-4 py-2.5 text-sm focus:border-accentBlue-500 focus:outline-none focus:ring-2 focus:ring-accentBlue-500/30"
                />
              </div>

              {/* Content type */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-primary-900">{t('types.heading')}</h4>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => {
                    const isSelected = selectedTypes.includes(type);
                    const icon = resolveTypeIcon(type);
                    return (
                      <motion.button
                        key={type}
                        type="button"
                        onClick={() => onToggleType(type)}
                        aria-pressed={isSelected}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`
                          flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all
                          focus:outline-none focus:ring-2 focus:ring-accentBlue-500
                          ${
                            isSelected
                              ? 'border-accentEmerald-500 bg-accentEmerald-50 text-accentEmerald-800 shadow-sm'
                              : 'border-primary-300 bg-white text-primary-700 hover:border-accentEmerald-400 hover:bg-accentEmerald-50/50'
                          }
                        `}
                      >
                        <span className="text-base" aria-hidden="true">
                          {icon}
                        </span>
                        <span>{type}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Sources */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-primary-900">{t('sources.heading')}</h4>
                <div className="space-y-2">
                  {sources.map((source) => {
                    const isSelected = selectedSources.includes(source);
                    return (
                      <label
                        key={source}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-primary-200 bg-white p-3 transition-all hover:border-accentSaffron-300 hover:bg-accentSaffron-50/50"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSource(source)}
                          className="h-4 w-4 rounded border-primary-300 text-accentSaffron-600 focus:ring-2 focus:ring-accentSaffron-500"
                        />
                        <span className="flex-1 text-sm font-medium text-primary-800">{source}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
