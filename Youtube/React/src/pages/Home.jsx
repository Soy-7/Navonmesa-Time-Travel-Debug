import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VIDEOS } from '../data/videos';
import { useUserPrefs } from '../context/UserPrefsContext';
import { smartSearch } from '../utils/smartSearch';
import VideoGrid from '../components/VideoGrid';
import VideoCard from '../components/VideoCard';
import FilterChips from '../components/FilterChips';
import Footer from '../components/Footer';

const MOODS = [
  { emoji: '😂', label: 'Laugh', tags: ['funny', 'comedy'] },
  { emoji: '🎓', label: 'Learn', tags: ['education', 'tutorial', 'programming'] },
  { emoji: '🎵', label: 'Music', tags: ['music', 'song', 'beats'] },
  { emoji: '😌', label: 'Relax', tags: ['chill', 'meditation', 'sleep', 'relax'] },
];

export default function Home() {
  const [searchParams] = useSearchParams();
  const [chip, setChip] = useState('All');
  const [mood, setMood] = useState(null);
  const [gridAnimClass, setGridAnimClass] = useState('');
  const { watchHistory, language } = useUserPrefs();

  const query = searchParams.get('q') || '';

  const changeMood = (newMood) => {
    setGridAnimClass('animating-out');
    setTimeout(() => {
      setMood(newMood);
      setGridAnimClass('animating-in');
      setTimeout(() => setGridAnimClass(''), 260);
    }, 250);
  };

  const getFilteredVideos = () => {
    let base = VIDEOS;

    // Smart search
    if (query) base = smartSearch(query, base);

    // Chip filter
    if (chip !== 'All') {
      base = base.filter(v =>
        v.category.toLowerCase() === chip.toLowerCase() ||
        v.tags?.includes(chip.toLowerCase()) ||
        (chip === 'Live' && v.isLive)
      );
    }

    // Mood filter
    if (mood) {
      const moodObj = MOODS.find(m => m.label === mood);
      if (moodObj) {
        base = base.filter(v =>
          moodObj.tags.some(t =>
            v.category.toLowerCase().includes(t) ||
            v.tags?.some(tag => tag.toLowerCase().includes(t))
          )
        );
      }
    }

    return base;
  };

  const continueWatching = watchHistory.filter(h => h.progress > 5 && h.progress < 95).slice(0, 6);
  const filtered = getFilteredVideos();

  return (
    <div className="app-main">
      <div className="page-container">

        {/* Mood filter */}
        <div className="mood-bar" role="toolbar" aria-label="Mood filter">
          <span className="mood-label">What are you in the mood for?</span>
          {MOODS.map(m => (
            <button
              key={m.label}
              className={`mood-btn${mood === m.label ? ' active' : ''}`}
              onClick={() => changeMood(mood === m.label ? null : m.label)}
              aria-pressed={mood === m.label}
              aria-label={`Mood: ${m.label}`}
            >
              {m.emoji} {m.label}
            </button>
          ))}
          {mood && (
            <button className="mood-clear" onClick={() => changeMood(null)} aria-label="Clear mood filter">
              &#x2715; Clear
            </button>
          )}
        </div>

        {/* Filter chips */}
        <FilterChips active={chip} onChange={setChip} />

        {/* Continue Watching */}
        {continueWatching.length > 0 && !query && !mood && chip === 'All' && (
          <section aria-label="Continue Watching" style={{ marginBottom: 32 }}>
            <h2 className="section-title">⏯ Continue Watching</h2>
            <div className="continue-shelf">
              {continueWatching.map(entry => {
                const video = VIDEOS.find(v => v.id === entry.id);
                if (!video) return null;
                return (
                  <VideoCard
                    key={entry.id}
                    video={{ ...video, progress: entry.progress }}
                    compact
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Search results header */}
        {query && (
          <div style={{ marginBottom: 20 }}>
            <h2 className="section-title">🔍 Results for "{query}"</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{filtered.length} video{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
        )}

        {/* Main grid */}
        <div className={`mood-grid-wrap${gridAnimClass ? ` ${gridAnimClass}` : ''}`}>
        {filtered.length > 0 ? (
          <VideoGrid
            videos={filtered}
            title={!query && chip === 'All' && !mood ? '&#128293; Trending Now' : undefined}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">&#127916;</div>
            <div className="empty-state-title">No videos found</div>
            <div className="empty-state-sub">Try a different search or clear your filters</div>
          </div>
        )}
        </div>

        {/* Featured section */}
        {!query && chip === 'All' && !mood && (
          <VideoGrid videos={[...VIDEOS].reverse()} title="✨ Recently Uploaded" />
        )}

      </div>
      <Footer />
    </div>
  );
}
