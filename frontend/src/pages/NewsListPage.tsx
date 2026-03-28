import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews } from '../api/news';
import type { NewsItem } from '../types';
import PageHero from '../components/ui/PageHero';
import { NEWS_IMAGES } from '../constants/images';

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
        title="Co nowego w Dentvital"
        subtitle="Informacje o nowych technologiach, promocjach i wydarzeniach w klinice."
        icon="news"
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
                {state.items.map((item, i) => (
                  <Link
                    className="news-list-card"
                    to={`/aktualnosci/${item.slug}`}
                    key={item.slug}
                  >
                    <div className="news-list-card-img">
                      <img
                        src={NEWS_IMAGES[i % NEWS_IMAGES.length]}
                        alt=""
                        loading={i < 3 ? 'eager' : 'lazy'}
                      />
                    </div>
                    <div className="news-list-card-body">
                      <div className="news-list-card-meta">
                        <span className="news-list-badge">Aktualności</span>
                        <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
                      </div>
                      <h2 className="news-list-card-title">{item.title}</h2>
                      <p className="news-list-card-excerpt">{item.excerpt}</p>
                      <span className="news-list-card-cta">
                        Czytaj więcej
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
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
                  <span className="pagination-info">Strona {page + 1} z {totalPages}</span>
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
