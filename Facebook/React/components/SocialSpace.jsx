import { useState } from 'react';
import { Globe, Plus, CalendarDays, UsersRound, FileText, Clock, MapPin, Star, PenLine, Check, CheckCircle, Share2 } from 'lucide-react';

export default function SocialSpace() {
  const [activeTab, setActiveTab] = useState('events');

  const events = [
    {
      id: 1,
      title: 'Tech Conference 2026',
      date: 'Mar 15, 2026',
      time: '9:00 AM',
      location: 'San Francisco, CA',
      attendees: 1234,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      interested: true
    },
    {
      id: 2,
      title: 'Photography Workshop',
      date: 'Mar 20, 2026',
      time: '2:00 PM',
      location: 'New York, NY',
      attendees: 456,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
      interested: false
    },
    {
      id: 3,
      title: 'Music Festival 2026',
      date: 'Apr 5, 2026',
      time: '5:00 PM',
      location: 'Los Angeles, CA',
      attendees: 5678,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
      interested: false
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'Web Developers Community',
      members: '125K members',
      postsToday: 45,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      joined: true
    },
    {
      id: 2,
      name: 'Photography Enthusiasts',
      members: '89K members',
      postsToday: 32,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
      joined: true
    },
    {
      id: 3,
      name: 'Fitness & Health',
      members: '234K members',
      postsToday: 67,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
      joined: false
    },
    {
      id: 4,
      name: 'Travel Lovers',
      members: '156K members',
      postsToday: 28,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
      joined: false
    }
  ];

  const pages = [
    {
      id: 1,
      name: 'Tech News Daily',
      followers: '1.2M followers',
      category: 'Media & News',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
      verified: true,
      following: true
    },
    {
      id: 2,
      name: 'National Geographic',
      followers: '45M followers',
      category: 'Magazine',
      image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      verified: true,
      following: false
    },
    {
      id: 3,
      name: 'Fitness Motivation',
      followers: '890K followers',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      verified: false,
      following: false
    }
  ];

  return (
    <div className="social-space-page">
      <div className="social-space-header">
        <h2><Globe size={22} /> Social Space</h2>
        <button className="create-event-btn"><Plus size={16} /> Create</button>
      </div>

      {/* Tabs */}
      <div className="social-tabs">
        <button 
          className={`social-tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <CalendarDays size={16} /> Events
        </button>
        <button 
          className={`social-tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          <UsersRound size={16} /> Groups
        </button>
        <button 
          className={`social-tab ${activeTab === 'pages' ? 'active' : ''}`}
          onClick={() => setActiveTab('pages')}
        >
          <FileText size={16} /> Pages
        </button>
      </div>

      {/* Content */}
      <div className="social-content">
        {activeTab === 'events' && (
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <div className="event-date"><CalendarDays size={14} /> {event.date}</div>
                    <div className="event-time"><Clock size={14} /> {event.time}</div>
                    <div className="event-location"><MapPin size={14} /> {event.location}</div>
                    <div className="event-attendees"><UsersRound size={14} /> {event.attendees} going</div>
                  </div>
                  <div className="event-actions">
                    <button className={`event-btn ${event.interested ? 'interested' : ''}`}>
                      {event.interested ? <><Star size={14} /> Interested</> : 'Interested'}
                    </button>
                    <button className="event-btn-secondary">Share</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="groups-grid">
            {groups.map(group => (
              <div key={group.id} className="group-card">
                <img src={group.image} alt={group.name} className="group-image" />
                <div className="group-info">
                  <h3>{group.name}</h3>
                  <div className="group-meta">
                    <div>{group.members}</div>
                    <div><PenLine size={14} /> {group.postsToday} posts today</div>
                  </div>
                  <button className={`group-btn ${group.joined ? 'joined' : ''}`}>
                    {group.joined ? <><Check size={14} /> Joined</> : <><Plus size={14} /> Join Group</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="pages-grid">
            {pages.map(page => (
              <div key={page.id} className="page-card">
                <img src={page.image} alt={page.name} className="page-image" />
                <div className="page-info">
                  <h3>
                    {page.name}
                    {page.verified && <span className="verified-badge"><CheckCircle size={14} /></span>}
                  </h3>
                  <div className="page-meta">
                    <div>{page.followers}</div>
                    <div>{page.category}</div>
                  </div>
                  <button className={`page-btn ${page.following ? 'following' : ''}`}>
                    {page.following ? <><Check size={14} /> Following</> : <><Plus size={14} /> Follow</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
