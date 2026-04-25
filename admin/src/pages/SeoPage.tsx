import { useEffect, useState } from 'react';
import { ApiError, apiGet, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface PageMeta { title: string; description: string }
interface SeoData {
  home: PageMeta;
  uslugi: PageMeta;
  galeria: PageMeta;
  aktualnosci: PageMeta;
  zespol: PageMeta;
  kontakt: PageMeta;
}

const PAGES: { key: keyof SeoData; label: string }[] = [
  { key: 'home', label: 'Strona główna (/)' },
  { key: 'uslugi', label: 'Usługi (/uslugi)' },
  { key: 'galeria', label: 'Galeria (/galeria)' },
  { key: 'aktualnosci', label: 'Aktualności (/aktualnosci)' },
  { key: 'zespol', label: 'Zespół (/zespol)' },
  { key: 'kontakt', label: 'Kontakt (/kontakt)' },
];

const EMPTY_PAGE: PageMeta = { title: '', description: '' };
const EMPTY: SeoData = { home: EMPTY_PAGE, uslugi: EMPTY_PAGE, galeria: EMPTY_PAGE, aktualnosci: EMPTY_PAGE, zespol: EMPTY_PAGE, kontakt: EMPTY_PAGE };

export default function SeoPage() {
  const { token, logout } = useAuth();
  const [data, setData] = useState<SeoData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    apiGet<SeoData>('/api/admin/settings/seo', token!)
      .then(setData)
      .catch((err) => { if (err instanceof ApiError && err.status === 401) logout(); })
      .finally(() => setLoading(false));
  }, []);

  function setPage(key: keyof SeoData, field: keyof PageMeta, val: string) {
    setData((prev) => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  }

  async function handleSave() {
    setSaving(true); setError(''); setSuccess('');
    try {
      await apiPutAuth<SeoData>('/api/admin/settings/seo', data, token!);
      setSuccess('Ustawienia SEO zostały zapisane.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Błąd podczas zapisywania.');
    } finally { setSaving(false); }
  }

  if (loading) return <div className="page-loading">Ładowanie…</div>;

  return (
    <div className="page">
      <h2 className="page-title">SEO — meta tytuły i opisy</h2>
      <p className="hint" style={{ marginTop: -8 }}>
        Tytuł strony pojawia się w zakładce przeglądarki i wynikach Google. Opis (do 160 znaków) wyświetla się w snippecie wyszukiwarki.
      </p>

      {PAGES.map(({ key, label }) => (
        <section className="card" key={key}>
          <h3>{label}</h3>
          <div className="form-group">
            <label>Tytuł strony</label>
            <input
              type="text"
              value={data[key].title}
              maxLength={80}
              onChange={(e) => setPage(key, 'title', e.target.value)}
            />
            <span className="hint">{data[key].title.length}/80 znaków</span>
          </div>
          <div className="form-group">
            <label>Meta description</label>
            <textarea
              rows={2}
              value={data[key].description}
              maxLength={160}
              onChange={(e) => setPage(key, 'description', e.target.value)}
            />
            <span className="hint">{data[key].description.length}/160 znaków</span>
          </div>
        </section>
      ))}

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <button className="btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? 'Zapisywanie…' : 'Zapisz wszystkie strony'}
      </button>
    </div>
  );
}
