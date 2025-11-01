import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { About } from '@/components/sections/About';
import { Partners } from '@/components/sections/Partners';
import { OurTeam } from '@/components/sections/OurTeam';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
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
      <OurTeam />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
