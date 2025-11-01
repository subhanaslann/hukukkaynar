'use client';

import { cn } from '@/lib/utils';

interface ListSkeletonProps {
  rows?: number;
  className?: string;
}

export function ListSkeleton({ rows = 3, className }: ListSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-3 w-24 rounded-full bg-[hsl(var(--border))]" />
            <div className="h-3 w-16 rounded-full bg-[hsl(var(--border))]/80" />
          </div>
          <div className="mt-4 h-6 w-3/4 rounded bg-[hsl(var(--border))]" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full rounded bg-[hsl(var(--border))]/80" />
            <div className="h-3 w-5/6 rounded bg-[hsl(var(--border))]/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
