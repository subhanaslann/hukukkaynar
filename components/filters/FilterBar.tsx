'use client';

import { useTranslations } from 'next-intl';
import type { DateRangeOption } from '@/lib/filters/quickRanges';
import { QUICK_RANGE_OPTIONS } from '@/lib/filters/quickRanges';
import type { FilterState } from '@/lib/filters/urlSync';

interface FilterBarProps {
  filters: FilterState;
  onDateRangeSelect: (option: DateRangeOption) => void;
  onSortChange: (sort: 'desc' | 'asc') => void;
  onReset: () => void;
  selectedQuickRange: DateRangeOption | null;
}

export default function FilterBar({ filters, onDateRangeSelect, onSortChange, onReset, selectedQuickRange }: FilterBarProps) {
  const t = useTranslations('filters');
  const nextSort = filters.sort === 'desc' ? 'asc' : 'desc';
  const sortLabel = t(`sort.${filters.sort}`);

  return (
    <div className="sticky top-0 z-20 -mx-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Date quick shortcuts */}
        <div className="flex items-center gap-2" role="group" aria-label={t('date.groupLabel')}>
          <span className="text-sm font-medium text-[hsl(var(--muted))]">{`${t('date.label')}:`}</span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onDateRangeSelect(option)}
                aria-pressed={selectedQuickRange === option}
                className={`
                  rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-150
                  hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-1
                  ${
                    selectedQuickRange === option
                      ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] shadow-sm'
                      : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted))] hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/5'
                  }
                `}
              >
                {t(`date.ranges.${option}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & reset */}
        <div className="flex items-center gap-2">
          {/* Sort */}
          <button
            type="button"
            onClick={() => onSortChange(nextSort)}
            className="flex items-center gap-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-sm font-medium text-[hsl(var(--muted))] transition-all hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/5 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
            aria-label={t('sort.aria', { direction: sortLabel })}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {filters.sort === 'desc' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              )}
            </svg>
            <span className="hidden sm:inline">{sortLabel}</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-sm font-medium text-[hsl(var(--muted))] transition-all hover:border-red-400 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={t('reset.aria')}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden sm:inline">{t('reset.label')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
