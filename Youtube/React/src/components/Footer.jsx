import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  'About', 'Press', 'Copyright', 'Creators & Partners',
  'Advertising', 'Developers', 'Terms', 'Privacy',
  'Safety', 'Send Feedback', 'New Features',
];

const LANGUAGES = ['English', 'Español', 'हिन्दी', 'Français', 'Deutsch', '日本語', 'Português'];

export default function Footer() {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-links">
        {FOOTER_LINKS.map(link => (
          <a key={link} href="#" aria-label={link}>{link}</a>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 YouTubeClassic</span>
        <span>·</span>
        <span style={{ color: 'var(--text-muted)' }}>A visionary media platform</span>
        <span>·</span>
        <select
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-muted)', fontSize: 12, padding: '3px 8px', outline: 'none', cursor: 'pointer' }}
          aria-label="Select language"
        >
          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
        </select>
        <span>·</span>
        <span style={{ color: 'var(--text-muted)' }}>📍 Global</span>
      </div>
    </footer>
  );
}
