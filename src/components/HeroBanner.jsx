import React from 'react';
import { Sparkles, ArrowRight, Play, Film, Star } from 'lucide-react';

export default function HeroBanner({ onExplore, onSelectGenre }) {
  const quickGenres = ['Action', 'Drama', 'Sci-Fi', 'Comedy', 'Thriller'];

  return (
    <section className="hero-banner" aria-label="Hero Spotlight">
      <div className="hero-bg" />
      <div className="hero-overlay-glow" />

      <div className="container hero-content">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Over 240+ Popular Shows & Films</span>
        </div>

        <h1 className="hero-title">
          DISCOVER MOVIES &amp; TV SHOWS
        </h1>

        <p className="hero-description">
          Explore and discover your favorite movies and series from around the world.
          Track ratings, browse genres, view release dates, and uncover comprehensive storylines.
        </p>

        <div className="hero-actions">
          {/* Main CTA button navigating to Movie Listing Page */}
          <button
            onClick={onExplore}
            className="btn btn-accent"
            id="hero-explore-cta"
            aria-label="Explore movies now"
          >
            <Play size={18} fill="currentColor" />
            <span>Explore Now</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => {
              onSelectGenre?.('Drama');
              onExplore?.();
            }}
            className="btn btn-outline"
          >
            <Film size={18} />
            <span>Browse Popular</span>
          </button>
        </div>

        {/* Quick Genre Pills */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '12px' }}>
            Trending Categories:
          </span>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
            {quickGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  onSelectGenre?.(genre);
                  onExplore?.();
                }}
                className="genre-tag"
                style={{ cursor: 'pointer', fontSize: '0.78rem', padding: '4px 12px' }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="hero-stats">
          <div className="hero-stat-item">
            <h3>10k+</h3>
            <p>Indexed Shows</p>
          </div>
          <div className="hero-stat-item">
            <h3>8.5+</h3>
            <p>Top Rated Gems</p>
          </div>
          <div className="hero-stat-item">
            <h3>Free</h3>
            <p>Unlimited API Access</p>
          </div>
        </div>
      </div>
    </section>
  );
}
