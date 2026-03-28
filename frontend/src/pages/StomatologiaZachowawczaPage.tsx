import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '🦷',
    title: 'Leczenie próchnicy',
    desc: 'Precyzyjna diagnoza i nowoczesne materiały kompozytowe. Odbudowujemy zęby w kolorze naturalnego szkliwa — bez amalgamatu.',
  },
  {
    icon: '🔬',
    title: 'Endodoncja mikroskopowa',
    desc: 'Leczenie kanałowe pod mikroskopem zabiegowym. Dokładna wizualizacja każdego kanału gwarantuje skuteczność leczenia.',
  },
  {
    icon: '✨',
    title: 'Stomatologia estetyczna',
    desc: 'Licówki ceramiczne i kompozytowe, bonding, cyfrowe planowanie uśmiechu (DSD). Efekty widoczne już po pierwszej wizycie.',
  },
  {
    icon: '🪥',
    title: 'Profilaktyka i higienizacja',
    desc: 'Skaling ultradźwiękowy, piaskowanie, fluoryzacja i indywidualny instruktaż higieny jamy ustnej dla całej rodziny.',
  },
  {
    icon: '⬜',
    title: 'Wybielanie zębów',
    desc: 'Profesjonalne wybielanie nakładkowe w domu lub zabiegowe w gabinecie. Bezpieczne dla szkliwa, trwałe efekty.',
  },
  {
    icon: '🧩',
    title: 'Odbudowy protetyczne',
    desc: 'Korony i mosty ceramiczne, onlay i overlay — precyzyjne uzupełnienia CAD/CAM gotowe nawet w jednej wizycie.',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Konsultacja i diagnoza',
    desc: 'Cyfrowe zdjęcie RTG, skaner 3D i dokładne badanie. Wspólnie omawiamy wyniki i możliwości leczenia.',
  },
  {
    n: 2,
    title: 'Plan leczenia',
    desc: 'Indywidualny, przejrzysty plan z informacją o czasie, kosztach i kolejnych etapach. Bez niespodzianek.',
  },
  {
    n: 3,
    title: 'Zabieg',
    desc: 'Leczenie w znieczuleniu miejscowym, nowoczesnym sprzętem. Dbamy o Twój komfort na każdym etapie.',
  },
  {
    n: 4,
    title: 'Opieka po zabiegu',
    desc: 'Instruktaż pielęgnacji, kontrola wyników i dostępność telefoniczna. Jesteśmy z Tobą po zabiegu.',
  },
];

export default function StomatologiaZachowawczaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Stomatologia zachowawcza"
        subtitle="Kompleksowe leczenie zębów — od profilaktyki i higienizacji po estetykę i endodoncję mikroskopową."
        icon="tooth"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta' },
          { label: 'Stomatologia zachowawcza' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Zdrowe i piękne zęby przez całe życie</h2>
            <p>
              Stomatologia zachowawcza to fundament zdrowego uśmiechu. W Dentvital łączymy
              precyzyjną diagnostykę cyfrową z nowoczesnym leczeniem — zawsze dobieramy
              rozwiązanie dopasowane do indywidualnych potrzeb pacjenta.
            </p>
            <p>
              Stosujemy wyłącznie materiały najwyższej klasy: kompozyty bez BPA, ceramikę
              CAD/CAM i systemy adhezyjne nowej generacji. Leczenie kanałowe wykonujemy
              wyłącznie pod mikroskopem zabiegowym, co znacząco podnosi jego skuteczność.
            </p>
            <p>
              Oferujemy wizyty adaptacyjne dla dzieci i młodzieży, aby od najmłodszych lat
              budować pozytywne doświadczenia związane z wizytą u stomatologa.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.hero}
            alt="Gabinet stomatologiczny Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Zakres leczenia</h2>
            <p>Kompleksowa opieka od profilaktyki po zaawansowane zabiegi estetyczne.</p>
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
            <p>Przejrzysty proces — wiemy, że komfort i jasna komunikacja są dla Ciebie kluczowe.</p>
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
