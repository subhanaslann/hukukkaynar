import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import { PRACTICE_AREA_DEFINITIONS, type PracticeAreaDefinition } from '@/lib/areas';
import { locales, type Locale } from '@/i18n';

const definitionBySegment = new Map<string, PracticeAreaDefinition>(
  PRACTICE_AREA_DEFINITIONS.map((definition) => [definition.segment, definition])
);

interface PageParams {
  locale: Locale;
  slug: string;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    PRACTICE_AREA_DEFINITIONS.map((definition) => ({
      locale,
      slug: definition.segment
    }))
  );
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const definition = definitionBySegment.get(params.slug);
  if (!definition) {
    return {};
  }

  const tArea = await getTranslations({
    locale: params.locale,
    namespace: `practiceAreaDetails.${definition.key}`
  });

  return {
    title: tArea('meta.title'),
    description: tArea('meta.description')
  };
}

export default async function PracticeAreaDetailPage({ params }: { params: PageParams }) {
  const definition = definitionBySegment.get(params.slug);
  if (!definition) {
    notFound();
  }

  const tCommon = await getTranslations({
    locale: params.locale,
    namespace: 'practiceAreaDetails.common'
  });
  const tArea = await getTranslations({
    locale: params.locale,
    namespace: `practiceAreaDetails.${definition.key}`
  });

  const description = (tArea.raw('description') as string[]) ?? [];
  const scope = (tArea.raw('scope') as string[]) ?? [];
  const process = (tArea.raw('process') as Array<{ title: string; description: string }>) ?? [];
  const faqs = (tArea.raw('faqs') as Array<{ question: string; answer: string }>) ?? [];

  const Icon = Icons[definition.icon as keyof typeof Icons];

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-[hsl(var(--muted))]">
            <Link
              href={`/${params.locale}/calisma-alanlari`}
              className="flex items-center gap-2 transition-colors hover:text-[hsl(var(--gold))]"
            >
              <Icons.arrowLeft className="h-4 w-4" />
              {tCommon('backToList')}
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--gold))]">{tArea('name')}</span>
          </nav>

          <header className="mb-12">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icon className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl">{tArea('name')}</h1>
                <p className="mt-1 text-[hsl(var(--muted))]">{tArea('tagline')}</p>
              </div>
            </div>
            {description.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-[hsl(var(--muted))]">
                {paragraph}
              </p>
            ))}
          </header>

          {scope.length > 0 && (
            <div className="mb-12 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
              <h2 className="mb-6 text-2xl font-bold text-[hsl(var(--fg))]">{tCommon('scopeTitle')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {scope.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--gold))]/20">
                        <Icons.check className="h-4 w-4 text-[hsl(var(--gold))]" />
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted))]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {process.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-[hsl(var(--fg))]">{tCommon('processTitle')}</h2>
              <div className="space-y-4">
                {process.map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-colors hover:border-[hsl(var(--gold))]/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10">
                          <span className="text-lg font-bold text-[hsl(var(--gold))]">{index + 1}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-[hsl(var(--fg))]">{step.title}</h3>
                        <p className="text-sm text-[hsl(var(--muted))]">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-[hsl(var(--fg))]">{tCommon('faqTitle')}</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                    <h3 className="mb-2 flex items-start gap-2 font-semibold text-[hsl(var(--fg))]">
                      <Icons.helpCircle className="h-5 w-5 flex-shrink-0 text-[hsl(var(--gold))]" />
                      {faq.question}
                    </h3>
                    <p className="ml-7 text-sm leading-relaxed text-[hsl(var(--muted))]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-6">
            <div className="flex items-start gap-3">
              <Icons.alertCircle className="h-5 w-5 flex-shrink-0 text-[hsl(var(--gold))]" />
              <p className="text-sm text-[hsl(var(--muted))]">{tCommon('disclaimer')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
