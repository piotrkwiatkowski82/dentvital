import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews } from '../api/news';
import type { NewsItem } from '../types';
import PageHero from '../components/ui/PageHero';

const PAGE_SIZE = 9;

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; items: NewsItem[]; total: number };

type Action =
  | { type: 'success'; items: NewsItem[]; total: number }
  | { type: 'error' };

function reducer(_: State, action: Action): State {
  if (action.type === 'success') return { status: 'success', items: action.items, total: action.total };
  return { status: 'error' };
}

export default function NewsListPage() {
  const [page, setPage] = useState(0);
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });

  useEffect(() => {
    fetchNews(PAGE_SIZE, page * PAGE_SIZE)
      .then((data) => dispatch({ type: 'success', items: data.items, total: data.total }))
      .catch(() => dispatch({ type: 'error' }));
  }, [page]);

  const totalPages =
    state.status === 'success' ? Math.max(1, Math.ceil(state.total / PAGE_SIZE)) : 1;

  return (
    <>
      <PageHero
        eyebrow="Aktualności"
        title="Aktualności"
        subtitle="Informacje o nowych technologiach, promocjach i wydarzeniach w Dentvital."
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Aktualności' },
        ]}
      />

      <section className="section">
        <div className="container">
          {state.status === 'loading' && <p className="muted">Ładowanie aktualności…</p>}
          {state.status === 'error' && (
            <p className="muted">Wystąpił błąd podczas ładowania aktualności.</p>
          )}

          {state.status === 'success' && state.items.length === 0 && (
            <p className="muted">Aktualności pojawią się wkrótce.</p>
          )}

          {state.status === 'success' && state.items.length > 0 && (
            <>
              <div className="news-list-grid">
                {state.items.map((item) => (
                  <article className="news-card" key={item.slug}>
                    <div className="meta">
                      {new Date(item.published_at).toLocaleDateString('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="title">{item.title}</div>
                    <div className="excerpt">{item.excerpt}</div>
                    <div>
                      <Link to={`/aktualnosci/${item.slug}`}>Czytaj więcej</Link>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="button ghost small"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 0}
                  >
                    ← Poprzednia
                  </button>
                  <span className="pagination-info">
                    Strona {page + 1} z {totalPages}
                  </span>
                  <button
                    className="button ghost small"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Następna →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
