import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.about' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription')
  };
}

export default async function AboutPage({ params }: PageProps) {
  const [tPage, tAbout, tContact] = await Promise.all([
    getTranslations({ locale: params.locale, namespace: 'pages.about' }),
    getTranslations({ locale: params.locale, namespace: 'about' }),
    getTranslations({ locale: params.locale, namespace: 'contact' })
  ]);

  const paragraphs = (tAbout.raw('paragraphs') as string[]) ?? [];
  const principles = (tAbout.raw('principles') as string[]) ?? [];
  const valuesMap = (tAbout.raw('values') as Record<string, { title: string; description: string }>) ?? {};
  const valuesSection = tAbout.raw('valuesSection') as { title: string; description: string };

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center sm:mb-16">
            <h1 className="text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl lg:text-5xl">{tPage('heading')}</h1>
            <div className="gold-line mx-auto mt-3 h-1 w-24" />
            <p className="mx-auto mt-6 max-w-3xl text-lg text-[hsl(var(--muted))]">{tPage('summary')}</p>
          </header>

          <div className="mb-16 grid items-center gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[hsl(var(--gold))]/30 shadow-xl">
                <Image
                  src="/hero.jpg"
                  alt={tAbout('imageAlt')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-[hsl(var(--gold))]/10 blur-3xl" />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-[hsl(var(--fg))] sm:text-3xl">{tAbout('pageHeading')}</h2>
                <div className="space-y-4 text-base leading-relaxed text-[hsl(var(--muted))]">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {Object.values(valuesMap).map((value) => (
                  <div
                    key={value.title}
                    className="flex items-start gap-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-[hsl(var(--gold))]/50"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                        <Icons.check className="h-5 w-5 text-[hsl(var(--gold))]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-[hsl(var(--fg))]">{value.title}</h3>
                      <p className="text-sm text-[hsl(var(--muted))]">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
              <h2 className="mb-6 text-2xl font-bold text-[hsl(var(--fg))]">{tAbout('principlesTitle')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle, index) => (
                  <div key={principle} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--gold))]/20">
                        <span className="text-xs font-bold text-[hsl(var(--gold))]">{index + 1}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted))]">{principle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {valuesSection && (
            <div className="mb-16 rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-[hsl(var(--fg))]">{valuesSection['title']}</h2>
              <p className="text-base leading-relaxed text-[hsl(var(--muted))]">{valuesSection['description']}</p>
            </div>
          )}

          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
            <h2 className="mb-6 text-2xl font-bold text-[hsl(var(--fg))]">{tAbout('contactSection.title')}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <Icons.mapPin className="mt-0.5 h-5 w-5 text-[hsl(var(--gold))]" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-[hsl(var(--fg))]">{tContact('info.address')}</p>
                  <p className="text-sm text-[hsl(var(--muted))]">
                    {tContact('addressText')}
                    <br />
                    {tContact('cityText')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.phone className="mt-0.5 h-5 w-5 text-[hsl(var(--gold))]" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-[hsl(var(--fg))]">{tContact('info.phone')}</p>
                  <a href={`tel:${tContact('phoneNumber').replace(/[^+\\d]/g, '')}`} className="text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80">
                    {tContact('phoneNumber')}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.mail className="mt-0.5 h-5 w-5 text-[hsl(var(--gold))]" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-[hsl(var(--fg))]">{tContact('info.email')}</p>
                  <a href={`mailto:${tContact('emailAddress')}`} className="text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80">
                    {tContact('emailAddress')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-[hsl(var(--muted))]">{tContact('disclaimer')}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
