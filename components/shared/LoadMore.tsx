'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  auto?: boolean;
  className?: string;
  label?: string;
  loadingLabel?: string;
}

export function LoadMore({
  onLoadMore,
  hasMore,
  isLoading,
  auto = true,
  className,
  label = 'Load more',
  loadingLabel = 'Loading...'
}: LoadMoreProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!auto || !hasMore || isLoading) return;
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [auto, hasMore, isLoading, onLoadMore]);

  if (!hasMore && !isLoading) {
    return null;
  }

  return (
    <div ref={sentinelRef} className={cn('mt-8 flex justify-center', className)}>
      <button
        type="button"
        onClick={onLoadMore}
        disabled={!hasMore || isLoading}
        className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--gold))]/40 bg-[hsl(var(--card))] px-4 py-2 text-sm font-semibold text-[hsl(var(--gold))] transition-colors hover:bg-[hsl(var(--gold))]/10 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--bg))] disabled:cursor-not-allowed disabled:opacity-60"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[hsl(var(--gold))]/40 border-t-[hsl(var(--gold))]" aria-hidden />
            {loadingLabel}
          </>
        ) : (
          label
        )}
      </button>
    </div>
  );
}
