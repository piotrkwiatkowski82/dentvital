import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';

interface PriceRow {
  service: string;
  price: string;
}

interface PriceCategory {
  icon: string;
  title: string;
  rows: PriceRow[];
}

const PRICE_CATEGORIES: PriceCategory[] = [
  {
    icon: '🦷',
    title: 'Stomatologia zachowawcza',
    rows: [
      { service: 'Wypełnienie kompozytowe', price: '300–500 zł' },
      { service: 'Lakowanie bruzd', price: '150 zł' },
      { service: 'Leczenie kanałowe (1 kanał)', price: '600 zł' },
      { service: 'Leczenie kanałowe (2–3 kanały)', price: '800–1000 zł' },
      { service: 'Scaling (skaling)', price: '250 zł' },
      { service: 'Piaskowanie', price: '300 zł' },
      { service: 'Fluoryzacja', price: '80 zł' },
    ],
  },
  {
    icon: '✨',
    title: 'Stomatologia estetyczna',
    rows: [
      { service: 'Licówka kompozytowa', price: '600 zł' },
      { service: 'Licówka porcelanowa', price: '2000 zł' },
      { service: 'Wybielanie (lampa)', price: '1500 zł' },
      { service: 'Wybielanie (nakładki domowe)', price: '350 zł' },
      { service: 'Proteza tymczasowa', price: '1000 zł' },
    ],
  },
  {
    icon: '⚕️',
    title: 'Chirurgia stomatologiczna',
    rows: [
      { service: 'Ekstrakcja zęba', price: '300–600 zł' },
      { service: 'Ekstrakcja zęba mądrości', price: '800 zł' },
      { service: 'Augmentacja kości', price: '2500–5000 zł' },
      { service: 'Plastyka dziąseł', price: 'od 200 zł / punkt' },
    ],
  },
  {
    icon: '👑',
    title: 'Protetyka',
    rows: [
      { service: 'Korona pełnoceramiczna / cyrkonowa', price: '1200–1800 zł' },
      { service: 'Most ceramiczny (za przęsło)', price: '1200–1800 zł' },
      { service: 'Proteza akrylowa częściowa', price: '1500 zł' },
      { service: 'Proteza akrylowa całkowita', price: '2000 zł' },
      { service: 'Proteza na 4 implantach', price: '16 000 zł' },
    ],
  },
  {
    icon: '🔩',
    title: 'Implantologia',
    rows: [
      { service: 'Konsultacja implantologiczna', price: '250 zł' },
      { service: 'Implant (wszczepienie)', price: '3000–4000 zł' },
      { service: 'Podniesienie zatoki (sinus lift)', price: '2500–4500 zł' },
      { service: 'Augmentacja kości (GBR)', price: '2500–5000 zł' },
    ],
  },
  {
    icon: '🦴',
    title: 'Ortodoncja',
    rows: [
      { service: 'Konsultacja ortodontyczna', price: '200 zł' },
      { service: 'Aparat stały (łuk)', price: '2800–4100 zł' },
      { service: 'Aparat ruchomy', price: '400–1800 zł' },
      { service: 'Retainer stały', price: '300–500 zł' },
      { service: 'Retainer ruchomy', price: '100–200 zł' },
    ],
  },
  {
    icon: '💆',
    title: 'Medycyna estetyczna',
    rows: [
      { service: 'Wypełniacz tkankowy (kwas hialuronowy)', price: '900 zł / ml' },
      { service: 'Toksyna botulinowa (Botox) — 1 okolica', price: '700 zł' },
      { service: 'Toksyna botulinowa (Botox) — 3 okolice', price: '1200 zł' },
      { service: 'Biorewitalizacja skóry', price: '400–1400 zł' },
    ],
  },
];

export default function CennikPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="Przejrzystość cen"
        title="Cennik"
        subtitle="Orientacyjne ceny usług stomatologicznych i estetycznych w Dentvital. Ostateczna wycena leczenia ustalana jest indywidualnie podczas konsultacji."
        icon="shield"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Cennik' },
        ]}
      />

      <div className="container">
        <div className="cennik-intro scroll-reveal">
          <p>
            Podane ceny mają charakter orientacyjny. Koszt leczenia zależy od stopnia
            zaawansowania przypadku, zastosowanych materiałów i indywidualnych potrzeb pacjenta.
            Dokładną wycenę otrzymasz po bezpłatnej konsultacji ze stomatologiem.
          </p>
          <p>
            Akceptujemy gotówkę, karty płatnicze oraz przelewy. Istnieje możliwość
            rozłożenia kosztów większych procedur na raty — zapytaj nasz personel o szczegóły.
          </p>
        </div>
      </div>

      <section className="section scroll-reveal">
        <div className="container">
          <div className="cennik-grid">
            {PRICE_CATEGORIES.map((cat) => (
              <div key={cat.title} className="price-table">
                <div className="price-table-head">
                  <span className="price-table-icon">{cat.icon}</span>
                  <h3>{cat.title}</h3>
                </div>
                <table className="price-list">
                  <tbody>
                    {cat.rows.map((row) => (
                      <tr key={row.service}>
                        <td className="price-service">{row.service}</td>
                        <td className="price-amount">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="cennik-note">
            <span className="cennik-note-icon">ℹ️</span>
            <div>
              <h4>Informacja o cenach</h4>
              <p>
                Ceny mogą ulec zmianie w przypadku rozbudowanego lub długotrwałego leczenia.
                Zastrzegamy sobie prawo do aktualizacji cennika. Wszelkie zmiany zostaną
                podane do wiadomości pacjentów z wyprzedzeniem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
