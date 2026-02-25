import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserPrefs } from '../context/UserPrefsContext';
import { useToast } from '../utils/ToastProvider';
import Footer from '../components/Footer';

export default function Playlists() {
  const { playlists, setPlaylistsState } = useUserPrefs();
  const addToast = useToast();
  const [newName, setNewName] = useState('');
  const [selected, setSelected] = useState(playlists[0]?.id || null);

  const createPlaylist = () => {
    if (!newName.trim()) return;
    const newPl = { id: `pl${Date.now()}`, name: newName.trim(), videos: [] };
    setPlaylistsState(prev => {
      const next = [...prev, newPl];
      try { localStorage.setItem('yt_playlists', JSON.stringify(next)); } catch {}
      return next;
    });
    setNewName('');
    setSelected(newPl.id);
    addToast(`✅ Playlist "${newPl.name}" created!`);
  };

  const removeFromPlaylist = (playlistId, videoId) => {
    setPlaylistsState(prev => {
      const next = prev.map(pl => pl.id === playlistId ? { ...pl, videos: pl.videos.filter(v => v.id !== videoId) } : pl);
      try { localStorage.setItem('yt_playlists', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const activePl = playlists.find(pl => pl.id === selected);

  return (
    <div className="app-main">
      <div className="page-container">
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          📋 Playlists
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Collaborative playlists — add videos from any video card's ⋮ menu
        </p>

        <div className="grid-2" style={{ alignItems: 'flex-start' }}>
          {/* Sidebar: playlist list */}
          <div>
            {/* Create new */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <input
                className="form-input"
                style={{ flex: 1 }}
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="New playlist name..."
                onKeyDown={e => e.key === 'Enter' && createPlaylist()}
                aria-label="New playlist name"
              />
              <button className="submit-btn" style={{ padding: '10px 16px' }} onClick={createPlaylist} aria-label="Create playlist">
                + Create
              </button>
            </div>

            {playlists.map(pl => (
              <div
                key={pl.id}
                onClick={() => setSelected(pl.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  background: selected === pl.id ? 'var(--accent-dim)' : 'var(--bg-card)',
                  border: `1px solid ${selected === pl.id ? 'var(--border-hover)' : 'var(--border)'}`,
                  marginBottom: 8,
                  transition: 'all 0.15s',
                }}
                role="button"
                aria-pressed={selected === pl.id}
                aria-label={`Select playlist ${pl.name}`}
              >
                <div style={{ fontWeight: 500, color: selected === pl.id ? 'var(--accent)' : 'var(--text-primary)', marginBottom: 2 }}>
                  📋 {pl.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {pl.videos.length} video{pl.videos.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Playlist content */}
          <div>
            {activePl ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 22, color: 'var(--text-primary)' }}>
                    {activePl.name}
                  </h2>
                  <button
                    className="action-btn"
                    onClick={() => {
                      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
                      navigator.clipboard?.writeText(`${window.location.origin}/playlists?share=${code}`);
                      addToast(`🔗 Collaborative link copied: ${code}`);
                    }}
                  >
                    🔗 Share
                  </button>
                </div>

                {activePl.videos.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
                    <div style={{ marginBottom: 8 }}>This playlist is empty</div>
                    <div style={{ fontSize: 13 }}>Add videos using the ⋮ menu on any video card</div>
                    <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13, marginTop: 12, display: 'inline-block' }}>Browse Videos →</Link>
                  </div>
                ) : (
                  activePl.videos.map((video, i) => (
                    <div key={video.id} className="playlist-card">
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', minWidth: 24 }}>#{i + 1}</div>
                      <Link to={`/watch/${video.id}`} className="playlist-thumb-mini" style={{ textDecoration: 'none' }}>
                        {video.thumbnail && <img src={`${video.thumbnail}?w=240&h=135&fit=crop`} alt={video.title} />}
                      </Link>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link to={`/watch/${video.id}`} style={{ textDecoration: 'none' }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>{video.title}</div>
                        </Link>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{video.channel} · {video.duration}</div>
                        {video.suggestedBy && (
                          <div className="suggested-by">Suggested by {video.suggestedBy}</div>
                        )}
                      </div>
                      <button
                        onClick={() => { removeFromPlaylist(activePl.id, video.id); addToast('🗑️ Removed from playlist'); }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16, padding: '4px' }}
                        aria-label={`Remove ${video.title} from playlist`}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                Select a playlist to view its contents
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
