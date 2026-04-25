import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ApiError, apiDelete, apiGet, apiPostForm } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

interface GalleryListAdmin {
  items: GalleryImage[];
  total: number;
}

const CATEGORIES = [
  { value: 'gabinety', label: 'Gabinety' },
  { value: 'zespol', label: 'Zespół' },
  { value: 'zabiegi', label: 'Zabiegi' },
];

export default function GalleryPage() {
  const { token, logout } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add form state
  const [addFile, setAddFile] = useState<File | null>(null);
  const [addAlt, setAddAlt] = useState('');
  const [addCategory, setAddCategory] = useState('gabinety');
  const [addCaption, setAddCaption] = useState('');
  const [addPreview, setAddPreview] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    setLoading(true);
    try {
      const data = await apiGet<GalleryListAdmin>('/api/admin/gallery', token!);
      setImages(data.items);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Nie udało się załadować galerii.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) return;
    try {
      await apiDelete(`/api/admin/gallery/${id}`, token!);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else alert('Błąd podczas usuwania zdjęcia.');
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddFile(file);
    setAddPreview(URL.createObjectURL(file));
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!addFile) return;
    setAdding(true);
    setAddError('');
    setAddSuccess('');
    try {
      const form = new FormData();
      form.append('file', addFile);
      form.append('alt', addAlt);
      form.append('category', addCategory);
      if (addCaption) form.append('caption', addCaption);

      const newImage = await apiPostForm<GalleryImage>('/api/admin/gallery', form, token!);
      setImages((prev) => [...prev, newImage]);
      setAddFile(null);
      setAddAlt('');
      setAddCategory('gabinety');
      setAddCaption('');
      setAddPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setAddSuccess('Zdjęcie zostało dodane.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else if (err instanceof ApiError && err.status === 422) {
        const detail = (err.data as { detail?: string })?.detail;
        setAddError(detail ?? 'Nieprawidłowe dane.');
      } else {
        setAddError('Błąd podczas dodawania zdjęcia.');
      }
    } finally {
      setAdding(false);
    }
  }

  if (loading) return <div className="page-loading">Ładowanie…</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <h2 className="page-title">Galeria</h2>

      {/* Add image form */}
      <section className="card">
        <h3>Dodaj zdjęcie</h3>
        <form className="add-image-form" onSubmit={handleAdd}>
          <div className="form-row">
            <div className="form-group">
              <label>Plik zdjęcia *</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                required
              />
              {addPreview && (
                <img src={addPreview} alt="Podgląd" className="add-preview" />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="add-alt">Tekst alternatywny (alt) *</label>
              <input
                id="add-alt"
                type="text"
                value={addAlt}
                onChange={(e) => setAddAlt(e.target.value)}
                maxLength={300}
                required
                placeholder="np. Gabinet stomatologiczny"
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-category">Kategoria *</label>
              <select
                id="add-category"
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="add-caption">Podpis (opcjonalny)</label>
              <input
                id="add-caption"
                type="text"
                value={addCaption}
                onChange={(e) => setAddCaption(e.target.value)}
                maxLength={300}
                placeholder="np. Gabinet nr 1"
              />
            </div>
          </div>

          {addError && <p className="form-error">{addError}</p>}
          {addSuccess && <p className="form-success">{addSuccess}</p>}

          <button type="submit" className="btn-primary" disabled={!addFile || adding}>
            {adding ? 'Dodawanie…' : 'Dodaj zdjęcie'}
          </button>
        </form>
      </section>

      {/* Gallery grid */}
      <section className="card">
        <h3>Wszystkie zdjęcia ({images.length})</h3>
        {images.length === 0 ? (
          <p className="empty-state">Brak zdjęć w galerii.</p>
        ) : (
          <div className="gallery-grid">
            {images.map((img) => (
              <div key={img.id} className="gallery-item">
                <img src={img.src} alt={img.alt} className="gallery-thumb" />
                <div className="gallery-item-info">
                  <span className={`category-badge category-${img.category}`}>
                    {CATEGORIES.find((c) => c.value === img.category)?.label ?? img.category}
                  </span>
                  <p className="gallery-item-alt">{img.alt}</p>
                  {img.caption && <p className="gallery-item-caption">{img.caption}</p>}
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(img.id)}
                  aria-label="Usuń zdjęcie"
                >
                  Usuń
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
