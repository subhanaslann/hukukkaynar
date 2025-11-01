'use client';

import { useMemo } from 'react';
import { FileText, Megaphone, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

const TYPE_ICON_MAP: Record<string, typeof Newspaper> = {
  haber: Newspaper,
  news: Newspaper,
  خبر: Newspaper,
  duyuru: Megaphone,
  announcement: Megaphone,
  'إعلان': Megaphone,
  analiz: FileText,
  analysis: FileText,
  'تحليل': FileText
};

function getIconForType(type: string) {
  const normalized = type.trim().toLowerCase();
  return TYPE_ICON_MAP[normalized] ?? FileText;
}

export interface TypeBadgeProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function TypeBadge({ type, className, size = 'md' }: TypeBadgeProps) {
  const Icon = useMemo(() => getIconForType(type), [type]);
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
      <span>{type}</span>
    </span>
  );
}
