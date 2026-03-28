import { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import { GALLERY_IMAGES, type GalleryCategory } from '../constants/gallery';

type Filter = 'all' | GalleryCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'gabinety', label: 'Gabinety' },
  { value: 'zespol', label: 'Zespół' },
  { value: 'zabiegi', label: 'Zabiegi' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const visible =
    activeFilter === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <>
      <PageHero
        eyebrow="Galeria"
        title="Galeria kliniki"
        subtitle="Zajrzyj do naszych gabinetów i poznaj bliżej Dentvital."
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Galeria' },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="gallery-filter">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`button small ${activeFilter === f.value ? 'primary' : 'ghost'}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="gallery-masonry">
            {visible.map((img, i) => (
              <figure className="gallery-item" key={i}>
                <a href={img.src} target="_blank" rel="noopener noreferrer">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </a>
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="muted" style={{ textAlign: 'center', padding: '48px 0' }}>
              Brak zdjęć w tej kategorii.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
