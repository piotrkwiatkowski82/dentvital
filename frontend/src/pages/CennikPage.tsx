import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { usePricing } from '../hooks/usePricing';

export default function CennikPage() {
  useScrollReveal();
  const { categories, loading } = usePricing();

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
          {loading && (
            <p className="muted" style={{ textAlign: 'center', padding: '48px 0' }}>
              Ładowanie cennika…
            </p>
          )}
          <div className="cennik-grid">
            {categories.map((cat) => (
              <div key={cat.id} className="price-table">
                <div className="price-table-head">
                  <span className="price-table-icon">{cat.icon}</span>
                  <h3>{cat.title}</h3>
                </div>
                <table className="price-list">
                  <tbody>
                    {cat.rows.map((row) => (
                      <tr key={row.id}>
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
