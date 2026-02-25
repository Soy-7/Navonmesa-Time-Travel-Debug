import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import YTBot from './components/YTBot';
import SettingsPanel from './components/SettingsPanel';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Channel from './pages/Channel';
import Stats from './pages/Stats';
import Upload from './pages/Upload';
import Library from './pages/Library';
import Community from './pages/Community';
import Playlists from './pages/Playlists';
import Shorts from './pages/Shorts';

// Inner component so useLocation works inside BrowserRouter
function AppInner() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div
      className={[
        'app-layout',
        sidebarCollapsed ? 'sidebar-collapsed' : '',
      ].filter(Boolean).join(' ')}
    >
      {/* Full-page ambient overlay (driven by Player in Watch page) */}
      <div className="ambient-bg-overlay" id="ambient-overlay" aria-hidden="true" />

      <Header
        onToggleSidebar={() => setSidebarCollapsed(c => !c)}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={v => setSidebarCollapsed(v)}
      />

      <main
        key={location.key}
        className="page-enter"
        style={{ minWidth: 0, overflow: 'auto' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/channel/:id" element={<Channel />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/library" element={<Library />} />
          <Route path="/community" element={<Community />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/shorts" element={<Shorts />} />
        </Routes>
      </main>

      <YTBot />

      {settingsOpen && (
        <SettingsPanel onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
