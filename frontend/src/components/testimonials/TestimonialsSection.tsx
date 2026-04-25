import { useTestimonials } from '../../hooks/useTestimonials';

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? 'var(--accent)' : 'none'}
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const testimonials = useTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="section alt scroll-reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Opinie</span>
          <h2>Co mówią nasi pacjenci</h2>
          <p className="muted">
            Zaufanie pacjentów jest dla nas największą nagrodą.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <Stars rating={t.rating} />
              <p className="testimonial-content">„{t.content}"</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.author_name}</span>
                {t.author_title && (
                  <span className="testimonial-title">{t.author_title}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
