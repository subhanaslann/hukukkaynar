'use client';

import { useMemo } from 'react';
import { Building, Newspaper, Landmark, Scale, Globe, PenSquare, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const SOURCE_ICON_MAP: Record<string, LucideIcon> = {
  'resmi gazete': Newspaper,
  'resmî gazete': Newspaper,
  'yargıtay': Scale,
  'danıştay': Landmark,
  'aym': Landmark,
  'anayasa mahkemesi': Landmark,
  'baro': Building,
  'tbb': Building,
  'tbmm': Landmark,
  'blog': PenSquare,
  'basın': Newspaper,
  'gazete': Newspaper,
  'duyuru': PenSquare,
  'international': Globe,
  'ulusal': Newspaper
};

function getIconForSource(source: string): LucideIcon {
  const normalized = source.trim().toLowerCase();
  return SOURCE_ICON_MAP[normalized] ?? Newspaper;
}

export interface SourceBadgeProps {
  source: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function SourceBadge({ source, className, size = 'md' }: SourceBadgeProps) {
  const Icon = useMemo(() => getIconForSource(source), [source]);
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 font-medium text-[hsl(var(--gold))]',
        padding,
        className
      )}
    >
      <Icon className="shrink-0" size={iconSize} strokeWidth={2} aria-hidden />
      <span>{source}</span>
    </span>
  );
}
