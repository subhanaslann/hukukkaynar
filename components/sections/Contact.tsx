'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';
import { localizedHref } from '@/lib/i18n/navigation';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kvkk: boolean;
}

export function Contact() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');

  const [formData, setFormData] = React.useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    kvkk: false
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = React.useState('');

  const phoneNumber = t('phoneNumber');
  const normalizedPhone = phoneNumber.replace(/\D/g, '');
  const mapUrl = process.env.NEXT_PUBLIC_MAP_EMBED_URL || '';
  const whatsappUrl = normalizedPhone
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(t('whatsappMessage'))}`
    : '#';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    }));
  };

  const resetFeedback = React.useCallback(() => {
    setTimeout(() => {
      setStatus('idle');
      setFeedback('');
    }, 5000);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('idle');
    setFeedback('');

    if (!formData.kvkk) {
      setStatus('error');
      setFeedback(t('kvkkRequired'));
      resetFeedback();
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFeedback(tForm('success'));
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', kvkk: false });
      } else {
        setStatus('error');
        setFeedback(tForm('error'));
      }
    } catch (error) {
      setStatus('error');
      setFeedback(tForm('error'));
    } finally {
      resetFeedback();
    }
  };

  return (
    <Section id="iletisim" className="bg-[hsl(var(--card))]">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 space-y-6 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                {tForm('name')} {tForm('required')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-foreground placeholder:text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                placeholder={tForm('namePlaceholder')}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  {tForm('email')} {tForm('required')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-foreground placeholder:text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                  placeholder={tForm('emailPlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                  {tForm('phone')} {tForm('required')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-foreground placeholder:text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                  placeholder={tForm('phonePlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                {tForm('subject')} {tForm('required')}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-foreground placeholder:text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                placeholder={tForm('subjectPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                {tForm('message')} {tForm('required')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-foreground placeholder:text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                placeholder={tForm('messagePlaceholder')}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="kvkk"
                name="kvkk"
                type="checkbox"
                checked={formData.kvkk}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] text-gold focus:ring-2 focus:ring-gold"
                required
              />
              <label htmlFor="kvkk" className="text-xs text-muted">
                <a
                  href={localizedHref(locale, '/kvkk/aydinlatma') as any}
                  className="text-gold hover:text-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tForm('kvkkLink')}
                </a>
                {` ${tForm('kvkkConsent')}`}
              </label>
            </div>

            {feedback && (
              <div
                className={`rounded-md border p-4 ${
                  status === 'success'
                    ? 'border-green-500/50 bg-green-500/10 text-green-200'
                    : 'border-red-500/50 bg-red-500/10 text-red-200'
                }`}
                role="alert"
              >
                <div className="flex items-start gap-3">
                  {status === 'success' ? (
                    <Icons.check className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Icons.alert className="h-5 w-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{feedback}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 gold-border bg-gold px-8 py-3.5 text-sm font-semibold text-[hsl(var(--bg))] shadow-md transition-all duration-200 hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>{tForm('sending')}</span>
                </>
              ) : (
                <>
                  <Icons.send className="h-5 w-5" />
                  <span>{tForm('submit')}</span>
                </>
              )}
            </button>

            <p className="text-xs text-muted">{t('note')}</p>
            <p className="text-xs text-muted">{t('disclaimer')}</p>
          </form>
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
