import { useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsDetail } from '../api/news';
import type { NewsDetail } from '../types';

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
      <div className="news-detail">
        <p className="muted">Ładowanie artykułu…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="news-detail">
        <h1>Nie znaleziono artykułu</h1>
        <p className="muted">Artykuł o podanym adresie nie istnieje lub został usunięty.</p>
        <div className="back-link">
          <Link className="button ghost" to="/aktualnosci">Wróć do aktualności</Link>
        </div>
      </div>
    );
  }

  const { article } = state;

  return (
    <div className="news-detail">
      <div className="meta">
        {new Date(article.published_at).toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <h1>{article.title}</h1>
      <div className="content">
        <p>{article.content}</p>
      </div>
      <div className="back-link">
        <Link className="button ghost" to="/aktualnosci">&larr; Wróć do aktualności</Link>
      </div>
    </div>
  );
}
