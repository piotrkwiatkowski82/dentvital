import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '👑',
    title: 'Korony protetyczne',
    desc: 'Korony pełnoceramiczne i cyrkonowe odbudowujące zniszczone zęby. Idealne odwzorowanie koloru i kształtu naturalnego zęba.',
  },
  {
    icon: '🌉',
    title: 'Mosty protetyczne',
    desc: 'Stałe uzupełnienie jednego lub kilku brakujących zębów oparte na zębach sąsiednich lub implantach. Komfort porównywalny z naturalnymi zębami.',
  },
  {
    icon: '🔩',
    title: 'Protezy na implantach',
    desc: 'Stałe lub dopinane protezy mocowane na implantach — eliminują niedogodności tradycyjnych protez ruchomych.',
  },
  {
    icon: '🦷',
    title: 'Protezy szkieletowe',
    desc: 'Częściowe protezy ruchome z metalowym szkieletem — lżejsze i trwalsze od akrylowych. Precyzyjne klamry niewidoczne przy uśmiechu.',
  },
  {
    icon: '🏛️',
    title: 'Protetyka cyrkonowa CAD/CAM',
    desc: 'Korony i mosty frezowane cyfrowo z bloczków cyrkonu lub ceramiki. Najwyższa precyzja i estetyka — bez metalowego podbudowania.',
  },
  {
    icon: '🔄',
    title: 'Protezy całkowite',
    desc: 'Nowoczesne protezy akrylowe lub na podbudowie metalowej dla pacjentów bezzębnych. Stabilne, estetyczne i funkcjonalne.',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Konsultacja i plan leczenia',
    desc: 'Ocena stanu zachowanych zębów, omówienie dostępnych opcji protetycznych i ustalenie kolejności etapów leczenia.',
  },
  {
    n: 2,
    title: 'Przygotowanie zębów filarowych',
    desc: 'Szlifowanie zębów pod korony lub mosty, ewentualnie leczenie kanałowe lub odbudowa wkładem koronowo-korzeniowym.',
  },
  {
    n: 3,
    title: 'Wyciski i projekt w laboratorium',
    desc: 'Pobranie precyzyjnych wycisków lub skan cyfrowy i przekazanie do laboratorium protetycznego. Wykonanie uzupełnienia tymczasowego.',
  },
  {
    n: 4,
    title: 'Osadzenie i kontrola',
    desc: 'Przymierzenie, korekta i ostateczne osadzenie uzupełnienia. Instruktaż pielęgnacji i kontrola po 2 tygodniach.',
  },
];

export default function ProtetykaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Protetyka"
        subtitle="Odbudowa brakujących i zniszczonych zębów — trwałe, estetyczne uzupełnienia protetyczne dla każdego pacjenta."
        icon="crown"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta' },
          { label: 'Protetyka' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Kompletne uzębienie na każdym etapie życia</h2>
            <p>
              Protetyka stomatologiczna przywraca funkcję żucia, estetykę uśmiechu i komfort
              codziennego życia. W Dentvital każde uzupełnienie protetyczne wykonujemy we
              współpracy ze sprawdzonym laboratorium, stosując materiały ceramiczne i cyrkonowe
              najwyższej klasy.
            </p>
            <p>
              Oferujemy zarówno uzupełnienia stałe (korony, mosty, nakłady), jak i ruchome
              (protezy całkowite i częściowe) oraz nowoczesne protezy szkieletowe. Każde
              rozwiązanie jest indywidualnie dopasowane do potrzeb i budżetu pacjenta.
            </p>
            <p>
              Dzięki technologii CAD/CAM możemy realizować korony i mosty cyrkonowe w krótkim
              czasie, zachowując najwyższą precyzję dopasowania.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.galleryInterior}
            alt="Protetyka Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Uzupełnienia protetyczne</h2>
            <p>Kompleksowa protetyka stomatologiczna — korony, mosty i protezy na miarę.</p>
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
