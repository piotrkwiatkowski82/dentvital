import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '📷',
    title: 'Zdjęcia punktowe (RVG)',
    desc: 'Precyzyjne zdjęcia jednego lub kilku zębów — do oceny próchnicy, leczenia kanałowego i stanu tkanek okołowierzchołkowych.',
  },
  {
    icon: '🦷',
    title: 'Zdjęcie pantomograficzne',
    desc: 'Panoramiczny obraz całego uzębienia, kości szczęk i stawów skroniowo-żuchwowych. Podstawa każdego kompleksowego leczenia.',
  },
  {
    icon: '🧠',
    title: 'Tomografia CBCT 3D',
    desc: 'Wolumetryczna tomografia stożkowa do precyzyjnego planowania implantów, oceny ubytków kostnych i diagnostyki kanałów korzeniowych.',
  },
  {
    icon: '⚡',
    title: 'System Digora Optima',
    desc: 'Cyfrowy system radiograficzny umożliwiający wykonanie zdjęcia bez ruszania się pacjenta z fotela. Wynik widoczny na ekranie w kilka sekund.',
  },
  {
    icon: '🔬',
    title: 'Planowanie implantologiczne',
    desc: 'Na podstawie CBCT i specjalistycznego oprogramowania lekarz planuje precyzyjne pozycjonowanie implantów przed zabiegiem.',
  },
  {
    icon: '📁',
    title: 'Cyfrowy zapis i archiwizacja',
    desc: 'Wszystkie obrazy są zapisywane cyfrowo i dostępne podczas każdej kolejnej wizyty — możliwość śledzenia zmian w czasie.',
  },
];

export default function RadiowizjografiaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Radiowizjografia i RTG"
        subtitle="Cyfrowa diagnostyka obrazowa — precyzyjne zdjęcia RTG i tomografia komputerowa bez ruszania się z fotela."
        icon="xray"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta' },
          { label: 'Radiowizjografia i RTG' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Diagnostyka, która przyspiesza leczenie</h2>
            <p>
              Dzięki systemowi Digora Optima wykonujemy cyfrowe zdjęcia RTG bezpośrednio w fotelu
              stomatologicznym — lekarz widzi wynik na ekranie w ciągu kilku sekund. Eliminuje to
              czas oczekiwania i pozwala natychmiast opracować precyzyjny plan leczenia.
            </p>
            <p>
              Dla przypadków wymagających trójwymiarowej oceny tkanek wykonujemy tomografię
              komputerową CBCT — niezbędną przy planowaniu implantów, ocenie ubytków kostnych
              i diagnostyce złożonych stanów zapalnych.
            </p>
            <p>
              Niskie dawki promieniowania, cyfrowy zapis i natychmiastowy dostęp do obrazów
              sprawiają, że diagnostyka w Dentvital jest szybka, bezpieczna i wygodna.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.surgery}
            alt="Radiowizjografia i RTG Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Diagnostyka obrazowa</h2>
            <p>Cyfrowe zdjęcia RTG i tomografia komputerowa na miejscu w gabinecie.</p>
          </div>
          <div className="feature-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="feature-card">
                <div className="feature-icon">{s.icon}</div>
                <h3 className="feature-title">{s.title}</h3>
                <p className="feature-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
