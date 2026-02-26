import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navigation';
import { useScrolledHeader } from '../../hooks/useScrolledHeader';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrolledHeader();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="site-header" id="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          Dent<span>vital</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Otwórz menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav className={`nav${menuOpen ? ' is-open' : ''}`}>
          <button className="nav-close" aria-label="Zamknij menu" onClick={closeMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
