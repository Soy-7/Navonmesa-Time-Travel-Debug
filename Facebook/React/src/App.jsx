import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, Home as HomeIcon, Search as SearchIcon, Film, Globe, MessagesSquare } from 'lucide-react';
import FacebookProfile from "../components/FacebookProfile";
import Home from "../components/Home";
import Search from "../components/Search";
import Veevs from "../components/Veevs";
import SocialSpace from "../components/SocialSpace";
import Discussion from "../components/Discussion";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Derive current page from URL path
  const currentPage = (() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/search') return 'search';
    if (path === '/veevs') return 'veevs';
    if (path === '/social') return 'social';
    if (path === '/discussion') return 'discussion';
    if (path === '/profile') return 'profile';
    return 'home';
  })();

  const handleNavigate = (page) => {
    const routes = {
      home: '/',
      search: '/search',
      veevs: '/veevs',
      social: '/social',
      discussion: '/discussion',
      profile: '/profile',
    };
    navigate(routes[page] || '/');
    window.scrollTo(0, 0);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="logo" onClick={() => handleNavigate('home')}>facebook</div>
          </div>
          <div className="header-right">
            <button className="icon-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <button className="icon-btn" aria-label="Messages">
              <MessageCircle size={20} />
            </button>
            <button className="icon-btn user-avatar" aria-label="User menu">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="User" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className={`page-wrapper ${currentPage === 'veevs' ? 'reels-mode' : ''}`}>
        <Routes>
          <Route path="/" element={<Home sidebarOpen={sidebarOpen} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/search" element={<Search />} />
          <Route path="/veevs" element={<Veevs />} />
          <Route path="/social" element={<SocialSpace />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/profile" element={<FacebookProfile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button 
          className={`bottom-nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigate('home')}
        >
          <span className="nav-icon"><HomeIcon size={22} /></span>
          <span className="nav-label">Home</span>
        </button>
        
        <button 
          className={`bottom-nav-btn ${currentPage === 'search' ? 'active' : ''}`}
          onClick={() => handleNavigate('search')}
        >
          <span className="nav-icon"><SearchIcon size={22} /></span>
          <span className="nav-label">Search</span>
        </button>
        
        <button 
          className={`bottom-nav-btn ${currentPage === 'veevs' ? 'active' : ''}`}
          onClick={() => handleNavigate('veevs')}
        >
          <span className="nav-icon"><Film size={22} /></span>
          <span className="nav-label">Veevs</span>
        </button>
        
        <button 
          className={`bottom-nav-btn ${currentPage === 'social' ? 'active' : ''}`}
          onClick={() => handleNavigate('social')}
        >
          <span className="nav-icon"><Globe size={22} /></span>
          <span className="nav-label">Social</span>
        </button>
        
        <button 
          className={`bottom-nav-btn ${currentPage === 'discussion' ? 'active' : ''}`}
          onClick={() => handleNavigate('discussion')}
        >
          <span className="nav-icon"><MessagesSquare size={22} /></span>
          <span className="nav-label">Chat</span>
        </button>
      </div>
    </>
  );
}

export default App;
