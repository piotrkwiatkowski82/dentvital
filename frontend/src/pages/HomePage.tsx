import { useScrollReveal } from '../hooks/useScrollReveal';

import { FocusV4 } from '../components/panels/FocusPanelsVariants';
import ServicesSection from '../components/services/ServicesSection';
import TeamSection from '../components/team/TeamSection';
import BookingSection from '../components/booking/BookingSection';
import NewsSection from '../components/news/NewsSection';
import ContactSection from '../components/contact/ContactSection';

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <FocusV4 />
      <ServicesSection />
      <TeamSection />
      <BookingSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}
