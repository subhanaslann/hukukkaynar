import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n';
import { SITE_URL } from '@/lib/site-config';
import { TEAM } from '@/content/team';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TeamDetail, type TeamDetailMember } from '@/components/team/TeamDetail';

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    TEAM.map((member) => ({
      locale,
      slug: member.slug
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const member = TEAM.find((item) => item.slug === slug);

  const tCard = await getTranslations({ locale, namespace: 'team.card' });
  const tTeam = await getTranslations({ locale, namespace: 'team' });

  const role = tCard('role');
  const baseDescription = member?.bio ?? tTeam('description');
  const description =
    baseDescription.length > 160 ? `${baseDescription.slice(0, 157).trimEnd()}…` : baseDescription;

  const title = member ? `${member.name} – ${role} | Kaynar Hukuk Bürosu` : `Kaynar Hukuk Bürosu`;

  const imageUrl = member?.avatar ? new URL(member.avatar, SITE_URL).toString() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `${SITE_URL}/${locale}/ekibimiz/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined
    }
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { locale, slug } = params;
  const member = TEAM.find((item) => item.slug === slug);

  if (!member) {
    notFound();
  }

  const tDetail = await getTranslations({ locale, namespace: 'team.detail' });
  const tCard = await getTranslations({ locale, namespace: 'team.card' });

  const normalizedAreas = Array.isArray(member.areas)
    ? (member.areas
        .map((area: any) => {
          if (!area) return null;
          if (typeof area === 'string') return area;
          if (typeof area === 'object') {
            if ('title' in area && typeof area.title === 'string') return area.title;
            if ('name' in area && typeof area.name === 'string') return area.name;
            if ('label' in area && typeof area.label === 'string') return area.label;
          }
          return String(area);
        })
        .filter(Boolean)) as string[]
    : [];

  const detailMember: TeamDetailMember = {
    name: member.name,
    title: tCard('role'),
    university: member.university,
    areas: member.areas,
    avatar: member.avatar,
    bio: member.bio,
    email: member.email
  };

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: tCard('role'),
    alumniOf: member.university,
    knowsAbout: normalizedAreas,
    image: member.avatar ? new URL(member.avatar, SITE_URL).toString() : undefined,
    email: member.email ? `mailto:${member.email}` : undefined,
    url: `${SITE_URL}/${locale}/ekibimiz/${member.slug}`
  };

  return (
    <>
      <Script
        id={`team-member-${member.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Topbar />
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-6xl lg:px-8 lg:py-16">
        <nav className="mb-6 flex items-center gap-3 text-sm text-[hsl(var(--muted))]">
          <Link
            href={`/${locale}/ekibimiz`}
            className="inline-flex items-center gap-2 text-[hsl(var(--gold))] transition-colors hover:text-[hsl(var(--gold))]/80 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--bg))]"
          >
            <span aria-hidden>←</span>
            {tDetail('backToList')}
          </Link>
        </nav>
        <TeamDetail member={detailMember} variant="page" />
      </section>
      <Footer />
    </>
  );
}
