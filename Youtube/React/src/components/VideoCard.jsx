import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserPrefs } from '../context/UserPrefsContext';
import { useToast } from '../utils/ToastProvider';

export default function VideoCard({ video, compact = false, featured = false }) {
  const { language, addDownload, markNotInterested, blockChannel, notInterested, dislikedChannels, addToPlaylist, playlists } = useUserPrefs();
  const addToast = useToast();
  const navigate = useNavigate();

  const [imgLoaded, setImgLoaded] = useState(false);
  const [justLoaded, setJustLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showRecommendTooltip, setShowRecommendTooltip] = useState(false);
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);
  const imgRef = useRef(null);
  const cardRef = useRef(null);
  const menuRef = useRef(null);

  // Lazy load via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = `${video.thumbnail}?w=640&h=360&fit=crop`;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [video.thumbnail]);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShowMenu(false);
        setShowPlaylistPicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleImgLoad = () => {
    setImgLoaded(true);
    setJustLoaded(true);
    setTimeout(() => setJustLoaded(false), 500);
  };

  // Filtered out?
  if (notInterested.includes(video.id) || dislikedChannels.includes(video.channel)) return null;

  const title = language !== 'en' && video.translations?.[language]
    ? video.translations[language]
    : video.title;

  const cardClasses = ['video-card', featured ? 'featured' : '', compact ? 'compact-card' : ''].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} ref={cardRef} role="article" aria-label={title}>
      {/* Thumbnail */}
      <Link to={`/watch/${video.id}`} tabIndex={-1} aria-hidden="true">
        <div className="video-thumb-wrap">
          {!imgLoaded && <div className="thumb-skeleton" />}
          <img
            ref={imgRef}
            alt={title}
            className={[imgLoaded ? 'loaded' : '', justLoaded ? 'just-loaded' : ''].filter(Boolean).join(' ')}
            onLoad={handleImgLoad}
          />
          <span className="video-duration-badge">{video.duration}</span>

          {/* Badges */}
          <div className="video-card-badges">
            {video.is360 && <span className="badge badge-vr">🥽 360°</span>}
            {video.isLive && <span className="badge badge-live">🔴 LIVE</span>}
          </div>

          {/* Progress bar — always present in DOM; CSS animates on hover */}
          <div
            className={`thumb-progress-bar${video.progress > 0 ? ' has-progress' : ''}`}
            style={{ width: `${video.progress || 0}%` }}
          />

          {/* AI summary hover panel — CSS slide-up on hover */}
          {video.summary && (
            <div className="ai-summary-hover" aria-hidden="true">
              <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginRight: 6 }}>🤖 AI Summary</span>
              {video.summary}
            </div>
          )}
        </div>
      </Link>

      {/* Context menu btn */}
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          className="context-menu-btn"
          style={{ top: compact ? '145px' : '145px' }}
          onClick={e => { e.stopPropagation(); setShowMenu(m => !m); setShowPlaylistPicker(false); }}
          aria-label="Video options"
          aria-haspopup="true"
          aria-expanded={showMenu}
        >
          ⋮
        </button>
        {showMenu && (
          <div className="context-menu" role="menu">
            <div className="context-menu-item" role="menuitem" onClick={() => { addDownload(video); addToast(`⬇️ "${title}" saved to Downloads`); setShowMenu(false); }}>
              ⬇️ Download
            </div>
            <div className="context-menu-item" role="menuitem" onClick={() => { setShowPlaylistPicker(true); }}>
              📋 Add to Playlist
            </div>
            {showPlaylistPicker && (
              <div style={{ paddingLeft: 12, paddingBottom: 6 }}>
                {playlists.map(pl => (
                  <div key={pl.id} className="context-menu-item" style={{ fontSize: 12, padding: '7px 12px' }}
                    onClick={() => { addToPlaylist(pl.id, video); addToast(`Added to "${pl.name}" ✅`); setShowMenu(false); setShowPlaylistPicker(false); }}>
                    ✚ {pl.name}
                  </div>
                ))}
              </div>
            )}
            <div className="context-menu-item" role="menuitem" onClick={() => {
              navigator.clipboard?.writeText(`${window.location.origin}/watch/${video.id}`);
              addToast('🔗 Link copied to clipboard!');
              setShowMenu(false);
            }}>
              🔗 Copy Link
            </div>
            <div className="context-menu-item danger" role="menuitem" onClick={() => { markNotInterested(video.id); addToast('🚫 Not interested — video removed'); setShowMenu(false); }}>
              🚫 Not Interested
            </div>
            <div className="context-menu-item danger" role="menuitem" onClick={() => { blockChannel(video.channel); addToast(`🚫 "${video.channel}" won't appear again`); setShowMenu(false); }}>
              🚷 Don't Recommend Channel
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <Link to={`/watch/${video.id}`} className="video-card-body" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div className="video-card-row">
          <div className="channel-avatar" aria-hidden="true">
            {video.channel.charAt(0)}
          </div>
          <div className="video-info">
            <div className="video-card-title translated-title">{title}</div>
            <div className="video-card-meta">
              <span className="channel-name">
                <Link to={`/channel/${video.channelId}`} onClick={e => e.stopPropagation()} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {video.channel}
                </Link>
                {video.channelVerified && <span className="verified" title="Verified">✓</span>}
              </span>
              <span className="stats-row">
                <span>{video.views} views</span>
                <span>·</span>
                <span>{video.uploadedAt}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Recommend reason */}
        {video.recommendReason && (
          <div
            className="recommend-badge"
            onMouseEnter={() => setShowRecommendTooltip(true)}
            onMouseLeave={() => setShowRecommendTooltip(false)}
            aria-label={`Recommended because: ${video.recommendReason}`}
          >
            ℹ️ <span style={{ fontSize: 10 }}>Why recommended?</span>
            {showRecommendTooltip && (
              <div className="recommend-tooltip">{video.recommendReason}</div>
            )}
          </div>
        )}

        {/* Tags */}
        {video.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
            {video.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag-pill">#{tag}</span>
            ))}
          </div>
        )}
      </Link>

    </div>
  );
}
