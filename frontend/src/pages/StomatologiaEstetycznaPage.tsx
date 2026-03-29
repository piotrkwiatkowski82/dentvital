import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { IMAGES } from '../constants/images';

const SERVICES = [
  {
    icon: '✨',
    title: 'Wybielanie zębów',
    desc: 'Profesjonalne wybielanie gabinetowe metodą Beyond lub nakładkowe do stosowania w domu. Efekty widoczne już po pierwszym zabiegu — nawet 8 odcieni jaśniej.',
  },
  {
    icon: '💎',
    title: 'Licówki porcelanowe',
    desc: 'Cienkie płytki ceramiczne przyklejane do powierzchni zębów — korygują kształt, kolor i ustawienie zębów bez rozległego szlifowania.',
  },
  {
    icon: '🎨',
    title: 'Kompozytowe odbudowy estetyczne',
    desc: 'Odbudowa zębów zbita próchnicy lub urazu kompozytem w kolorze zębów. Naturalny wygląd i trwałość przy minimalnej ingerencji w ząb.',
  },
  {
    icon: '🦷',
    title: 'Projekt uśmiechu (Smile Design)',
    desc: 'Cyfrowe projektowanie uśmiechu — wizualizacja efektu końcowego przed rozpoczęciem leczenia.',
  },
  {
    icon: '💬',
    title: 'Korekta dziąseł',
    desc: 'Laserowa plastyka dziąseł wyrównująca ich linię i odsłaniająca właściwą część korony zęba — kluczowy element harmonijnego uśmiechu.',
  },
  {
    icon: '🔆',
    title: 'Bonding kompozytowy',
    desc: 'Szybka i nieodwracalna korekta kształtu, koloru i długości zębów przy użyciu kompozytu. Efekt w jednej wizycie bez szlifowania zębów.',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Analiza estetyczna',
    desc: 'Ocena proporcji twarzy, koloru zębów i linii uśmiechu. Ustalenie oczekiwań pacjenta i możliwości leczenia.',
  },
  {
    n: 2,
    title: 'Projekt i wax-up',
    desc: 'Cyfrowa wizualizacja lub fizyczny model woskowy pokazujący planowany efekt przed jakąkolwiek ingerencją w zęby.',
  },
  {
    n: 3,
    title: 'Realizacja zabiegu',
    desc: 'Precyzyjne wykonanie wybranych procedur z pełnym komfortem pacjenta — od wybielania po licówki ceramiczne.',
  },
  {
    n: 4,
    title: 'Pielęgnacja i retencja',
    desc: 'Instruktaż pielęgnacji, zalecenia dietetyczne i wizyty kontrolne dbające o trwałość efektu.',
  },
];

export default function StomatologiaEstetycznaPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Oferta"
        title="Stomatologia estetyczna"
        subtitle="Piękny uśmiech to wyraz zdrowia i pewności siebie — kompleksowe zabiegi estetyczne dopasowane do Twojej twarzy."
        icon="smile"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Oferta' },
          { label: 'Stomatologia estetyczna' },
        ]}
      />

      <div className="container">
        <div className="service-intro scroll-reveal">
          <div className="service-intro-text">
            <h2>Uśmiech, który robi wrażenie</h2>
            <p>
              Stomatologia estetyczna łączy precyzję medyczną z wrażliwością artystyczną. Każde
              leczenie rozpoczynamy od dokładnej analizy estetyki twarzy i uśmiechu — tak, aby
              efekt końcowy był nie tylko piękny, ale i naturalny.
            </p>
            <p>
              Stosujemy materiały kompozytowe i ceramiczne najwyższej klasy, które doskonale
              odwzorowują kolor, przezierność i fakturę naturalnych zębów.
            </p>
            <p>
              Proponujemy zarówno szybkie zabiegi jednoseansowe, jak i kompleksowe projekty
              uśmiechu realizowane etapami — zawsze w ścisłej współpracy z pacjentem.
            </p>
          </div>
          <img
            className="service-intro-img"
            src={IMAGES.hero}
            alt="Stomatologia estetyczna Dentvital"
            loading="lazy"
          />
        </div>
      </div>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Usługi</span>
            <h2>Zabiegi estetyczne</h2>
            <p>Kompleksowe leczenie estetyczne dla pięknego i zdrowego uśmiechu.</p>
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
