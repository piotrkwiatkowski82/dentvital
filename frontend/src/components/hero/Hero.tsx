import { IMAGES } from '../../constants/images';
import { CLINIC } from '../../constants/contact';

export default function Hero() {
  return (
    <section className="top-hero scroll-reveal" aria-labelledby="hero-title">
      <div className="container top-hero-inner">
        <span className="label">
          <span className="label-dot" />
          Klinika stomatologiczna
        </span>

        <h1 id="hero-title">
          Twój uśmiech,<br />
          <span className="hero-highlight">nasz priorytet</span>
        </h1>

        <p className="lead">
          Kompleksowa opieka, komfort i transparentność na każdym etapie leczenia.
          Od pierwszej wizyty po gotowy uśmiech.
        </p>

        <div className="cta-row">
          <a className="button primary" href="#rejestracja">Umów wizytę</a>
          <a className="button ghost" href={`tel:${CLINIC.phoneRaw}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {CLINIC.phone}
          </a>
        </div>

        <ul className="hero-bullets">
          <li>Stomatologia estetyczna</li>
          <li>Implantologia</li>
          <li>Wybielanie zębów</li>
        </ul>

        <img
          className="hero-image"
          src={IMAGES.hero}
          alt="Nowoczesny gabinet stomatologiczny"
          width={1200}
          height={600}
          loading="lazy"
        />

        <div className="scroll-indicator" aria-hidden="true">
          <span>Przewiń</span>
          <div className="scroll-indicator-line" />
        </div>
      </div>
      <div className="top-hero-bg" aria-hidden="true" />
    </section>
  );
}
