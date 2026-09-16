import React from 'react';
import MovieCard from './MovieCard';
import { Film, RefreshCw, SearchX } from 'lucide-react';

export default function MovieGrid({
  movies,
  isLoading,
  onSelectMovie,
  onResetSearch,
  searchTerm
}) {
  if (isLoading) {
    return (
      <div className="movie-grid" aria-label="Loading movies">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="skeleton skeleton-card" />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <SearchX className="empty-state-icon" />
        <h3 className="empty-state-title">No Movies or Shows Found</h3>
        <p className="empty-state-desc">
          {searchTerm
            ? `We couldn't find any titles matching "${searchTerm}". Try checking for typos or searching for a different title.`
            : 'No movies match the selected filters.'}
        </p>
        <button onClick={onResetSearch} className="btn btn-primary btn-sm">
          <RefreshCw size={14} />
          <span>Reset Filters &amp; Search</span>
        </button>
      </div>
    );
  }

  return (
    <div className="movie-grid" id="movies-container">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelectMovie}
        />
      ))}
    </div>
  );
}
