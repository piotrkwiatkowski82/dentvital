import { CLINIC } from '../constants/contact';

export default function PrivacyPolicyPage() {
  return (
    <div className="news-detail">
      <h1>Polityka prywatności</h1>
      <p className="muted" style={{ marginBottom: 32 }}>Ostatnia aktualizacja: styczeń 2024</p>

      <div className="content" style={{ fontSize: 16, lineHeight: 1.8 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
          1. Administrator danych osobowych
        </h2>
        <p>
          Administratorem Twoich danych osobowych jest Dentvital z siedzibą przy{' '}
          {CLINIC.address}. Kontakt z administratorem jest możliwy pod adresem e-mail:{' '}
          <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a> lub telefonicznie:{' '}
          <a href={`tel:${CLINIC.phoneRaw}`}>{CLINIC.phone}</a>.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
          2. Zakres zbieranych danych
        </h2>
        <p>
          Zbieramy dane osobowe, które dobrowolnie nam przekazujesz, w szczególności: imię i nazwisko,
          adres e-mail, numer telefonu oraz — w przypadku formularza rejestracyjnego — informacje
          dotyczące wybranej usługi i terminu wizyty.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
          3. Cel i podstawa prawna przetwarzania danych
        </h2>
        <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>
        <ul style={{ paddingLeft: 24, marginTop: 8 }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Rejestracja wizyty</strong> — na podstawie art. 6 ust. 1 lit. b RODO (niezbędność
            do wykonania umowy o świadczenie usług medycznych).
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Obsługa zapytań przez formularz kontaktowy</strong> — na podstawie art. 6 ust. 1
            lit. f RODO (prawnie uzasadniony interes administratora).
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Dokumentacja medyczna</strong> — na podstawie art. 9 ust. 2 lit. h RODO w związku
            z przepisami ustawy o działalności leczniczej.
          </li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
          4. Okres przechowywania danych
        </h2>
        <p>
          Dane zawarte w dokumentacji medycznej przechowujemy przez okres 20 lat od dnia ostatniego
          wpisu, zgodnie z art. 29 ustawy o prawach pacjenta. Dane przetwarzane w celach kontaktowych
          i rezerwacyjnych przechowujemy przez czas niezbędny do realizacji usługi, a następnie przez
          okres przedawnienia roszczeń.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
          5. Prawa osoby, której dane dotyczą
        </h2>
        <p>Przysługują Ci następujące prawa w związku z przetwarzaniem Twoich danych osobowych:</p>
        <ul style={{ paddingLeft: 24, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}>prawo dostępu do danych,</li>
          <li style={{ marginBottom: 6 }}>prawo do sprostowania danych,</li>
          <li style={{ marginBottom: 6 }}>prawo do usunięcia danych (prawo do bycia zapomnianym),</li>
          <li style={{ marginBottom: 6 }}>prawo do ograniczenia przetwarzania,</li>
          <li style={{ marginBottom: 6 }}>prawo do przenoszenia danych,</li>
          <li style={{ marginBottom: 6 }}>prawo do wniesienia sprzeciwu wobec przetwarzania,</li>
          <li style={{ marginBottom: 6 }}>
            prawo do wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych
            Osobowych).
          </li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
          6. Pliki cookies
        </h2>
        <p>
          Niniejsza strona internetowa może używać plików cookies w celu zapewnienia prawidłowego
          działania strony. Pliki cookies to małe pliki tekstowe przechowywane w przeglądarce
          internetowej. Nie używamy plików cookies do śledzenia użytkowników ani do celów
          reklamowych. Możesz wyłączyć obsługę cookies w ustawieniach swojej przeglądarki.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
          7. Kontakt w sprawach ochrony danych
        </h2>
        <p>
          W sprawach związanych z ochroną danych osobowych prosimy o kontakt pod adresem:{' '}
          <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>.
        </p>
      </div>
    </div>
  );
}
