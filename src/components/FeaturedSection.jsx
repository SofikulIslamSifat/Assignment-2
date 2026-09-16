import React from 'react';
import MovieCard from './MovieCard';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

export default function FeaturedSection({ movies, onSelectMovie, onExploreAll }) {
  // Select top 4-8 highest rated or featured shows
  const featured = React.useMemo(() => {
    if (!movies || movies.length === 0) return [];
    return [...movies]
      .filter((m) => m.ratingNumber && m.ratingNumber >= 8.0)
      .slice(0, 8);
  }, [movies]);

  if (featured.length === 0) return null;

  return (
    <section className="section-padding container" aria-label="Featured Titles">
      <div className="section-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>
            <Flame size={16} />
            <span>CRITICALLY ACCLAIMED</span>
          </div>
          <h2 className="section-title">
            Top Rated Highlights
          </h2>
          <p className="section-subtitle">
            Audience favorites and award-winning series with the highest ratings
          </p>
        </div>

        <button onClick={onExploreAll} className="btn btn-outline btn-sm">
          <span>View All Shows</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="movie-grid">
        {featured.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelectMovie}
          />
        ))}
      </div>
    </section>
  );
}
