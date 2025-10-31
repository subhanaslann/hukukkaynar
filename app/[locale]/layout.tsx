import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { AnimationProvider } from '@/components/AnimationProvider';
import CookieConsentProvider from '@/components/CookieBanner';
import { getServerConsent } from '@/lib/cookies-server';
import { legalServiceJsonLd, organizationJsonLd, webSiteJsonLd } from '@/lib/schema';
import { SITE_URL } from '@/lib/site-config';
import { locales, localeDirections, type Locale } from '@/i18n';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather'
});

export const metadata: Metadata = {
  title: {
    default: 'Kaynar Hukuk Bürosu | Ceza, Aile, İş ve Ticaret Hukuku',
    template: '%s | Kaynar Hukuk Bürosu'
  },
  description:
    'Ceza, aile, iş ve ticaret hukukunda uçtan uca temsil. Dürüst danışmanlık, disiplinli takip. Hızlı ilk değerlendirme ve şeffaf süreç.',
  keywords: [
    'hukuk bürosu',
    'avukat',
    'ceza avukatı',
    'aile hukuku',
    'iş hukuku',
    'ticaret hukuku',
    'hukuki danışmanlık',
    'law firm',
    'lawyer',
    'attorney'
  ],
  authors: [{ name: 'Kaynar Hukuk Bürosu' }],
  creator: 'Kaynar Hukuk Bürosu',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'Kaynar Hukuk Bürosu',
    title: 'Kaynar Hukuk Bürosu | Ceza, Aile, İş ve Ticaret Hukuku',
    description: 'Dürüst danışmanlık. Disiplinli takip. Hızlı ilk değerlendirme ve şeffaf süreç.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kaynar Hukuk Bürosu'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaynar Hukuk Bürosu',
    description: 'Dürüst danışmanlık. Disiplinli takip.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E1726'
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params?.locale;
  if (process.env.NODE_ENV !== 'production') {
    console.log('[layout:[locale]] params =', params);
  }
  
  // Validate locale
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  const consent = getServerConsent();
  const messages = await getMessages({ locale });

  // Determine text direction (RTL for Arabic)
  const dir = localeDirections[locale as Locale] ?? 'ltr';
  const localizedHomeUrl = `${SITE_URL}/${locale}`;
  const breadcrumbLabel: Record<Locale, string> = {
    tr: 'Ana Sayfa',
    en: 'Home',
    ar: 'الرئيسية'
  };
  const breadcrumbName = breadcrumbLabel[locale as Locale] ?? breadcrumbLabel.tr;
  const jsonLdPayload = [
    legalServiceJsonLd(),
    organizationJsonLd(),
    { ...webSiteJsonLd(), inLanguage: locale },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: breadcrumbName,
          item: localizedHomeUrl
        }
      ]
    }
  ];

  return (
    <html lang={locale} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          id={`jsonld-${locale}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPayload) }}
        />
      </head>
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <AnimationProvider>
            <CookieConsentProvider initialConsent={consent}>
              <a href="#main-content" className="skip-link">
                Ana içeriğe atla
              </a>
              <div id="main-content">
                {children}
              </div>
            </CookieConsentProvider>
          </AnimationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
