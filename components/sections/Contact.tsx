'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';
import ContactForm from '@/components/contact/ContactForm';
import { type Locale } from '@/i18n';
import { MAP_EMBED_URL } from '@/lib/site-config';

export function Contact() {
  const locale = useLocale() as Locale;
  const t = useTranslations('contact');

  const phoneNumber = t('phoneNumber');
  const normalizedPhone = phoneNumber.replace(/\D/g, '');
  const mapUrl = MAP_EMBED_URL;
  const whatsappUrl = normalizedPhone
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(t('whatsappMessage'))}`
    : '#';

  return (
    <Section id="iletisim" className="bg-[hsl(var(--card))]">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 space-y-6 lg:order-1">
          <ContactForm locale={locale} />
          <p className="text-xs text-muted">{t('note')}</p>
          <p className="text-xs text-muted">{t('disclaimer')}</p>
        </div>

        <div className="order-1 space-y-8 lg:order-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border gold-border bg-gold/10">
                <Icons.mapPin className="h-6 w-6 gold-text" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">{t('info.address')}</h3>
                <p className="text-sm text-muted">
                  {t('addressText')}
                  <br />
                  {t('cityText')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border gold-border bg-gold/10">
                <Icons.phone className="h-6 w-6 gold-text" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">{t('info.phone')}</h3>
                <a href={normalizedPhone ? `tel:+${normalizedPhone}` : '#'} className="text-sm text-muted transition-colors hover:text-gold">
                  {phoneNumber}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border gold-border bg-gold/10">
                <Icons.mail className="h-6 w-6 gold-text" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">{t('info.email')}</h3>
                <a href={`mailto:${t('emailAddress')}`} className="text-sm text-muted transition-colors hover:text-gold">
                  {t('emailAddress')}
                </a>
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border gold-border bg-gold/10 p-4 transition-all hover:bg-gold/20"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border gold-border bg-gold/20">
              <Icons.whatsapp className="h-6 w-6 gold-text" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t('info.whatsapp')}</h3>
              <p className="text-sm text-muted">{t('info.whatsappDesc')}</p>
            </div>
          </a>

          {mapUrl ? (
            <div className="aspect-video overflow-hidden rounded-lg border gold-line">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('mapTitle')}
              />
            </div>
          ) : (
            <div className="aspect-video rounded-lg border gold-line bg-[hsl(var(--card))] flex items-center justify-center">
              <p className="text-sm text-muted">{t('mapFallback')}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
