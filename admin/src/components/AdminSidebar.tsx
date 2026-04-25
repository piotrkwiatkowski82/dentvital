import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">🦷</span>
        <span>Dentvital Admin</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/banner"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Baner
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Rezerwacje
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Wiadomości
        </NavLink>
        <NavLink
          to="/team"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Zespół
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Usługi
        </NavLink>
        <NavLink
          to="/testimonials"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Opinie
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Ustawienia
        </NavLink>
        <NavLink
          to="/seo"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          SEO
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Galeria
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Cennik
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Aktualności
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Kontakt
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={logout}>
          Wyloguj się
        </button>
      </div>
    </aside>
  );
}
