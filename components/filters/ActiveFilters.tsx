'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import type { FilterState } from '@/lib/filters/urlSync';
import { getActiveFilterCount } from '@/lib/filters/urlSync';
import { formatDate } from '@/lib/formatDate';
import type { Locale } from '@/i18n';

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveCategory: (category: string) => void;
  onRemoveType: (type: string) => void;
  onRemoveSource: (source: string) => void;
  onRemoveDateRange: () => void;
  onRemoveSearch: () => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  filters,
  onRemoveCategory,
  onRemoveType,
  onRemoveSource,
  onRemoveDateRange,
  onRemoveSearch,
  onClearAll
}: ActiveFiltersProps) {
  const activeCount = getActiveFilterCount(filters);
  const t = useTranslations('filters');
  const locale = useLocale() as Locale;
  const dateRangeLabel = filters.dateRange
    ? `${formatDate(filters.dateRange.start, 'short', locale)} – ${formatDate(filters.dateRange.end, 'short', locale)}`
    : null;
  const getRemoveLabel = (label: string) => t('active.remove', { label });

  if (activeCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-4 rounded-lg border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-3"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[hsl(var(--fg))]">{t('active.title', { count: activeCount })}</h3>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-medium text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-1"
        >
          {t('active.clearAll')}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {/* Tarih aralığı pill */}
          {dateRangeLabel && (
            <FilterPill
              key="dateRange"
              label={dateRangeLabel}
              ariaLabel={getRemoveLabel(dateRangeLabel)}
              onRemove={onRemoveDateRange}
              icon="calendar"
            />
          )}

          {/* Kategori pills */}
          {filters.categories.map((cat) => (
            <FilterPill key={`cat-${cat}`} label={cat} ariaLabel={getRemoveLabel(cat)} onRemove={() => onRemoveCategory(cat)} icon="category" />
          ))}

          {/* Tip pills */}
          {filters.types.map((type) => (
            <FilterPill key={`type-${type}`} label={type} ariaLabel={getRemoveLabel(type)} onRemove={() => onRemoveType(type)} icon="type" />
          ))}

          {/* Kaynak pills */}
          {filters.sources.map((source) => (
            <FilterPill key={`source-${source}`} label={source} ariaLabel={getRemoveLabel(source)} onRemove={() => onRemoveSource(source)} icon="source" />
          ))}

          {/* Arama pill */}
          {filters.search && (
            <FilterPill
              key="search"
              label={`"${filters.search}"`}
              ariaLabel={getRemoveLabel(filters.search)}
              onRemove={onRemoveSearch}
              icon="search"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface FilterPillProps {
  label: string;
  ariaLabel: string;
  onRemove: () => void;
  icon?: 'calendar' | 'category' | 'type' | 'source' | 'search';
}

function FilterPill({ label, ariaLabel, onRemove, icon }: FilterPillProps) {
  const iconMap = {
    calendar: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
    category: <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />,
    type: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    source: <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      className="group flex items-center gap-1.5 rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--card))] px-3 py-1.5 text-sm shadow-sm"
    >
      {icon && (
        <svg className="h-3.5 w-3.5 text-[hsl(var(--gold))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {iconMap[icon]}
        </svg>
      )}
      <span className="font-medium text-[hsl(var(--fg))]">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={ariaLabel}
        className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[hsl(var(--muted))] transition-colors hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}
