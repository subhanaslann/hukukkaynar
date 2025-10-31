import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import { PRACTICE_AREA_DEFINITIONS } from '@/lib/areas';

interface PageProps {
  params: { locale: string };
}

export default async function PracticeAreasPage({ params }: PageProps) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'pages.practiceAreas' });
  const tAreas = await getTranslations({ locale, namespace: 'practiceAreas.items' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const intro = (t.raw('intro') as string[]) ?? [];

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--fg))]">{t('title')}</h1>
            <div className="mt-3 h-1 w-24 mx-auto gold-line" />
            <p className="mt-6 text-lg text-[hsl(var(--muted))] max-w-3xl mx-auto">{t('subtitle')}</p>
            {intro.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-base text-[hsl(var(--muted))] max-w-3xl mx-auto">
                {paragraph}
              </p>
            ))}
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREA_DEFINITIONS.map((area) => {
              const Icon = Icons[area.icon as keyof typeof Icons];
              return (
                <Link
                  key={area.key}
                  href={`/${locale}/calisma-alanlari/${area.segment}`}
                  className="group relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:border-[hsl(var(--gold))]/50 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10 group-hover:bg-[hsl(var(--gold))]/20 transition-colors">
                    <Icon className="h-7 w-7 text-[hsl(var(--gold))]" />
                  </div>

                  <h3 className="mb-2 text-xl font-serif font-bold text-[hsl(var(--fg))] group-hover:text-[hsl(var(--gold))] transition-colors">
                    {tAreas(`${area.key}.title`)}
                  </h3>

                  <p className="text-sm leading-relaxed text-[hsl(var(--muted))] mb-4">
                    {tAreas(`${area.key}.description`)}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--gold))]">
                    <span>{tCommon('viewDetails')}</span>
                    <Icons.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[hsl(var(--gold))] transition-all duration-300 group-hover:w-full rounded-b-xl" />
                </Link>
              );
            })}
          </div>

          <div className="mt-12 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
            <p className="text-sm text-[hsl(var(--muted))]">{t('disclaimer')}</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
