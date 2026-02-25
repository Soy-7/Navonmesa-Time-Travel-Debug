# Navonmesa — Time Travel Debug

A collection of two retro-inspired social platform clones built with React + Vite, designed to recreate the look and feel of early-era web interfaces. Each subproject includes both a static HTML version and a full React application.

---

## Projects

### 1. Facebook Clone — `/Facebook`

A React-based recreation of the classic Facebook interface.

**Pages & Features**
- **Home** — News feed with posts and social interactions
- **Search** — User and content search
- **Veevs** — Short-form video feed (Facebook Reels-style)
- **Social Space** — Community/group browsing
- **Discussion** — Threaded discussion boards
- **Profile** — User profile page

**Tech Stack**
- React 19 + React Router v7
- Lucide React (icons)
- Vite 7

**Folder Structure**
```
Facebook/
├── HTML/          # Static HTML prototype
└── React/
    ├── components/    # Page-level components (Home, Search, Veevs, etc.)
    └── src/           # App entry, routing, global styles
```

**Getting Started**
```bash
cd Facebook/React
npm install
npm run dev
```

---

### 2. YouTube Clone — `/Youtube`

A feature-rich React recreation of the YouTube interface with modern UX enhancements.

**Pages & Features**
- **Home** — Video grid with skeleton loading cards
- **Watch** — Video player with ambient background overlay
- **Channel** — Creator channel pages
- **Library** — Saved videos and watch history
- **Playlists** — Playlist management
- **Shorts** — Short-form vertical video feed
- **Community** — Community posts and interactions
- **Upload** — Video upload interface
- **Stats** — Channel analytics dashboard
- **YT Bot** — Floating AI assistant chatbot for recommendations and help
- **Settings Panel** — User preferences
- **Filter Chips** — Dynamic content filtering

**Tech Stack**
- React 19 + React Router v7
- Tailwind CSS v4
- Vite 7 + vite-plugin-pwa (PWA support)

**Folder Structure**
```
Youtube/
├── HTML/          # Static HTML prototype
└── React/
    ├── components/    # Reusable UI (Header, Sidebar, Player, VideoCard, etc.)
    ├── pages/         # Route-level pages (Home, Watch, Channel, etc.)
    ├── context/       # UserPrefsContext for global preferences
    ├── data/          # Mock data (videos, community posts)
    └── utils/         # Bot responses, smart search, color sampler, toast provider
```

**Getting Started**
```bash
cd Youtube/React
npm install
npm run dev
```

---

## Repo Structure

```
Navonmesa-Time-Travel-Debug/
├── Facebook/
│   ├── HTML/
│   └── React/
└── Youtube/
    ├── HTML/
    └── React/
```
