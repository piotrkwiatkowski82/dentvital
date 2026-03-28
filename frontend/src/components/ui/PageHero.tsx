import { Link } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHero({ eyebrow, title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav aria-label="Nawigacja okruszkowa" className="breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="breadcrumb-item">
              {i > 0 && <span className="breadcrumb-sep">/</span>}
              {crumb.href ? (
                <Link to={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p className="page-hero-lead">{subtitle}</p>}
      </div>
    </section>
  );
}
