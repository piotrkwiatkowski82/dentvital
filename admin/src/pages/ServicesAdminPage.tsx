import { useEffect, useState } from 'react';
import { ApiError, apiDelete, apiGet, apiPostAuth, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

interface ServiceListResponse { items: Service[] }

type Mode = 'list' | 'new' | 'edit';

const ICON_OPTIONS = ['search','sparkle','shield','pulse','sun','users','tooth','star','heart','plus'];

const EMPTY: Omit<Service, 'id'> = { title: '', icon: 'sparkle', description: '', sort_order: 0, is_active: true };

export default function ServicesAdminPage() {
  const { token, logout } = useAuth();
  const [items, setItems] = useState<Service[]>([]);
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
      const data = await apiGet<ServiceListResponse>('/api/admin/services', token!);
      setItems(data.items);
    } catch (err) { if (err instanceof ApiError && err.status === 401) logout(); }
    finally { setLoading(false); }
  }

  function openNew() {
    setForm({ ...EMPTY, sort_order: items.length });
    setEditingId(null); setFormError(''); setMode('new');
  }

  function openEdit(s: Service) {
    setForm({ title: s.title, icon: s.icon, description: s.description, sort_order: s.sort_order, is_active: s.is_active });
    setEditingId(s.id); setFormError(''); setMode('edit');
  }

  async function handleSave() {
    if (!form.title.trim()) { setFormError('Tytuł jest wymagany.'); return; }
    setSaving(true); setFormError('');
    try {
      if (mode === 'new') {
        const created = await apiPostAuth<Service>('/api/admin/services', form, token!);
        setItems((p) => [...p, created]);
      } else if (editingId) {
        const updated = await apiPutAuth<Service>(`/api/admin/services/${editingId}`, form, token!);
        setItems((p) => p.map((s) => s.id === editingId ? updated : s));
      }
      setMode('list');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setFormError('Błąd podczas zapisywania.');
    } finally { setSaving(false); }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Usunąć usługę „${title}"?`)) return;
    try {
      await apiDelete(`/api/admin/services/${id}`, token!);
      setItems((p) => p.filter((s) => s.id !== id));
    } catch (err) { if (err instanceof ApiError && err.status === 401) logout(); }
  }

  if (mode !== 'list') {
    return (
      <div className="page">
        <div className="page-header">
          <h2 className="page-title">{mode === 'new' ? 'Nowa usługa' : 'Edytuj usługę'}</h2>
          <button className="btn-secondary" onClick={() => setMode('list')}>← Wróć</button>
        </div>
        <section className="card" style={{ gap: 20 }}>
          <div className="form-row">
            <div className="form-group">
              <label>Tytuł *</label>
              <input type="text" value={form.title} maxLength={200} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Ikona</label>
              <select value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}>
                {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Opis</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </div>
          <div className="form-row">
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
        <h2 className="page-title">Usługi</h2>
        <button className="btn-primary" onClick={openNew}>+ Dodaj usługę</button>
      </div>
      <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {items.length === 0 ? <p className="empty-state">Brak usług.</p> : (
          <table className="bookings-table">
            <thead><tr><th>Ikona</th><th>Tytuł</th><th>Opis</th><th>Kol.</th><th>Status</th><th style={{ width: 130 }}></th></tr></thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>{s.icon}</td>
                  <td><span className="booking-date">{s.title}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--color-text-muted)', maxWidth: 280 }}>{s.description.slice(0, 80)}{s.description.length > 80 ? '…' : ''}</td>
                  <td style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>{s.sort_order}</td>
                  <td><span className={`status-badge ${s.is_active ? 'status-confirmed' : 'status-draft'}`}>{s.is_active ? 'Aktywna' : 'Ukryta'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary" style={{ padding: '5px 12px', fontSize: 12 }} onClick={() => openEdit(s)}>Edytuj</button>
                      <button className="btn-delete" onClick={() => handleDelete(s.id, s.title)}>Usuń</button>
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
