'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface CategoryChipsProps {
  categories: string[];
  selectedCategories: string[];
  onToggle: (category: string) => void;
  counts?: Record<string, number>;
  maxVisibleChips?: number;
}

export default function CategoryChips({
  categories,
  selectedCategories,
  onToggle,
  counts,
  maxVisibleChips = 8
}: CategoryChipsProps) {
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('filters');

  const visibleChips = categories.slice(0, maxVisibleChips);
  const hiddenChips = categories.slice(maxVisibleChips);
  const hasHidden = hiddenChips.length > 0;

  // Filtered categories için arama
  const filteredHidden = searchQuery
    ? hiddenChips.filter((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    : hiddenChips;

  // Dialog açıldığında search input'a focus
  useEffect(() => {
    if (showMore && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMore]);

  // Dialog dışına tıklandığında kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setShowMore(false);
        setSearchQuery('');
      }
    }

    if (showMore) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMore]);

  // Escape tuşu ile kapat
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && showMore) {
        setShowMore(false);
        setSearchQuery('');
      }
    }

    if (showMore) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showMore]);

  return (
    <div className="relative">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-base font-semibold text-[hsl(var(--fg))]">{t('categories.title')}</h3>
        {selectedCategories.length > 0 && (
          <span className="rounded-full bg-[hsl(var(--gold))]/20 px-2 py-0.5 text-xs font-bold text-[hsl(var(--gold))]">
            {selectedCategories.length}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Görünür chip'ler */}
        {visibleChips.map((cat) => (
          <CategoryChip
            key={cat}
            category={cat}
            isSelected={selectedCategories.includes(cat)}
            onToggle={() => onToggle(cat)}
            count={counts?.[cat]}
          />
        ))}

        {/* "Show more" button */}
        {hasHidden && (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm font-medium text-[hsl(var(--muted))] transition-all hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/5 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
            aria-label={t('categories.showMoreAria', { count: hiddenChips.length })}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>{t('categories.showMore', { count: hiddenChips.length })}</span>
          </button>
        )}
      </div>

      {/* Popover/Drawer */}
      <AnimatePresence>
        {showMore && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-label={t('categories.dialogAria')}
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[hsl(var(--fg))]">{t('categories.dialogTitle')}</h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowMore(false);
                    setSearchQuery('');
                  }}
                  className="rounded-lg p-1 text-[hsl(var(--muted))] hover:bg-[hsl(var(--gold))]/10 hover:text-[hsl(var(--gold))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                  aria-label={t('categories.close')}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Arama input */}
              <div className="mb-4">
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('categories.searchPlaceholder')}
                  className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))] px-4 py-2 text-sm focus:border-[hsl(var(--gold))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/30"
                />
              </div>

              {/* Checkbox liste */}
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {filteredHidden.length === 0 ? (
                  <p className="py-8 text-center text-sm text-[hsl(var(--muted))]">{t('categories.empty')}</p>
                ) : (
                  filteredHidden.map((cat) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <label
                        key={cat}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 transition-all hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/5"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggle(cat)}
                          className="h-4 w-4 rounded border-[hsl(var(--border))] text-[hsl(var(--gold))] focus:ring-2 focus:ring-[hsl(var(--gold))]"
                        />
                        <span className="flex-1 text-sm font-medium text-[hsl(var(--fg))]">{cat}</span>
                        {counts?.[cat] !== undefined && (
                          <span className="rounded-full bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-xs font-semibold text-[hsl(var(--gold))]">
                            {counts[cat]}
                          </span>
                        )}
                      </label>
                    );
                  })
                )}
              </div>

              {/* Uygula butonu */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowMore(false);
                    setSearchQuery('');
                  }}
                  className="rounded-lg bg-[hsl(var(--gold))] px-6 py-2 text-sm font-semibold text-[hsl(var(--bg))] transition-colors hover:bg-[hsl(var(--gold))]/90 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2"
                >
                  {t('categories.apply')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CategoryChipProps {
  category: string;
  isSelected: boolean;
  onToggle: () => void;
  count?: number;
}

function CategoryChip({ category, isSelected, onToggle, count }: CategoryChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative overflow-hidden rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-1
        ${
          isSelected
            ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))] text-[hsl(var(--bg))] shadow-md shadow-[hsl(var(--gold))]/20'
            : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted))] hover:border-[hsl(var(--gold))]/50 hover:bg-[hsl(var(--gold))]/5'
        }
      `}
    >
      {/* Subtle glow effect */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="absolute inset-0 bg-gradient-to-br from-white to-transparent"
        />
      )}

      <span className="relative flex items-center gap-2">
        {category}
        {count !== undefined && (
          <span
            className={`
            rounded-full px-1.5 py-0.5 text-xs font-bold
            ${isSelected ? 'bg-[hsl(var(--bg))]/20 text-[hsl(var(--bg))]' : 'bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]'}
          `}
          >
            {count}
          </span>
        )}
      </span>
    </motion.button>
  );
}
