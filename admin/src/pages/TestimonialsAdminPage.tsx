import { useEffect, useState } from 'react';
import { ApiError, apiDelete, apiGet, apiPostAuth, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string;
  content: string;
  rating: number;
  sort_order: number;
  is_active: boolean;
}

interface TestimonialListResponse { items: Testimonial[] }

type Mode = 'list' | 'new' | 'edit';

const EMPTY: Omit<Testimonial, 'id'> = { author_name: '', author_title: '', content: '', rating: 5, sort_order: 0, is_active: true };

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#f59e0b', fontSize: 14 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function TestimonialsAdminPage() {
  const { token, logout } = useAuth();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet<TestimonialListResponse>('/api/admin/testimonials', token!);
      setItems(data.items);
    } catch (err) { if (err instanceof ApiError && err.status === 401) logout(); }
    finally { setLoading(false); }
  }

  function openNew() {
    setForm({ ...EMPTY, sort_order: items.length });
    setEditingId(null); setFormError(''); setMode('new');
  }

  function openEdit(t: Testimonial) {
    setForm({ author_name: t.author_name, author_title: t.author_title, content: t.content, rating: t.rating, sort_order: t.sort_order, is_active: t.is_active });
    setEditingId(t.id); setFormError(''); setMode('edit');
  }

  async function handleSave() {
    if (!form.author_name.trim() || !form.content.trim()) { setFormError('Imię i treść są wymagane.'); return; }
    setSaving(true); setFormError('');
    try {
      if (mode === 'new') {
        const created = await apiPostAuth<Testimonial>('/api/admin/testimonials', form, token!);
        setItems((p) => [...p, created]);
      } else if (editingId) {
        const updated = await apiPutAuth<Testimonial>(`/api/admin/testimonials/${editingId}`, form, token!);
        setItems((p) => p.map((t) => t.id === editingId ? updated : t));
      }
      setMode('list');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setFormError('Błąd podczas zapisywania.');
    } finally { setSaving(false); }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Usunąć opinię od „${name}"?`)) return;
    try {
      await apiDelete(`/api/admin/testimonials/${id}`, token!);
      setItems((p) => p.filter((t) => t.id !== id));
    } catch (err) { if (err instanceof ApiError && err.status === 401) logout(); }
  }

  if (mode !== 'list') {
    return (
      <div className="page">
        <div className="page-header">
          <h2 className="page-title">{mode === 'new' ? 'Nowa opinia' : 'Edytuj opinię'}</h2>
          <button className="btn-secondary" onClick={() => setMode('list')}>← Wróć</button>
        </div>
        <section className="card" style={{ gap: 20 }}>
          <div className="form-row">
            <div className="form-group">
              <label>Imię i nazwisko *</label>
              <input type="text" value={form.author_name} maxLength={200} onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Stanowisko / opis <span className="hint-inline">np. Pacjentka od 3 lat</span></label>
              <input type="text" value={form.author_title} maxLength={200} onChange={(e) => setForm((p) => ({ ...p, author_title: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label>Treść opinii *</label>
            <textarea rows={5} value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Ocena (1–5)</label>
              <select value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: +e.target.value }))}>
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} — {'★'.repeat(n)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Kolejność</label>
              <input type="number" value={form.sort_order} min={0} onChange={(e) => setForm((p) => ({ ...p, sort_order: +e.target.value }))} />
            </div>
            <div className="form-group" style={{ justifyContent: 'flex-end' }}>
              <label className="checkbox-label">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} />
                Widoczna na stronie
              </label>
            </div>
          </div>
          {formError && <p className="form-error">{formError}</p>}
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Zapisywanie…' : 'Zapisz'}</button>
            <button className="btn-secondary" onClick={() => setMode('list')}>Anuluj</button>
          </div>
        </section>
      </div>
    );
  }

  if (loading) return <div className="page-loading">Ładowanie…</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Opinie pacjentów</h2>
        <button className="btn-primary" onClick={openNew}>+ Dodaj opinię</button>
      </div>
      <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {items.length === 0 ? <p className="empty-state">Brak opinii.</p> : (
          <table className="bookings-table">
            <thead><tr><th>Autor</th><th>Ocena</th><th>Fragment</th><th>Kol.</th><th>Status</th><th style={{ width: 130 }}></th></tr></thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className="booking-date">{t.author_name}</span>
                    <span className="booking-time">{t.author_title}</span>
                  </td>
                  <td><Stars n={t.rating} /></td>
                  <td style={{ fontSize: 12, color: 'var(--color-text-muted)', maxWidth: 300 }}>{t.content.slice(0, 90)}{t.content.length > 90 ? '…' : ''}</td>
                  <td style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>{t.sort_order}</td>
                  <td><span className={`status-badge ${t.is_active ? 'status-confirmed' : 'status-draft'}`}>{t.is_active ? 'Aktywna' : 'Ukryta'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary" style={{ padding: '5px 12px', fontSize: 12 }} onClick={() => openEdit(t)}>Edytuj</button>
                      <button className="btn-delete" onClick={() => handleDelete(t.id, t.author_name)}>Usuń</button>
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
