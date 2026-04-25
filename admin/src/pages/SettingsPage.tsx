import { useEffect, useState } from 'react';
import { ApiError, apiGet, apiPostForm, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import ImageUploadField from '../components/ImageUploadField';

interface SiteSettingResponse {
  key: string;
  value: string;
  updated_at: string;
}

interface HeroText {
  badge: string;
  heading_line1: string;
  heading_line2: string;
  subtext: string;
  cta_primary: string;
  tags: string[];
}

const HERO_TEXT_EMPTY: HeroText = {
  badge: '',
  heading_line1: '',
  heading_line2: '',
  subtext: '',
  cta_primary: '',
  tags: [],
};

export default function SettingsPage() {
  const { token, logout } = useAuth();

  // Hero image
  const [heroUrl, setHeroUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgSaving, setImgSaving] = useState(false);
  const [imgError, setImgError] = useState('');
  const [imgSuccess, setImgSuccess] = useState('');

  // Hero text
  const [heroText, setHeroText] = useState<HeroText>(HERO_TEXT_EMPTY);
  const [tagsInput, setTagsInput] = useState('');
  const [textSaving, setTextSaving] = useState(false);
  const [textError, setTextError] = useState('');
  const [textSuccess, setTextSuccess] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [img, txt] = await Promise.all([
        apiGet<SiteSettingResponse>('/api/admin/settings/hero', token!),
        apiGet<HeroText>('/api/admin/settings/hero-text', token!),
      ]);
      setHeroUrl(img.value);
      setHeroText(txt);
      setTagsInput(txt.tags.join(', '));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveImage() {
    if (!selectedFile) return;
    setImgSaving(true);
    setImgError('');
    setImgSuccess('');
    try {
      const form = new FormData();
      form.append('file', selectedFile);
      const data = await apiPostForm<SiteSettingResponse>('/api/admin/settings/hero', form, token!);
      setHeroUrl(data.value);
      setSelectedFile(null);
      setImgSuccess('Zdjęcie hero zostało zaktualizowane.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else if (err instanceof ApiError && err.status === 422) {
        setImgError((err.data as { detail?: string })?.detail ?? 'Nieprawidłowy plik.');
      } else {
        setImgError('Błąd podczas zapisywania.');
      }
    } finally {
      setImgSaving(false);
    }
  }

  async function handleSaveText() {
    setTextSaving(true);
    setTextError('');
    setTextSuccess('');
    try {
      await apiPutAuth<HeroText>('/api/admin/settings/hero-text', heroText, token!);
      setTextSuccess('Teksty hero zostały zapisane.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setTextError('Błąd podczas zapisywania.');
    } finally {
      setTextSaving(false);
    }
  }

  function handleTagsChange(val: string) {
    setTagsInput(val);
    setHeroText((prev) => ({ ...prev, tags: val.split(',').map((t) => t.trim()).filter(Boolean) }));
  }

  if (loading) return <div className="page-loading">Ładowanie…</div>;

  return (
    <div className="page">
      <h2 className="page-title">Ustawienia strony</h2>

      {/* ── Hero image ── */}
      <section className="card">
        <h3>Zdjęcie w sekcji Hero</h3>
        <p className="hint">
          Tło sekcji głównej na stronie startowej. Format: JPEG, PNG, WebP, max 5 MB.
        </p>
        <ImageUploadField
          label="Aktualne zdjęcie hero"
          currentSrc={heroUrl ?? undefined}
          onFileChange={setSelectedFile}
        />
        {imgError && <p className="form-error">{imgError}</p>}
        {imgSuccess && <p className="form-success">{imgSuccess}</p>}
        <button className="btn-primary" onClick={handleSaveImage} disabled={!selectedFile || imgSaving}>
          {imgSaving ? 'Zapisywanie…' : 'Zapisz zdjęcie'}
        </button>
      </section>

      {/* ── Hero text ── */}
      <section className="card">
        <h3>Teksty sekcji Hero</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Etykieta (badge)</label>
            <input type="text" value={heroText.badge} onChange={(e) => setHeroText((p) => ({ ...p, badge: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Przycisk CTA</label>
            <input type="text" value={heroText.cta_primary} onChange={(e) => setHeroText((p) => ({ ...p, cta_primary: e.target.value }))} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nagłówek — linia 1</label>
            <input type="text" value={heroText.heading_line1} onChange={(e) => setHeroText((p) => ({ ...p, heading_line1: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Nagłówek — linia 2 (wyróżniona)</label>
            <input type="text" value={heroText.heading_line2} onChange={(e) => setHeroText((p) => ({ ...p, heading_line2: e.target.value }))} />
          </div>
        </div>

        <div className="form-group">
          <label>Podtytuł</label>
          <textarea rows={3} value={heroText.subtext} onChange={(e) => setHeroText((p) => ({ ...p, subtext: e.target.value }))} />
        </div>

        <div className="form-group">
          <label>Tagi <span className="hint-inline">(oddziel przecinkami)</span></label>
          <input type="text" value={tagsInput} placeholder="np. Stomatologia estetyczna, Implantologia" onChange={(e) => handleTagsChange(e.target.value)} />
        </div>

        {textError && <p className="form-error">{textError}</p>}
        {textSuccess && <p className="form-success">{textSuccess}</p>}
        <button className="btn-primary" onClick={handleSaveText} disabled={textSaving}>
          {textSaving ? 'Zapisywanie…' : 'Zapisz teksty'}
        </button>
      </section>
    </div>
  );
}
