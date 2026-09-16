import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturedSection from './components/FeaturedSection';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';
import { fetchShows, searchShows } from './services/api';

const GENRES_LIST = [
  'All',
  'Drama',
  'Action',
  'Comedy',
  'Sci-Fi',
  'Thriller',
  'Crime',
  'Romance',
  'Horror',
  'Adventure',
  'Mystery',
  'Fantasy'
];

export default function App() {
  // Navigation state (home | movies)
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash === 'movies' ? 'movies' : 'home';
  });

  // Data & Search states
  const [allShows, setAllShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Modal State
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Hash route listener
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'movies' || hash === 'home') {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    if (isLoading && allShows.length === 0) {
  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton-card skeleton" style={{ width: '200px', height: '300px' }} />
    </div>
  );
}

return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = useCallback((page) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Initial fetch of popular shows
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchShows(0)
      .then((data) => {
        if (isMounted) {
          setAllShows(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load shows:', err);
          setError('Failed to fetch movie data from TVMaze. Please try again later.');
          setIsLoading(false);
        }
      });

    if (isLoading && allShows.length === 0) {
  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton-card skeleton" style={{ width: '200px', height: '300px' }} />
    </div>
  );
}

return () => {
      isMounted = false;
    };
  }, []);

  // Debounced search effect
  useEffect(() => {
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      searchShows(trimmed)
        .then((results) => {
          setSearchResults(results);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error('Search failed:', err);
          setIsSearching(false);
        });
    }, 350);

    if (isLoading && allShows.length === 0) {
  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton-card skeleton" style={{ width: '200px', height: '300px' }} />
    </div>
  );
}

return () => clearTimeout(timer);
  }, [searchTerm]);

  // Determine current active raw show list
  const currentShowList = useMemo(() => {
    if (searchTerm.trim().length > 0) {
      return searchResults;
    }
    return allShows;
  }, [searchTerm, searchResults, allShows]);

  // Filter by genre & sort
  const filteredShows = useMemo(() => {
    let list = [...currentShowList];

    // Filter by genre
    if (selectedGenre !== 'All') {
      list = list.filter(
        (show) =>
          Array.isArray(show.genres) &&
          show.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Sort shows
    switch (sortBy) {
      case 'rating-desc':
        list.sort((a, b) => (b.ratingNumber || 0) - (a.ratingNumber || 0));
        break;
      case 'rating-asc':
        list.sort((a, b) => (a.ratingNumber || 0) - (b.ratingNumber || 0));
        break;
      case 'year-desc':
        list.sort((a, b) => {
          const yA = parseInt(a.year, 10) || 0;
          const yB = parseInt(b.year, 10) || 0;
          return yB - yA;
        });
        break;
      case 'year-asc':
        list.sort((a, b) => {
          const yA = parseInt(a.year, 10) || 0;
          const yB = parseInt(b.year, 10) || 0;
          return yA - yB;
        });
        break;
      case 'title-asc':
        list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        // Keep default TVMaze curated order
        break;
    }

    return list;
  }, [currentShowList, selectedGenre, sortBy]);

  const handleResetSearch = useCallback(() => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSortBy('default');
  }, []);

  if (isLoading && allShows.length === 0) {
  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton-card skeleton" style={{ width: '200px', height: '300px' }} />
    </div>
  );
}

return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
      />

      {/* Main Content Area */}
      <main>
        {activePage === 'home' ? (
          <>
            {/* Hero Banner with CTA navigating to Movie Listing Page */}
            <HeroBanner
              onExplore={() => handleNavigate('movies')}
              onSelectGenre={(genre) => {
                setSelectedGenre(genre);
                handleNavigate('movies');
              }}
            />

            {/* Featured Top-Rated Section on Landing Page */}
            <FeaturedSection
              movies={allShows}
              onSelectMovie={setSelectedMovie}
              onExploreAll={() => handleNavigate('movies')}
            />
          </>
        ) : (
          /* Dedicated Movie Listing Page */
          <div className="container" style={{ minHeight: '80vh' }}>
            <div style={{ paddingTop: '32px', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                Explore All Shows &amp; Movies
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
                Search by title, filter by category, or discover new favorites from our collection.
              </p>
            </div>

            {/* Search, Filter, and Sort Controls */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              sortBy={sortBy}
              onSortChange={setSortBy}
              availableGenres={GENRES_LIST}
              totalCount={filteredShows.length}
              isSearching={isSearching}
            />

            {/* Dynamic Movie Grid */}
            <MovieGrid
              movies={filteredShows}
              isLoading={isLoading || isSearching}
              onSelectMovie={setSelectedMovie}
              onResetSearch={handleResetSearch}
              searchTerm={searchTerm}
            />
          </div>
        )}
      </main>

      {/* Interactive Movie Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
