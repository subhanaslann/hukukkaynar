import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Accordion from '@/components/Accordion';
import Section from '@/components/Section';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.faq' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription')
  };
}

export default async function FaqPage({ params }: PageProps) {
  const [tPage, tContact] = await Promise.all([
    getTranslations({ locale: params.locale, namespace: 'pages.faq' }),
    getTranslations({ locale: params.locale, namespace: 'contact' })
  ]);

  const items = (tPage.raw('items') as Array<{ question: string; answer: string }>) ?? [];

  return (
    <Section title={tPage('heading')} description={tPage('description')}>
      <Accordion items={items} />
      <p className="mt-6 text-sm text-primary-500">{tContact('disclaimer')}</p>
    </Section>
  );
}
