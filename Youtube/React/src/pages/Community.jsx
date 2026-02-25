import { useState } from 'react';
import { COMMUNITY_POSTS } from '../data/community';
import { useUserPrefs } from '../context/UserPrefsContext';
import { useToast } from '../utils/ToastProvider';
import Footer from '../components/Footer';

export default function Community() {
  const { communityReactions, reactCommunity } = useUserPrefs();
  const addToast = useToast();
  const [localLikes, setLocalLikes] = useState({});

  const handleReact = (postId, type) => {
    const prev = communityReactions[postId];
    if (prev === type) {
      reactCommunity(postId, null);
    } else {
      reactCommunity(postId, type);
      if (type === 'like') addToast('❤️ Liked!');
    }
  };

  const getLikes = (post) => {
    const reaction = communityReactions[post.id];
    const delta = reaction === 'like' ? 1 : reaction === 'dislike' ? 0 : 0;
    return post.likes + delta;
  };

  return (
    <div className="app-main">
      <div className="page-container">
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          👥 Community
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Latest posts from channels you follow
        </p>

        <div style={{ maxWidth: 680 }}>
          {COMMUNITY_POSTS.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">&#128172;</div>
              <div className="empty-state-title">No posts yet</div>
              <div className="empty-state-sub">Posts from channels you follow will appear here</div>
            </div>
          ) : COMMUNITY_POSTS.map(post => (
            <article key={post.id} className="community-post" aria-label={`Post by ${post.user}`}>
              <div className="post-header">
                <div className="post-avatar" aria-hidden="true">{post.avatar}</div>
                <div>
                  <div className="post-user">{post.user} <span className="verified">✓</span></div>
                  <div className="post-time">{post.time}</div>
                </div>
              </div>

              <p className="post-text">{post.text}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post media"
                  className="post-image"
                  loading="lazy"
                />
              )}

              <div className="post-actions">
                <button
                  className={`like-btn${communityReactions[post.id] === 'like' ? ' liked' : ''}`}
                  onClick={() => handleReact(post.id, 'like')}
                  aria-pressed={communityReactions[post.id] === 'like'}
                  aria-label={`Like post by ${post.user}`}
                >
                  <span>❤️</span>
                  <span>{getLikes(post).toLocaleString()}</span>
                </button>
                <button
                  className={`like-btn${communityReactions[post.id] === 'dislike' ? ' liked' : ''}`}
                  onClick={() => handleReact(post.id, 'dislike')}
                  aria-pressed={communityReactions[post.id] === 'dislike'}
                  aria-label={`Dislike post by ${post.user}`}
                >
                  <span>👎</span>
                  <span>{post.dislikes}</span>
                </button>
                <button
                  className="like-btn"
                  onClick={() => { navigator.clipboard?.writeText(window.location.href + '#post-' + post.id); addToast('🔗 Post link copied!'); }}
                  aria-label="Share post"
                >
                  <span>🔗</span>
                  <span>Share</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
