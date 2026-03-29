import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const DISCOUNTS = [
  {
    icon: '🦷',
    title: 'Stomatologia zachowawcza',
    discount: '5%',
    desc: 'Leczenie próchnicy, wypełnienia kompozytowe, endodoncja i profilaktyka stomatologiczna.',
  },
  {
    icon: '👶',
    title: 'Stomatologia dziecięca',
    discount: '5%',
    desc: 'Kompleksowa opieka stomatologiczna dla dzieci w przyjaznym i bezpiecznym środowisku.',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Posiadaj Kartę',
    desc: 'Szczecińska Karta Rodzinna wydawana jest przez Miasto Szczecin. Więcej informacji na stronie przyjaznyrodzinie.szczecin.pl.',
  },
  {
    n: 2,
    title: 'Zadzwoń lub przyjdź do rejestracji',
    desc: 'Poinformuj naszą recepcję, że posiadasz Szczecińską Kartę Rodzinną. Zapytaj o szczegóły i umów wizytę.',
  },
  {
    n: 3,
    title: 'Okaż Kartę przy rejestracji',
    desc: 'W dniu wizyty okaż Kartę w recepcji — zniżka zostanie automatycznie uwzględniona w rozliczeniu.',
  },
];

export default function KartaRodzinnaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="O nas"
        title="Szczecińska Karta Rodzinna"
        subtitle="Jesteśmy Partnerem programu Szczecin Przyjazny Rodzinie. Posiadacze Karty otrzymują gwarantowane zniżki na zabiegi stomatologiczne."
        icon="users"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'O nas' },
          { label: 'Szczecińska Karta Rodzinna' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Wspieramy szczecińskie rodziny</h2>
            <p>
              Dentvital jest oficjalnym Partnerem programu <strong>Szczecin Przyjazny Rodzinie</strong>,
              realizowanego przez Miasto Szczecin. Celem programu jest tworzenie warunków
              do korzystania z różnych form preferencji, ulg i udogodnień wspierających
              szczecińskie rodziny.
            </p>
            <p>
              Zapraszamy wszystkich posiadaczy Szczecińskiej Karty Rodzinnej do skorzystania
              z naszych usług i otrzymania gwarantowanej zniżki. Wystarczy okazać Kartę
              w naszej rejestracji.
            </p>
            <p>
              Więcej informacji o programie i warunkach otrzymania Karty znajdziesz na stronie{' '}
              <a href="https://www.przyjaznyrodzinie.szczecin.pl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                przyjaznyrodzinie.szczecin.pl
              </a>.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.team}
            alt="Dentvital — partner Szczecińskiej Karty Rodzinnej"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Zniżki</span>
            <h2>Co obejmuje zniżka?</h2>
            <p>Posiadacze Karty otrzymują rabat na poniższe zabiegi stomatologiczne.</p>
          </div>
          <div className="feature-grid" style={{ maxWidth: 720, margin: '0 auto' }}>
            {DISCOUNTS.map((d) => (
              <div key={d.title} className="feature-card" style={{ position: 'relative' }}>
                <div className="feature-icon">{d.icon}</div>
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'var(--accent)', color: '#fff',
                  borderRadius: 999, padding: '4px 14px',
                  fontSize: 15, fontWeight: 700,
                }}>
                  -{d.discount}
                </div>
                <h3 className="feature-title">{d.title}</h3>
                <p className="feature-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Jak skorzystać</span>
            <h2>Trzy proste kroki</h2>
          </div>
          <ol className="steps-list" style={{ maxWidth: 640 }}>
            {STEPS.map((step) => (
              <li key={step.n} className="step-item">
                <div className="step-number">{step.n}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
