import { useState, useEffect, useCallback } from 'react';
import PageHero from '../components/ui/PageHero';
import { type GalleryCategory } from '../constants/gallery';
import { useGallery } from '../hooks/useGallery';

type Filter = 'all' | GalleryCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'gabinety', label: 'Gabinety' },
  { value: 'zespol', label: 'Zespół' },
  { value: 'zabiegi', label: 'Zabiegi' },
];

export default function GalleryPage() {
  const { images, loading, error } = useGallery();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible =
    activeFilter === 'all'
      ? images
      : images.filter((img) => img.category === activeFilter);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + visible.length) % visible.length : null));
  }, [visible.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % visible.length : null));
  }, [visible.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIndex, prev, next]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  if (error) {
    return (
      <>
        <PageHero
          eyebrow="Galeria"
          title="Galeria kliniki"
          subtitle="Zajrzyj do naszych gabinetów i poznaj bliżej Dentvital."
          icon="camera"
          breadcrumbs={[
            { label: 'Strona główna', href: '/' },
            { label: 'Galeria' },
          ]}
        />
        <section className="section">
          <div className="container">
            <p className="muted" style={{ textAlign: 'center', padding: '48px 0' }}>
              Nie udało się załadować galerii.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Galeria"
        title="Galeria kliniki"
        subtitle="Zajrzyj do naszych gabinetów i poznaj bliżej Dentvital."
        icon="camera"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'Galeria' },
        ]}
      />

      <section className="section">
        <div className="container">
          {loading ? (
            <p className="muted" style={{ textAlign: 'center', padding: '48px 0' }}>
              Ładowanie galerii…
            </p>
          ) : null}
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
                <button className="gallery-item-btn" onClick={() => openLightbox(i)} aria-label={`Otwórz zdjęcie: ${img.alt}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </button>
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Podgląd zdjęcia">
          {/* Backdrop */}
          <div className="lightbox-backdrop" onClick={closeLightbox} />

          {/* Close */}
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Zamknij">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button className="lightbox-nav lightbox-nav--prev" onClick={prev} aria-label="Poprzednie zdjęcie">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div className="lightbox-img-wrap">
            <img
              className="lightbox-img"
              src={visible[lightboxIndex].src}
              alt={visible[lightboxIndex].alt}
            />
            {visible[lightboxIndex].caption && (
              <p className="lightbox-caption">{visible[lightboxIndex].caption}</p>
            )}
            <p className="lightbox-counter">{lightboxIndex + 1} / {visible.length}</p>
          </div>

          {/* Next */}
          <button className="lightbox-nav lightbox-nav--next" onClick={next} aria-label="Następne zdjęcie">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
