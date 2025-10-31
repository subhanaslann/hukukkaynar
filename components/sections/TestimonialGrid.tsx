'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface TestimonialGridProps {
  testimonials: Testimonial[];
  columns?: 2 | 3;
  className?: string;
}

export function TestimonialGrid({ testimonials, columns = 3, className }: TestimonialGridProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className={cn(
        'grid gap-6 sm:gap-8',
        {
          'sm:grid-cols-2': columns === 2,
          'sm:grid-cols-2 lg:grid-cols-3': columns === 3
        },
        className
      )}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
        >
          <Card className="h-full transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-6">
              <blockquote className="space-y-4">
                <p className="text-sm leading-relaxed italic text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="space-y-1">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && ` • ${testimonial.company}`}
                  </div>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
