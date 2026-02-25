import { createContext, useContext, useState, useEffect } from 'react';

const UserPrefsContext = createContext(null);

export function UserPrefsProvider({ children }) {
  const load = (key, def) => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch { return def; }
  };
  const save = (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  };

  const [darkMode, setDarkModeState] = useState(() => load('yt_darkmode', true));
  const [language, setLanguageState] = useState(() => load('yt_language', 'en'));
  const [watchHistory, setWatchHistoryState] = useState(() => load('yt_history', []));
  const [dislikedChannels, setDislikedChannelsState] = useState(() => load('yt_blockedchannels', []));
  const [notInterested, setNotInterestedState] = useState(() => load('yt_notinterested', []));
  const [downloads, setDownloadsState] = useState(() => load('yt_downloads', []));
  const [quality, setQualityState] = useState(() => load('yt_quality', '1080p'));
  const [speeds, setSpeedsState] = useState(() => load('yt_speeds', {}));
  const [dietData, setDietDataState] = useState(() => load('yt_diet', {}));
  const [communityReactions, setCommunityReactionsState] = useState(() => load('yt_community_reactions', {}));
  const [playlists, setPlaylistsState] = useState(() => load('yt_playlists', [{ id: 'pl1', name: 'Watch Later', videos: [] }, { id: 'pl2', name: 'Favourites', videos: [] }]));

  const [accessibilitySettings, setAccessibilityState] = useState(() => load('yt_a11y', {
    dyslexiaFont: false,
    highContrast: false,
    seizureSafe: false,
  }));

  // Apply body classes
  useEffect(() => {
    const b = document.body;
    b.classList.toggle('light-mode', !darkMode);
    b.classList.toggle('high-contrast', accessibilitySettings.highContrast);
    b.classList.toggle('dyslexia-font', accessibilitySettings.dyslexiaFont);
    b.classList.toggle('seizure-safe', accessibilitySettings.seizureSafe);
  }, [darkMode, accessibilitySettings]);

  const setDarkMode = (v) => { setDarkModeState(v); save('yt_darkmode', v); };
  const setLanguage = (v) => {
    setLanguageState(v);
    save('yt_language', v);
    // Blur all translated titles during swap
    document.body.classList.add('translating');
    setTimeout(() => document.body.classList.remove('translating'), 350);
  };
  const setAccessibility = (key, val) => {
    setAccessibilityState(prev => {
      const next = { ...prev, [key]: val };
      save('yt_a11y', next);
      return next;
    });
  };

  const addToHistory = (video, progress = 0) => {
    setWatchHistoryState(prev => {
      const filtered = prev.filter(e => e.id !== video.id);
      const next = [{ id: video.id, title: video.title, channel: video.channel, thumbnail: video.thumbnail, duration: video.duration, durationSecs: video.durationSecs, category: video.category, progress, watchedAt: Date.now() }, ...filtered].slice(0, 50);
      save('yt_history', next);
      // Update diet tracker
      const secs = Math.round(video.durationSecs * (progress / 100));
      setDietDataState(prevDiet => {
        const today = new Date().toDateString();
        const key = `${today}_${video.category}`;
        const updated = { ...prevDiet, [key]: (prevDiet[key] || 0) + secs };
        save('yt_diet', updated);
        return updated;
      });
      return next;
    });
  };

  const blockChannel = (channelName) => {
    setDislikedChannelsState(prev => {
      const next = [...new Set([...prev, channelName])];
      save('yt_blockedchannels', next);
      return next;
    });
  };

  const markNotInterested = (videoId) => {
    setNotInterestedState(prev => {
      const next = [...new Set([...prev, videoId])];
      save('yt_notinterested', next);
      return next;
    });
  };

  const addDownload = (video) => {
    setDownloadsState(prev => {
      if (prev.find(d => d.id === video.id)) return prev;
      const next = [{ id: video.id, title: video.title, channel: video.channel, thumbnail: video.thumbnail, duration: video.duration, downloadedAt: Date.now() }, ...prev];
      save('yt_downloads', next);
      return next;
    });
  };

  const removeDownload = (id) => {
    setDownloadsState(prev => {
      const next = prev.filter(d => d.id !== id);
      save('yt_downloads', next);
      return next;
    });
  };

  const setQuality = (v) => { setQualityState(v); save('yt_quality', v); };

  const setSpeed = (videoId, speed) => {
    setSpeedsState(prev => {
      const next = { ...prev, [videoId]: speed };
      save('yt_speeds', next);
      return next;
    });
  };

  const reactCommunity = (postId, type) => {
    setCommunityReactionsState(prev => {
      const next = { ...prev, [postId]: type };
      save('yt_community_reactions', next);
      return next;
    });
  };

  const addToPlaylist = (playlistId, video) => {
    setPlaylistsState(prev => {
      const next = prev.map(pl => {
        if (pl.id !== playlistId) return pl;
        if (pl.videos.find(v => v.id === video.id)) return pl;
        return { ...pl, videos: [...pl.videos, { ...video, suggestedBy: 'You' }] };
      });
      save('yt_playlists', next);
      return next;
    });
  };

  const getDietSecondsToday = (category) => {
    const today = new Date().toDateString();
    const key = `${today}_${category}`;
    return dietData[key] || 0;
  };

  const getWatchStats = () => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = watchHistory.filter(e => e.watchedAt > oneWeekAgo);
    const totalSecs = thisWeek.reduce((acc, e) => acc + Math.round((e.durationSecs || 0) * (e.progress / 100)), 0);
    const catCount = {};
    const chanCount = {};
    thisWeek.forEach(e => {
      catCount[e.category] = (catCount[e.category] || 0) + 1;
      chanCount[e.channel] = (chanCount[e.channel] || 0) + 1;
    });
    const topCategories = Object.entries(catCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topChannels = Object.entries(chanCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { totalSecs, thisWeek, topCategories, topChannels };
  };

  return (
    <UserPrefsContext.Provider value={{
      darkMode, setDarkMode,
      language, setLanguage,
      accessibilitySettings, setAccessibility,
      watchHistory, addToHistory,
      dislikedChannels, blockChannel,
      notInterested, markNotInterested,
      downloads, addDownload, removeDownload,
      quality, setQuality,
      speeds, setSpeed,
      communityReactions, reactCommunity,
      playlists, addToPlaylist, setPlaylistsState,
      getDietSecondsToday, getWatchStats,
    }}>
      {children}
    </UserPrefsContext.Provider>
  );
}

export const useUserPrefs = () => useContext(UserPrefsContext);
