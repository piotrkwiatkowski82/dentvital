import { useScrollReveal } from '../hooks/useScrollReveal';

import HeroWide from '../components/hero/HeroWide';
import { HeroV1, HeroV2, HeroV3, HeroV4, HeroV5 } from '../components/hero/HeroVariants';
import FocusPanels from '../components/panels/FocusPanels';
import ServicesSection from '../components/services/ServicesSection';
import TeamSection from '../components/team/TeamSection';
import BookingSection from '../components/booking/BookingSection';
import NewsSection from '../components/news/NewsSection';
import ContactSection from '../components/contact/ContactSection';

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <HeroV1 />
      <HeroV2 />
      <HeroV3 />
      <HeroV4 />
      <HeroV5 />
      <HeroWide />
      <FocusPanels />
      <ServicesSection />
      <TeamSection />
      <BookingSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}
