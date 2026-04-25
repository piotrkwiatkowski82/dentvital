import { useEffect, useState } from 'react';
import { ApiError, apiGet, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface BannerData {
  is_active: boolean;
  text: string;
  type: 'info' | 'warning' | 'success';
  link_url: string;
  link_text: string;
  dismissable: boolean;
}

const EMPTY: BannerData = {
  is_active: false,
  text: '',
  type: 'info',
  link_url: '',
  link_text: '',
  dismissable: true,
};

const TYPE_LABELS = { info: 'Informacja (niebieski)', warning: 'Ostrzeżenie (żółty)', success: 'Sukces (zielony)' };
const TYPE_PREVIEW: Record<string, { bg: string; color: string; border: string }> = {
  info:    { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  warning: { bg: '#fefce8', color: '#92400e', border: '#fde68a' },
  success: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
};

export default function BannerPage() {
  const { token, logout } = useAuth();
  const [data, setData] = useState<BannerData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    apiGet<BannerData>('/api/admin/settings/banner', token!)
      .then(setData)
      .catch((err) => { if (err instanceof ApiError && err.status === 401) logout(); })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true); setError(''); setSuccess('');
    try {
      const saved = await apiPutAuth<BannerData>('/api/admin/settings/banner', data, token!);
      setData(saved);
      setSuccess(saved.is_active ? 'Baner jest teraz widoczny na stronie.' : 'Ustawienia zapisane. Baner jest wyłączony.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Błąd podczas zapisywania.');
    } finally { setSaving(false); }
  }

  async function toggleActive() {
    const updated = { ...data, is_active: !data.is_active };
    setData(updated);
    try {
      const saved = await apiPutAuth<BannerData>('/api/admin/settings/banner', updated, token!);
      setData(saved);
      setSuccess(saved.is_active ? '✓ Baner włączony — widoczny na stronie.' : '✓ Baner wyłączony.');
      setError('');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else { setError('Błąd podczas zapisywania.'); setData(data); }
    }
  }

  if (loading) return <div className="page-loading">Ładowanie…</div>;

  const preview = TYPE_PREVIEW[data.type];

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Baner / ogłoszenie</h2>
        <button
          className={`btn-primary`}
          style={data.is_active ? { background: 'var(--color-danger)' } : {}}
          onClick={toggleActive}
        >
          {data.is_active ? '⏹ Wyłącz baner' : '▶ Włącz baner'}
        </button>
      </div>

      {/* Live status */}
      <div className={`status-banner-indicator ${data.is_active ? 'active' : 'inactive'}`}>
        <span className="status-dot" />
        {data.is_active ? 'Baner jest aktualnie WIDOCZNY na stronie' : 'Baner jest wyłączony — niewidoczny na stronie'}
      </div>

      {/* Preview */}
      {data.text.trim() && (
        <section className="card" style={{ padding: '12px 20px' }}>
          <p className="hint" style={{ marginBottom: 8 }}>Podgląd:</p>
          <div style={{ padding: '10px 16px', background: preview.bg, color: preview.color, borderRadius: 8, border: `1px solid ${preview.border}`, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{data.type === 'warning' ? '⚠️' : data.type === 'success' ? '✅' : 'ℹ️'}</span>
            <span style={{ flex: 1 }}>
              {data.text}
              {data.link_url && data.link_text && (
                <> <span style={{ fontWeight: 700, textDecoration: 'underline' }}>{data.link_text} →</span></>
              )}
            </span>
            {data.dismissable && <span style={{ opacity: 0.6, fontSize: 13 }}>✕</span>}
          </div>
        </section>
      )}

      {/* Form */}
      <section className="card">
        <h3>Treść ogłoszenia</h3>

        <div className="form-group">
          <label htmlFor="banner-text">Tekst komunikatu</label>
          <textarea
            id="banner-text"
            rows={3}
            value={data.text}
            placeholder="np. Klinika nieczynna 24–26 maja z powodu świąt. Zapraszamy od 27 maja."
            onChange={(e) => setData((p) => ({ ...p, text: e.target.value }))}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="banner-type">Typ / kolor</label>
            <select
              id="banner-type"
              value={data.type}
              onChange={(e) => setData((p) => ({ ...p, type: e.target.value as BannerData['type'] }))}
            >
              {(Object.entries(TYPE_LABELS) as [BannerData['type'], string][]).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ justifyContent: 'flex-end' }}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={data.dismissable}
                onChange={(e) => setData((p) => ({ ...p, dismissable: e.target.checked }))}
              />
              Można zamknąć (przycisk ✕)
            </label>
          </div>
        </div>

        <h3 style={{ marginTop: 4 }}>Link (opcjonalnie)</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="banner-link-text">Tekst linku</label>
            <input
              id="banner-link-text"
              type="text"
              value={data.link_text}
              placeholder="np. Sprawdź nowe godziny"
              onChange={(e) => setData((p) => ({ ...p, link_text: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="banner-link-url">URL linku</label>
            <input
              id="banner-link-url"
              type="text"
              value={data.link_url}
              placeholder="np. /kontakt lub https://..."
              onChange={(e) => setData((p) => ({ ...p, link_url: e.target.value }))}
            />
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Zapisywanie…' : 'Zapisz ustawienia'}
        </button>
      </section>
    </div>
  );
}
