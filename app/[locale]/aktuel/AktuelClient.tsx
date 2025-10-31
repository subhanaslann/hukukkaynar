'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatDate, getRelativeTime } from '@/lib/formatDate';
import { getAllNews } from '@/lib/aktuel';
import {
  extractAllCategories,
  extractAllSources,
  extractAllTypes,
  filterNewsItems,
  getCategoryCounts
} from '@/lib/filters/filterLogic';
import {
  DEFAULT_FILTER_STATE,
  getActiveFilterCount,
  parseFiltersFromURL,
  serializeFiltersToURL,
  type FilterState
} from '@/lib/filters/urlSync';
import { getQuickRange, type DateRangeOption } from '@/lib/filters/quickRanges';
import FilterBar from '@/components/filters/FilterBar';
import ActiveFilters from '@/components/filters/ActiveFilters';
import CategoryChips from '@/components/filters/CategoryChips';
import AdvancedFilters from '@/components/filters/AdvancedFilters';
import DateRangePicker from '@/components/filters/DateRangePicker';
import { useAnimEnabled } from '@/components/AnimationProvider';
import Reveal from '@/components/Reveal';
import { localizedHref } from '@/lib/i18n/navigation';
import { PAGE_COPY } from './pageCopy';
import type { Locale } from '@/i18n';

const newsItems = getAllNews();

function formatResultsLabel(count: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar' : 'en-US').format(count);

  if (locale === 'en') {
    return `${formatted} ${count === 1 ? 'result found' : 'results found'}`;
  }

  if (locale === 'ar') {
    return `عدد النتائج: ${formatted}`;
  }

  return `${formatted} sonuç bulundu`;
}

interface AktuelClientProps {
  locale: Locale;
}

export default function AktuelClient({ locale }: AktuelClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tFilters = useTranslations('filters');
  const tNav = useTranslations('nav');
  const tNews = useTranslations('news');
  const animEnabled = useAnimEnabled('lite');
  const copy = PAGE_COPY[locale] ?? PAGE_COPY.tr;
  const basePath = useMemo(() => localizedHref(locale, '/aktuel'), [locale]);
  const allCategories = useMemo(() => extractAllCategories(newsItems), []);
  const allTypes = useMemo(() => extractAllTypes(newsItems), []);
  const allSources = useMemo(() => extractAllSources(newsItems), []);
  const [filters, setFilters] = useState<FilterState>(() =>
    parseFiltersFromURL(new URLSearchParams(searchParams.toString()))
  );
  const [selectedQuickRange, setSelectedQuickRange] = useState<DateRangeOption | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimer.current) {
        clearTimeout(loadingTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const queryString = serializeFiltersToURL(filters);
    const nextUrl = `${basePath}${queryString}`;

    if (typeof window !== 'undefined') {
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (nextUrl !== currentUrl) {
        router.replace(nextUrl as any, { scroll: false });
      }
    }
  }, [filters, basePath, router]);

  useEffect(() => {
    if (!filters.dateRange && selectedQuickRange === 'custom') {
      setSelectedQuickRange(null);
    }
  }, [filters.dateRange, selectedQuickRange]);

  const filteredItems = useMemo(() => filterNewsItems(newsItems, filters), [filters]);
  const categoryCounts = useMemo(() => getCategoryCounts(newsItems, filters), [filters]);
  const resultsLabel = useMemo(() => formatResultsLabel(filteredItems.length, locale), [filteredItems.length, locale]);
  const activeFiltersLabel = tFilters('active.title', { count: getActiveFilterCount(filters) });

  function handleDateRangeSelect(option: DateRangeOption) {
    if (loadingTimer.current) {
      clearTimeout(loadingTimer.current);
    }
    setSelectedQuickRange(option);

    if (option === 'custom') {
      setIsLoading(false);
      setShowDatePicker(true);
      return;
    }

    const range = getQuickRange(option);
    setFilters((prev) => ({ ...prev, dateRange: range }));
    setIsLoading(true);
    loadingTimer.current = setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }

  function handleSortChange(sort: 'desc' | 'asc') {
    setFilters((prev) => ({ ...prev, sort }));
  }

  function handleReset() {
    if (loadingTimer.current) {
      clearTimeout(loadingTimer.current);
    }
    setIsLoading(false);
    setSelectedQuickRange(null);
    setShowDatePicker(false);
    setFilters(DEFAULT_FILTER_STATE);
    router.push(basePath as any);
  }

  function handleToggleCategory(category: string) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category]
    }));
  }

  function handleToggleType(type: string) {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter((item) => item !== type) : [...prev.types, type]
    }));
  }

  function handleToggleSource(source: string) {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.includes(source) ? prev.sources.filter((item) => item !== source) : [...prev.sources, source]
    }));
  }

  function handleSearchChange(query: string) {
    setFilters((prev) => ({ ...prev, search: query }));
  }

  function handleRemoveDateRange() {
    if (loadingTimer.current) {
      clearTimeout(loadingTimer.current);
    }
    setFilters((prev) => ({ ...prev, dateRange: null }));
    setSelectedQuickRange(null);
    setIsLoading(false);
  }

  function handleRemoveSearch() {
    setFilters((prev) => ({ ...prev, search: '' }));
  }

  const listBaseLabel = `${tNav('news')} – ${resultsLabel}`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      <Reveal>
        <header className="mb-8 text-center sm:mb-12">
          <h1 className="text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl lg:text-5xl">{tNav('news')}</h1>
          <div className="mx-auto mt-3 h-1 w-24 gold-line" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-[hsl(var(--muted))] sm:text-lg">{copy.subtitle}</p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[hsl(var(--muted))] sm:text-base">{copy.description}</p>
        </header>
      </Reveal>

      <FilterBar
        filters={filters}
        onDateRangeSelect={handleDateRangeSelect}
        onSortChange={handleSortChange}
        onReset={handleReset}
        selectedQuickRange={selectedQuickRange}
      />

      <div className="sr-only" aria-live="polite">
        {activeFiltersLabel}
      </div>

      <div className="mt-6">
        <ActiveFilters
          filters={filters}
          onRemoveCategory={handleToggleCategory}
          onRemoveType={handleToggleType}
          onRemoveSource={handleToggleSource}
          onRemoveDateRange={handleRemoveDateRange}
          onRemoveSearch={handleRemoveSearch}
          onClearAll={handleReset}
        />
      </div>

      <div className="mb-6 mt-4" role="status" aria-live="polite">
        <p className="text-sm font-semibold text-[hsl(var(--muted))]">{resultsLabel}</p>
      </div>

      <div className="mb-6">
        <CategoryChips
          categories={allCategories}
          selectedCategories={filters.categories}
          onToggle={handleToggleCategory}
          counts={categoryCounts}
          maxVisibleChips={8}
        />
      </div>

      <AdvancedFilters
        types={allTypes}
        sources={allSources}
        selectedTypes={filters.types}
        selectedSources={filters.sources}
        searchQuery={filters.search}
        onToggleType={handleToggleType}
        onToggleSource={handleToggleSource}
        onSearchChange={handleSearchChange}
      />

      <div className="mt-8">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
                aria-hidden="true"
              >
                <div className="mb-2 h-4 w-24 rounded bg-[hsl(var(--border))]" />
                <div className="mb-2 h-6 w-3/4 rounded bg-[hsl(var(--border))]" />
                <div className="h-16 w-full rounded bg-[hsl(var(--border))]" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-12 text-center"
            role="status"
            aria-live="polite"
          >
            <svg className="mx-auto mb-4 h-16 w-16 text-[hsl(var(--muted))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-[hsl(var(--fg))]">{copy.emptyTitle}</h3>
            <p className="text-sm text-[hsl(var(--muted))]">{copy.emptyDescription}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.ul layout className="space-y-4" aria-label={listBaseLabel}>
              {filteredItems.map((item, index) => {
                const detailHref = localizedHref(locale, `/${item.id}`);
                return (
                  <motion.li
                    key={item.id}
                    layout
                    initial={animEnabled ? { opacity: 0, y: 20 } : {}}
                    animate={animEnabled ? { opacity: 1, y: 0 } : {}}
                    exit={animEnabled ? { opacity: 0, scale: 0.95 } : {}}
                    transition={{ delay: animEnabled ? index * 0.05 : 0 }}
                    className="group relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-[hsl(var(--gold))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--muted))]">
                          <time className="font-semibold text-[hsl(var(--gold))]">
                            {formatDate(item.date, 'long', locale)}
                          </time>
                          <span aria-hidden="true">•</span>
                          <span>{getRelativeTime(item.date, locale)}</span>
                          {item.type && (
                            <>
                              <span aria-hidden="true">•</span>
                              <span className="rounded-md bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-xs font-semibold text-[hsl(var(--gold))] border border-[hsl(var(--gold))]/30">
                                {item.type}
                              </span>
                            </>
                          )}
                          {item.source && (
                            <>
                              <span aria-hidden="true">•</span>
                              <span className="text-sm font-medium text-[hsl(var(--muted))]">{item.source}</span>
                            </>
                          )}
                        </div>

                        <Link href={detailHref as any}>
                          <h3 className="mb-2 text-xl font-bold leading-tight text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--gold))]">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="text-[hsl(var(--muted))]">{item.excerpt}</p>

                        {item.categories && item.categories.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.categories.map((category) => (
                              <span
                                key={category}
                                className="rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-2.5 py-1 text-xs font-medium text-[hsl(var(--gold))]"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-[hsl(var(--card))] px-3 py-1 text-xs font-semibold text-[hsl(var(--muted))] border border-[hsl(var(--border))]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link href={detailHref as any} aria-label={item.title}>
                        <motion.div whileHover={{ x: 4 }} className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] shadow-md transition-all hover:bg-[hsl(var(--gold))]/20">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {showDatePicker && (
          <DateRangePicker
            value={filters.dateRange}
            onChange={(range) => {
              setFilters((prev) => ({ ...prev, dateRange: range }));
              setSelectedQuickRange(range ? 'custom' : null);
            }}
            onClose={() => {
              setShowDatePicker(false);
            }}
          />
        )}
      </AnimatePresence>

      <footer className="mt-12 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-sm text-[hsl(var(--muted))]">
        {tNews('disclaimer')}
      </footer>
    </section>
  );
}
