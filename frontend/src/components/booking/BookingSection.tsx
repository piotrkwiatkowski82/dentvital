import { useState, type FormEvent } from 'react';
import { createBooking } from '../../api/booking';
import { BOOKING_SERVICES } from '../../constants/services';

export default function BookingSection() {
  const [form, setForm] = useState({
    service: BOOKING_SERVICES[0],
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
  });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      await createBooking({
        service: form.service,
        date: form.date,
        time: form.time,
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
      });
      setMsg('Rezerwacja wysłana. Skontaktujemy się, by ją potwierdzić. Dziękujemy!');
      setMsgType('success');
      setForm({ service: BOOKING_SERVICES[0], date: '', time: '', name: '', phone: '', email: '' });
    } catch {
      setMsg('Wystąpił błąd. Spróbuj ponownie lub zadzwoń do recepcji.');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rejestracja" className="section scroll-reveal">
      <div className="container">
        <div className="section-shell booking-shell">
          <div>
            <span className="eyebrow">Rejestracja online</span>
            <h2>Umów wizytę</h2>
            <p className="muted" style={{ maxWidth: 400 }}>
              W kilku krokach wybierasz usługę, termin i potwierdzasz wizytę.
              Otrzymasz kontakt zwrotny z potwierdzeniem.
            </p>
            <ul className="list-check" style={{ marginTop: 20 }}>
              <li>Wybierz interesującą Cię usługę i termin.</li>
              <li>Podaj dane kontaktowe, by otrzymać potwierdzenie.</li>
              <li>Oddzwonimy, by potwierdzić dostępność terminu.</li>
            </ul>
          </div>

          <div className="booking-form-panel">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  <span>Usługa</span>
                  <select value={form.service} onChange={set('service')} required>
                    {BOOKING_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Data</span>
                  <input type="date" value={form.date} onChange={set('date')} required />
                </label>
                <label>
                  <span>Godzina</span>
                  <input type="time" value={form.time} onChange={set('time')} required />
                </label>
                <label>
                  <span>Imię i nazwisko</span>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="Jan Kowalski" required />
                </label>
                <label>
                  <span>Telefon</span>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="600 000 000" required />
                </label>
                <label>
                  <span>E-mail</span>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="jan@przyklad.pl" />
                </label>
              </div>
              <div className="form-row">
                <button type="submit" className="button primary" disabled={loading}>
                  {loading ? 'Wysyłanie…' : 'Zarezerwuj wizytę'}
                </button>
                {msg && (
                  <div className={`form-message ${msgType}`} role="status" aria-live="polite">
                    {msg}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
