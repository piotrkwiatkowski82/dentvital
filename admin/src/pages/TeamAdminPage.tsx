import { useEffect, useRef, useState } from 'react';
import { ApiError, apiDelete, apiGet, apiPostAuth, apiPostForm, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  bio: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

interface TeamListResponse {
  items: TeamMember[];
}

type Mode = 'list' | 'new' | 'edit';

const EMPTY_FORM = {
  name: '',
  title: '',
  specializations: [] as string[],
  bio: '',
  image_url: '',
  sort_order: 0,
  is_active: true,
};

export default function TeamAdminPage() {
  const { token, logout } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<Mode>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [specsInput, setSpecsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [imgUploading, setImgUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet<TeamListResponse>('/api/admin/team', token!);
      setMembers(data.items);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Nie udało się załadować członków zespołu.');
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setForm({ ...EMPTY_FORM, sort_order: members.length });
    setSpecsInput('');
    setPreviewUrl(null);
    setEditingId(null);
    setFormError('');
    setMode('new');
  }

  function openEdit(m: TeamMember) {
    setForm({
      name: m.name,
      title: m.title,
      specializations: m.specializations,
      bio: m.bio,
      image_url: m.image_url,
      sort_order: m.sort_order,
      is_active: m.is_active,
    });
    setSpecsInput(m.specializations.join(', '));
    setPreviewUrl(null);
    setEditingId(m.id);
    setFormError('');
    setMode('edit');
  }

  function handleSpecsChange(val: string) {
    setSpecsInput(val);
    setForm((prev) => ({
      ...prev,
      specializations: val.split(',').map((s) => s.trim()).filter(Boolean),
    }));
  }

  async function handleSave() {
    if (!form.name.trim() || !form.title.trim()) {
      setFormError('Imię/nazwa i stanowisko są wymagane.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      if (mode === 'new') {
        const created = await apiPostAuth<TeamMember>('/api/admin/team', form, token!);
        setMembers((prev) => [...prev, created]);
      } else if (editingId) {
        const updated = await apiPutAuth<TeamMember>(`/api/admin/team/${editingId}`, form, token!);
        setMembers((prev) => prev.map((m) => (m.id === editingId ? updated : m)));
      }
      setMode('list');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setFormError('Błąd podczas zapisywania.');
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload() {
    if (!editingId || !fileRef.current?.files?.[0]) return;
    setImgUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', fileRef.current.files[0]);
      const updated = await apiPostForm<TeamMember>(`/api/admin/team/${editingId}/image`, fd, token!);
      setMembers((prev) => prev.map((m) => (m.id === editingId ? updated : m)));
      setForm((prev) => ({ ...prev, image_url: updated.image_url }));
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    } finally {
      setImgUploading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Usunąć „${name}" z zespołu?`)) return;
    try {
      await apiDelete(`/api/admin/team/${id}`, token!);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }

  // ── Form ──────────────────────────────────────────────
  if (mode !== 'list') {
    return (
      <div className="page">
        <div className="page-header">
          <h2 className="page-title">
            {mode === 'new' ? 'Nowy członek zespołu' : 'Edytuj członka zespołu'}
          </h2>
          <button className="btn-secondary" onClick={() => setMode('list')}>
            ← Wróć do listy
          </button>
        </div>

        <section className="card" style={{ gap: 20 }}>
          <div className="form-row">
            <div className="form-group">
              <label>Imię i nazwisko / nazwa *</label>
              <input
                type="text"
                value={form.name}
                maxLength={200}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Stanowisko *</label>
              <input
                type="text"
                value={form.title}
                maxLength={200}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Specjalizacje{' '}
              <span className="hint-inline">(oddziel przecinkami)</span>
            </label>
            <input
              type="text"
              value={specsInput}
              placeholder="np. Implantologia, Chirurgia stomatologiczna"
              onChange={(e) => handleSpecsChange(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={form.bio}
              rows={5}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                URL zdjęcia{' '}
                <span className="hint-inline">(lub prześlij plik po zapisaniu)</span>
              </label>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Kolejność (sort)</label>
              <input
                type="number"
                value={form.sort_order}
                min={0}
                onChange={(e) => setForm((p) => ({ ...p, sort_order: +e.target.value }))}
              />
            </div>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
            />
            Widoczny na stronie
          </label>

          {formError && <p className="form-error">{formError}</p>}

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Zapisywanie…' : 'Zapisz'}
            </button>
            <button className="btn-secondary" onClick={() => setMode('list')}>
              Anuluj
            </button>
          </div>
        </section>

        {/* Photo upload — only available when editing existing member */}
        {mode === 'edit' && (
          <section className="card">
            <h3>Zdjęcie</h3>
            <div className="image-upload-field">
              {(previewUrl || form.image_url) && (
                <div className="image-preview" style={{ maxWidth: 200 }}>
                  <img
                    src={previewUrl ?? form.image_url}
                    alt="Podgląd"
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className="file-input-row">
                <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                  Wybierz zdjęcie
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="file-input"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setPreviewUrl(URL.createObjectURL(f));
                    }}
                  />
                </label>
                {previewUrl && (
                  <button
                    className="btn-primary"
                    onClick={handleImageUpload}
                    disabled={imgUploading}
                  >
                    {imgUploading ? 'Przesyłanie…' : 'Prześlij'}
                  </button>
                )}
              </div>
              <p className="hint">JPEG, PNG lub WebP, max 5 MB.</p>
            </div>
          </section>
        )}
      </div>
    );
  }

  // ── List ──────────────────────────────────────────────
  if (loading) return <div className="page-loading">Ładowanie…</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Zespół</h2>
        <button className="btn-primary" onClick={openNew}>+ Dodaj osobę</button>
      </div>

      <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {members.length === 0 ? (
          <p className="empty-state">Brak członków zespołu.</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th style={{ width: 64 }}></th>
                <th>Imię / Stanowisko</th>
                <th>Specjalizacje</th>
                <th>Kolejność</th>
                <th>Status</th>
                <th style={{ width: 130 }}></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.image_url ? (
                      <img
                        src={m.image_url}
                        alt={m.name}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid var(--color-border)',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        👤
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="booking-date">{m.name}</span>
                    <span className="booking-time">{m.title}</span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                    {m.specializations.join(' · ') || '—'}
                  </td>
                  <td style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    {m.sort_order}
                  </td>
                  <td>
                    <span className={`status-badge ${m.is_active ? 'status-confirmed' : 'status-draft'}`}>
                      {m.is_active ? 'Aktywny' : 'Ukryty'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn-secondary"
                        style={{ padding: '5px 12px', fontSize: 12 }}
                        onClick={() => openEdit(m)}
                      >
                        Edytuj
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(m.id, m.name)}
                      >
                        Usuń
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
