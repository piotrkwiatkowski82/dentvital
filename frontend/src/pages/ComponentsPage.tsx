/**
 * /components — Archiwum wariantów UI
 *
 * Strona dostępna bezpośrednio pod /components (nie w menu).
 * Przechowuje wszystkie niewykorzystane warianty komponentów,
 * żeby nie zginęły a można było do nich wrócić.
 */

import HeroWide from '../components/hero/HeroWide';
import { HeroV1, HeroV3, HeroV4, HeroV5 } from '../components/hero/HeroVariants';
import FocusPanels from '../components/panels/FocusPanels';
import { FocusV1, FocusV2, FocusV3 } from '../components/panels/FocusPanelsVariants';

const Divider = ({ label }: { label: string }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '32px 24px 0',
    maxWidth: 1160,
    margin: '0 auto',
  }}>
    <div style={{ flex: 1, height: 1, background: 'rgba(15,23,42,0.1)' }} />
    <span style={{
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#94a3b8',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
    <div style={{ flex: 1, height: 1, background: 'rgba(15,23,42,0.1)' }} />
  </div>
);

export default function ComponentsPage() {
  return (
    <>
      {/* Nagłówek strony */}
      <div style={{
        background: '#0f172a',
        padding: '48px 24px 40px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 999,
          padding: '6px 16px',
          marginBottom: 20,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24', display: 'block' }} />
          <span style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Archiwum wariantów
          </span>
        </div>
        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          margin: '0 0 12px',
        }}>
          Komponenty — Rezerwowe warianty
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
          Warianty Hero i sekcji Działów, które nie trafiły na stronę główną.
          Dostępne tutaj na wypadek zmiany decyzji lub inspiracji.
        </p>
      </div>

      {/* ── SEKCJA: HERO ─────────────────────────────────── */}
      <Divider label="Hero — Wariant 1 (Split-screen)" />
      <HeroV1 />

      <Divider label="Hero — Wariant 3 (Floating card)" />
      <HeroV3 />

      <Divider label="Hero — Wariant 4 (Siatka zdjęć)" />
      <HeroV4 />

      <Divider label="Hero — Wariant 5 (Wideo w tle)" />
      <HeroV5 />

      <Divider label="Hero — HeroWide (CSS classes)" />
      <HeroWide />

      {/* ── SEKCJA: DZIAŁY ───────────────────────────────── */}
      <Divider label="Działy — Wariant 1 (Karty z ikonami)" />
      <FocusV1 />

      <Divider label="Działy — Wariant 2 (Bento grid)" />
      <FocusV2 />

      <Divider label="Działy — Wariant 3 (Poziome paski)" />
      <FocusV3 />

      <Divider label="Działy — FocusPanels (CSS classes)" />
      <FocusPanels />

      {/* stopka strony showcase */}
      <div style={{ background: '#f8fafc', padding: '48px 24px', textAlign: 'center', borderTop: '1px solid rgba(15,23,42,0.07)' }}>
        <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
          Strona dostępna tylko pod bezpośrednim adresem <strong>/components</strong> — nie indeksowana, nie w menu.
        </p>
      </div>
    </>
  );
}
