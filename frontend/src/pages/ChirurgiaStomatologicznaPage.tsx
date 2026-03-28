import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '🦷',
    title: 'Ekstrakcje zębów',
    desc: 'Bezbolesne usuwanie zębów — w tym zębów mądrości — z pełnym znieczuleniem miejscowym i opieką po zabiegu.',
  },
  {
    icon: '🔩',
    title: 'Implanty zębowe',
    desc: 'Wszczepy implantologiczne systemów Nobel Biocare i Straumann. Możliwość protezowania natychmiastowego już w dniu zabiegu.',
  },
  {
    icon: '🧱',
    title: 'Augmentacja kości',
    desc: 'Odbudowa wyrostka zębodołowego przed implantami. Techniki kierowanej regeneracji tkanek (GBR) i podniesienia dna zatoki.',
  },
  {
    icon: '🔬',
    title: 'Chirurgia endodontyczna',
    desc: 'Resekcja wierzchołka korzenia i inne zabiegi ratujące zęby po niepowodzeniu leczenia kanałowego.',
  },
  {
    icon: '🧬',
    title: 'Regeneracja tkanek',
    desc: 'Zabiegi z użyciem osocza bogatopłytkowego (PRF/PRP) przyspieszające gojenie i poprawiające wyniki implantacji.',
  },
  {
    icon: '🩻',
    title: 'Diagnostyka CBCT',
    desc: 'Tomografia wolumetryczna 3D (CBCT) dla precyzyjnego planowania implantów i oceny złożonych przypadków.',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Konsultacja chirurgiczna',
    desc: 'Ocena stanu kości i tkanek miękkich, analiza CBCT 3D, omówienie opcji leczenia i plan implantologiczny.',
  },
  {
    n: 2,
    title: 'Przygotowanie do zabiegu',
    desc: 'Higienizacja jamy ustnej, ewentualne leczenie zachowawcze i ustalenie terminu zabiegu operacyjnego.',
  },
  {
    n: 3,
    title: 'Zabieg operacyjny',
    desc: 'Precyzyjny zabieg w znieczuleniu miejscowym lub przy sedacji. Przestrzegamy najwyższych standardów aseptyki.',
  },
  {
    n: 4,
    title: 'Gojenie i rekonstrukcja',
    desc: 'Kontrola gojenia, opieka pooperacyjna i — gdy czas gojenia upłynie — finalna rekonstrukcja protetyczna.',
  },
];

export default function ChirurgiaStomatologicznaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Chirurgia stomatologiczna"
        subtitle="Precyzyjne zabiegi chirurgiczne — od ekstrakcji po zaawansowaną implantologię i augmentację kości."
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta' },
          { label: 'Chirurgia stomatologiczna' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Bezpieczna chirurgia z pełną opieką</h2>
            <p>
              Chirurgia stomatologiczna w Dentvital to połączenie wieloletniego doświadczenia,
              nowoczesnego sprzętu i indywidualnego podejścia do każdego pacjenta. Wykonujemy
              zarówno proste ekstrakcje, jak i złożone zabiegi rekonstrukcyjne.
            </p>
            <p>
              Wszystkie zabiegi planujemy na podstawie szczegółowej diagnostyki CBCT 3D.
              Precyzyjne oprogramowanie do planowania implantacji pozwala nam przewidzieć
              wynik zabiegu i zminimalizować ryzyko powikłań.
            </p>
            <p>
              Zapewniamy pełną opiekę pooperacyjną — w razie potrzeby jesteśmy dostępni
              telefonicznie przez całą dobę po zabiegu.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.surgery}
            alt="Chirurgia stomatologiczna Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Zabiegi chirurgiczne</h2>
            <p>Kompleksowa chirurgia stomatologiczna i implantologiczna.</p>
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
            <span className="eyebrow">Jak to działa</span>
            <h2>Przebieg leczenia</h2>
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
