import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation';
import { useScrolledHeader } from '../../hooks/useScrolledHeader';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  useScrolledHeader();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function isActive(href?: string, children?: { href: string }[]) {
    if (href) return location.pathname === href;
    return children?.some((c) => location.pathname.startsWith(c.href)) ?? false;
  }

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  const ChevronIcon = () => (
    <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l4 4 4-4" />
    </svg>
  );

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

        <nav ref={navRef} className={`nav${menuOpen ? ' is-open' : ''}`} style={menuOpen ? { justifyContent: 'flex-start', paddingTop: 80, overflowY: 'auto' } : undefined}>
          <button className="nav-close" aria-label="Zamknij menu" onClick={closeMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {NAV_ITEMS.map((item) => {
            if (item.children) {
              const active = isActive(undefined, item.children);
              const dropOpen = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className={`nav-item${dropOpen ? ' dropdown-open' : ''}`}
                >
                  <button
                    className={`nav-trigger${active ? ' active' : ''}`}
                    aria-expanded={dropOpen}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    <ChevronIcon />
                  </button>
                  <div className="nav-dropdown" role="menu">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        role="menuitem"
                        className={location.pathname === child.href ? 'active' : ''}
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href!}
                className={active ? 'active' : ''}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
