import { IMAGES } from '../../constants/images';

const PANELS = [
  {
    label: 'Stomatologia',
    title: 'Doświadczenie i nowoczesność dla Twojego uśmiechu',
    desc: 'Kompleksowa diagnostyka, profilaktyka i implantologia z wykorzystaniem cyfrowych narzędzi.',
    cta: 'Umów wizytę',
    href: '#rejestracja',
    img: IMAGES.hero,
    color: '#16a34a',
    lightColor: '#e8f5ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 6.5c1.2 1.5 1.5 3.2 1 5.1-.3 1.1-.7 2-1.2 2.7-.3.5-.7.9-1.2 1.1-.4.1-.8 0-1.1-.3-.6-.6-.8-1.7-1.1-2.3-.4-.9-1.2-1.3-2.1-.9-.5.2-.8.6-1 1.1-.3.6-.6 1.6-1.2 2.2-.3.3-.7.5-1.2.4-.5-.1-.9-.5-1.2-.9C6.2 13 5.7 11.8 5.5 10.4 5 7.5 6.2 5.3 8.5 4.1 10 3.3 11.7 3 13.4 3.4c1.7.4 3.1 1.3 4.1 3.1z" />
      </svg>
    ),
  },
  {
    label: 'Fizjoterapia',
    title: 'Ruch bez bólu i pełna sprawność',
    desc: 'Terapia bólu kręgosłupa i stawów, rehabilitacja pourazowa oraz praca nad postawą i TMJ.',
    cta: 'Poznaj zespół',
    href: '#zespol',
    img: IMAGES.physiotherapy,
    color: '#0284c7',
    lightColor: '#e0f2fe',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Logopedia',
    title: 'Wyraźna mowa od najmłodszych lat',
    desc: 'Diagnoza, terapia wad wymowy i współpraca z ortodontą oraz fizjoterapeutą.',
    cta: 'Umów konsultację',
    href: '#kontakt',
    img: IMAGES.team,
    color: '#7c3aed',
    lightColor: '#ede9fe',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    label: 'Trening medyczny',
    title: 'Silne ciało — bezpieczny ruch',
    desc: 'Programy funkcjonalne i stabilizujące, które przygotują do powrotu do aktywności.',
    cta: 'Zobacz program',
    href: '#rejestracja',
    img: IMAGES.surgery,
    color: '#d97706',
    lightColor: '#fef3c7',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
];

const Label = ({ text }: { text: string }) => (
  <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#7c3aed', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '5px 18px', borderRadius: 999, zIndex: 10, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
    DZIAŁY — {text}
  </div>
);

/* ─── WARIANT 1: Karty z ikonami i gradientem ─── */
export function FocusV1() {
  return (
    <section style={{ position: 'relative', padding: '80px 0', background: '#f8fafc' }}>
      <Label text="Wariant 1 — Karty z ikonami" />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Nasza oferta</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, margin: '8px 0 0', letterSpacing: '-0.02em' }}>Kompleksowa opieka pod jednym dachem</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {PANELS.map((p) => (
            <a key={p.label} href={p.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 20, padding: '32px 24px', border: '1px solid rgba(15,23,42,0.07)', boxShadow: '0 2px 12px rgba(15,23,42,0.06)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(15,23,42,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(15,23,42,0.06)'; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: p.lightColor, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{p.label}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px', lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 20px', flexGrow: 1 }}>{p.desc}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: p.color, fontWeight: 600, fontSize: 14 }}>
                {p.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WARIANT 2: Bento grid ─── */
export function FocusV2() {
  const [main, ...rest] = PANELS;
  return (
    <section style={{ position: 'relative', padding: '80px 0', background: '#fff' }}>
      <Label text="Wariant 2 — Bento grid" />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: 'auto auto', gap: 16 }}>
          {/* duży panel */}
          <div style={{ gridRow: '1 / 3', background: `linear-gradient(160deg, ${main.lightColor} 0%, #fff 100%)`, borderRadius: 24, padding: '48px 40px', border: `1px solid ${main.color}22`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 440 }}>
            <div>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: main.lightColor, color: main.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, border: `1px solid ${main.color}33` }}>
                {main.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: main.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{main.label}</div>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{main.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 380 }}>{main.desc}</p>
            </div>
            <a href={main.href} className="button primary" style={{ alignSelf: 'flex-start', marginTop: 32 }}>{main.cta}</a>
          </div>
          {/* 3 mniejsze */}
          {rest.map((p) => (
            <div key={p.label} style={{ background: '#f8fafc', borderRadius: 20, padding: '28px 28px', border: '1px solid rgba(15,23,42,0.07)', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: p.lightColor, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {p.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{p.label}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 12px' }}>{p.desc}</p>
                <a href={p.href} style={{ fontSize: 13, fontWeight: 600, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {p.cta} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WARIANT 3: Poziome paski ─── */
export function FocusV3() {
  return (
    <section style={{ position: 'relative', padding: '80px 0', background: '#f8fafc' }}>
      <Label text="Wariant 3 — Poziome paski" />
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PANELS.map((p, i) => (
          <div key={p.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid rgba(15,23,42,0.07)', boxShadow: '0 2px 12px rgba(15,23,42,0.04)' }}>
            {/* tekst */}
            <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: p.lightColor, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: p.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.label}</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 20px', maxWidth: 400 }}>{p.desc}</p>
              <a href={p.href} style={{ alignSelf: 'flex-start', background: p.color, color: '#fff', padding: '10px 22px', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>{p.cta}</a>
            </div>
            {/* zdjęcie */}
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <img src={p.img} alt={p.label} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── WARIANT 4: Karty ze zdjęciem w tle ─── */
export function FocusV4() {
  return (
    <section style={{ position: 'relative', padding: '80px 0', background: '#0f172a' }}>
      <Label text="Wariant 4 — Zdjęcia w tle" />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#4ade80', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Nasza oferta</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, margin: '8px 0 0', letterSpacing: '-0.02em', color: '#fff' }}>Kompleksowa opieka pod jednym dachem</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {PANELS.map((p) => (
            <a key={p.label} href={p.href} style={{ textDecoration: 'none', position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 380, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <img src={p.img} alt={p.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(10,15,10,0.9) 0%, rgba(10,15,10,0.4) 50%, rgba(10,15,10,0.1) 100%)` }} />
              <div style={{ position: 'relative', padding: '24px 24px 28px' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: p.color === '#16a34a' ? '#4ade80' : '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, opacity: 0.8 }}>{p.label}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 8px', lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 16px' }}>{p.desc}</p>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: 8 }}>
                  {p.cta} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
