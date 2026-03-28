import { useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsDetail } from '../api/news';
import type { NewsDetail } from '../types';
import { NEWS_IMAGES } from '../constants/images';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; article: NewsDetail };

type Action =
  | { type: 'success'; article: NewsDetail }
  | { type: 'error' };

function reducer(_: State, action: Action): State {
  if (action.type === 'success') return { status: 'success', article: action.article };
  return { status: 'error' };
}

function slugToImageIndex(slug: string) {
  return slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % NEWS_IMAGES.length;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });

  useEffect(() => {
    if (!slug) return;
    fetchNewsDetail(slug)
      .then((article) => dispatch({ type: 'success', article }))
      .catch(() => dispatch({ type: 'error' }));
  }, [slug]);

  if (state.status === 'loading') {
    return (
      <div className="article-loading">
        <p className="muted">Ładowanie artykułu…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="article-loading">
        <h1>Nie znaleziono artykułu</h1>
        <p className="muted">Artykuł o podanym adresie nie istnieje lub został usunięty.</p>
        <Link className="button ghost" to="/aktualnosci">Wróć do aktualności</Link>
      </div>
    );
  }

  const { article } = state;
  const image = NEWS_IMAGES[slugToImageIndex(article.slug)];

  return (
    <article>
      {/* Hero */}
      <div className="article-hero">
        <img className="article-hero-img" src={image} alt="" loading="eager" />
        <div className="article-hero-overlay" aria-hidden="true" />
        <div className="container article-hero-content">
          <Link className="article-back" to="/aktualnosci">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Aktualności
          </Link>
          <div className="article-hero-meta">
            <span className="news-list-badge">Aktualności</span>
            <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
          </div>
          <h1 className="article-hero-title">{article.title}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="container">
        <div className="article-body">
          <p className="article-lead">{article.excerpt}</p>
          <div className="article-content">
            {article.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="article-footer">
            <Link className="button ghost" to="/aktualnosci">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Wróć do aktualności
            </Link>
            <Link className="button primary" to="/#rejestracja">
              Umów wizytę
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
