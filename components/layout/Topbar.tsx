'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Icons } from '@/components/shared/Icons';
import { Container } from '@/components/shared/Container';

export function Topbar() {
  const tContact = useTranslations('contact');

  const phoneNumber = tContact('phoneNumber');
  const sanitizedNumber = useMemo(() => phoneNumber.replace(/\D/g, ''), [phoneNumber]);
  const telHref = sanitizedNumber ? `+${sanitizedNumber}` : phoneNumber;
  const emailAddress = tContact('emailAddress');
  const whatsappHref = sanitizedNumber ? `https://wa.me/${sanitizedNumber}` : '#';

  return (
    <div className="border-b border-[hsl(var(--line))] bg-[hsl(var(--card))] text-sm">
      <Container>
        <div className="flex flex-col items-center justify-between gap-2 py-2 sm:flex-row sm:py-3">
          <div className="flex items-center gap-4 text-muted">
            <span className="flex items-center gap-2">
              <Icons.mapPin className="h-4 w-4 gold-text" />
              <span className="hidden sm:inline">{tContact('cityShort')}</span>
            </span>
            <span className="flex items-center gap-2">
              <Icons.mail className="h-4 w-4 gold-text" />
              <a href={`mailto:${emailAddress}`} className="transition-colors hover:text-foreground">
                {emailAddress}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${telHref}`}
              className="flex items-center gap-2 font-medium gold-text transition-colors hover:text-gold/80"
            >
              <Icons.phone className="h-4 w-4" />
              <span>{phoneNumber}</span>
            </a>
            <span className="h-4 w-px bg-[hsl(var(--line))]" aria-hidden="true" />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              {tContact('info.whatsapp')}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
