'use client';

import { useEffect, useRef } from 'react';

interface Logo {
  name: string;
}

interface LogoMarqueeProps {
  logos: Logo[];
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={marqueeRef}
        className="flex gap-8 animate-marquee whitespace-nowrap"
      >
        {/* İlk set */}
        {logos.map((logo, index) => (
          <div
            key={`logo-1-${index}`}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-muted-foreground"
          >
            {logo.name}
          </div>
        ))}
        {/* İkinci set - seamless loop için */}
        {logos.map((logo, index) => (
          <div
            key={`logo-2-${index}`}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-muted-foreground"
          >
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
