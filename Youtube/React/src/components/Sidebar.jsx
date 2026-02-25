import { NavLink, useLocation } from 'react-router-dom';
import { useUserPrefs } from '../context/UserPrefsContext';
import { useEffect, useRef } from 'react';

const NAV_MAIN = [
  { to: '/', icon: '🏠', label: 'Home', end: true },
  { to: '/shorts', icon: '📱', label: 'Shorts' },
  { to: '/community', icon: '👥', label: 'Community' },
];

const NAV_YOU = [
  { to: '/stats', icon: '📊', label: 'Watch Stats' },
  { to: '/library', icon: '⬇️', label: 'Downloads' },
  { to: '/playlists', icon: '📋', label: 'Playlists' },
  { to: '/upload', icon: '🎬', label: 'Upload' },
];

const NAV_SUBSCRIPTIONS = [
  { icon: '🎵', label: 'BeatCraft Studio', to: '/channel/ch1' },
  { icon: '💻', label: 'CodeWithNavon', to: '/channel/ch2' },
  { icon: '🌍', label: 'VRWanderer', to: '/channel/ch3' },
  { icon: '🍳', label: 'GR Kitchen', to: '/channel/ch4' },
  { icon: '🎮', label: 'SpeedDemon404', to: '/channel/ch6' },
];

const BOTTOM_NAV = [
  { to: '/', icon: '🏠', label: 'Home', end: true },
  { to: '/shorts', icon: '📱', label: 'Shorts' },
  { to: '/community', icon: '👥', label: 'Community' },
  { to: '/library', icon: '⬇️', label: 'Library' },
  { to: '/stats', icon: '📊', label: 'Stats' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { watchHistory } = useUserPrefs();
  const recentCount = watchHistory.length;
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Auto-collapse on scroll down, expand on scroll up
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || !onToggle) return;

    const handleScroll = () => {
      const currentY = main.scrollTop;
      if (currentY > lastScrollY.current + 40 && !collapsed) {
        onToggle(true); // collapse
      } else if (currentY < lastScrollY.current - 40 && collapsed) {
        onToggle(false); // expand
      }
      lastScrollY.current = currentY;
    };

    main.addEventListener('scroll', handleScroll, { passive: true });
    return () => main.removeEventListener('scroll', handleScroll);
  }, [collapsed, onToggle]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="app-sidebar" role="navigation" aria-label="Main navigation">
        {NAV_MAIN.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
            aria-label={label}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="sidebar-divider" />
        {!collapsed && <div className="sidebar-section-title">You</div>}

        {NAV_YOU.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
            aria-label={label}
          >
            <span className="nav-icon">{icon}</span>
            <span>
              {label}
              {label === 'Downloads' && recentCount > 0 && (
                <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--accent)', color: 'white', borderRadius: 3, padding: '1px 5px', fontWeight: 700 }}>
                  {recentCount}
                </span>
              )}
            </span>
          </NavLink>
        ))}

        <div className="sidebar-divider" />
        {!collapsed && <div className="sidebar-section-title">Subscriptions</div>}

        {NAV_SUBSCRIPTIONS.map(({ icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
            aria-label={label}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="sidebar-divider" />

        {!collapsed && <div className="sidebar-section-title">Explore</div>}
        {[
          { icon: '🔥', label: 'Trending', to: '/?cat=trending' },
          { icon: '🎵', label: 'Music', to: '/?q=music' },
          { icon: '🎮', label: 'Gaming', to: '/?q=gaming' },
          { icon: '📰', label: 'News', to: '/?q=news' },
          { icon: '⚽', label: 'Sports', to: '/?q=sports' },
        ].map(({ icon, label, to }) => (
          <NavLink key={label} to={to} className="sidebar-nav-item" aria-label={label}>
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </aside>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" role="navigation" aria-label="Mobile navigation">
        {BOTTOM_NAV.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
            aria-label={label}
          >
            <span className="bnav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
