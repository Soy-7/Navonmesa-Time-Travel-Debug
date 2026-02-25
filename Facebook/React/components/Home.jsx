import { useState } from 'react';
import { Users, UsersRound, Tv, ShoppingBag, CalendarDays, Gamepad2, MessageCircle, Newspaper, Clock, Image, Smile, MapPin, MoreHorizontal, ThumbsUp, Heart, Share2, TrendingUp, TrendingDown, Minus, UserPlus, Plus, Flame } from 'lucide-react';

export default function Home({ sidebarOpen = true }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      time: "2 hours ago",
      content: "Just launched my new photography portfolio! Check it out and let me know what you think 📸✨",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
      likes: 234,
      comments: 45,
      shares: 12,
      reactions: { like: 150, love: 60, haha: 15, wow: 9 }
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      time: "4 hours ago",
      content: "Incredible sunset at the beach today! Nature never ceases to amaze me 🌅",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      likes: 567,
      comments: 89,
      shares: 23,
      reactions: { like: 300, love: 200, haha: 10, wow: 57 }
    },
    {
      id: 3,
      author: "Emma Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      time: "6 hours ago",
      content: "Throwback to our amazing trip to Japan last month! 🗾 Already planning the next adventure. Who wants to join? ✈️",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
      likes: 892,
      comments: 156,
      shares: 45,
      reactions: { like: 500, love: 300, haha: 20, wow: 72 }
    },
    {
      id: 4,
      author: "David Martinez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      time: "8 hours ago",
      content: "Finally finished my first marathon! 26.2 miles of pure determination 💪 Thanks everyone for the support!",
      likes: 1203,
      comments: 234,
      shares: 67,
      reactions: { like: 800, love: 250, haha: 50, wow: 103 }
    },
    {
      id: 5,
      author: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      time: "12 hours ago",
      content: "Coffee and code - the perfect combo for a productive morning ☕️💻 #developerlife",
      image: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4",
      likes: 456,
      comments: 67,
      shares: 15,
      reactions: { like: 300, love: 100, haha: 40, wow: 16 }
    }
  ]);

  const stories = [
    { id: 1, name: "Your Story", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", isYours: true },
    { id: 2, name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", hasNew: true },
    { id: 3, name: "Michael", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", hasNew: true },
    { id: 4, name: "Emma", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", hasNew: true },
    { id: 5, name: "David", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef", hasNew: false },
    { id: 6, name: "Lisa", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", hasNew: true },
    { id: 7, name: "James", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", hasNew: false },
    { id: 8, name: "Sophia", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", hasNew: true }
  ];

  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <div className={`home-sidebar-left ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <LeftSidebar />
      </div>

      {/* Main Feed */}
      <div className="home-page">
        {/* Stories Carousel */}
        <StoriesCarousel stories={stories} />

        {/* Create Post */}
        <div className="create-post-card">
          <div className="create-post-header">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
              alt="You" 
              className="create-post-avatar"
            />
            <input 
              type="text" 
              placeholder="What's on your mind?" 
              className="create-post-input"
            />
          </div>
          <div className="create-post-actions">
            <button className="post-action-btn"><Image size={18} /> Photo/Video</button>
            <button className="post-action-btn"><Smile size={18} /> Feeling/Activity</button>
            <button className="post-action-btn"><MapPin size={18} /> Check In</button>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="feed-posts">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="home-sidebar-right">
        <RightSidebar />
      </div>
    </div>
  );
}

function LeftSidebar() {
  const menuItems = [
    { icon: <Users size={20} />, label: 'Friends', badge: null },
    { icon: <UsersRound size={20} />, label: 'Groups', badge: '3' },
    { icon: <Tv size={20} />, label: 'Watch', badge: 'New' },
    { icon: <ShoppingBag size={20} />, label: 'Marketplace', badge: null },
    { icon: <CalendarDays size={20} />, label: 'Events', badge: '2' },
    { icon: <Gamepad2 size={20} />, label: 'Gaming', badge: null },
    { icon: <MessageCircle size={20} />, label: 'Messages', badge: '5' },
    { icon: <Newspaper size={20} />, label: 'News Feed', badge: null },
    { icon: <Clock size={20} />, label: 'Memories', badge: null }
  ];

  return (
    <div className="left-sidebar">
      <div className="sidebar-user-card">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
          alt="You"
          className="sidebar-user-avatar"
        />
        <div className="sidebar-user-info">
          <span className="sidebar-user-name">Mark Zuckerberg</span>
          <span className="sidebar-user-status">Online</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <a key={index} href="#" className="sidebar-nav-item">
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
            {item.badge && <span className="menu-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">© 2026 Navonmesa</p>
      </div>
    </div>
  );
}

function RightSidebar() {
  const trending = [
    { tag: '#TechNews', posts: '45.2K posts', trend: 'up' },
    { tag: '#Photography', posts: '32.1K posts', trend: 'up' },
    { tag: '#WebDevelopment', posts: '28.5K posts', trend: 'stable' },
    { tag: '#Travel2026', posts: '21.3K posts', trend: 'up' },
    { tag: '#FitnessGoals', posts: '18.9K posts', trend: 'down' }
  ];

  const friendSuggestions = [
    { name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', mutualFriends: 12 },
    { name: 'Rachel Green', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f', mutualFriends: 8 },
    { name: 'Tom Wilson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', mutualFriends: 15 }
  ];

  return (
    <div className="right-sidebar">
      {/* Trending Topics */}
      <div className="sidebar-widget">
        <h3><Flame size={18} /> Trending Now</h3>
        <div className="trending-list">
          {trending.map((item, index) => (
            <div key={index} className="trending-item">
              <div className="trending-info">
                <span className="trending-tag">{item.tag}</span>
                <span className="trending-count">{item.posts}</span>
              </div>
              <span className={`trend-indicator trend-${item.trend}`}>
                {item.trend === 'up' ? <TrendingUp size={16} /> : item.trend === 'down' ? <TrendingDown size={16} /> : <Minus size={16} />}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Friend Suggestions */}
      <div className="sidebar-widget">
        <h3><UserPlus size={18} /> People You May Know</h3>
        <div className="friend-suggestions">
          {friendSuggestions.map((friend, index) => (
            <div key={index} className="friend-suggestion-item">
              <img src={friend.avatar} alt={friend.name} />
              <div className="friend-suggestion-info">
                <span className="friend-suggestion-name">{friend.name}</span>
                <span className="mutual-friends">{friend.mutualFriends} mutual friends</span>
                <button className="add-friend-btn"><UserPlus size={14} /> Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoriesCarousel({ stories }) {
  return (
    <div className="stories-carousel">
      <div className="stories-container">
        {stories.map(story => (
          <div key={story.id} className="story-item">
            <div className={`story-ring ${story.hasNew ? 'has-new' : ''} ${story.isYours ? 'is-yours' : ''}`}>
              <img src={story.avatar} alt={story.name} />
              {story.isYours && (
                <div className="story-add-icon"><Plus size={14} /></div>
              )}
            </div>
            <span className="story-name">{story.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Post({ post }) {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const reactions = [
    { name: 'like', emoji: '👍', color: '#1877F2' },
    { name: 'love', emoji: '❤️', color: '#F33E58' },
    { name: 'haha', emoji: '😂', color: '#F7B928' },
    { name: 'wow', emoji: '😮', color: '#F7B928' },
    { name: 'sad', emoji: '😢', color: '#F7B928' },
    { name: 'angry', emoji: '😡', color: '#E9710F' }
  ];

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
  };

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <img src={post.avatar} alt={post.author} className="post-avatar" />
        <div className="post-author-info">
          <h3 className="post-author">{post.author}</h3>
          <span className="post-time">{post.time}</span>
        </div>
        <button className="post-menu-btn"><MoreHorizontal size={20} /></button>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt="Post" />
        </div>
      )}

      {/* Post Stats */}
      <div className="post-stats">
        <div className="post-reactions-summary">
          {Object.entries(post.reactions).slice(0, 3).map(([type, count]) => (
            count > 0 && (
              <span key={type} className={`reaction-icon reaction-${type}`}>
                {reactions.find(r => r.name === type)?.emoji}
              </span>
            )
          ))}
          <span className="reactions-count">{totalReactions}</span>
        </div>
        <div className="post-stats-right">
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <div 
          className="post-action-wrapper"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <button 
            className={`post-action-btn ${selectedReaction ? 'reacted' : ''}`}
            style={selectedReaction ? { color: reactions.find(r => r.name === selectedReaction)?.color } : {}}
          >
            {selectedReaction 
              ? reactions.find(r => r.name === selectedReaction)?.emoji 
              : <ThumbsUp size={18} />} 
            {selectedReaction || 'Like'}
          </button>
          
          {/* Reactions Popup */}
          {showReactions && (
            <div className="reactions-popup">
              {reactions.map(reaction => (
                <button
                  key={reaction.name}
                  className="reaction-btn"
                  onClick={() => handleReaction(reaction.name)}
                  title={reaction.name}
                >
                  {reaction.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="post-action-btn" onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={18} /> Comment
        </button>
        <button className="post-action-btn">
          <Share2 size={18} /> Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <div className="comment-input-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
              alt="You" 
              className="comment-avatar"
            />
            <input 
              type="text" 
              placeholder="Write a comment..." 
              className="comment-input"
            />
          </div>
        </div>
      )}
    </div>
  );
}
