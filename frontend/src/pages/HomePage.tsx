import { useScrollReveal } from '../hooks/useScrollReveal';
import Hero from '../components/hero/Hero';
import HeroWide from '../components/hero/HeroWide';
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
      <Hero />
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
