const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    ),
    title: 'Konsultacje i planowanie',
    desc: 'Cyfrowe skanery, RTG i analiza uśmiechu — dokładna diagnostyka przed rozpoczęciem leczenia.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
    ),
    title: 'Stomatologia estetyczna',
    desc: 'Licówki, odbudowy kompozytowe i bonding dla harmonijnego uśmiechu.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
    ),
    title: 'Implantologia & protetyka',
    desc: 'Implanty w technologii CAD/CAM oraz prace protetyczne wykonywane w naszym laboratorium.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    ),
    title: 'Profilaktyka i higienizacja',
    desc: 'Skaling ultradźwiękowy, piaskowanie i instruktaż domowej pielęgnacji.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
    ),
    title: 'Chirurgia i endodoncja',
    desc: 'Precyzyjne zabiegi mikroskopowe, leczenie kanałowe i regeneracja tkanek.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    title: 'Opieka rodzinna',
    desc: 'Wizyty adaptacyjne, logopedia i fizjoterapia stomatologiczna w jednym miejscu.',
  },
];

export default function ServicesSection() {
  return (
    <section id="uslugi" className="section scroll-reveal">
      <div className="container">
        <div className="section-shell">
          <div className="section-head">
            <span className="eyebrow">Oferta</span>
            <h2>Kompleksowa opieka stomatologiczna</h2>
            <p className="muted">
              Łączymy diagnostykę 3D, leczenie zachowawcze i estetyczne, aby każdy
              pacjent otrzymał kompletny plan terapii.
            </p>
          </div>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <article className="feature-card" key={f.title}>
                <span className="feature-icon">{f.icon}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
