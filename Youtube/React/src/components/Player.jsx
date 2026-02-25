import { useState, useRef, useEffect } from 'react';
import { useUserPrefs } from '../context/UserPrefsContext';
import { useToast } from '../utils/ToastProvider';
import { sampleDominantColor } from '../utils/colorSampler';

const QUALITIES = ['144p', '360p', '720p', '1080p', '4K', '8K'];
const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function Player({ video }) {
  const { quality, setQuality, speeds, setSpeed, addToHistory } = useUserPrefs();
  const addToast = useToast();
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSecs || 0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [ambientMode, setAmbientMode] = useState(false);
  const [ambientColor, setAmbientColor] = useState('rgba(255,45,45,0.3)');
  const [currentCaption, setCurrentCaption] = useState('');
  const [showPollOverlay, setShowPollOverlay] = useState(false);
  const [pollVoted, setPollVoted] = useState(null);
  const [showQuality, setShowQuality] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);
  const [watchPartyRoom, setWatchPartyRoom] = useState('');
  const [showPartyPanel, setShowPartyPanel] = useState(false);
  const [partyMessages, setPartyMessages] = useState([
    { user: 'Alex', msg: 'Just joined the party! 🎉' },
    { user: 'Jordan', msg: 'This video is amazing 🙌' },
  ]);
  const [partyInput, setPartyInput] = useState('');

  const speed = speeds[video.id] || 1;

  // Simulate playback with setInterval
  useEffect(() => {
    let timer;
    if (playing) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          const next = Math.min(prev + 1 * speed, duration);
          setProgress(duration > 0 ? (next / duration) * 100 : 0);

          // Caption sync
          if (captionsOn && video.captions?.length) {
            const cap = [...video.captions].reverse().find(c => c.time <= next);
            setCurrentCaption(cap ? cap.text : '');
          }

          // Poll trigger
          if (video.poll && Math.abs(next - video.poll.triggerTime) < 1.5 && !pollVoted) {
            setShowPollOverlay(true);
            setPlaying(false);
          }

          // Live chat replay
          if (video.isLive && video.chatReplay?.length) {
            // Handled in Watch page
          }

          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playing, speed, duration, captionsOn, video, pollVoted]);

  // Save history on progress update
  useEffect(() => {
    if (progress > 0) {
      addToHistory(video, Math.round(progress));
    }
  }, [Math.floor(progress / 10)]); // Save every 10%

  // Ambient mode color
  useEffect(() => {
    if (ambientMode) {
      sampleDominantColor(video.thumbnail).then(color => {
        setAmbientColor(color);
      });
    }
  }, [ambientMode, video.thumbnail]);

  const togglePlay = () => setPlaying(p => !p);

  const seekTo = (pct) => {
    const t = (pct / 100) * duration;
    setCurrentTime(t);
    setProgress(pct);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seekTo(Math.max(0, Math.min(100, pct)));
  };

  const handlePiP = () => {
    if (!document.pictureInPictureEnabled) { addToast('⚠️ Picture-in-Picture not supported in this browser'); return; }
    addToast('📺 PiP activated — check your browser window');
  };

  const handleWatchParty = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const url = `${window.location.href}?room=${code}`;
    navigator.clipboard?.writeText(url);
    setWatchPartyRoom(code);
    setShowPartyPanel(true);
    addToast(`🎉 Watch Party started! Room: ${code} — link copied!`);
  };

  const handleClipShare = () => {
    const secs = Math.floor(currentTime);
    const url = `${window.location.href}?t=${secs}`;
    navigator.clipboard?.writeText(url);
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    addToast(`🔗 Link copied! Starts at ${mins}:${String(s).padStart(2, '0')}`);
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const sendPartyMsg = () => {
    if (!partyInput.trim()) return;
    setPartyMessages(prev => [...prev, { user: 'You', msg: partyInput }]);
    setPartyInput('');
  };

  return (
    <div>
      {/* Player */}
      <div
        className={`player-wrap${theaterMode ? ' theater-mode' : ''}${ambientMode ? ' ambient-glow' : ''}`}
        style={ambientMode ? { '--ambient-color': ambientColor } : {}}
      >
        {/* Mock video — thumbnail as placeholder */}
        <img
          src={`${video.thumbnail}?w=1280&h=720&fit=crop`}
          alt={video.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Caption overlay */}
        {captionsOn && currentCaption && (
          <div className="caption-overlay" aria-live="polite">{currentCaption}</div>
        )}

        {/* Poll overlay */}
        {showPollOverlay && video.poll && (
          <div className="poll-overlay" role="dialog" aria-label="Interactive poll">
            <div className="poll-card">
              <div className="poll-title">🗳️ {video.poll.question}</div>
              {pollVoted ? (
                <div>
                  {video.poll.options.map((opt, i) => {
                    const pct = pollVoted === i ? 55 : Math.floor(Math.random() * 30 + 5);
                    return (
                      <div key={opt} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)' }}>
                          <span>{opt}</span><span>{pct}%</span>
                        </div>
                        <div className="category-bar-track"><div className="poll-result-bar" style={{ width: `${pct}%` }} /></div>
                      </div>
                    );
                  })}
                  <button className="submit-btn" style={{ marginTop: 12, width: '100%', padding: '10px 0' }} onClick={() => { setShowPollOverlay(false); setPlaying(true); }}>
                    ▶ Continue Video
                  </button>
                </div>
              ) : (
                video.poll.options.map((opt, i) => (
                  <button key={opt} className="poll-option" onClick={() => { setPollVoted(i); addToast(`✅ Voted for "${opt}"`); }}>
                    {opt}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="player-controls">
          {/* Progress bar */}
          <div
            className="progress-bar-wrap"
            onClick={handleProgressClick}
            role="slider"
            aria-label="Video progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
          >
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            {/* Chapter ticks */}
            {video.chapters?.map(ch => (
              <div
                key={ch.time}
                className="chapter-tick"
                style={{ left: `${(ch.time / duration) * 100}%` }}
                title={ch.label}
              >
                <div className="chapter-tick-tooltip">{ch.label}</div>
              </div>
            ))}
          </div>

          <div className="player-btns-row">
            <button className="player-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing}>
              {playing ? '⏸' : '▶️'}
            </button>
            <button className="player-btn" aria-label="Skip 10 seconds" onClick={() => seekTo(Math.min(100, progress + (10 / duration) * 100))}>⏩</button>
            <button className="player-btn" onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>
              {muted ? '🔇' : '🔊'}
            </button>
            <span className="player-time">{fmt(currentTime)} / {fmt(duration)}</span>

            <div className="player-spacer" />

            {/* Quality badge */}
            <span className="quality-badge">{quality}</span>

            {/* CC */}
            <button
              className="player-btn"
              onClick={() => setCaptionsOn(c => !c)}
              aria-label="Toggle captions"
              aria-pressed={captionsOn}
              style={{ color: captionsOn ? 'var(--accent)' : undefined }}
            >
              CC
            </button>

            {/* Speed */}
            <div style={{ position: 'relative' }}>
              <button className="player-btn" onClick={() => setShowSpeed(s => !s)} aria-label="Playback speed">{speed}x</button>
              {showSpeed && (
                <div style={{ position: 'absolute', bottom: '100%', right: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', minWidth: 80 }}>
                  {SPEEDS.map(s => (
                    <div key={s} onClick={() => { setSpeed(video.id, s); setShowSpeed(false); }}
                      style={{ padding: '8px 14px', fontSize: 13, cursor: 'pointer', color: s === speed ? 'var(--accent)' : 'var(--text-secondary)', background: s === speed ? 'var(--accent-dim)' : 'transparent' }}>
                      {s}x
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quality */}
            <div style={{ position: 'relative' }}>
              <button className="player-btn" onClick={() => setShowQuality(q => !q)} aria-label="Video quality">⚙️</button>
              {showQuality && (
                <div style={{ position: 'absolute', bottom: '100%', right: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', minWidth: 90 }}>
                  {QUALITIES.map(q => (
                    <div key={q} onClick={() => { setQuality(q); setShowQuality(false); addToast(`🖥️ Quality set to ${q}`); }}
                      style={{ padding: '8px 14px', fontSize: 13, cursor: 'pointer', color: q === quality ? 'var(--accent)' : 'var(--text-secondary)', background: q === quality ? 'var(--accent-dim)' : 'transparent' }}>
                      {q}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PiP */}
            <button className="player-btn" onClick={handlePiP} aria-label="Picture in Picture">📺</button>

            {/* Ambient mode */}
            <button
              className="player-btn"
              onClick={() => setAmbientMode(a => !a)}
              aria-label="Toggle ambient mode"
              aria-pressed={ambientMode}
              style={{ color: ambientMode ? 'var(--accent)' : undefined }}
              title="Ambient Mode"
            >
              ✨
            </button>

            {/* Theater */}
            <button
              className="player-btn"
              onClick={() => setTheaterMode(t => !t)}
              aria-label="Toggle theater mode"
              aria-pressed={theaterMode}
              title="Theater Mode"
            >
              🎭
            </button>

            {/* Full screen (mock) */}
            <button className="player-btn" aria-label="Fullscreen">⛶</button>
          </div>
        </div>
      </div>

      {/* Action row below player */}
      <div className="video-action-row" style={{ marginTop: 16 }}>
        <button className="action-btn" onClick={handleClipShare}>🔗 Share from {fmt(Math.floor(currentTime))}</button>
        <button className="action-btn" onClick={handleWatchParty}>🎉 Watch Together</button>
        <button className="action-btn">👍 Like</button>
        <button className="action-btn">👎 Dislike</button>
        <button className="action-btn">📋 Save</button>
      </div>

      {/* Watch party chat panel */}
      {showPartyPanel && (
        <div style={{ marginTop: 16 }}>
          <div className="chat-panel">
            <div className="chat-header">
              🎉 Watch Party — Room: {watchPartyRoom}
              <button onClick={() => setShowPartyPanel(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>
            <div className="chat-messages">
              {partyMessages.map((m, i) => (
                <div key={i} className="chat-msg">
                  <span className="chat-user">{m.user}</span>{m.msg}
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                value={partyInput}
                onChange={e => setPartyInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendPartyMsg()}
                placeholder="Say something..."
                aria-label="Chat message"
              />
              <button className="chat-send-btn" onClick={sendPartyMsg} aria-label="Send message">➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
