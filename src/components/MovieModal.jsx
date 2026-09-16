import React, { useEffect } from 'react';
import { X, Star, Calendar, Clock, Tv, Globe, ExternalLink, Bookmark } from 'lucide-react';
import { stripHtmlTags } from '../services/api';

export default function MovieModal({ movie, onClose }) {
  // Lock body scroll and listen for Escape key while modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!movie) return null;

  const {
    title,
    year,
    premiered,
    rating,
    genres,
    image,
    posterOriginal,
    summary,
    language,
    status,
    runtime,
    network,
    officialSite,
    type
  } = movie;

  const cleanSummary = stripHtmlTags(summary);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dialog
      >
        {/* Top Close Button (✕) */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
          id="modal-close-top-btn"
        >
          <X size={20} />
        </button>

        {/* Hero Backdrop Header */}
        <div className="modal-backdrop-header">
          {image ? (
            <img
              src={posterOriginal || image}
              alt={`${title} Backdrop`}
              className="modal-backdrop-img"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)'
              }}
            />
          )}
          <div className="modal-backdrop-gradient" />
        </div>

        {/* Modal Main Body */}
        <div className="modal-body">
          <div className="modal-main-info">
            {/* Small poster thumbnail overlapping backdrop */}
            {image && (
              <img
                src={image}
                alt={`${title} poster`}
                className="modal-poster-thumb"
              />
            )}

            <div className="modal-title-area">
              {status && (
                <div className="modal-status-badge">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: status.toLowerCase().includes('ended') ? '#ef4444' : '#10b981'
                    }}
                  />
                  <span>{status}</span>
                </div>
              )}

              <h2 id="modal-title" className="modal-title">
                {title}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                ⭐ Rating: <strong style={{ color: '#fbbf24' }}>{rating ? `${rating} / 10` : 'Unrated'}</strong> &nbsp;|&nbsp; 
                📅 Release: <strong style={{ color: '#ffffff' }}>{premiered !== 'N/A' ? premiered : year}</strong>
              </p>
            </div>
          </div>

          {/* Meta Grid (Rating, Release, Runtime, Network, Language) */}
          <div className="modal-meta-grid">
            <div className="modal-meta-item">
              <span className="modal-meta-label">Rating</span>
              <div className="modal-meta-value">
                <Star size={16} fill="currentColor" color="#f59e0b" />
                <span>{rating ? `${rating} / 10` : 'Not Rated'}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <span className="modal-meta-label">Premiered</span>
              <div className="modal-meta-value">
                <Calendar size={16} color="#6366f1" />
                <span>{premiered}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <span className="modal-meta-label">Runtime</span>
              <div className="modal-meta-value">
                <Clock size={16} color="#10b981" />
                <span>{runtime}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <span className="modal-meta-label">Network</span>
              <div className="modal-meta-value">
                <Tv size={16} color="#f59e0b" />
                <span title={network}>{network}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <span className="modal-meta-label">Language / Type</span>
              <div className="modal-meta-value">
                <Globe size={16} color="#38bdf8" />
                <span>{language} ({type})</span>
              </div>
            </div>
          </div>

          {/* Genre Badges */}
          {genres && genres.length > 0 && (
            <div className="modal-genres">
              {genres.map((genre) => (
                <span key={genre} className="modal-genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Overview / Summary Section */}
          <div className="modal-overview-section">
            <h3 className="modal-overview-title">Overview</h3>
            <p className="modal-overview-text">
              {cleanSummary || 'No detailed overview has been provided for this title.'}
            </p>
          </div>

          {/* Modal Footer with Actions and Close button */}
          <div className="modal-footer">
            {officialSite && (
              <a
                href={officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <span>Visit Official Site</span>
                <ExternalLink size={14} />
              </a>
            )}

            <button
              onClick={onClose}
              className="btn btn-primary btn-sm"
              id="modal-close-bottom-btn"
            >
              <X size={16} />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
