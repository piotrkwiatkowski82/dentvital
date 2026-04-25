import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews } from '../../api/news';
import type { NewsItem } from '../../types';
import { NEWS_IMAGES } from '../../constants/images';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

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

          {items.length === 0 ? (
            <p className="muted">Aktualności pojawią się wkrótce.</p>
          ) : (
            <div className="news-list-grid">
              {items.map((item, i) => (
                <Link
                  className="news-list-card"
                  to={`/aktualnosci/${item.slug}`}
                  key={item.slug}
                >
                  <div className="news-list-card-img">
                    <img
                      src={NEWS_IMAGES[i % NEWS_IMAGES.length]}
                      alt=""
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <div className="news-list-card-body">
                    <div className="news-list-card-meta">
                      <span className="news-list-badge">Aktualności</span>
                      <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
                    </div>
                    <h3 className="news-list-card-title">{item.title}</h3>
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
          )}

          <div className="center" style={{ marginTop: 32 }}>
            <Link className="button ghost" to="/aktualnosci">
              Zobacz wszystkie aktualności
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
