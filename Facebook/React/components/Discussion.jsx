import { useState } from 'react';
import { MessagesSquare, MessageCircle, Monitor, Sparkles, Dumbbell, Plane, UtensilsCrossed, Flame, Eye, Plus } from 'lucide-react';

export default function Discussion() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryIcons = {
    all: <MessageCircle size={16} />,
    tech: <Monitor size={16} />,
    lifestyle: <Sparkles size={16} />,
    health: <Dumbbell size={16} />,
    travel: <Plane size={16} />,
    food: <UtensilsCrossed size={16} />
  };

  const categories = [
    { id: 'all', name: 'All Topics', count: 245 },
    { id: 'tech', name: 'Technology', count: 67 },
    { id: 'lifestyle', name: 'Lifestyle', count: 89 },
    { id: 'health', name: 'Health', count: 45 },
    { id: 'travel', name: 'Travel', count: 34 },
    { id: 'food', name: 'Food', count: 56 }
  ];

  const discussions = [
    {
      id: 1,
      title: 'What are the best practices for React performance optimization?',
      author: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      category: 'tech',
      replies: 234,
      views: '12.3K',
      time: '2 hours ago',
      tags: ['React', 'JavaScript', 'Performance'],
      hot: true
    },
    {
      id: 2,
      title: 'Best camera settings for golden hour photography?',
      author: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      category: 'lifestyle',
      replies: 156,
      views: '8.9K',
      time: '4 hours ago',
      tags: ['Photography', 'Tips', 'Golden Hour'],
      hot: true
    },
    {
      id: 3,
      title: 'Healthy meal prep ideas for busy professionals',
      author: 'Emma Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      category: 'health',
      replies: 89,
      views: '5.2K',
      time: '6 hours ago',
      tags: ['Meal Prep', 'Healthy', 'Nutrition'],
      hot: false
    },
    {
      id: 4,
      title: 'Top destinations to visit in 2026?',
      author: 'David Martinez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      category: 'travel',
      replies: 312,
      views: '18.7K',
      time: '8 hours ago',
      tags: ['Travel', '2026', 'Destinations'],
      hot: true
    },
    {
      id: 5,
      title: 'Beginner-friendly workout routines at home',
      author: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      category: 'health',
      replies: 178,
      views: '9.4K',
      time: '10 hours ago',
      tags: ['Fitness', 'Home Workout', 'Beginner'],
      hot: false
    },
    {
      id: 6,
      title: 'Share your favorite quick breakfast recipes!',
      author: 'Tom Wilson',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      category: 'food',
      replies: 267,
      views: '14.2K',
      time: '12 hours ago',
      tags: ['Breakfast', 'Recipes', 'Quick'],
      hot: true
    }
  ];

  const filteredDiscussions = activeCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === activeCategory);

  return (
    <div className="discussion-page">
      <div className="discussion-header">
        <h2><MessagesSquare size={22} /> Discussions</h2>
        <button className="start-discussion-btn"><Plus size={16} /> Start Discussion</button>
      </div>

      {/* Categories */}
      <div className="discussion-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="category-icon">{categoryIcons[cat.id]}</span>
            <span className="category-name">{cat.name}</span>
            <span className="category-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Discussions List */}
      <div className="discussions-list">
        {filteredDiscussions.map(discussion => (
          <div key={discussion.id} className="discussion-item">
            <div className="discussion-left">
              <img src={discussion.avatar} alt={discussion.author} className="discussion-avatar" />
            </div>
            
            <div className="discussion-content">
              <div className="discussion-title-row">
                <h3 className="discussion-title">
                  {discussion.hot && <span className="hot-badge"><Flame size={14} /></span>}
                  {discussion.title}
                </h3>
              </div>
              
              <div className="discussion-meta">
                <span className="discussion-author">{discussion.author}</span>
                <span className="discussion-time">{discussion.time}</span>
                <span className="discussion-category">
                  {categoryIcons[discussion.category]} {categories.find(c => c.id === discussion.category)?.name}
                </span>
              </div>
              
              <div className="discussion-tags">
                {discussion.tags.map((tag, idx) => (
                  <span key={idx} className="discussion-tag">#{tag}</span>
                ))}
              </div>
              
              <div className="discussion-stats">
                <span className="discussion-stat">
                  <MessageCircle size={14} /> {discussion.replies} replies
                </span>
                <span className="discussion-stat">
                  <Eye size={14} /> {discussion.views} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
