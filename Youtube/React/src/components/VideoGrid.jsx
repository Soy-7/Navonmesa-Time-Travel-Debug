import { useState, useEffect, useRef } from 'react';
import VideoCard from './VideoCard';
import SkeletonCard from './SkeletonCard';
import { useUserPrefs } from '../context/UserPrefsContext';
import { useToast } from '../utils/ToastProvider';

export default function VideoGrid({ videos, title }) {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const { getDietSecondsToday } = useUserPrefs();
  const addToast = useToast();
  const dietChecked = useRef(false);

  useEffect(() => {
    setLoading(true);
    setVisible(false);
    const timer = setTimeout(() => {
      setLoading(false);
      // Slight offset so skeleton fades out before content fades in
      setTimeout(() => setVisible(true), 80);
    }, 800);
    return () => clearTimeout(timer);
  }, [videos]);

  // Content diet check after videos load (once per mount)
  useEffect(() => {
    if (loading || dietChecked.current) return;
    dietChecked.current = true;
    const categories = [...new Set(videos.map(v => v.category))];
    categories.forEach(cat => {
      const secs = getDietSecondsToday(cat);
      if (secs >= 7200) {
        addToast(`🎮 You've watched over 2h of ${cat} today. Take a break? 😊`, 6000);
      }
    });
  }, [loading]);

  // Inject a "featured" card every 8th position
  const gridItems = loading
    ? Array.from({ length: 8 }).map((_, i) => ({ _skeleton: true, _idx: i }))
    : videos.reduce((acc, video, i) => {
        // Insert a featured card before every 8th real item (index 7, 15, 23 …)
        if (i > 0 && i % 8 === 0) {
          acc.push({ _featured: true, video: videos[i - 1], _idx: `feat-${i}` });
        }
        acc.push({ video, _idx: i });
        return acc;
      }, []);

  return (
    <section aria-label={title || 'Videos'}>
      {title && <h2 className="section-title">{title}</h2>}
      <div
        className="video-grid"
        style={{
          opacity: loading ? 1 : visible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : gridItems.map(item =>
              item._featured ? (
                <VideoCard key={item._idx} video={item.video} featured />
              ) : (
                <VideoCard key={item.video.id} video={item.video} />
              )
            )
        }
      </div>
    </section>
  );
}
