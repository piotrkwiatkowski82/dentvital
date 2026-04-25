import { useEffect, useRef, useState } from 'react';
import { ApiError, apiGet, apiPostForm, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface ContactData {
  address: string;
  address_short: string;
  city: string;
  phone: string;
  phone_raw: string;
  email: string;
  hours: string;
  map_embed: string;
  map_link: string;
  building_image_url: string;
}

const EMPTY: ContactData = {
  address: '',
  address_short: '',
  city: '',
  phone: '',
  phone_raw: '',
  email: '',
  hours: '',
  map_embed: '',
  map_link: '',
  building_image_url: '',
};

export default function ContactPage() {
  const { token, logout } = useAuth();
  const [data, setData] = useState<ContactData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imgSuccess, setImgSuccess] = useState('');
  const [imgError, setImgError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const result = await apiGet<ContactData>('/api/admin/settings/contact', token!);
      setData(result);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Nie udało się załadować danych kontaktowych.');
    } finally {
      setLoading(false);
    }
  }

  function handleField(key: keyof ContactData, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await apiPutAuth<ContactData>('/api/admin/settings/contact', data, token!);
      setSuccess('Dane kontaktowe zostały zapisane.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Błąd podczas zapisywania.');
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setImgError('');
    setImgSuccess('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await apiPostForm<ContactData>(
        '/api/admin/settings/contact/image',
        formData,
        token!,
      );
      setData(result);
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = '';
      setImgSuccess('Zdjęcie zostało zaktualizowane.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setImgError('Błąd podczas przesyłania zdjęcia.');
    } finally {
      setUploadingImg(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  }

  if (loading) return <div className="page-loading">Ładowanie…</div>;

  return (
    <div className="page">
      <h2 className="page-title">Dane kontaktowe</h2>

      {/* ── Basic info ── */}
      <section className="card">
        <h3>Informacje kontaktowe</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="c-address">Pełny adres</label>
            <input
              id="c-address"
              type="text"
              value={data.address}
              onChange={(e) => handleField('address', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-address-short">Krótki adres</label>
            <input
              id="c-address-short"
              type="text"
              value={data.address_short}
              onChange={(e) => handleField('address_short', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-city">Miasto z kodem pocztowym</label>
            <input
              id="c-city"
              type="text"
              value={data.city}
              onChange={(e) => handleField('city', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="c-phone">Telefon (wyświetlany)</label>
            <input
              id="c-phone"
              type="text"
              value={data.phone}
              onChange={(e) => handleField('phone', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-phone-raw">
              Telefon (tel: link) <span className="hint">np. +48666977530</span>
            </label>
            <input
              id="c-phone-raw"
              type="text"
              value={data.phone_raw}
              onChange={(e) => handleField('phone_raw', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-email">E-mail</label>
            <input
              id="c-email"
              type="text"
              value={data.email}
              onChange={(e) => handleField('email', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="c-hours">Godziny otwarcia</label>
          <input
            id="c-hours"
            type="text"
            value={data.hours}
            onChange={(e) => handleField('hours', e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Zapisywanie…' : 'Zapisz dane'}
        </button>
      </section>

      {/* ── Map ── */}
      <section className="card">
        <h3>Mapa Google</h3>

        <div className="form-group">
          <label htmlFor="c-map-embed">
            Kod embed mapy{' '}
            <span className="hint">
              (Google Maps → Udostępnij → Umieść mapę → skopiuj wartość src="…")
            </span>
          </label>
          <textarea
            id="c-map-embed"
            value={data.map_embed}
            rows={4}
            onChange={(e) => handleField('map_embed', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="c-map-link">Link „Otwórz w Google Maps"</label>
          <input
            id="c-map-link"
            type="text"
            value={data.map_link}
            onChange={(e) => handleField('map_link', e.target.value)}
          />
        </div>

        {data.map_embed && (
          <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <iframe
              src={data.map_embed}
              width="100%"
              height="260"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Podgląd mapy"
            />
          </div>
        )}

        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Zapisywanie…' : 'Zapisz mapę'}
        </button>
      </section>

      {/* ── Building photo ── */}
      <section className="card">
        <h3>Zdjęcie budynku</h3>

        <div className="image-upload-field">
          <div className="image-preview">
            <img
              src={previewUrl ?? data.building_image_url}
              alt="Zdjęcie budynku"
            />
          </div>

          <div className="file-input-row">
            <label className="btn-secondary" style={{ cursor: 'pointer' }}>
              Wybierz nowe zdjęcie
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="file-input"
                onChange={handleFileChange}
              />
            </label>
            {previewUrl && (
              <button
                className="btn-primary"
                onClick={handleImageUpload}
                disabled={uploadingImg}
              >
                {uploadingImg ? 'Przesyłanie…' : 'Prześlij zdjęcie'}
              </button>
            )}
          </div>

          {imgSuccess && <p className="form-success">{imgSuccess}</p>}
          {imgError && <p className="form-error">{imgError}</p>}
          <p className="hint">Format: JPEG, PNG lub WebP. Maksymalny rozmiar: 5 MB.</p>
        </div>
      </section>
    </div>
  );
}
