import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '🦴',
    title: 'Terapia bólu kręgosłupa',
    desc: 'Diagnoza i terapia manualna bólów szyjnego, piersiowego i lędźwiowego odcinka kręgosłupa. Indywidualny program ćwiczeń stabilizujących.',
  },
  {
    icon: '🤝',
    title: 'Fizjoterapia stomatologiczna (TMJ)',
    desc: 'Leczenie zaburzeń stawu skroniowo-żuchwowego — bóle głowy, szczękościsk, trzaski stawu, parafunkcje. Ścisła współpraca z ortodontą.',
  },
  {
    icon: '🏃',
    title: 'Rehabilitacja pourazowa',
    desc: 'Program rehabilitacji po urazach stawów, skręceniach i złamaniach. Powrót do pełnej sprawności ruchowej w możliwie najkrótszym czasie.',
  },
  {
    icon: '💪',
    title: 'Trening medyczny',
    desc: 'Indywidualne programy treningu funkcjonalnego po rehabilitacji. Wzmocnienie mięśni głębokich, poprawa stabilizacji i ergonomii ruchu.',
  },
  {
    icon: '🧘',
    title: 'Terapia manualna',
    desc: 'Techniki mobilizacji i manipulacji stawów oraz tkanek miękkich — skuteczne w bólach przeciążeniowych i dysfunkcjach stawowych.',
  },
  {
    icon: '📋',
    title: 'Programy ćwiczeń domowych',
    desc: 'Zestawy ćwiczeń przygotowane indywidualnie, dostępne w formie instrukcji i filmów. Kontynuuj terapię w domu pod okiem specjalisty.',
  },
];

const AUDIENCE = [
  { title: 'Pacjenci z bólem kręgosłupa', desc: 'Bóle szyjne, lędźwiowe, dyskopatia, rwa kulszowa.' },
  { title: 'Pacjenci ortodontyczni', desc: 'Terapia TMJ i mięśni żucia wspomagająca leczenie ortodontyczne.' },
  { title: 'Osoby po urazach', desc: 'Rehabilitacja po skręceniach, zwichnięciach, złamaniach i operacjach.' },
  { title: 'Osoby aktywne sportowo', desc: 'Prewencja kontuzji i trening funkcjonalny poprawiający wydolność.' },
  { title: 'Seniorzy', desc: 'Poprawa równowagi, mobilności i jakości życia — program dopasowany do możliwości.' },
  { title: 'Osoby pracujące przy biurku', desc: 'Likwidacja bólów przeciążeniowych barków i szyi wynikających z pracy siedzącej.' },
];

export default function FizjoterapiaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Fizjoterapia"
        subtitle="Ruch bez bólu i pełna sprawność — terapia manualna, rehabilitacja i trening medyczny."
        icon="physiotherapy"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Fizjoterapia' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Fizjoterapia dopasowana do Ciebie</h2>
            <p>
              W Dentvital fizjoterapia idzie w parze ze stomatologią — wierzymy, że zdrowie
              jamy ustnej i sprawność ciała są ze sobą nierozerwalnie związane. Nasz zespół
              fizjoterapeutów ściśle współpracuje z lekarzami dentystami, szczególnie w
              zakresie terapii stawu skroniowo-żuchwowego (TMJ).
            </p>
            <p>
              Każda terapia zaczyna się od szczegółowego wywiadu i badania funkcjonalnego.
              Na tej podstawie przygotowujemy indywidualny plan terapii z jasno określonymi
              celami i etapami leczenia.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.physiotherapy}
            alt="Fizjoterapia w Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Zakres fizjoterapii</h2>
            <p>Kompleksowa opieka fizjoterapeutyczna dla całej rodziny.</p>
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

      <section className="section scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Dla kogo?</span>
            <h2>Fizjoterapia dla każdego</h2>
            <p>Nasze usługi kierujemy do szerokiego grona pacjentów.</p>
          </div>
          <div className="feature-grid">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="feature-card">
                <h3 className="feature-title">{a.title}</h3>
                <p className="feature-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
