import { useEffect, useState } from 'react';
import { ApiError, apiDelete, apiGet, apiPostAuth, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
  is_active: boolean;
  created_at: string;
}

interface NewsDetail {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  is_active: boolean;
}

interface NewsListResponse {
  items: NewsItem[];
  total: number;
}

type Mode = 'list' | 'new' | 'edit';

const EMPTY_FORM: Omit<NewsDetail, 'id'> = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  published_at: new Date().toISOString().slice(0, 10),
  is_active: true,
};

function toLocalDate(iso: string) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function NewsPage() {
  const { token, logout } = useAuth();
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [mode, setMode] = useState<Mode>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<NewsDetail, 'id'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet<NewsListResponse>('/api/admin/news', token!);
      setArticles(data.items);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Nie udało się załadować artykułów.');
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setForm({ ...EMPTY_FORM, published_at: new Date().toISOString().slice(0, 10) });
    setEditingId(null);
    setFormError('');
    setMode('new');
  }

  async function openEdit(id: string) {
    try {
      const article = await apiGet<NewsDetail>(`/api/admin/news/${id}`, token!);
      setForm({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        published_at: article.published_at.slice(0, 10),
        is_active: article.is_active,
      });
      setEditingId(id);
      setFormError('');
      setMode('edit');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }

  async function handleSave() {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setFormError('Tytuł, zajawka i treść są wymagane.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      const payload = {
        ...form,
        published_at: new Date(form.published_at).toISOString(),
      };

      if (mode === 'new') {
        const created = await apiPostAuth<NewsDetail>('/api/admin/news', payload, token!);
        setArticles((prev) => [
          { ...created, created_at: new Date().toISOString() },
          ...prev,
        ]);
      } else if (editingId) {
        const updated = await apiPutAuth<NewsDetail>(`/api/admin/news/${editingId}`, payload, token!);
        setArticles((prev) =>
          prev.map((a) =>
            a.id === editingId
              ? { ...a, ...updated }
              : a,
          ),
        );
      }
      setMode('list');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else if (err instanceof ApiError && err.status === 422) {
        const detail = (err.data as { detail?: string })?.detail;
        setFormError(detail ?? 'Błąd walidacji danych.');
      } else {
        setFormError('Błąd podczas zapisywania.');
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Usunąć artykuł „${title}"?`)) return;
    try {
      await apiDelete(`/api/admin/news/${id}`, token!);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }

  function handleField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // ── Form view ─────────────────────────────────────────

  if (mode !== 'list') {
    return (
      <div className="page">
        <div className="page-header">
          <h2 className="page-title">{mode === 'new' ? 'Nowy artykuł' : 'Edytuj artykuł'}</h2>
          <button className="btn-secondary" onClick={() => setMode('list')}>
            ← Wróć do listy
          </button>
        </div>

        <section className="card news-form">
          <div className="form-group">
            <label htmlFor="f-title">Tytuł *</label>
            <input
              id="f-title"
              type="text"
              value={form.title}
              maxLength={300}
              onChange={(e) => handleField('title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-slug">
              Slug URL{' '}
              <span className="hint-inline">(zostaw puste — wygeneruje się automatycznie)</span>
            </label>
            <input
              id="f-slug"
              type="text"
              value={form.slug}
              maxLength={200}
              placeholder="np. nowy-sprzet-higienizacja"
              onChange={(e) => handleField('slug', e.target.value)}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="f-date">Data publikacji *</label>
              <input
                id="f-date"
                type="date"
                value={form.published_at}
                onChange={(e) => handleField('published_at', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ justifyContent: 'flex-end' }}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => handleField('is_active', e.target.checked)}
                />
                Opublikowany (widoczny na stronie)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="f-excerpt">Zajawka * <span className="hint-inline">(krótki opis, wyświetlany na liście)</span></label>
            <textarea
              id="f-excerpt"
              value={form.excerpt}
              rows={3}
              onChange={(e) => handleField('excerpt', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-content">
              Treść *{' '}
              <span className="hint-inline">oddzielaj akapity pustą linią</span>
            </label>
            <textarea
              id="f-content"
              value={form.content}
              rows={14}
              onChange={(e) => handleField('content', e.target.value)}
            />
          </div>

          {formError && <p className="form-error">{formError}</p>}

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Zapisywanie…' : 'Zapisz artykuł'}
            </button>
            <button className="btn-secondary" onClick={() => setMode('list')}>
              Anuluj
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ── List view ─────────────────────────────────────────

  if (loading) return <div className="page-loading">Ładowanie…</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Aktualności</h2>
        <button className="btn-primary" onClick={openNew}>
          + Nowy artykuł
        </button>
      </div>

      <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {articles.length === 0 ? (
          <p className="empty-state">Brak artykułów. Dodaj pierwszy.</p>
        ) : (
          <table className="news-table">
            <thead>
              <tr>
                <th>Tytuł</th>
                <th>Data</th>
                <th>Status</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id}>
                  <td>
                    <span className="news-title">{a.title}</span>
                    <span className="news-slug">/{a.slug}</span>
                  </td>
                  <td className="news-date">{toLocalDate(a.published_at)}</td>
                  <td>
                    <span className={`status-badge ${a.is_active ? 'status-active' : 'status-draft'}`}>
                      {a.is_active ? 'Opublikowany' : 'Szkic'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn-secondary"
                        style={{ padding: '5px 12px', fontSize: 12 }}
                        onClick={() => openEdit(a.id)}
                      >
                        Edytuj
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(a.id, a.title)}
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
