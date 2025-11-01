'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import { PetitionContact } from '@/components/contact/PetitionContact';
import { type Locale } from '@/i18n';

export default function IletisimPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations('contact');

  const mapUrl = process.env.NEXT_PUBLIC_MAP_EMBED_URL || '';
  const whatsappNumber = t('phoneNumber');
  const whatsappMessage = 'Merhaba, hukuki destek almak istiyorum.';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="min-h-screen bg-[hsl(var(--bg))]">
        {/* Header Section */}
        <div className="border-b gold-line bg-[hsl(var(--card))]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-serif font-bold text-foreground sm:text-4xl">{t('title')}</h1>
            <p className="mt-4 text-lg text-muted max-w-2xl">{t('description')}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 space-y-6 lg:order-1">
              <PetitionContact variant="page" locale={locale} />
              <p className="text-xs text-muted">{t('note')}</p>
              <p className="text-xs text-muted">{t('disclaimer')}</p>
            </div>

            {/* Contact Info & Map */}
            <div className="order-1 lg:order-2 space-y-8">
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
                    <a href={`tel:${t('phoneNumber')}`} className="text-sm text-muted hover:text-gold transition-colors">
                      {t('phoneNumber')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border gold-border bg-gold/10">
                    <Icons.mail className="h-6 w-6 gold-text" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{t('info.email')}</h3>
                    <a href={`mailto:${t('emailAddress')}`} className="text-sm text-muted hover:text-gold transition-colors">
                      {t('emailAddress')}
                    </a>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border gold-border bg-gold/10 p-4 hover:bg-gold/20 transition-all group"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border gold-border bg-gold/20 group-hover:bg-gold/30 transition-colors">
                    <Icons.whatsapp className="h-6 w-6 gold-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t('info.whatsapp')}</h3>
                    <p className="text-sm text-muted">{t('info.whatsappDesc')}</p>
                  </div>
                </a>
              </div>

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
                    title="Kaynar Hukuk Bürosu Konum"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-lg border gold-line bg-[hsl(var(--card))] flex items-center justify-center">
                  <p className="text-sm text-muted">Harita yüklenemedi</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
