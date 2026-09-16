# 🎬 MovieExplorer — React Web Application

A responsive, high-performance **Movie & TV Show Explorer** web application built with React and powered by the [TVMaze API](https://www.tvmaze.com/api). Discover trending productions, search any title dynamically, filter by genres, and inspect rich show details in an interactive modal.

---

## 🌟 Live Demo & Repository
- **Live Deployment:** [Deploy on Vercel or Netlify](#-deployment-guide)
- **Repository:** Public GitHub Repository with complete source code & documentation

---

## 📋 Features & Requirements Alignment

### 1. Home Page (Landing Page)
- **Navbar:**
  - Application brand logo with custom film icon (`MovieExplorer`).
  - Navigation links to seamlessly navigate between **Home** and **Explore Movies**.
  - Prominent Call-to-Action button (`Browse Shows`) navigating directly to the Movie Listing page.
  - Mobile responsive drawer menu for handheld devices.
- **Hero Banner:**
  - High-impact cinematic background with dark gradients and glowing effects.
  - Clear heading: **"DISCOVER MOVIES & TV SHOWS"**.
  - Engaging description highlighting exploration, ratings, and storylines.
  - **"Explore Now"** CTA button that smoothly routes to the Movie Listing page.
  - Quick Category / Genre pills to jump directly into filtered browsing.
  - Live highlight statistics (indexed shows, rating averages).
- **Featured Highlights Section:**
  - Showcases critically acclaimed, top-rated shows directly on the landing page.
- **Footer:**
  - Brand name and description.
  - Copyright information: `© 2026 MovieExplorer. All rights reserved. Assignment Project.`
  - Direct links to TVMaze API documentation and GitHub repository.

### 2. Dedicated Movie Listing Page
- **Prominent Search Bar:**
  - Positioned at the top of the listing page (`🔍 Search for a movie or TV show...`).
  - Dynamic, real-time search updating the movie grid with debounced API queries (`GET /search/shows?q=:query`).
  - Clear button (`✕`) for quick resetting of search terms.
- **Category & Sort Controls:**
  - Genre filter chips: *All, Drama, Action, Comedy, Sci-Fi, Thriller, Crime, Romance, Horror, Adventure, Mystery, Fantasy*.
  - Sort selector: *Recommended, Rating (High to Low / Low to High), Year (Newest / Oldest), Title (A to Z)*.
  - Live result counter indicating shows found.
- **Responsive Movie Cards:**
  - Poster image with graceful fallback placeholder when missing or broken.
  - Show title with clean line truncation.
  - Release year / premiered date badge (`📅 2024`).
  - Star rating badge (`⭐ 8.5`).
  - Genre pill tags.
  - Interactive **"See Details"** button opening the modal dialog.
- **CSS Grid Layout:**
  - Responsive CSS grid (`repeat(auto-fill, minmax(240px, 1fr))`).
  - Loading skeleton shimmers during API requests.
  - Interactive empty state with a "Reset Filters & Search" button when no results are found.

### 3. Movie Details Modal
- **In-Depth Information Overlay:**
  - High-resolution backdrop header image with gradient overlay.
  - Poster thumbnail.
  - Show Title and live Status badge (e.g., *Running*, *Ended*).
  - Rating (`⭐ Rating: 8.5 / 10`) and exact release date (`📅 Release: 2024-05-10`).
  - Runtime, Broadcasting Network / Web Channel, and Language/Type.
  - Genre tags.
  - Full, clean overview / summary text (HTML tags sanitized).
  - External link to the Official Site / TVMaze directory.
- **Accessibility & Dismissal:**
  - Top close button `[ ✕ ]`.
  - Bottom action close button `[ Close ]`.
  - Click-outside on the backdrop to dismiss.
  - Keyboard `Escape` key shortcut support.
  - Background body scroll lock while modal is active.

### 4. Responsive Design & Modern UX
- **Mobile First:** Single column grid, stacked metadata, large touch targets.
- **Tablet & Desktop:** 2 to 4+ column grid with smooth spacing and cards.
- **Dark Cinema Theme:** Custom CSS design system with glassmorphism (`backdrop-filter: blur(16px)`), CSS variables, subtle hover lifts, and glowing accents.

---

## 🛠️ Technology Stack
- **Core:** React 18, JavaScript (ES6+), HTML5
- **Tooling:** Vite (ultra-fast build and development)
- **Styling:** Custom Vanilla CSS Design System (CSS variables, Grid, Flexbox, Keyframe animations)
- **Icons:** `lucide-react` (Film, Star, Calendar, Search, Clock, Tv, Globe, X, etc.)
- **Data Source:** [TVMaze Free REST API](https://www.tvmaze.com/api) (No API key required)

---

## 🌐 API Endpoints Used

| Feature | Endpoint | Description |
| :--- | :--- | :--- |
| **All Shows** | `GET https://api.tvmaze.com/shows?page=0` | Fetches initial catalog of popular productions |
| **Search Shows** | `GET https://api.tvmaze.com/search/shows?q=:query` | Searches titles dynamically matching the user query |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd "Assignment 2"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Create a production build:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

---

## ☁️ Deployment Guide

### Deploying to Vercel
1. Push your project to a public GitHub repository.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**. Your live URL will be active in seconds!

### Deploying to Netlify
1. Log into [Netlify](https://netlify.com) and select **"Add new site"** > **"Import an existing project"**.
2. Connect your GitHub repository.
3. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
4. Click **"Deploy Site"**.

---

## 📂 Project Structure

```
Assignment 2/
├── index.html                 # Main HTML entry with Outfit & Plus Jakarta fonts
├── package.json               # Dependencies & scripts (react, vite, lucide-react)
├── vite.config.js             # Vite configuration
├── README.md                  # Complete documentation & submission guide
└── src/
    ├── main.jsx               # React DOM root render
    ├── App.jsx                # Core state, navigation routing, search, modal
    ├── index.css              # Cinema dark theme, glassmorphism, responsive grid
    ├── services/
    │   └── api.js             # TVMaze API client, search, caching, normalizer
    └── components/
        ├── Navbar.jsx         # Logo, navigation links, explore CTA, mobile menu
        ├── HeroBanner.jsx     # Cinematic hero section with CTA & genre shortcuts
        ├── FeaturedSection.jsx# Top-rated highlights on Home page
        ├── SearchBar.jsx      # Search input with debounce, genre filters, sorting
        ├── MovieCard.jsx      # Reusable card (poster, title, year, rating, details CTA)
        ├── MovieGrid.jsx      # Responsive grid with skeletons & empty state
        ├── MovieModal.jsx     # In-depth modal with backdrop, summary & metadata
        └── Footer.jsx         # Brand, copyright, TVMaze attribution, social links
```

---

## 📄 License & Attribution
- Built for the **Movie Explorer** assignment.
- Movie data provided free of charge by [TVMaze](https://www.tvmaze.com/api).
