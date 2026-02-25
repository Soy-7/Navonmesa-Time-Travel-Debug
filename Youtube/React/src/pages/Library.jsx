import { Link } from 'react-router-dom';
import { useUserPrefs } from '../context/UserPrefsContext';
import { useToast } from '../utils/ToastProvider';
import Footer from '../components/Footer';

export default function Library() {
  const { downloads, removeDownload } = useUserPrefs();
  const addToast = useToast();

  const handleRemove = (id, title) => {
    removeDownload(id);
    addToast(`🗑️ "${title}" removed from Downloads`);
  };

  return (
    <div className="app-main">
      <div className="page-container">
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          ⬇️ Downloads
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Videos saved for offline viewing · Stored locally in your browser
        </p>

        {downloads.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">&#9729;&#8595;</div>
            <div className="empty-state-title">No downloads yet</div>
            <div className="empty-state-sub">Save videos to watch offline — click &#8964; on any video card</div>
            <a href="/" className="empty-state-cta">Browse Videos &#8594;</a>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 16, fontSize: 14, color: 'var(--text-muted)' }}>
              {downloads.length} video{downloads.length !== 1 ? 's' : ''} downloaded
            </div>
            {downloads.map(item => (
              <div key={item.id} style={{
                display: 'flex', gap: 14, padding: 16,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', marginBottom: 12,
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <Link to={`/watch/${item.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <div style={{ width: 140, height: 79, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#000' }}>
                    {item.thumbnail && (
                      <img src={`${item.thumbnail}?w=280&h=158&fit=crop`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/watch/${item.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{item.title}</div>
                  </Link>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{item.channel}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Duration: {item.duration} · Downloaded {new Date(item.downloadedAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Link to={`/watch/${item.id}`} className="action-btn" style={{ textDecoration: 'none', fontSize: 13, padding: '7px 14px' }}>
                    ▶ Watch
                  </Link>
                  <button
                    className="action-btn"
                    style={{ fontSize: 13, padding: '7px 14px', color: 'var(--accent)', borderColor: 'var(--accent)' }}
                    onClick={() => handleRemove(item.id, item.title)}
                    aria-label={`Remove ${item.title} from downloads`}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
