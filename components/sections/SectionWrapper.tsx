'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  id?: string;
}

export function SectionWrapper({ children, className, containerSize = 'lg', id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

export function SectionHeader({ title, description, badge, className }: SectionHeaderProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('mx-auto max-w-3xl text-center', className)}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-semibold text-brand-primary">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground sm:mt-5 sm:text-xl">{description}</p>}
    </motion.div>
  );
}
