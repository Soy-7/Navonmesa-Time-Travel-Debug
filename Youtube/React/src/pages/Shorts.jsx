import { Link } from 'react-router-dom';
import { VIDEOS } from '../data/videos';
import Footer from '../components/Footer';

// Create mock shorts from existing videos (use portrait crop)
const SHORTS = VIDEOS.map(v => ({
  ...v,
  duration: `${Math.floor(Math.random() * 55) + 5}s`,
  isShort: true,
}));

export default function Shorts() {
  return (
    <div className="app-main">
      <div className="page-container">
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          📱 Shorts
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Quick, vertical videos under 60 seconds
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16,
        }}>
          {SHORTS.map(video => (
            <Link key={video.id} to={`/watch/${video.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Portrait thumbnail (9:16) */}
                <div style={{ paddingTop: '177.78%', position: 'relative', background: '#000', overflow: 'hidden' }}>
                  <img
                    src={`${video.thumbnail}?w=360&h=640&fit=crop`}
                    alt={video.title}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Shorts badge */}
                  <div style={{ position: 'absolute', top: 8, left: 8, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>
                    ▶ Shorts
                  </div>
                  {/* Duration */}
                  <div style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.85)', color: 'white', fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4 }}>
                    {video.duration}
                  </div>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {video.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{video.views} views</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
