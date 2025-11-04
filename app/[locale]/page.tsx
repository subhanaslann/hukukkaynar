import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { About } from '@/components/sections/About';
import { Partners } from '@/components/sections/Partners';
import { OurTeam } from '@/components/sections/OurTeam';
import LatestNews from '@/components/sections/LatestNews';
import type { Locale } from '@/i18n';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export const revalidate = 3600;

export default function HomePage({ params }: { params: { locale: Locale } }) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[page:[locale]] rendering HomePage');
  }
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero />
      <Partners />
      <PracticeAreas />
      <About />
      {/* Latest Aktüel preview before Our Team */}
      <LatestNews locale={params.locale} />
      <OurTeam />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
