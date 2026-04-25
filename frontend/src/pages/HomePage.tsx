import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSEO } from '../hooks/useSEO';

import { HeroV2 } from '../components/hero/HeroVariants';
import { FocusV4 } from '../components/panels/FocusPanelsVariants';
import ServicesSection from '../components/services/ServicesSection';
import TeamSection from '../components/team/TeamSection';
import BookingSection from '../components/booking/BookingSection';
import NewsSection from '../components/news/NewsSection';
import ContactSection from '../components/contact/ContactSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';

export default function HomePage() {
  useScrollReveal();
  useSEO('home');

  return (
    <>
      <HeroV2 />
      <FocusV4 />
      <ServicesSection />
      <TeamSection />
      <NewsSection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </>
  );
}
