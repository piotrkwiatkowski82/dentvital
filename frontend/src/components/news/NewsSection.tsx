import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews } from '../../api/news';
import type { NewsItem } from '../../types';

export default function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews(3).then((data) => setItems(data.items)).catch(() => {});
  }, []);

  return (
    <section id="aktualnosci" className="section alt scroll-reveal">
      <div className="container">
        <div className="section-shell">
          <div className="section-head">
            <span className="eyebrow">Aktualności</span>
            <h2>Co nowego w Dentvital</h2>
            <p className="muted">
              Informujemy o nowych technologiach, promocjach i wydarzeniach
              edukacyjnych dla pacjentów.
            </p>
          </div>

          <div className="news-grid">
            {items.length === 0 && (
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                Aktualności pojawią się wkrótce.
              </p>
            )}
            {items.map((item) => (
              <article className="news-card" key={item.slug}>
                <div className="meta">
                  {new Date(item.published_at).toLocaleDateString('pl-PL')}
                </div>
                <div className="title">{item.title}</div>
                <div className="excerpt">{item.excerpt}</div>
                <div>
                  <Link to={`/aktualnosci/${item.slug}`}>Czytaj więcej</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="center" style={{ marginTop: 20 }}>
            <Link className="button ghost" to="/aktualnosci">
              Zobacz wszystkie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
