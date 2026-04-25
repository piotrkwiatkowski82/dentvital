import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, NEWS_IMAGES } from '../../constants/images';
import { CLINIC } from '../../constants/contact';
import { useHeroImage } from '../../hooks/useHeroImage';
import { useHeroText } from '../../hooks/useHeroText';
import { fetchNews } from '../../api/news';
import type { NewsItem } from '../../types';

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ─── WARIANT 1: Split-screen ─────────────────────────── */
export function HeroV1() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f0faf4 0%, #fff 60%)' }}>
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', padding: '6px 20px', borderRadius: 999, zIndex: 10, textTransform: 'uppercase' }}>
        Wariant 1 — Split-screen
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', minHeight: '88vh', padding: '80px 24px' }}>
        <div>
          <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px 6px 8px', borderRadius: 999, background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600, fontSize: 13, border: '1px solid rgba(22,163,74,0.15)', marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            Klinika stomatologiczna
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            Twój uśmiech,<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent), #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nasz priorytet</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: '0 0 32px' }}>
            Kompleksowa opieka, komfort i transparentność na każdym etapie leczenia. Od pierwszej wizyty po gotowy uśmiech.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
            <a className="button primary" href="#rejestracja">Umów wizytę</a>
            <a className="button ghost" href={`tel:${CLINIC.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PhoneIcon />{CLINIC.phone}
            </a>
          </div>
          <ul style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 0, listStyle: 'none', margin: 0 }}>
            {['Stomatologia estetyczna', 'Implantologia', 'Wybielanie zębów'].map(item => (
              <li key={item} style={{ background: 'var(--bg-elev)', border: '1px solid rgba(15,23,42,0.06)', padding: '10px 16px', borderRadius: 12, fontWeight: 500, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(ellipse at center, rgba(22,163,74,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
          <img
            src={IMAGES.hero}
            alt="Gabinet stomatologiczny"
            style={{ width: '100%', height: 520, objectFit: 'cover', borderRadius: 24, boxShadow: '0 24px 60px rgba(15,23,42,0.15)', position: 'relative', zIndex: 1, display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── WARIANT 2: Pełne tło ze zdjęciem ───────────────── */
export function HeroV2() {
  const heroSrc = useHeroImage();
  const ht = useHeroText();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews(3).then((data) => setNews(data.items)).catch(() => {});
  }, []);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
      <img
        src={heroSrc}
        alt=""
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(10,20,15,0.82) 0%, rgba(10,20,15,0.5) 60%, rgba(10,20,15,0.2) 100%)', zIndex: 1 }} />

      {/* główna treść hero */}
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '120px 24px 60px', maxWidth: 700, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px 6px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 600, fontSize: 13, border: '1px solid rgba(255,255,255,0.2)', marginBottom: 24, backdropFilter: 'blur(8px)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
          {ht.badge}
        </span>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 66px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px' }}>
          {ht.heading_line1}<br />
          <span style={{ color: '#4ade80' }}>{ht.heading_line2}</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 36px' }}>
          {ht.subtext}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
          <a className="button primary" href="#rejestracja">{ht.cta_primary}</a>
          <a href={`tel:${CLINIC.phoneRaw}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontWeight: 600, fontSize: 15, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.08)', textDecoration: 'none' }}>
            <PhoneIcon />{CLINIC.phone}
          </a>
        </div>
        <ul style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 0, listStyle: 'none', margin: 0 }}>
          {ht.tags.map(item => (
            <li key={item} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '10px 16px', borderRadius: 12, fontWeight: 500, fontSize: 13, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(8px)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* pasek aktualności */}
      {news.length > 0 && (
        <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '0 0 32px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Aktualności</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {news.map((item, i) => (
                <Link
                  key={item.slug}
                  to={`/aktualnosci/${item.slug}`}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 16, padding: '16px 18px', backdropFilter: 'blur(12px)', textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  <img
                    src={NEWS_IMAGES[i % NEWS_IMAGES.length]}
                    alt=""
                    style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                      {new Date(item.published_at).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.45, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: 8 }}>
                      {item.title}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.excerpt}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── WARIANT 3: Floating card z blob ────────────────── */
export function HeroV3() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', padding: '6px 20px', borderRadius: 999, zIndex: 10, textTransform: 'uppercase' }}>
        Wariant 3 — Floating card
      </div>
      {/* duży zielony blob w tle */}
      <div style={{ position: 'absolute', top: -100, right: -150, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse at center, #e8f5ee 0%, #f0faf4 50%, transparent 70%)', zIndex: 0 }} />
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', minHeight: '88vh', padding: '80px 24px', position: 'relative', zIndex: 1 }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px 6px 8px', borderRadius: 999, background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600, fontSize: 13, border: '1px solid rgba(22,163,74,0.15)', marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            Klinika stomatologiczna
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            Twój uśmiech,<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent), #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nasz priorytet</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: '0 0 32px' }}>
            Kompleksowa opieka, komfort i transparentność na każdym etapie leczenia. Od pierwszej wizyty po gotowy uśmiech.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
            <a className="button primary" href="#rejestracja">Umów wizytę</a>
            <a className="button ghost" href={`tel:${CLINIC.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PhoneIcon />{CLINIC.phone}
            </a>
          </div>
          <ul style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 0, listStyle: 'none', margin: 0 }}>
            {['Stomatologia estetyczna', 'Implantologia', 'Wybielanie zębów'].map(item => (
              <li key={item} style={{ background: 'var(--bg-elev)', border: '1px solid rgba(15,23,42,0.06)', padding: '10px 16px', borderRadius: 12, fontWeight: 500, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
            <div style={{ position: 'absolute', top: 20, left: 20, right: -20, bottom: -20, borderRadius: 28, border: '2px solid rgba(22,163,74,0.2)', zIndex: 0 }} />
            <img
              src={IMAGES.hero}
              alt="Gabinet stomatologiczny"
              style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 24, boxShadow: '0 20px 50px rgba(15,23,42,0.12)', position: 'relative', zIndex: 1, display: 'block' }}
            />
            {/* pływająca plakietka */}
            <div style={{ position: 'absolute', bottom: 28, left: -24, zIndex: 2, background: '#fff', borderRadius: 16, padding: '14px 20px', boxShadow: '0 8px 32px rgba(15,23,42,0.12)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>4.9 / 5</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Ocena pacjentów</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WARIANT 4: Siatka magazynowa ───────────────────── */
export function HeroV4() {
  return (
    <section style={{ position: 'relative', background: '#fff' }}>
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', padding: '6px 20px', borderRadius: 999, zIndex: 10, textTransform: 'uppercase' }}>
        Wariant 4 — Siatka
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', minHeight: '88vh', padding: '80px 24px' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px 6px 8px', borderRadius: 999, background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600, fontSize: 13, border: '1px solid rgba(22,163,74,0.15)', marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            Klinika stomatologiczna
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            Twój uśmiech,<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent), #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nasz priorytet</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: '0 0 32px' }}>
            Kompleksowa opieka, komfort i transparentność na każdym etapie leczenia. Od pierwszej wizyty po gotowy uśmiech.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
            <a className="button primary" href="#rejestracja">Umów wizytę</a>
            <a className="button ghost" href={`tel:${CLINIC.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PhoneIcon />{CLINIC.phone}
            </a>
          </div>
          <ul style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 0, listStyle: 'none', margin: 0 }}>
            {['Stomatologia estetyczna', 'Implantologia', 'Wybielanie zębów'].map(item => (
              <li key={item} style={{ background: 'var(--bg-elev)', border: '1px solid rgba(15,23,42,0.06)', padding: '10px 16px', borderRadius: 12, fontWeight: 500, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* siatka 3-kolumnowa: duże | 2 średnie | 3 małe */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1.5fr', gap: 4, height: 500 }}>
          {/* kolumna 1 — jedno duże */}
          <img src={IMAGES.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          {/* kolumna 2 — dwa średnie */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 4 }}>
            <img src={IMAGES.teamHero}      alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <img src={IMAGES.surgery}       alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          {/* kolumna 3 — trzy małe */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1fr', gap: 4 }}>
            <img src={IMAGES.physiotherapy}   alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <img src={IMAGES.building}        alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <img src={IMAGES.galleryInterior} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WARIANT 5: Wideo w tle ─────────────────────────── */
export function HeroV5() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(10,20,15,0.82) 0%, rgba(10,20,15,0.5) 60%, rgba(10,20,15,0.2) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', padding: '6px 20px', borderRadius: 999, zIndex: 10, textTransform: 'uppercase' }}>
        Wariant 5 — Wideo w tle
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '120px 24px 80px', maxWidth: 700 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px 6px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 600, fontSize: 13, border: '1px solid rgba(255,255,255,0.2)', marginBottom: 24, backdropFilter: 'blur(8px)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
          Klinika stomatologiczna
        </span>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 66px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px' }}>
          Twój uśmiech,<br />
          <span style={{ color: '#4ade80' }}>nasz priorytet</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 36px' }}>
          Kompleksowa opieka, komfort i transparentność na każdym etapie leczenia. Od pierwszej wizyty po gotowy uśmiech.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
          <a className="button primary" href="#rejestracja">Umów wizytę</a>
          <a href={`tel:${CLINIC.phoneRaw}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontWeight: 600, fontSize: 15, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.08)', textDecoration: 'none' }}>
            <PhoneIcon />{CLINIC.phone}
          </a>
        </div>
        <ul style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 0, listStyle: 'none', margin: 0 }}>
          {['Stomatologia estetyczna', 'Implantologia', 'Wybielanie zębów'].map(item => (
            <li key={item} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '10px 16px', borderRadius: 12, fontWeight: 500, fontSize: 13, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(8px)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
