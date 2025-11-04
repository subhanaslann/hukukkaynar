import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ArchiveGallery from '@/components/gallery/ArchiveGallery';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.archive' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription')
  };
}

export default async function ArchivePage({ params }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.archive' });

  const images = [
    { src: '/buro1.jpg', alt: t('images.buro1Alt') },
    { src: '/buro2.jpg', alt: t('images.buro2Alt') }
  ];

  return (
    <>
      <Topbar />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 text-center sm:mb-12">
          <h1 className="text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl lg:text-5xl">{t('title')}</h1>
          <div className="mx-auto mt-3 h-1 w-24 gold-line" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-[hsl(var(--muted))] sm:text-lg">{t('subtitle')}</p>
        </header>

        <ArchiveGallery items={images} />
      </section>
      <Footer />
    </>
  );
}
