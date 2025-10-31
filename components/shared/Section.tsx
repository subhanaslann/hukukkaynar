import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noPadding?: boolean;
}

export function Section({ className, containerSize = 'lg', noPadding = false, children, ...props }: SectionProps) {
  return (
    <section className={cn(!noPadding && 'py-16 sm:py-20 lg:py-24', className)} {...props}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ label, title, description, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 lg:mb-16', align === 'center' && 'mx-auto max-w-3xl text-center')}>
      {label && (
        <div className="mb-4 text-sm font-semibold uppercase tracking-wider gold-text">{label}</div>
      )}
      <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted sm:mt-5">{description}</p>}
    </div>
  );
}
