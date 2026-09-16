import React from 'react';
import { Star, Calendar, Film, Info, Heart } from 'lucide-react';

export default function MovieCard({ movie, onSelect, isFavorite, onToggleFavorite }) {
  const { title, year, rating, genres, image } = movie;

  return (
    <article className="movie-card" data-testid={`movie-card-${movie.id}`}>
      {/* Poster Image with Badges */}
      <div className="movie-card-poster-wrapper">
        {image ? (
          <img
            src={image}
            alt={`${title} Poster`}
            loading="lazy"
            className="movie-card-poster"
            onError={(e) => {
              // Graceful fallback if image URL fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.querySelector('.movie-card-poster-placeholder').style.display = 'flex';
            }}
          />
        ) : null}

        <div
          className="movie-card-poster-placeholder"
          style={{ display: image ? 'none' : 'flex' }}
        >
          <Film size={44} strokeWidth={1.5} />
          <span style={{ fontSize: '0.85rem' }}>No Poster Available</span>
        </div>

        {/* Rating Badge */}
        <div className="movie-badge-rating" title={`Rating: ${rating ? rating + ' / 10' : 'Unrated'}`}>
          <Star size={14} fill={rating ? 'currentColor' : 'none'} />
          <span>{rating ? rating : 'N/A'}</span>
        </div>

        {/* Release Year Badge */}
        <div className="movie-badge-year" title={`Release Year: ${year}`}>
          <Calendar size={13} />
          <span>{year}</span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="movie-card-content">
        <div className="movie-card-info">
          {/* Genre Badges */}
          {genres && genres.length > 0 && (
            <div className="movie-card-genres">
              {genres.slice(0, 2).map((genre) => (
                <span key={genre} className="genre-pill">
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="movie-card-title" title={title}>
            {title}
          </h3>

          <div className="movie-card-meta">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Star size={13} fill="currentColor" color="#f59e0b" />
              <strong style={{ color: '#ffffff' }}>{rating || 'N/A'}</strong>
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} />
              {year}
            </span>
          </div>
        </div>

        {/* Interactive CTA: See Details button */}
        <button
          onClick={() => onSelect(movie)}
          className="movie-card-btn"
          aria-label={`See details for ${title}`}
        >
          <Info size={16} />
          <span>See Details</span>
        </button>
      </div>
    </article>
  );
}
