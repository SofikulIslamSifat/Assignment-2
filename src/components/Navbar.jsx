import React, { useState } from 'react';
import { Film, Clapperboard, Compass, Heart, Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, favoritesCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavigate('home')}
          className="brand-logo"
          aria-label="MovieExplorer Home"
        >
          <div className="brand-icon-wrapper">
            <Film size={22} strokeWidth={2.5} />
          </div>
          <span className="brand-text">
            Movie<span>Explorer</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <button
              onClick={() => handleNavigate('home')}
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('movies')}
              className={`nav-link ${activePage === 'movies' ? 'active' : ''}`}
            >
              Explore Movies
            </button>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Prominent CTA button to navigate to the Movie Listing Page */}
          <button
            onClick={() => handleNavigate('movies')}
            className="btn btn-accent btn-sm"
            id="nav-explore-btn"
          >
            <Compass size={16} />
            <span>Browse Shows</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer open">
          <button
            onClick={() => handleNavigate('home')}
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            style={{ textAlign: 'left', padding: '10px 0' }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate('movies')}
            className={`nav-link ${activePage === 'movies' ? 'active' : ''}`}
            style={{ textAlign: 'left', padding: '10px 0' }}
          >
            Explore Movies
          </button>
          <button
            onClick={() => handleNavigate('movies')}
            className="btn btn-accent btn-sm"
            style={{ marginTop: '8px' }}
          >
            <Compass size={16} />
            Browse Shows
          </button>
        </div>
      )}
    </nav>
  );
}
