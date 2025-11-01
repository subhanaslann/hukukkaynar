'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
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
import { SourceBadge } from '@/components/news/SourceBadge';
import { TypeBadge } from '@/components/news/TypeBadge';
import { ListSkeleton } from '@/components/shared/ListSkeleton';
import { LoadMore } from '@/components/shared/LoadMore';
import { PAGE_COPY } from './pageCopy';
import type { Locale } from '@/i18n';

const newsItems = getAllNews();
const PER_PAGE = 12;

function formatResultsLabel(count: number, locale: Locale, resultsFoundText: string): string {
  const formatted = new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar' : 'en-US').format(count);
  return `${formatted} ${resultsFoundText}`;
}

interface AktuelClientProps {
  locale: Locale;
}

export default function AktuelClient({ locale: _localeProp }: AktuelClientProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const searchParams = useSearchParams();
  const tFilters = useTranslations('filters');
  const tNav = useTranslations('nav');
  const tNews = useTranslations('news');
  const animEnabled = useAnimEnabled('lite');
  const copy = PAGE_COPY[locale] ?? PAGE_COPY.tr;
  const basePath = `/aktuel`;
  const allCategories = useMemo(() => extractAllCategories(newsItems), []);
  const allTypes = useMemo(() => extractAllTypes(newsItems), []);
  const allSources = useMemo(() => extractAllSources(newsItems), []);
  const [filters, setFilters] = useState<FilterState>(() =>
    parseFiltersFromURL(new URLSearchParams(searchParams.toString()))
  );
  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [selectedQuickRange, setSelectedQuickRange] = useState<DateRangeOption | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => (prev.search === searchDraft ? prev : { ...prev, search: searchDraft }));
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchDraft]);

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
  const paginatedItems = useMemo(
    () => filteredItems.slice(0, page * PER_PAGE),
    [filteredItems, page]
  );
  const hasMore = paginatedItems.length < filteredItems.length;
  const shouldAnimate = animEnabled && page * PER_PAGE < 160;
  const resultsLabel = useMemo(() => formatResultsLabel(filteredItems.length, locale, tNews('resultsFound')), [filteredItems.length, locale, tNews]);
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
    setPage(1);
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
    setPage(1);
    router.push(basePath as any);
  }

  function handleToggleCategory(category: string) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category]
    }));
    setPage(1);
  }

  function handleToggleType(type: string) {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter((item) => item !== type) : [...prev.types, type]
    }));
    setPage(1);
  }

  function handleToggleSource(source: string) {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.includes(source) ? prev.sources.filter((item) => item !== source) : [...prev.sources, source]
    }));
    setPage(1);
  }

  function handleSearchChange(query: string) {
    setSearchDraft(query);
  }

  function handleRemoveDateRange() {
    if (loadingTimer.current) {
      clearTimeout(loadingTimer.current);
    }
    setFilters((prev) => ({ ...prev, dateRange: null }));
    setSelectedQuickRange(null);
    setIsLoading(false);
    setPage(1);
  }

  function handleRemoveSearch() {
    setSearchDraft('');
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
        searchQuery={searchDraft}
        onToggleType={handleToggleType}
        onToggleSource={handleToggleSource}
        onSearchChange={handleSearchChange}
        showSearch
        showTypes
        showSources
      />

      <div className="mt-8 content-visibility-auto">
        {isLoading ? (
          <ListSkeleton rows={3} />
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-12 text-center shadow-lg"
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
              {paginatedItems.map((item, index) => {
                const detailHref = `/aktuel/${item.id}`;
                const animationDelay = shouldAnimate ? index * 0.04 : 0;
                return (
                  <motion.li
                    key={item.id}
                    layout
                    initial={shouldAnimate ? { opacity: 0, y: 18 } : {}}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                    exit={shouldAnimate ? { opacity: 0, scale: 0.95 } : {}}
                    transition={{ delay: animationDelay }}
                    className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 bg-[hsl(var(--gold))] opacity-80" aria-hidden />
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                          <time className="font-semibold text-[hsl(var(--gold))]">
                            {formatDate(item.date, 'long', locale)}
                          </time>
                          <span className="text-[hsl(var(--muted))]">{getRelativeTime(item.date, locale)}</span>
                          {item.type && <TypeBadge type={item.type} size="sm" />}
                          {item.source && <SourceBadge source={item.source} size="sm" />}
                        </div>

                        <div className="space-y-3">
                          <Link href={detailHref} className="block focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]">
                            <h3 className="text-xl font-bold leading-tight text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--gold))] sm:text-2xl">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm leading-relaxed text-[hsl(var(--muted))] sm:text-base">{item.excerpt}</p>
                        </div>

                        {item.categories && item.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.categories.slice(0, 4).map((category) => (
                              <span
                                key={category}
                                className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[hsl(var(--gold))]"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link href={detailHref} aria-label={item.title} className="self-center md:self-start">
                        <motion.div whileHover={{ x: 4 }} className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] shadow-md transition-all hover:bg-[hsl(var(--gold))]/20">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
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

      <LoadMore
        onLoadMore={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        isLoading={isLoading}
        label={tNews('loadMore')}
        loadingLabel={tNews('loadingMore')}
      />

      <AnimatePresence>
        {showDatePicker && (
      <DateRangePicker
        value={filters.dateRange}
        onChange={(range) => {
          setFilters((prev) => ({ ...prev, dateRange: range }));
          setSelectedQuickRange(range ? 'custom' : null);
          setPage(1);
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
