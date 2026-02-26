import { useState, type FormEvent } from 'react';
import { sendContactMessage } from '../../api/contact';
import { CLINIC } from '../../constants/contact';
import { IMAGES } from '../../constants/images';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      await sendContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message,
      });
      setMsg('Wiadomość wysłana. Odezwiemy się wkrótce!');
      setMsgType('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setMsg('Wystąpił błąd. Spróbuj ponownie lub zadzwoń.');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="section scroll-reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Kontakt</span>
          <h2>Jesteśmy na wyciągnięcie ręki</h2>
          <p className="muted">
            Umów się telefonicznie, napisz wiadomość lub odwiedź nas w gabinecie
            przy {CLINIC.addressShort}.
          </p>
        </div>

        <div className="contact-showcase">
          <div className="contact-showcase-info">
            <div>
              <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>Gabinet Dentvital</h3>
              <ul className="contact-list">
                <li><strong>Adres:</strong> {CLINIC.address}</li>
                <li><strong>Telefon:</strong> <a href={`tel:${CLINIC.phoneRaw}`}>{CLINIC.phone}</a></li>
                <li><strong>E-mail:</strong> <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></li>
                <li><strong>Godziny:</strong> {CLINIC.hours}</li>
              </ul>
              <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>
                Parking dla pacjentów od podwórza. W budynku dostępna jest winda.
              </p>
            </div>

            <div className="form-panel">
              <h4>Wyślij nam wiadomość</h4>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label>
                    <span>Imię i nazwisko</span>
                    <input type="text" value={form.name} onChange={set('name')} required />
                  </label>
                  <label>
                    <span>E-mail</span>
                    <input type="email" value={form.email} onChange={set('email')} required />
                  </label>
                  <label>
                    <span>Telefon</span>
                    <input type="tel" value={form.phone} onChange={set('phone')} />
                  </label>
                  <label className="full">
                    <span>Wiadomość</span>
                    <textarea value={form.message} onChange={set('message')} rows={4} required />
                  </label>
                </div>
                <div className="form-row">
                  <button type="submit" className="button primary" disabled={loading}>
                    {loading ? 'Wysyłanie…' : 'Wyślij wiadomość'}
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

          <div className="contact-media">
            <div className="contact-media-card">
              <h4>Mapa dojazdu</h4>
              <iframe
                src={CLINIC.mapEmbed}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja kliniki Dentvital"
              />
              <p style={{ marginTop: 12 }}>
                <a
                  href={CLINIC.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}
                >
                  Otwórz w Google Maps &rarr;
                </a>
              </p>
            </div>
            <div className="contact-media-card">
              <h4>Jak nas znaleźć</h4>
              <img
                src={IMAGES.building}
                alt="Nowoczesny budynek kliniki Dentvital - wejście główne"
                width={900}
                height={600}
                loading="lazy"
              />
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 10 }}>
                Wejście od strony {CLINIC.addressShort} — szukaj zielonej witryny na parterze.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
