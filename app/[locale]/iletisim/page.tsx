'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';

export default function IletisimPage() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    kvkk: false,
    newsletter: false
  });
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    if (!formData.kvkk) {
      setStatus('error');
      setMessage('KVKK onayı gereklidir.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setMessage(tForm('success'));
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', kvkk: false, newsletter: false });
      } else {
        setStatus('error');
        setMessage(tForm('error'));
      }
    } catch (error) {
      setStatus('error');
      setMessage(tForm('error'));
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

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
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    {tForm('name')} {tForm('required')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                      type="email"
                      id="email"
                      name="email"
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
                      type="tel"
                      id="phone"
                      name="phone"
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
                    type="text"
                    id="subject"
                    name="subject"
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
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-foreground placeholder:text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors resize-none"
                    placeholder={tForm('messagePlaceholder')}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="kvkk"
                    name="kvkk"
                    checked={formData.kvkk}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] text-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <label htmlFor="kvkk" className="text-sm text-muted">
                    <a href={`/${locale}/kvkk/aydinlatma`} className="gold-text hover:underline">
                      {tForm('kvkkLink')}
                    </a>
                    {tForm('kvkkConsent')} {tForm('required')}
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] text-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <label htmlFor="newsletter" className="text-sm text-muted">
                    {tForm('newsletter')}
                  </label>
                </div>

                {message && (
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
                      <p className="text-sm">{message}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 gold-border bg-gold px-8 py-3.5 text-sm font-semibold text-[hsl(var(--bg))] shadow-md hover:bg-gold/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
