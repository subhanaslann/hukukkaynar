import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero as ReferencesHero } from '@/components/sections/references/Hero';
import { CompanyLogos } from '@/components/sections/references/CompanyLogos';
import { Testimonials as ReferencesTestimonials } from '@/components/sections/references/Testimonials';
import { Stats as ReferencesStats } from '@/components/sections/references/Stats';
import { Badges as ReferencesBadges } from '@/components/sections/references/Badges';
import { CTA as ReferencesCTA } from '@/components/sections/references/CTA';
import { REFERENCE_COMPANIES } from '@/content/references/companies';
import { REFERENCE_TESTIMONIALS } from '@/content/references/testimonials';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'references.metadata' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ReferencesPage({ params }: PageProps) {
  const { locale } = params;
  const tTestimonials = await getTranslations({ locale, namespace: 'references.testimonials' });
  const tMetadata = await getTranslations({ locale, namespace: 'references.metadata' });
  const tLogos = await getTranslations({ locale, namespace: 'references.logos' });

  const reviewEntries = REFERENCE_TESTIMONIALS.map((testimonial) => {
    const text = testimonial.translationKey
      ? translateWithFallback(tTestimonials, `items.${testimonial.translationKey}`, testimonial.text)
      : testimonial.text;

    return {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name
      },
      itemReviewed: {
        '@type': 'LegalService',
        name: 'Kaynar Hukuk'
      },
      reviewBody: text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5
      }
    };
  });

  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: (
      REFERENCE_TESTIMONIALS.reduce((sum, testimonial) => sum + testimonial.rating, 0) /
      Math.max(1, REFERENCE_TESTIMONIALS.length)
    ).toFixed(1),
    ratingCount: REFERENCE_TESTIMONIALS.length,
    bestRating: 5
  };

  const logoItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tLogos('title'),
    itemListElement: REFERENCE_COMPANIES.map((company, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: company.name
    }))
  };

  const reviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Kaynar Hukuk',
    description: tMetadata('description'),
    review: reviewEntries,
    aggregateRating
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <ReferencesHero />
      <CompanyLogos />
      <ReferencesTestimonials />
      <ReferencesStats />
      <ReferencesBadges />
      <ReferencesCTA />

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(logoItemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(reviewJsonLd) }}
      />
    </>
  );
}

function translateWithFallback(translator: (key: string) => string, key: string, fallback: string) {
  try {
    return translator(key);
  } catch {
    return fallback;
  }
}

function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
