'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Filter, Search, Newspaper, Megaphone, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type IconComponent = typeof Newspaper;

const TYPE_ICONS: Record<string, IconComponent> = {
  haber: Newspaper,
  news: Newspaper,
  'خبر': Newspaper,
  duyuru: Megaphone,
  announcement: Megaphone,
  'إعلان': Megaphone,
  analiz: FileText,
  analysis: FileText,
  'تحليل': FileText
};

interface AdvancedFiltersProps {
  types?: string[];
  sources?: string[];
  selectedTypes?: string[];
  selectedSources?: string[];
  searchQuery?: string;
  onToggleType?: (type: string) => void;
  onToggleSource?: (source: string) => void;
  onSearchChange?: (query: string) => void;
  showTypes?: boolean;
  showSources?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  className?: string;
}

export default function AdvancedFilters({
  types = [],
  sources = [],
  selectedTypes = [],
  selectedSources = [],
  searchQuery = '',
  onToggleType,
  onToggleSource,
  onSearchChange,
  showTypes = true,
  showSources = true,
  showSearch = true,
  searchPlaceholder,
  className
}: AdvancedFiltersProps) {
  const t = useTranslations('filters.advanced');
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (!onSearchChange) return;
    const handle = setTimeout(() => {
      if (localSearch !== searchQuery) {
        onSearchChange(localSearch);
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [localSearch, onSearchChange, searchQuery]);

  const activeAdvancedCount = useMemo(
    () =>
      (showTypes ? selectedTypes.length : 0) +
      (showSources ? selectedSources.length : 0) +
      (showSearch && localSearch ? 1 : 0),
    [selectedSources.length, selectedTypes.length, localSearch, showSearch, showSources, showTypes]
  );

  const panelId = 'advanced-filters-panel';

  return (
    <div className={cn('mt-4', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm font-semibold text-[hsl(var(--fg))] transition-all hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/5 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-1"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={t('toggleAria')}
      >
        <Filter className="h-4 w-4 text-[hsl(var(--gold))]" aria-hidden />
        <span>{t('toggle')}</span>
        {activeAdvancedCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-full bg-[hsl(var(--gold))] px-2 py-0.5 text-xs font-bold text-[hsl(var(--bg))]"
            aria-hidden="true"
          >
            {activeAdvancedCount}
          </motion.span>
        )}
        <svg
          className={cn('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : '')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

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
            <div className="mt-4 space-y-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/70 p-6 shadow-lg backdrop-blur">
              {showSearch && onSearchChange && (
                <div>
                  <label htmlFor="search-input" className="mb-2 block text-sm font-semibold text-[hsl(var(--fg))]">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-[hsl(var(--gold))]" aria-hidden />
                      {t('search.label')}
                    </div>
                  </label>
                  <input
                    id="search-input"
                    type="search"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder={searchPlaceholder ?? t('search.placeholder')}
                    className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-sm text-[hsl(var(--fg))] placeholder:text-[hsl(var(--muted))] focus:border-[hsl(var(--gold))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40"
                  />
                </div>
              )}

              {showTypes && onToggleType && types.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-[hsl(var(--fg))]">{t('types.heading')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {types.map((type) => {
                      const normalized = type.trim().toLowerCase();
                      const Icon = TYPE_ICONS[normalized] ?? FileText;
                      const isSelected = selectedTypes.includes(type);
                      return (
                        <motion.button
                          key={type}
                          type="button"
                          onClick={() => onToggleType(type)}
                          aria-pressed={isSelected}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]',
                            isSelected
                              ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]'
                              : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted))] hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/10 hover:text-[hsl(var(--gold))]'
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                          <span>{type}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSources && onToggleSource && sources.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-[hsl(var(--fg))]">{t('sources.heading')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((source) => {
                      const isSelected = selectedSources.includes(source);
                      return (
                        <button
                          key={source}
                          type="button"
                          onClick={() => onToggleSource(source)}
                          aria-pressed={isSelected}
                          className={cn(
                            'rounded-full border px-4 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]',
                            isSelected
                              ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]'
                              : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted))] hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/10 hover:text-[hsl(var(--gold))]'
                          )}
                        >
                          {source}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
