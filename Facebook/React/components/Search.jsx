import { useState } from 'react';
import { Search as SearchIcon, X, Flame, Camera, Plane, Salad, Dumbbell, ArrowRight, UserPlus, CheckCircle, Users, FileText } from 'lucide-react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['All', 'People', 'Posts', 'Photos', 'Videos', 'Groups', 'Pages'];

  const searchResults = [
    {
      type: 'person',
      name: 'Sarah Johnson',
      subtitle: 'Photographer • 234 mutual friends',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      verified: true
    },
    {
      type: 'person',
      name: 'Michael Chen',
      subtitle: 'Software Engineer at Tech Corp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    {
      type: 'post',
      author: 'Emma Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      content: 'Amazing sunset at the beach today! 🌅',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      time: '2 hours ago'
    },
    {
      type: 'group',
      name: 'Photography Enthusiasts',
      subtitle: '45.2K members • 12 posts today',
      avatar: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d'
    },
    {
      type: 'person',
      name: 'Lisa Anderson',
      subtitle: 'Developer • Works at StartupXYZ',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    {
      type: 'page',
      name: 'Tech News Daily',
      subtitle: '1.2M followers • Media company',
      avatar: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
      verified: true
    }
  ];

  const trendingSearches = [
    { query: '#TechNews2026', icon: <Flame size={18} /> },
    { query: 'Photography tips', icon: <Camera size={18} /> },
    { query: 'Travel destinations', icon: <Plane size={18} /> },
    { query: 'Healthy recipes', icon: <Salad size={18} /> },
    { query: 'Workout routines', icon: <Dumbbell size={18} /> }
  ];

  return (
    <div className="search-page">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-input-container">
          <span className="search-icon"><SearchIcon size={20} /></span>
          <input
            type="text"
            className="search-input-main"
            placeholder="Search for people, posts, groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="search-filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.toLowerCase())}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="search-content">
        {!searchQuery ? (
          <div className="search-trending">
            <h3><Flame size={18} /> Trending Searches</h3>
            <div className="trending-searches-list">
              {trendingSearches.map((item, index) => (
                <button key={index} className="trending-search-item">
                  <span className="trending-icon">{item.icon}</span>
                  <span>{item.query}</span>
                  <span className="trending-arrow"><ArrowRight size={16} /></span>
                </button>
              ))}
            </div>

            <h3 style={{ marginTop: 'var(--space-2xl)' }}>Recent Searches</h3>
            <div className="recent-searches">
              <div className="empty-state">
                <span className="empty-icon"><SearchIcon size={32} /></span>
                <p>Your recent searches will appear here</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <SearchResultItem key={index} result={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchResultItem({ result }) {
  if (result.type === 'person') {
    return (
      <div className="search-result-item">
        <img src={result.avatar} alt={result.name} className="result-avatar" />
        <div className="result-info">
          <div className="result-name">
            {result.name}
            {result.verified && <span className="verified-badge"><CheckCircle size={14} /></span>}
          </div>
          <div className="result-subtitle">{result.subtitle}</div>
        </div>
        <button className="result-action-btn"><UserPlus size={14} /> Add</button>
      </div>
    );
  }

  if (result.type === 'post') {
    return (
      <div className="search-result-post">
        <div className="result-post-header">
          <img src={result.avatar} alt={result.author} className="result-avatar-sm" />
          <div>
            <div className="result-post-author">{result.author}</div>
            <div className="result-post-time">{result.time}</div>
          </div>
        </div>
        <div className="result-post-content">{result.content}</div>
        {result.image && (
          <img src={result.image} alt="Post" className="result-post-image" />
        )}
      </div>
    );
  }

  if (result.type === 'group' || result.type === 'page') {
    return (
      <div className="search-result-item">
        <img src={result.avatar} alt={result.name} className="result-avatar" />
        <div className="result-info">
          <div className="result-name">
            {result.name}
            {result.verified && <span className="verified-badge"><CheckCircle size={14} /></span>}
          </div>
          <div className="result-subtitle">{result.subtitle}</div>
        </div>
        <button className="result-action-btn">
          {result.type === 'group' ? <><Users size={14} /> Join</> : 'Follow'}
        </button>
      </div>
    );
  }

  return null;
}
