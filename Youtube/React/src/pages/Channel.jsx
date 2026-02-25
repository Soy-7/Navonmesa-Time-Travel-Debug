import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getVideosByChannel, VIDEOS } from '../data/videos';
import VideoGrid from '../components/VideoGrid';
import Footer from '../components/Footer';

const CHANNEL_INFO = {
  ch1: { name: 'BeatCraft Studio', desc: 'Music production tutorials, sample packs, and lo-fi beats. New content every week.', subs: '892K', icon: '🎵' },
  ch2: { name: 'CodeWithNavon', desc: 'Python, AI, and web dev tutorials. Building the future one line of code at a time.', subs: '2.4M', icon: '💻' },
  ch3: { name: 'VRWanderer', desc: 'Immersive 360° VR travel experiences from around the world. Pack light, travel far.', subs: '340K', icon: '🌍' },
  ch4: { name: 'GR Kitchen Channel', desc: 'Culinary excellence, bold opinions, and timeless cooking techniques.', subs: '8.1M', icon: '🍳' },
  ch5: { name: 'JazzNightCafe', desc: 'Live jazz streams and archived sessions from intimate venues worldwide.', subs: '124K', icon: '🎷' },
  ch6: { name: 'SpeedDemon404', desc: 'Competitive speedrunning, world record attempts, and gaming commentary.', subs: '1.2M', icon: '🎮' },
  ch7: { name: 'CalmWithin', desc: 'Guided meditations, sleep sessions, and mindfulness practices for everyday life.', subs: '6.7M', icon: '🧘' },
  ch8: { name: 'UrbanFlowCrew', desc: 'Parkour, freerunning, and urban movement from cities across the globe.', subs: '3.9M', icon: '🏃' },
};

export default function Channel() {
  const { id } = useParams();
  const info = CHANNEL_INFO[id] || { name: 'Unknown Channel', desc: 'Channel not found', subs: '0', icon: '📺' };
  const videos = getVideosByChannel(id);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="app-main">
      <div className="page-container">
        {/* Banner */}
        <div className="channel-banner" aria-hidden="true" />

        {/* Channel header */}
        <div className="channel-header">
          <div className="channel-avatar-lg" aria-hidden="true">{info.icon}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              {info.name}
              <span className="verified" style={{ fontSize: 16 }}>✓</span>
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{info.subs} subscribers · {videos.length} videos</div>
          </div>
          <button
            className={`subscribe-btn${subscribed ? ' subscribed' : ''}`}
            onClick={() => setSubscribed(s => !s)}
            aria-pressed={subscribed}
          >
            {subscribed ? '✓ Subscribed' : 'Subscribe'}
          </button>
        </div>

        {/* About */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>About</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{info.desc}</p>
        </div>

        {/* Videos */}
        {videos.length > 0 ? (
          <VideoGrid videos={videos} title={`Videos by ${info.name}`} />
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📹</div>
            <div>No videos available for this channel</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
