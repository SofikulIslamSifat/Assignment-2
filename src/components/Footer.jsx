import React from 'react';
import { Film, Github, Heart, Globe, Tv, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>
              <div className="brand-icon-wrapper">
                <Film size={20} strokeWidth={2.5} />
              </div>
              <span className="brand-text">
                Movie<span>Explorer</span>
              </span>
            </div>
            <p>
              A responsive, modern movie &amp; television discovery portal powered by the free TVMaze API.
              Browse thousands of productions, inspect cast details, ratings, and storylines in real-time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h4>Navigation</h4>
            <ul>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('movies')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  Movie Listing Page
                </button>
              </li>
            </ul>
          </div>

          {/* Data & Tech */}
          <div className="footer-links-group">
            <h4>Data &amp; APIs</h4>
            <ul>
              <li>
                <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer">
                  TVMaze Free REST API
                </a>
              </li>
              <li>
                <a href="https://api.tvmaze.com/shows" target="_blank" rel="noopener noreferrer">
                  Shows Directory Endpoint
                </a>
              </li>
              <li>
                <a href="https://api.tvmaze.com/search/shows?q=girls" target="_blank" rel="noopener noreferrer">
                  Search Endpoint
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {currentYear} <strong>MovieExplorer</strong>. All rights reserved. Assignment Project.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Built with React</span>
            <span>•</span>
            <div className="footer-socials">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.tvmaze.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="TVMaze Official Website"
                aria-label="TVMaze Website"
              >
                <Tv size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
