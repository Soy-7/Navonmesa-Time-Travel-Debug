import { useEffect, useState } from 'react';
import { useUserPrefs } from '../context/UserPrefsContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Stats() {
  const { getWatchStats, watchHistory } = useUserPrefs();
  const [stats, setStats] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setStats(getWatchStats());
    setTimeout(() => setAnimated(true), 100);
  }, []);

  const fmtTime = (secs) => {
    if (secs < 60) return `${secs}s`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m`;
    const hrs = (secs / 3600).toFixed(1);
    return `${hrs}h`;
  };

  if (!stats) return null;

  const maxCatCount = stats.topCategories.reduce((m, [, c]) => Math.max(m, c), 1);

  return (
    <div className="app-main">
      <div className="page-container">
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          📊 Your Watch Stats
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Personal insights from the last 7 days · All data stored locally
        </p>

        {/* Summary cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stats-hero-number">{fmtTime(stats.totalSecs)}</div>
            <div className="stat-label">Total Watch Time This Week</div>
          </div>
          <div className="stat-card">
            <div className="stats-hero-number">{stats.thisWeek.length}</div>
            <div className="stat-label">Videos Watched This Week</div>
          </div>
          <div className="stat-card">
            <div className="stats-hero-number" style={{ fontSize: 36 }}>{stats.topCategories[0]?.[0] || '—'}</div>
            <div className="stat-label">Top Category</div>
          </div>
          <div className="stat-card">
            <div className="stats-hero-number" style={{ fontSize: 36 }}>{stats.topChannels[0]?.[0]?.split(' ')[0] || '—'}</div>
            <div className="stat-label">Most-Watched Channel</div>
          </div>
        </div>

        {/* Category breakdown */}
        {stats.topCategories.length > 0 && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 20, marginBottom: 20, color: 'var(--text-primary)' }}>Top Categories</h2>
            {stats.topCategories.map(([cat, count]) => (
              <div key={cat} className="category-bar">
                <div className="category-bar-label">
                  <span>{cat}</span>
                  <span style={{ color: 'var(--accent)' }}>{count} video{count !== 1 ? 's' : ''}</span>
                </div>
                <div className="category-bar-track">
                  <div className="category-bar-fill" style={{ width: animated ? `${(count / maxCatCount) * 100}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Top channels */}
        {stats.topChannels.length > 0 && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 20, marginBottom: 20, color: 'var(--text-primary)' }}>Most-Watched Channels</h2>
            {stats.topChannels.map(([chan, count], i) => (
              <div key={chan} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', minWidth: 24 }}>#{i + 1}</span>
                <div className="channel-avatar" style={{ width: 36, height: 36 }}>{chan.charAt(0)}</div>
                <span style={{ flex: 1, fontSize: 14, color: 'var(--text-primary)' }}>{chan}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{count} video{count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recent history */}
        {watchHistory.length > 0 && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 20, marginBottom: 20, color: 'var(--text-primary)' }}>Watch History</h2>
            {watchHistory.slice(0, 10).map((entry, i) => (
              <Link key={i} to={`/watch/${entry.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'center', transition: 'background 0.15s' }}>
                  <div style={{ width: 80, height: 46, borderRadius: 6, background: 'var(--bg-hover)', flexShrink: 0, overflow: 'hidden' }}>
                    {entry.thumbnail && <img src={`${entry.thumbnail}?w=160&h=90&fit=crop`} alt={entry.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{entry.channel} · {entry.category}</div>
                  </div>
                  <div>
                    <div style={{ width: 64, height: 4, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${entry.progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'right', marginTop: 3 }}>{entry.progress}%</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {watchHistory.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">&#128336;</div>
            <div className="empty-state-title">No watch history yet</div>
            <div className="empty-state-sub">Watch some videos and your stats will appear here</div>
            <a href="/" className="empty-state-cta">Browse Videos &#8594;</a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
