'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import FormStatus from '@/components/FormStatus';
import { localizedHref } from '@/lib/i18n/navigation';
import type { Locale } from '@/i18n';

interface ContactFormProps {
  locale: Locale;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const tForm = useTranslations('contact.form');

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');
  const [kvkk, setKvkk] = React.useState(false);

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const kvkkHref = React.useMemo(() => localizedHref(locale, '/kvkk/aydinlatma'), [locale]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = tForm('requiredField');
    if (!email.trim()) next.email = tForm('requiredField');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = tForm('emailInvalid');
    if (!phone.trim()) next.phone = tForm('requiredField');
    if (!subject.trim()) next.subject = tForm('requiredField');
    if (!body.trim()) next.message = tForm('requiredField');
    if (!kvkk) next.kvkk = tForm('kvkkRequired');
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      setStatus('error');
      setMessage(tForm('validationError'));
      return;
    }
    setStatus('loading');
    setMessage('');
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message: body, kvkk })
      });
      if (res.ok) {
        setStatus('success');
        setMessage(tForm('success'));
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setBody('');
        setKvkk(false);
      } else {
        setStatus('error');
        setMessage(tForm('error'));
      }
    } catch {
      setStatus('error');
      setMessage(tForm('error'));
    }
  };

  return (
    <div className="rounded-xl border gold-line bg-[hsl(var(--card))] p-6 sm:p-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input id="name" label={tForm('name')} value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder={tForm('namePlaceholder')} />
        <Input id="email" type="email" label={tForm('email')} value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder={tForm('emailPlaceholder')} />
        <Input id="phone" label={tForm('phone')} value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} placeholder={tForm('phonePlaceholder')} />
        <Input id="subject" label={tForm('subject')} value={subject} onChange={(e) => setSubject(e.target.value)} error={errors.subject} placeholder={tForm('subjectPlaceholder')} />
        <Textarea id="message" label={tForm('message')} value={body} onChange={(e) => setBody(e.target.value)} error={errors.message} placeholder={tForm('messagePlaceholder')} />
        <div className="flex items-start gap-2">
        <input id="kvkk" type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="h-4 w-4 rounded border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--gold))]" />
        <label htmlFor="kvkk" className="text-sm text-muted">
          <a href={kvkkHref as any} target="_blank" rel="noopener noreferrer" className="underline">
            {tForm('kvkkLink')}
          </a>{' '}
          {tForm('kvkkConsent')}
        </label>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={status === 'loading'} className="btn-primary gold-focus px-5 py-2.5">
            {status === 'loading' ? tForm('sending') : tForm('submit')}
          </button>
          <FormStatus status={status === 'success' ? 'success' : status === 'error' ? 'error' : 'idle'} message={message} />
        </div>
      </form>
    </div>
  );
}
