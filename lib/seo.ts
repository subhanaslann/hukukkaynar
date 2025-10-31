import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, GENERAL_DISCLAIMER } from './constants';

const defaultTitle = SITE_NAME;
const defaultDescription =
  'Ceza, aile, ticaret ve iş hukukunda dava ve danışmanlık hizmetleri. Bu site bilgilendirme amaçlıdır.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`
  },
  description: defaultDescription,
  keywords: [
    'Kaynar Hukuk Bürosu',
    'Ceza hukuku',
    'Aile hukuku',
    'Ticaret hukuku',
    'İş hukuku'
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: SITE_NAME
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/og-default.jpg']
  },
  other: {
    'data-disclaimer': GENERAL_DISCLAIMER
  }
};

export function buildPageMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description: description ?? defaultDescription,
    openGraph: {
      title,
      description: description ?? defaultDescription
    },
    twitter: {
      title,
      description: description ?? defaultDescription
    }
  };
}
