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
  const iconPath = PAGE_ICONS[icon];

  return (
    <section className="page-hero">
      {/* Duża ikonka po prawej */}
      <svg className="page-hero-deco page-hero-deco--right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={iconPath} />
      </svg>
      {/* Średnia ikonka w górnym środku, obrócona */}
      <svg className="page-hero-deco page-hero-deco--mid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={iconPath} />
      </svg>
      {/* Mała ikonka po lewej na dole */}
      <svg className="page-hero-deco page-hero-deco--left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={iconPath} />
      </svg>
      {/* Falista linia przechodząca przez hero */}
      <svg className="page-hero-wave" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M0 60 C150 20, 250 100, 400 55 S600 10, 750 60 S950 110, 1100 50 L1200 45" />
        <path d="M0 80 C120 50, 280 110, 450 70 S650 30, 800 75 S1000 100, 1200 65" strokeWidth="0.8" />
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
