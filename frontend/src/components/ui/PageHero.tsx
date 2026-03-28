import { Link } from 'react-router-dom';
import { PAGE_ICONS, type PageIconKey } from '../../constants/icons';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  icon?: PageIconKey;
}

export default function PageHero({ eyebrow, title, subtitle, breadcrumbs, icon = 'tooth' }: PageHeroProps) {
  return (
    <section className="page-hero">
      <svg className="page-hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={PAGE_ICONS[icon]} />
      </svg>
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
