import { useUserPrefs } from '../context/UserPrefsContext';

function Toggle({ checked, onChange, label }) {
  return (
    <label className="toggle-switch" aria-label={label}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </label>
  );
}

export default function SettingsPanel({ onClose }) {
  const {
    darkMode, setDarkMode,
    language, setLanguage,
    accessibilitySettings, setAccessibility,
    quality, setQuality,
  } = useUserPrefs();

  return (
    <>
      {/* Backdrop */}
      <div className="settings-overlay" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <aside className="settings-panel" role="dialog" aria-label="Settings" aria-modal="true">
        <div className="settings-header">
          <span>⚙️</span>
          Settings
          <button className="settings-close" onClick={onClose} aria-label="Close settings">✕</button>
        </div>

        {/* Appearance */}
        <section className="settings-section">
          <div className="settings-section-title">Appearance</div>

          <div className="settings-row">
            <span className="settings-label">🌙 Dark Mode</span>
            <Toggle checked={darkMode} onChange={setDarkMode} label="Dark mode" />
          </div>

          <div className="settings-row">
            <span className="settings-label">🌐 Language</span>
            <select
              className="settings-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="hi">हिन्दी</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </section>

        {/* Accessibility */}
        <section className="settings-section">
          <div className="settings-section-title">Accessibility</div>

          <div className="settings-row">
            <span className="settings-label">🔤 Dyslexia Font</span>
            <Toggle
              checked={accessibilitySettings.dyslexiaFont}
              onChange={v => setAccessibility('dyslexiaFont', v)}
              label="Dyslexia font"
            />
          </div>

          <div className="settings-row">
            <span className="settings-label">⚡ High Contrast</span>
            <Toggle
              checked={accessibilitySettings.highContrast}
              onChange={v => setAccessibility('highContrast', v)}
              label="High contrast"
            />
          </div>

          <div className="settings-row">
            <span className="settings-label">🛡️ Seizure Safe</span>
            <Toggle
              checked={accessibilitySettings.seizureSafe}
              onChange={v => setAccessibility('seizureSafe', v)}
              label="Seizure safe"
            />
          </div>
        </section>

        {/* Playback */}
        <section className="settings-section">
          <div className="settings-section-title">Playback</div>

          <div className="settings-row">
            <span className="settings-label">📺 Default Quality</span>
            <select
              className="settings-select"
              value={quality}
              onChange={e => setQuality(e.target.value)}
              aria-label="Default quality"
            >
              {['Auto', '4K', '1080p', '720p', '480p', '360p', '144p'].map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
        </section>

        {/* About */}
        <section className="settings-section">
          <div className="settings-section-title">About</div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            YouTubeClassic — A future-forward video platform.<br />
            All data stored locally. No backend required.<br />
            Version 2.0.0 · Built with React + Vite
          </p>
        </section>
      </aside>
    </>
  );
}
