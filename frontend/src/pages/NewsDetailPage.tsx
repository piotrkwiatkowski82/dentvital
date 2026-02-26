import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsDetail } from '../api/news';
import type { NewsDetail } from '../types';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchNewsDetail(slug)
      .then(setArticle)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="news-detail">
        <p className="muted">Ładowanie artykułu…</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="news-detail">
        <h1>Nie znaleziono artykułu</h1>
        <p className="muted">Artykuł o podanym adresie nie istnieje lub został usunięty.</p>
        <div className="back-link">
          <Link className="button ghost" to="/#aktualnosci">Wróć na stronę główną</Link>
        </div>
      </div>
    );
  }

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
        <Link className="button ghost" to="/#aktualnosci">&larr; Wróć do aktualności</Link>
      </div>
    </div>
  );
}
