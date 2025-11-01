import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OurTeamGrid } from '@/components/sections/OurTeamGrid';
import { TEAM } from '@/content/team';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.team' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription')
  };
}

export default async function TeamPage({ params }: PageProps) {
  const tPage = await getTranslations({ locale: params.locale, namespace: 'pages.team' });

  const personsLd = TEAM.map((member) => ({
    '@type': 'Person',
    name: member.name,
    alumniOf: member.university,
    knowsAbout: member.areas,
    image: member.avatar ? new URL(member.avatar, 'https://kaynar.av.tr').toString() : undefined
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: personsLd })
        }}
      />
      <Topbar />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl lg:text-5xl">{tPage('heading')}</h1>
          <div className="gold-line mx-auto mt-3 h-1 w-24" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-[hsl(var(--muted))] sm:text-lg">{tPage('subtitle')}</p>
        </header>
        <OurTeamGrid members={TEAM} />
      </section>
      <Footer />
    </>
  );
}
