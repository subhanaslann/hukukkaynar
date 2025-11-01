'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Printer } from 'lucide-react';
import { type Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/Icons';
import './petition.css';

type PetitionVariant = 'section' | 'page';

interface PetitionContactProps {
  variant: PetitionVariant;
  locale: Locale;
}

interface PetitionFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kvkk: boolean;
  court: string;
  lawArea: string;
  facts: string;
  request: string;
}

type PetitionField = keyof PetitionFormState;

const initialFormState: PetitionFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  kvkk: false,
  court: '',
  lawArea: '',
  facts: '',
  request: ''
};

const practiceAreaKeys = ['criminal', 'family', 'labor', 'commercial', 'administrative', 'real_estate'] as const;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    update(query);
    const listener = (event: MediaQueryListEvent) => update(event);

    if (query.addEventListener) {
      query.addEventListener('change', listener);
    } else {
      // Fallback for Safari
      query.addListener(listener);
    }

    return () => {
      if (query.removeEventListener) {
        query.removeEventListener('change', listener);
      } else {
        query.removeListener(listener);
      }
    };
  }, []);

  return prefersReducedMotion;
}

export function PetitionContact({ variant, locale }: PetitionContactProps) {
  const tForm = useTranslations('contact.form');
  const tPetition = useTranslations('contact.petition');
  const tPracticeAreas = useTranslations('practiceAreas');

  const [formState, setFormState] = React.useState<PetitionFormState>(initialFormState);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<PetitionField, string>>>({});

  const prefersReducedMotion = usePrefersReducedMotion();
  const resultRef = React.useRef<HTMLDivElement>(null);
  const liveRegionRef = React.useRef<HTMLDivElement>(null);
  const animationResetRef = React.useRef<ReturnType<typeof setTimeout>>();
  const feedbackResetRef = React.useRef<ReturnType<typeof setTimeout>>();

  const isPageVariant = variant === 'page';

  const areaOptions = React.useMemo(
    () =>
      practiceAreaKeys.map((key) => ({
        value: key,
        label: tPracticeAreas(key)
      })),
    [tPracticeAreas]
  );

  const kvkkHref = React.useMemo(() => localizedHref(locale, '/kvkk/aydinlatma'), [locale]);

  React.useEffect(() => {
    return () => {
      if (animationResetRef.current) {
        clearTimeout(animationResetRef.current);
      }
      if (feedbackResetRef.current) {
        clearTimeout(feedbackResetRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if ((status === 'success' || status === 'error') && feedback && resultRef.current) {
      resultRef.current.focus();
    }
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = feedback;
    }
  }, [status, feedback]);

  const updateField = React.useCallback(
    (field: PetitionField, value: string | boolean) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = event.target;
    const field = name as PetitionField;
    const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
    updateField(field, value);
  };

  const validate = React.useCallback(() => {
    const nextErrors: Partial<Record<PetitionField, string>> = {};
    const requiredMessage = tForm('requiredField');

    if (!formState.name.trim()) {
      nextErrors.name = requiredMessage;
    }

    if (!formState.email.trim()) {
      nextErrors.email = requiredMessage;
    } else if (!emailRegex.test(formState.email.trim())) {
      nextErrors.email = tForm('emailInvalid');
    }

    if (!formState.phone.trim()) {
      nextErrors.phone = requiredMessage;
    }

    if (!formState.subject.trim()) {
      nextErrors.subject = requiredMessage;
    }

    if (!formState.message.trim()) {
      nextErrors.message = requiredMessage;
    }

    if (!formState.kvkk) {
      nextErrors.kvkk = tForm('kvkkRequired');
    }

    if (isPageVariant) {
      if (!formState.court.trim()) {
        nextErrors.court = requiredMessage;
      }
      if (!formState.facts.trim()) {
        nextErrors.facts = requiredMessage;
      }
      if (!formState.request.trim()) {
        nextErrors.request = requiredMessage;
      }
    }

    return nextErrors;
  }, [formState, isPageVariant, tForm]);

  const resetAnimations = React.useCallback(() => {
    if (animationResetRef.current) {
      clearTimeout(animationResetRef.current);
    }

    setSent(false);

    const run = () => {
      setSent(true);
      animationResetRef.current = setTimeout(() => {
        setSent(false);
      }, 5200);
    };

    if (prefersReducedMotion) {
      run();
      return;
    }

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(run);
    } else {
      run();
    }
  }, [prefersReducedMotion]);

  const scheduleFeedbackReset = React.useCallback(() => {
    if (feedbackResetRef.current) {
      clearTimeout(feedbackResetRef.current);
    }
    feedbackResetRef.current = setTimeout(() => {
      setStatus('idle');
      setFeedback('');
    }, 6500);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'loading') {
      return;
    }

    const validationErrors = validate();
    const hasErrors = Object.keys(validationErrors).length > 0;

    if (hasErrors) {
      setErrors(validationErrors);
      setStatus('error');
      const firstErrorMessage =
        validationErrors.kvkk ??
        validationErrors.name ??
        validationErrors.email ??
        validationErrors.phone ??
        validationErrors.subject ??
        validationErrors.message ??
        validationErrors.court ??
        validationErrors.facts ??
        validationErrors.request ??
        tForm('validationError');
      setFeedback(firstErrorMessage);
      scheduleFeedbackReset();
      return;
    }

    setStatus('loading');
    setFeedback('');

    const selectedAreaLabel =
      areaOptions.find((option) => option.value === formState.lawArea)?.label ?? formState.lawArea.trim();

    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      subject: formState.subject.trim(),
      message: formState.message.trim(),
      kvkk: formState.kvkk,
      court: formState.court.trim(),
      lawArea: selectedAreaLabel,
      facts: formState.facts.trim(),
      request: formState.request.trim()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setFeedback(tPetition('thanks'));
        resetAnimations();
        setFormState(initialFormState);
        setErrors({});
      } else {
        let errorMessage = tPetition('error');
        try {
          const data = await response.json();
          if (typeof data?.error === 'string' && data.error.trim().length > 0) {
            errorMessage = data.error;
          }
        } catch {
          // ignore JSON parse errors
        }
        setStatus('error');
        setFeedback(errorMessage);
      }
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
      setFeedback(tPetition('error'));
    } finally {
      scheduleFeedbackReset();
    }
  };

  const handlePrint = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, []);

  const getFieldError = (field: PetitionField) => errors[field];
  const feedbackTone = status === 'success' ? 'success' : status === 'error' ? 'error' : undefined;

  return (
    <div
      className={cn(
        'petition-wrapper centered',
        `petition-wrapper--${variant}`,
        sent && status === 'success' && 'sent'
      )}
    >
      <form className="petition-form" onSubmit={handleSubmit} noValidate>
        <article className="letter">
          <div className="side">
            <h1 className="petition-title">{tPetition('title')}</h1>

            {isPageVariant && (
              <div className="petition-meta">
                <div className="petition-field">
                  <label htmlFor="court">{tPetition('court')}</label>
                  <input
                    id="court"
                    name="court"
                    type="text"
                    value={formState.court}
                    onChange={handleChange}
                    placeholder={tForm('courtPlaceholder')}
                    aria-invalid={Boolean(getFieldError('court'))}
                    aria-describedby={getFieldError('court') ? 'court-error' : undefined}
                  />
                  {getFieldError('court') && (
                    <span id="court-error" className="text-xs text-[hsl(var(--gold))]">
                      {getFieldError('court')}
                    </span>
                  )}
                </div>

                <div className="petition-field">
                  <label htmlFor="lawArea">{tPetition('area')}</label>
                  <select
                    id="lawArea"
                    name="lawArea"
                    value={formState.lawArea}
                    onChange={handleChange}
                    aria-describedby={getFieldError('lawArea') ? 'lawArea-error' : undefined}
                  >
                    <option value="">{tForm('lawAreaPlaceholder')}</option>
                    {areaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {getFieldError('lawArea') && (
                    <span id="lawArea-error" className="text-xs text-[hsl(var(--gold))]">
                      {getFieldError('lawArea')}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="petition-body">
              {isPageVariant ? (
                <>
                  <div className="petition-field">
                    <label htmlFor="facts">{tPetition('facts')}</label>
                    <textarea
                      id="facts"
                      name="facts"
                      value={formState.facts}
                      onChange={handleChange}
                      placeholder={tForm('factsPlaceholder')}
                      aria-invalid={Boolean(getFieldError('facts'))}
                      aria-describedby={getFieldError('facts') ? 'facts-error' : undefined}
                    />
                    {getFieldError('facts') && (
                      <span id="facts-error" className="text-xs text-[hsl(var(--gold))]">
                        {getFieldError('facts')}
                      </span>
                    )}
                  </div>

                  <div className="petition-field">
                    <label htmlFor="request">{tPetition('request')}</label>
                    <textarea
                      id="request"
                      name="request"
                      value={formState.request}
                      onChange={handleChange}
                      placeholder={tForm('requestPlaceholder')}
                      aria-invalid={Boolean(getFieldError('request'))}
                      aria-describedby={getFieldError('request') ? 'request-error' : undefined}
                    />
                    {getFieldError('request') && (
                      <span id="request-error" className="text-xs text-[hsl(var(--gold))]">
                        {getFieldError('request')}
                      </span>
                    )}
                  </div>

                  <div className="petition-field">
                    <label htmlFor="message">{tForm('message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={tForm('messagePlaceholderPetition')}
                      aria-invalid={Boolean(getFieldError('message'))}
                      aria-describedby={getFieldError('message') ? 'message-error' : undefined}
                    />
                    {getFieldError('message') && (
                      <span id="message-error" className="text-xs text-[hsl(var(--gold))]">
                        {getFieldError('message')}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="petition-field">
                  <label htmlFor="message">{tForm('message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={tForm('messagePlaceholderPetition')}
                    aria-invalid={Boolean(getFieldError('message'))}
                    aria-describedby={getFieldError('message') ? 'message-error' : undefined}
                  />
                  {getFieldError('message') && (
                    <span id="message-error" className="text-xs text-[hsl(var(--gold))]">
                      {getFieldError('message')}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="side">
            <div className="petition-details">
              <div className="petition-field">
                <label htmlFor="name">{tForm('name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder={tForm('namePlaceholderPetition')}
                  aria-invalid={Boolean(getFieldError('name'))}
                  aria-describedby={getFieldError('name') ? 'name-error' : undefined}
                />
                {getFieldError('name') && (
                  <span id="name-error" className="text-xs text-[hsl(var(--gold))]">
                    {getFieldError('name')}
                  </span>
                )}
              </div>

              <div className="petition-field">
                <label htmlFor="email">{tForm('email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder={tForm('emailPlaceholderPetition')}
                  aria-invalid={Boolean(getFieldError('email'))}
                  aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                />
                {getFieldError('email') && (
                  <span id="email-error" className="text-xs text-[hsl(var(--gold))]">
                    {getFieldError('email')}
                  </span>
                )}
              </div>

              <div className="petition-field">
                <label htmlFor="phone">{tForm('phone')}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder={tForm('phonePlaceholderPetition')}
                  aria-invalid={Boolean(getFieldError('phone'))}
                  aria-describedby={getFieldError('phone') ? 'phone-error' : undefined}
                />
                {getFieldError('phone') && (
                  <span id="phone-error" className="text-xs text-[hsl(var(--gold))]">
                    {getFieldError('phone')}
                  </span>
                )}
              </div>

              <div className="petition-field">
                <label htmlFor="subject">{tPetition('subject')}</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder={tForm('subjectPlaceholderPetition')}
                  aria-invalid={Boolean(getFieldError('subject'))}
                  aria-describedby={getFieldError('subject') ? 'subject-error' : undefined}
                />
                {getFieldError('subject') && (
                  <span id="subject-error" className="text-xs text-[hsl(var(--gold))]">
                    {getFieldError('subject')}
                  </span>
                )}
              </div>
            </div>

            <div className="petition-consent">
              <input
                id="kvkk"
                name="kvkk"
                type="checkbox"
                checked={formState.kvkk}
                onChange={handleChange}
                aria-invalid={Boolean(getFieldError('kvkk'))}
                aria-describedby={getFieldError('kvkk') ? 'kvkk-error' : undefined}
              />
              <label htmlFor="kvkk">
                <a href={kvkkHref} target="_blank" rel="noopener noreferrer">
                  {tForm('kvkkLink')}
                </a>{' '}
                {tForm('kvkkConsent')}
              </label>
            </div>
            {getFieldError('kvkk') && (
              <span id="kvkk-error" className="text-xs text-[hsl(var(--gold))]">
                {getFieldError('kvkk')}
              </span>
            )}

            <div className="petition-actions">
              {isPageVariant && (
                <button type="button" className="secondary-button" onClick={handlePrint}>
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  {tPetition('print')}
                </button>
              )}
              <button
                type="submit"
                className="primary-button"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
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
                    <Icons.send className="h-4 w-4" aria-hidden="true" />
                    <span>{tPetition('send')}</span>
                  </>
                )}
              </button>
            </div>

            <div className="petition-states">
              {feedback && status === 'error' && (
                <div
                  ref={resultRef}
                  className="petition-feedback"
                  data-variant={feedbackTone}
                  role="status"
                  tabIndex={-1}
                  aria-live="polite"
                >
                  <Icons.alert className="h-4 w-4 flex-shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}
            </div>
          </div>
        </article>

        <div className="envelope front" aria-hidden="true" />
        <div className="envelope back" aria-hidden="true" />
        <div
          ref={status === 'success' ? resultRef : undefined}
          className="result-message"
          role="status"
          aria-live="polite"
          tabIndex={status === 'success' ? -1 : undefined}
        >
          {status === 'success' && feedback && (
            <>
              <Icons.check className="mx-auto mb-2 h-5 w-5 text-[hsl(var(--gold))]" aria-hidden="true" />
              <span>{feedback}</span>
            </>
          )}
        </div>
        <div ref={liveRegionRef} aria-live="polite" className="sr-only" />
      </form>
    </div>
  );
}
