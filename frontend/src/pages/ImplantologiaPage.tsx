import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '🦷',
    title: 'Implanty pojedyncze',
    desc: 'Wszczepienie jednego lub kilku implantów w miejsce brakujących zębów. Naturalna estetyka i pełna funkcjonalność bez szlifowania zębów sąsiednich.',
  },
  {
    icon: '🔩',
    title: 'Mosty na implantach',
    desc: 'Stałe uzupełnienie protetyczne oparte na dwóch lub więcej implantach. Idealne rozwiązanie przy kilku brakujących zębach obok siebie.',
  },
  {
    icon: '🦾',
    title: 'All-on-4 / All-on-6',
    desc: 'Rekonstrukcja całego łuku zębowego na 4 lub 6 implantach. Stałe zęby w ciągu jednego dnia — bez protezy ruchomej.',
  },
  {
    icon: '🧱',
    title: 'Augmentacja kości',
    desc: 'Odbudowa wyrostka zębodołowego przed implantami techniką GBR. Umożliwia implantację nawet przy znacznym zaniku kości.',
  },
  {
    icon: '🩻',
    title: 'Diagnostyka CBCT 3D',
    desc: 'Precyzyjne planowanie na podstawie tomografii wolumetrycznej. Minimalizuje ryzyko powikłań i skraca czas zabiegu.',
  },
  {
    icon: '🔬',
    title: 'Implanty natychmiastowe',
    desc: 'Wszczepienie implantu bezpośrednio po ekstrakcji zęba, co skraca leczenie i ogranicza liczbę wizyt.',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Zabieg chirurgiczny',
    desc: 'Wywiercie precyzyjnego otworu w kości i wszczepienie implantu w znieczuleniu miejscowym. Zabieg trwa 30–120 minut. Implant integruje się z kością przez 3–6 miesięcy.',
  },
  {
    n: 2,
    title: 'Odsłonięcie i śruba gojąca',
    desc: 'Po osteointegracji lekarz odsłania implant i wkręca śrubę gojącą, która modeluje dziąsło pod przyszłą koronę. Regeneracja trwa ok. 14 dni.',
  },
  {
    n: 3,
    title: 'Korona protetyczna',
    desc: 'Pobranie wycisku, ustalenie koloru i zamocowanie docelowej korony na łączniku protetycznym. Efekt: trwały, estetyczny ząb na lata.',
  },
];

export default function ImplantologiaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Implantologia"
        subtitle="Trwałe, estetyczne rozwiązanie dla brakujących zębów — implanty MIS wszczepianie przez wykwalifikowanego chirurga szczękowego."
        icon="surgery"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta' },
          { label: 'Implantologia' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Implanty, którym możesz zaufać</h2>
            <p>
              Stosujemy implanty systemu MIS — jednego z wiodących producentów na świecie,
              certyfikowanego w Polsce pod numerem PL/DR 016469. Każdy implant dostarczany jest
              ze sterylnym wiertłem dedykowanym do jego rozmiaru, co zapewnia precyzję i
              bezpieczeństwo zabiegu.
            </p>
            <p>
              Wszelkie zabiegi implantologiczne wykonuje wykwalifikowany chirurg szczękowy. Na
              wszystkie nasze prace protetyczne i implantologiczny udzielamy rękojmi.
            </p>
            <p>
              Cały proces leczenia zamykamy w trzech etapach, dzięki czemu minimalizujemy liczbę
              wizyt i czas leczenia.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.surgery}
            alt="Implantologia Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Zabiegi implantologiczne</h2>
            <p>Kompleksowa implantologia dostosowana do potrzeb każdego pacjenta.</p>
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
