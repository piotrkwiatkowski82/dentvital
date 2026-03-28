import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import ContactSection from '../components/contact/ContactSection';

export default function ContactPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Skontaktuj się z nami"
        subtitle="Umów wizytę telefonicznie, napisz wiadomość lub odwiedź nas w gabinecie."
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Kontakt' },
        ]}
      />
      <ContactSection />
    </>
  );
}
