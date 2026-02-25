import { useState, useEffect } from 'react';
import { Film, Video, Heart, MessageCircle, Share2, MoreHorizontal, ChevronUp, ChevronDown, Music, UserPlus } from 'lucide-react';

export default function Veevs() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const reels = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      username: '@sarahj_photo',
      video: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      caption: 'Golden hour photography tips ✨📸 #photography #goldenhour',
      likes: '45.2K',
      comments: '1,234',
      shares: '567',
      music: 'Chill Vibes - Summer Mix'
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      username: '@mikechen',
      video: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      caption: 'Mountain adventures 🏔️ Best sunrise ever! #travel #adventure',
      likes: '67.8K',
      comments: '2,456',
      shares: '890',
      music: 'Epic Journey - Adventure Mix'
    },
    {
      id: 3,
      author: 'Emma Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      username: '@emmawilliams',
      video: 'https://images.unsplash.com/photo-1528465424850-54d22f092f9d',
      caption: 'Quick healthy breakfast recipe 🥗🍳 #cooking #healthy',
      likes: '92.3K',
      comments: '3,789',
      shares: '1,234',
      music: 'Morning Vibes - Chill Beats'
    },
    {
      id: 4,
      author: 'David Martinez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      username: '@davidmart',
      video: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      caption: 'Intense workout session 💪🔥 No excuses! #fitness #motivation',
      likes: '156K',
      comments: '5,432',
      shares: '2,123',
      music: 'Workout Beats - High Energy'
    }
  ];

  const currentReel = reels[currentReelIndex];

  const handleScroll = (direction) => {
    if (direction === 'up' && currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
    } else if (direction === 'down' && currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) {
          handleScroll('down');
        } else {
          handleScroll('up');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentReelIndex]);

  return (
    <div className="reels-page">
      <div className="reels-header">
        <h2><Film size={22} /> Veevs</h2>
        <button className="reels-camera-btn"><Video size={20} /></button>
      </div>

      <div className="reels-container">
        {/* Video Display */}
        <div className="reel-video-wrapper">
          <img 
            src={currentReel.video} 
            alt="Reel" 
            className="reel-video"
          />
          
          {/* Gradient Overlay */}
          <div className="reel-overlay"></div>

          {/* Author Info (Bottom Left) */}
          <div className="reel-author-info">
            <div className="reel-author-header">
              <img src={currentReel.avatar} alt={currentReel.author} />
              <div>
                <div className="reel-author-name">{currentReel.author}</div>
                <div className="reel-username">{currentReel.username}</div>
              </div>
              <button className="reel-follow-btn"><UserPlus size={14} /> Follow</button>
            </div>
            
            <p className="reel-caption">{currentReel.caption}</p>
            
            <div className="reel-music">
              <Music size={14} /> {currentReel.music}
            </div>
          </div>

          {/* Actions (Right Side) */}
          <div className="reel-actions">
            <button className="reel-action-btn">
              <span className="action-icon"><Heart size={24} /></span>
              <span className="action-count">{currentReel.likes}</span>
            </button>
            
            <button className="reel-action-btn">
              <span className="action-icon"><MessageCircle size={24} /></span>
              <span className="action-count">{currentReel.comments}</span>
            </button>
            
            <button className="reel-action-btn">
              <span className="action-icon"><Share2 size={24} /></span>
              <span className="action-count">{currentReel.shares}</span>
            </button>
            
            <button className="reel-action-btn">
              <span className="action-icon"><MoreHorizontal size={24} /></span>
            </button>
          </div>

          {/* Navigation Arrows */}
          {currentReelIndex > 0 && (
            <button 
              className="reel-nav-btn reel-nav-up"
              onClick={() => handleScroll('up')}
            >
              <ChevronUp size={24} />
            </button>
          )}
          
          {currentReelIndex < reels.length - 1 && (
            <button 
              className="reel-nav-btn reel-nav-down"
              onClick={() => handleScroll('down')}
            >
              <ChevronDown size={24} />
            </button>
          )}
        </div>

        {/* Reel Indicator */}
        <div className="reel-indicator">
          {reels.map((_, index) => (
            <div 
              key={index} 
              className={`reel-dot ${index === currentReelIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
