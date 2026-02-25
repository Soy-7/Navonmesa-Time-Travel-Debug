import { useParams, Link } from 'react-router-dom';
import { getVideoById, VIDEOS } from '../data/videos';
import { useUserPrefs } from '../context/UserPrefsContext';
import Player from '../components/Player';
import VideoCard from '../components/VideoCard';
import Footer from '../components/Footer';

export default function Watch() {
  const { id } = useParams();
  const video = getVideoById(id);
  const { language } = useUserPrefs();

  if (!video) {
    return (
      <div className="app-main">
        <div className="page-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎬</div>
          <h2 style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Video not found</h2>
          <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  const title = language !== 'en' && video.translations?.[language]
    ? video.translations[language]
    : video.title;

  const related = VIDEOS.filter(v => v.id !== video.id && (v.category === video.category || v.tags?.some(t => video.tags?.includes(t)))).slice(0, 6);

  return (
    <div className="app-main">
      <div className="watch-layout">
        {/* Left: player + info */}
        <div>
          {/* VR mode for 360° videos */}
          {video.is360 ? (
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
              <a-scene embedded style={{ width: '100%', height: '100%' }}>
                <a-sky src={`${video.thumbnail}?w=1280&h=640&fit=crop`} rotation="0 -130 0" />
                <a-camera wasd-controls-enabled="false">
                  <a-cursor />
                </a-camera>
              </a-scene>
            </div>
          ) : (
            <Player video={video} />
          )}

          {/* Video info */}
          <h1 className="video-title-main">{title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{video.views} views · {video.uploadedAt}</span>
            {video.isLive && <span className="badge badge-live">🔴 LIVE</span>}
            {video.is360 && <span className="badge badge-vr">🥽 360° VR</span>}
          </div>

          {/* Channel row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
            <Link to={`/channel/${video.channelId}`}>
              <div className="channel-avatar" style={{ width: 48, height: 48, fontSize: 18, textDecoration: 'none' }}>
                {video.channel.charAt(0)}
              </div>
            </Link>
            <div>
              <Link to={`/channel/${video.channelId}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  {video.channel}
                  {video.channelVerified && <span className="verified">✓</span>}
                </div>
              </Link>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>124K subscribers</div>
            </div>
            <button className="subscribe-btn" style={{ marginLeft: 'auto' }}>Subscribe</button>
          </div>

          {/* AI Summary */}
          {video.summary && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>🤖 AI Summary</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{video.summary}</p>
            </div>
          )}

          {/* Chapters */}
          {video.chapters?.length > 0 && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>📋 Chapters</div>
              {video.chapters.map(ch => {
                const mins = Math.floor(ch.time / 60);
                const secs = ch.time % 60;
                return (
                  <div key={ch.time} style={{ display: 'flex', gap: 12, padding: '6px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 13, transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <span style={{ color: 'var(--accent)', fontWeight: 600, minWidth: 44 }}>{mins}:{String(secs).padStart(2, '0')}</span>
                    <span>{ch.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {video.tags?.map(tag => (
              <Link key={tag} to={`/?q=${tag}`} className="tag-pill" style={{ textDecoration: 'none' }}>#{tag}</Link>
            ))}
          </div>

          {/* Live chat replay */}
          {video.isLive && video.chatReplay?.length > 0 && (
            <div className="chat-panel" style={{ marginBottom: 24, height: 300 }}>
              <div className="chat-header">🔴 Live Chat</div>
              <div className="chat-messages">
                {video.chatReplay.map((m, i) => (
                  <div key={i} className="chat-msg">
                    <span className="chat-user">{m.user}</span>{m.msg}
                  </div>
                ))}
              </div>
              <div className="chat-input-row">
                <input placeholder="Chat is live..." disabled style={{ cursor: 'not-allowed' }} />
                <button className="chat-send-btn" disabled>➤</button>
              </div>
            </div>
          )}
        </div>

        {/* Right: related videos */}
        <div className="watch-sidebar-col">
          <div style={{ marginBottom: 16, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Up Next</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {related.map(v => (
              <Link key={v.id} to={`/watch/${v.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', gap: 10, padding: 8, borderRadius: 'var(--radius-sm)', transition: 'background 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 120, flexShrink: 0 }}>
                    <div style={{ paddingTop: '56.25%', position: 'relative', background: '#000', borderRadius: 6, overflow: 'hidden' }}>
                      <img src={`${v.thumbnail}?w=240&h=135&fit=crop`} alt={v.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: 3, right: 3, background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: 10, fontWeight: 600, padding: '1px 5px', borderRadius: 3 }}>{v.duration}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v.channel}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v.views} views</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
