import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '🔧',
    title: 'Aparaty stałe metalowe',
    desc: 'Klasyczne i bezligaturowe zamki metalowe — skuteczne w korekcji nawet złożonych wad zgryzu. Dostępne również w wersji wykonanej ze złota 24K.',
  },
  {
    icon: '💎',
    title: 'Aparaty kosmetyczne',
    desc: 'Zamki w kolorze zębów (ceramiczne lub szafirowe) oraz aparaty bezligaturowe — dyskretne i estetyczne rozwiązanie dla dorosłych.',
  },
  {
    icon: '🦷',
    title: 'Alignery i pozycjonery',
    desc: 'Przezroczyste nakładki ortodontyczne (MULTI P, MULTI S, MULTI T, EF Trainer) oraz inne pozycjonery elastyczne. Niewidoczne i wygodne.',
  },
  {
    icon: '👶',
    title: 'Ortodoncja dziecięca',
    desc: 'Aparaty ruchome i stałe dla dzieci. Wczesna interwencja ortodontyczna pozwala skorygować wady przed zakończeniem wzrostu.',
  },
  {
    icon: '🩺',
    title: 'Aparat Herbsta i dr. Hinza',
    desc: 'Funkcjonalne aparaty czynnościowe korygujące relację między szczęką a żuchwą. Szczególnie skuteczne u dzieci w fazie wzrostu.',
  },
  {
    icon: '📋',
    title: 'Retencja po leczeniu',
    desc: 'Indywidualnie dobrane retainery stałe i ruchome, utrzymujące wynik leczenia ortodontycznego na lata.',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Konsultacja ortodontyczna',
    desc: 'Ocena zgryzu, wykonanie dokumentacji fotograficznej, zdjęć RTG i modeli. Omówienie planu leczenia i wybór aparatu.',
  },
  {
    n: 2,
    title: 'Zakładanie aparatu',
    desc: 'Precyzyjne przyklejenie zamków lub dopasowanie alinerów. Instruktaż higieny i kontrola okluzji.',
  },
  {
    n: 3,
    title: 'Wizyty kontrolne',
    desc: 'Regularne wizyty co 4–8 tygodni — aktywacja aparatu, ocena postępów leczenia i korekta planu w razie potrzeby.',
  },
  {
    n: 4,
    title: 'Retencja',
    desc: 'Po zakończeniu aktywnego leczenia zakładamy retainery, które utrzymują zęby w nowej pozycji przez co najmniej 2 lata.',
  },
];

export default function OrtodoncjaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Ortodoncja"
        subtitle="Leczenie wad zgryzu u dzieci i dorosłych — od tradycyjnych aparatów po nowoczesne alignery."
        icon="brackets"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta' },
          { label: 'Ortodoncja' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Piękny uśmiech w każdym wieku</h2>
            <p>
              Oferujemy szeroki zakres leczenia ortodontycznego dla dzieci i dorosłych. Dobieramy
              metodę indywidualnie — zależnie od wady zgryzu, wieku pacjenta i jego oczekiwań
              estetycznych.
            </p>
            <p>
              Stosujemy zarówno klasyczne aparaty stałe, jak i nowoczesne alignery i pozycjonery
              elastyczne. Każde leczenie poprzedza szczegółowa diagnostyka, w tym zdjęcia
              cefalometryczne i modele studyjne.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.teamHero}
            alt="Ortodoncja Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Leczenie ortodontyczne</h2>
            <p>Szeroki wybór metod ortodontycznych dla każdego wieku i potrzeby.</p>
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
