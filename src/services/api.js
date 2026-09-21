/**
 * TVMaze API Service
 * Base URL: https://api.tvmaze.com
 */

const BASE_URL = 'https://api.tvmaze.com';
const cache = new Map();

/**
 * Normalizes a raw show object from TVMaze API
 * Handles both direct shows and search results ({ score, show })
 */
export function normalizeShow(raw) {
  if (!raw) return null;
  const show = raw.show ? raw.show : raw;

  return {
    id: show.id,
    title: show.name || 'Untitled Title',
    name: show.name || 'Untitled Title',
    year: show.premiered ? show.premiered.substring(0, 4) : 'N/A',
    premiered: show.premiered || 'N/A',
    ended: show.ended || null,
    rating: show.rating && typeof show.rating.average === 'number'
      ? show.rating.average.toFixed(1)
      : null,
    ratingNumber: show.rating?.average || 0,
    genres: Array.isArray(show.genres) && show.genres.length > 0
      ? show.genres
      : ['Drama'],
    image: show.image?.original || show.image?.medium || null,
    posterMedium: show.image?.medium || null,
    posterOriginal: show.image?.original || null,
    summary: show.summary || '<p>No summary is currently available for this show.</p>',
    language: show.language || 'English',
    status: show.status || 'Status Unknown',
    runtime: show.averageRuntime || show.runtime
      ? `${show.averageRuntime || show.runtime} mins`
      : 'N/A',
    network: show.network?.name || show.webChannel?.name || 'Broadcasting Network',
    type: show.type || 'Scripted',
    officialSite: show.officialSite || show.externals?.tvmaze?.url || `https://www.tvmaze.com/shows/${show.id}`,
    url: show.externals?.tvmaze?.url || `https://www.tvmaze.com/shows/${show.id}`,
    schedule: show.schedule ? `${show.schedule.days?.join(', ') || ''} ${show.schedule.time || ''}`.trim() : ''
  };
}

/**
 * Fetch all shows (page 0 gives the top 240 shows)
 */
export async function fetchShows(page = 0) {
  const cacheKey = `shows_page_${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const page_safe = parseInt(page, 10) || 0;
    const response = await fetch(`${BASE_URL}/shows?page=${page_safe}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows (Status: ${response.status})`);
    }
    const data = await response.json();
    const normalized = data.map(normalizeShow);
    cache.set(cacheKey, normalized);
    return normalized;
  } catch (error) {
    console.error('Error in fetchShows:', error);
    throw error;
  }
}

/**
 * Search shows by title
 * GET /search/shows?q=:query
 */
export async function searchShows(query) {
  const trimmed = query?.trim();
  if (!trimmed) {
    return [];
  }

  const cacheKey = `search_${trimmed.toLowerCase()}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(trimmed)}`);
    if (!response.ok) {
      throw new Error(`Failed to search shows (Status: ${response.status})`);
    }
    const data = await response.json();
    const normalized = data.map(normalizeShow);
    cache.set(cacheKey, normalized);
    return normalized;
  } catch (error) {
    console.error('Error in searchShows:', error);
    throw error;
  }
}

/**
 * Helper to strip HTML tags from TVMaze summary text for clean display or snippet
 */
export function stripHtmlTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}
