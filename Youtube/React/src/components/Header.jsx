import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserPrefs } from '../context/UserPrefsContext';
import { getSuggestions } from '../utils/smartSearch';

const TYPEWRITER_QUERIES = [
  'Try: "funny cooking under 5 min"',
  'Try: "relaxing jazz music"',
  'Try: "python tutorials for beginners"',
  'Try: "lo-fi beats to study"',
  'Try: "comedy under 3 min"',
];

export default function Header({ onToggleSidebar, onOpenSettings }) {
  const { darkMode, setDarkMode, language, setLanguage } = useUserPrefs();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearchShimmer, setShowSearchShimmer] = useState(false);
  const [placeholder, setPlaceholder] = useState(TYPEWRITER_QUERIES[0]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const typewriterIdx = useRef(0);
  const typewriterTimer = useRef(null);

  const suggestions = getSuggestions(query);

  useEffect(() => {
    const cycle = () => {
      typewriterIdx.current = (typewriterIdx.current + 1) % TYPEWRITER_QUERIES.length;
      setPlaceholder(TYPEWRITER_QUERIES[typewriterIdx.current]);
    };
    typewriterTimer.current = setInterval(cycle, 3500);
    return () => clearInterval(typewriterTimer.current);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!searchRef.current?.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (q) => {
    const term = q ?? query;
    if (!term.trim()) return;
    setShowSuggestions(false);
    setShowSearchShimmer(true);
    setTimeout(() => {
      setShowSearchShimmer(false);
      navigate(`/?q=${encodeURIComponent(term.trim())}`);
    }, 350);
  };

  return (
    <header className={`app-header${scrolled ? ' scrolled' : ''}`}>
      <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        &#9776;
      </button>

      <Link to="/" className="logo-mark">
        <div className="logo-icon">&#9654;</div>
        <span className="logo-text">YouTubeClassic</span>
      </Link>

      <div className="search-wrapper" ref={searchRef}>
        <div className="search-input-row">
          <input
            type="text"
            placeholder={query ? '' : placeholder}
            value={query}
            onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            onFocus={() => { setShowSuggestions(true); clearInterval(typewriterTimer.current); }}
            onBlur={() => {
              typewriterTimer.current = setInterval(() => {
                typewriterIdx.current = (typewriterIdx.current + 1) % TYPEWRITER_QUERIES.length;
                setPlaceholder(TYPEWRITER_QUERIES[typewriterIdx.current]);
              }, 3500);
            }}
            aria-label="Search videos"
          />
          <button className="mic-btn" title="Voice search" aria-label="Voice search">&#127908;</button>
          <button className="search-btn" onClick={() => handleSearch()} aria-label="Search">&#128269;</button>
        </div>
        {showSearchShimmer && <div className="search-shimmer" />}
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions" role="listbox">
            {suggestions.map(s => (
              <div
                key={s}
                className="search-suggestion-item"
                role="option"
                onClick={() => { setQuery(s); handleSearch(s); }}
              >
                <span>&#128269;</span> {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="header-actions">
        <select
          className="lang-select"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          aria-label="Language"
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="hi">HI</option>
          <option value="fr">FR</option>
        </select>

        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Light mode' : 'Dark mode'}
          aria-label="Toggle dark mode"
          aria-pressed={darkMode}
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>

        <button className="icon-btn" aria-label="Notifications">
          <span>&#128276;</span>
          <span className="notif-badge">3</span>
        </button>

        <Link to="/upload" className="icon-btn" title="Upload" aria-label="Upload video">
          <span>&#128249;</span>
        </Link>

        <button
          className="icon-btn"
          onClick={onOpenSettings}
          aria-label="Settings"
          title="Settings"
        >
          &#9881;
        </button>

        <div className="avatar-btn" title="Your account" aria-label="Account">U</div>
      </div>
    </header>
  );
}