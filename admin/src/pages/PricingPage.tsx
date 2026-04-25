import { useEffect, useState, type FormEvent } from 'react';
import { ApiError, apiDelete, apiGet, apiPostAuth, apiPutAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface PriceRow {
  id: string;
  service: string;
  price: string;
  sort_order: number;
}

interface PriceCategory {
  id: string;
  title: string;
  icon: string;
  sort_order: number;
  rows: PriceRow[];
}

interface PricingResponse {
  categories: PriceCategory[];
}

export default function PricingPage() {
  const { token, logout } = useAuth();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New category form
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🦷');
  const [addingCat, setAddingCat] = useState(false);

  // Track which category is expanded
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Edit state: { [categoryId]: { title, icon } } or { [rowId]: { service, price } }
  const [editCat, setEditCat] = useState<Record<string, { title: string; icon: string }>>({});
  const [editRow, setEditRow] = useState<Record<string, { service: string; price: string }>>({});

  // New row form per category
  const [newRow, setNewRow] = useState<Record<string, { service: string; price: string }>>({});
  const [savingRow, setSavingRow] = useState<Record<string, boolean>>({});

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet<PricingResponse>('/api/admin/pricing', token!);
      setCategories(data.categories);
      setExpanded(new Set(data.categories.map((c) => c.id)));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Nie udało się załadować cennika.');
    } finally {
      setLoading(false);
    }
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Category actions ──────────────────────────────────

  async function handleAddCategory(e: FormEvent) {
    e.preventDefault();
    if (!newCatTitle.trim()) return;
    setAddingCat(true);
    try {
      const cat = await apiPostAuth<PriceCategory>('/api/admin/pricing/categories', {
        title: newCatTitle.trim(),
        icon: newCatIcon || '🦷',
      }, token!);
      setCategories((prev) => [...prev, cat]);
      setExpanded((prev) => new Set([...prev, cat.id]));
      setNewCatTitle('');
      setNewCatIcon('🦷');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    } finally {
      setAddingCat(false);
    }
  }

  async function handleSaveCategory(cat: PriceCategory) {
    const edit = editCat[cat.id];
    if (!edit) return;
    try {
      const updated = await apiPutAuth<PriceCategory>(
        `/api/admin/pricing/categories/${cat.id}`,
        { title: edit.title, icon: edit.icon },
        token!,
      );
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? { ...updated, rows: c.rows } : c)));
      setEditCat((prev) => { const n = { ...prev }; delete n[cat.id]; return n; });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('Usunąć całą kategorię wraz ze wszystkimi pozycjami?')) return;
    try {
      await apiDelete(`/api/admin/pricing/categories/${id}`, token!);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }

  // ── Row actions ───────────────────────────────────────

  async function handleAddRow(e: FormEvent, categoryId: string) {
    e.preventDefault();
    const row = newRow[categoryId];
    if (!row?.service.trim() || !row?.price.trim()) return;
    setSavingRow((prev) => ({ ...prev, [categoryId]: true }));
    try {
      const created = await apiPostAuth<PriceRow>(
        `/api/admin/pricing/categories/${categoryId}/rows`,
        { service: row.service.trim(), price: row.price.trim() },
        token!,
      );
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, rows: [...c.rows, created] } : c,
        ),
      );
      setNewRow((prev) => ({ ...prev, [categoryId]: { service: '', price: '' } }));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    } finally {
      setSavingRow((prev) => ({ ...prev, [categoryId]: false }));
    }
  }

  async function handleSaveRow(row: PriceRow, categoryId: string) {
    const edit = editRow[row.id];
    if (!edit) return;
    try {
      const updated = await apiPutAuth<PriceRow>(
        `/api/admin/pricing/rows/${row.id}`,
        { service: edit.service, price: edit.price },
        token!,
      );
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? { ...c, rows: c.rows.map((r) => (r.id === row.id ? updated : r)) }
            : c,
        ),
      );
      setEditRow((prev) => { const n = { ...prev }; delete n[row.id]; return n; });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }

  async function handleDeleteRow(rowId: string, categoryId: string) {
    try {
      await apiDelete(`/api/admin/pricing/rows/${rowId}`, token!);
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, rows: c.rows.filter((r) => r.id !== rowId) } : c,
        ),
      );
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }

  if (loading) return <div className="page-loading">Ładowanie…</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <h2 className="page-title">Cennik</h2>

      {/* Add category */}
      <section className="card">
        <h3>Dodaj kategorię</h3>
        <form className="add-image-form" onSubmit={handleAddCategory}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cat-icon">Ikona (emoji)</label>
              <input
                id="cat-icon"
                type="text"
                value={newCatIcon}
                onChange={(e) => setNewCatIcon(e.target.value)}
                maxLength={5}
                style={{ width: 80 }}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="cat-title">Nazwa kategorii *</label>
              <input
                id="cat-title"
                type="text"
                value={newCatTitle}
                onChange={(e) => setNewCatTitle(e.target.value)}
                maxLength={200}
                required
                placeholder="np. Ortodoncja"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={addingCat || !newCatTitle.trim()}>
            {addingCat ? 'Dodawanie…' : 'Dodaj kategorię'}
          </button>
        </form>
      </section>

      {/* Categories list */}
      {categories.map((cat) => {
        const isExpanded = expanded.has(cat.id);
        const catEdit = editCat[cat.id];

        return (
          <section key={cat.id} className="card pricing-category">
            {/* Category header */}
            <div className="pricing-cat-header">
              {catEdit ? (
                <div className="pricing-cat-edit">
                  <input
                    type="text"
                    value={catEdit.icon}
                    onChange={(e) =>
                      setEditCat((prev) => ({ ...prev, [cat.id]: { ...prev[cat.id], icon: e.target.value } }))
                    }
                    maxLength={5}
                    style={{ width: 64 }}
                  />
                  <input
                    type="text"
                    value={catEdit.title}
                    onChange={(e) =>
                      setEditCat((prev) => ({ ...prev, [cat.id]: { ...prev[cat.id], title: e.target.value } }))
                    }
                    maxLength={200}
                    style={{ flex: 1 }}
                  />
                  <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 13 }} onClick={() => handleSaveCategory(cat)}>
                    Zapisz
                  </button>
                  <button
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: 13 }}
                    onClick={() => setEditCat((prev) => { const n = { ...prev }; delete n[cat.id]; return n; })}
                  >
                    Anuluj
                  </button>
                </div>
              ) : (
                <button className="pricing-cat-toggle" onClick={() => toggleExpand(cat.id)}>
                  <span>{cat.icon}</span>
                  <span className="pricing-cat-title">{cat.title}</span>
                  <span className="pricing-cat-count">({cat.rows.length})</span>
                  <span className="pricing-chevron">{isExpanded ? '▲' : '▼'}</span>
                </button>
              )}

              {!catEdit && (
                <div className="pricing-cat-actions">
                  <button
                    className="btn-secondary"
                    style={{ padding: '5px 12px', fontSize: 12 }}
                    onClick={() => setEditCat((prev) => ({ ...prev, [cat.id]: { title: cat.title, icon: cat.icon } }))}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    Usuń
                  </button>
                </div>
              )}
            </div>

            {/* Rows */}
            {isExpanded && (
              <div className="pricing-rows">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>Usługa</th>
                      <th>Cena</th>
                      <th style={{ width: 120 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.rows.map((row) => {
                      const rowEdit = editRow[row.id];
                      return (
                        <tr key={row.id}>
                          {rowEdit ? (
                            <>
                              <td>
                                <input
                                  type="text"
                                  value={rowEdit.service}
                                  onChange={(e) =>
                                    setEditRow((prev) => ({ ...prev, [row.id]: { ...prev[row.id], service: e.target.value } }))
                                  }
                                  maxLength={300}
                                  style={{ width: '100%' }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={rowEdit.price}
                                  onChange={(e) =>
                                    setEditRow((prev) => ({ ...prev, [row.id]: { ...prev[row.id], price: e.target.value } }))
                                  }
                                  maxLength={100}
                                  style={{ width: '100%' }}
                                />
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <button className="btn-primary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleSaveRow(row, cat.id)}>Zapisz</button>
                                  <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setEditRow((prev) => { const n = { ...prev }; delete n[row.id]; return n; })}>✕</button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="pricing-service">{row.service}</td>
                              <td className="pricing-price">{row.price}</td>
                              <td>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <button
                                    className="btn-secondary"
                                    style={{ padding: '4px 10px', fontSize: 12 }}
                                    onClick={() => setEditRow((prev) => ({ ...prev, [row.id]: { service: row.service, price: row.price } }))}
                                  >
                                    Edytuj
                                  </button>
                                  <button
                                    className="btn-delete"
                                    onClick={() => handleDeleteRow(row.id, cat.id)}
                                  >
                                    Usuń
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}

                    {/* Add row form */}
                    <tr className="pricing-add-row">
                      <td>
                        <input
                          type="text"
                          placeholder="Nazwa usługi"
                          value={newRow[cat.id]?.service ?? ''}
                          onChange={(e) =>
                            setNewRow((prev) => ({ ...prev, [cat.id]: { ...(prev[cat.id] ?? { price: '' }), service: e.target.value } }))
                          }
                          maxLength={300}
                          style={{ width: '100%' }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="np. 300–500 zł"
                          value={newRow[cat.id]?.price ?? ''}
                          onChange={(e) =>
                            setNewRow((prev) => ({ ...prev, [cat.id]: { ...(prev[cat.id] ?? { service: '' }), price: e.target.value } }))
                          }
                          maxLength={100}
                          style={{ width: '100%' }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn-primary"
                          style={{ padding: '4px 10px', fontSize: 12 }}
                          disabled={savingRow[cat.id] || !newRow[cat.id]?.service?.trim() || !newRow[cat.id]?.price?.trim()}
                          onClick={(e) => handleAddRow(e as unknown as FormEvent, cat.id)}
                        >
                          {savingRow[cat.id] ? '…' : '+ Dodaj'}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

