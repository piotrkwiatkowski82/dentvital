import PageHero from '../components/ui/PageHero';
import { CLINIC } from '../constants/contact';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="O nas"
        title="Polityka prywatności"
        subtitle="Informacje o przetwarzaniu danych osobowych przez Dentvital."
        icon="shield"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'O nas' },
          { label: 'Polityka prywatności' },
        ]}
      />

      <div className="container">
        <div className="article-body">
          <p className="article-lead">
            Ostatnia aktualizacja: styczeń 2024
          </p>

          <div className="article-content">
            <h2>1. Administrator danych osobowych</h2>
            <p>
              Administratorem Twoich danych osobowych jest Dentvital z siedzibą przy{' '}
              {CLINIC.address}. Kontakt z administratorem jest możliwy pod adresem e-mail:{' '}
              <a href={`mailto:${CLINIC.email}`} style={{ color: 'var(--accent)' }}>{CLINIC.email}</a>{' '}
              lub telefonicznie:{' '}
              <a href={`tel:${CLINIC.phoneRaw}`} style={{ color: 'var(--accent)' }}>{CLINIC.phone}</a>.
            </p>

            <h2>2. Zakres zbieranych danych</h2>
            <p>
              Zbieramy dane osobowe, które dobrowolnie nam przekazujesz, w szczególności: imię
              i nazwisko, adres e-mail, numer telefonu oraz — w przypadku formularza
              rejestracyjnego — informacje dotyczące wybranej usługi i terminu wizyty.
            </p>

            <h2>3. Cel i podstawa prawna przetwarzania danych</h2>
            <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>
            <ul>
              <li>
                <strong>Rejestracja wizyty</strong> — na podstawie art. 6 ust. 1 lit. b RODO
                (niezbędność do wykonania umowy o świadczenie usług medycznych).
              </li>
              <li>
                <strong>Obsługa zapytań przez formularz kontaktowy</strong> — na podstawie
                art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora).
              </li>
              <li>
                <strong>Dokumentacja medyczna</strong> — na podstawie art. 9 ust. 2 lit. h
                RODO w związku z przepisami ustawy o działalności leczniczej.
              </li>
            </ul>

            <h2>4. Okres przechowywania danych</h2>
            <p>
              Dane zawarte w dokumentacji medycznej przechowujemy przez okres 20 lat od dnia
              ostatniego wpisu, zgodnie z art. 29 ustawy o prawach pacjenta. Dane przetwarzane
              w celach kontaktowych i rezerwacyjnych przechowujemy przez czas niezbędny do
              realizacji usługi, a następnie przez okres przedawnienia roszczeń.
            </p>

            <h2>5. Prawa osoby, której dane dotyczą</h2>
            <p>
              Przysługują Ci następujące prawa w związku z przetwarzaniem Twoich danych
              osobowych:
            </p>
            <ul>
              <li>prawo dostępu do danych,</li>
              <li>prawo do sprostowania danych,</li>
              <li>prawo do usunięcia danych (prawo do bycia zapomnianym),</li>
              <li>prawo do ograniczenia przetwarzania,</li>
              <li>prawo do przenoszenia danych,</li>
              <li>prawo do wniesienia sprzeciwu wobec przetwarzania,</li>
              <li>
                prawo do wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony
                Danych Osobowych).
              </li>
            </ul>

            <h2>6. Pliki cookies</h2>
            <p>
              Niniejsza strona internetowa może używać plików cookies w celu zapewnienia
              prawidłowego działania strony. Pliki cookies to małe pliki tekstowe przechowywane
              w przeglądarce internetowej. Nie używamy plików cookies do śledzenia użytkowników
              ani do celów reklamowych. Możesz wyłączyć obsługę cookies w ustawieniach swojej
              przeglądarki.
            </p>

            <h2>7. Kontakt w sprawach ochrony danych</h2>
            <p>
              W sprawach związanych z ochroną danych osobowych prosimy o kontakt pod adresem:{' '}
              <a href={`mailto:${CLINIC.email}`} style={{ color: 'var(--accent)' }}>{CLINIC.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
