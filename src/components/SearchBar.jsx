import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  availableGenres = [],
  totalCount = 0,
  isSearching = false
}) {
  return (
    <div className="search-section">
      {/* Prominent Search Bar */}
      <div className="search-box-wrapper">
        <div className="search-input-container">
          <Search size={22} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search for a movie or TV show (e.g., 'Girls', 'Batman', 'Stranger')..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            id="movie-search-input"
            aria-label="Search movies"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="search-clear-btn"
              title="Clear search"
              aria-label="Clear search query"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="filter-bar">
        {/* Genre Tags */}
        <div className="genre-tags" role="group" aria-label="Genre Filters">
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`genre-tag ${selectedGenre === genre ? 'active' : ''}`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Sort and Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isSearching ? 'Searching...' : `${totalCount} ${totalCount === 1 ? 'Show' : 'Shows'} Found`}
          </span>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
            aria-label="Sort movies"
          >
            <option value="default">Sort: Recommended</option>
            <option value="rating-desc">Rating: Highest First</option>
            <option value="rating-asc">Rating: Lowest First</option>
            <option value="year-desc">Year: Newest First</option>
            <option value="year-asc">Year: Oldest First</option>
            <option value="title-asc">Title: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
