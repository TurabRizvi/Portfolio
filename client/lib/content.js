import { API_URL } from './api';
import { DEFAULT_CONTENT } from './defaultContent';

/**
 * Fetches the site's editable content from the backend. Used inside
 * server components (pages), so this runs on the server at request time
 * — cache: 'no-store' means every page load gets the latest saved
 * content, so admin edits show up immediately without a rebuild/redeploy.
 *
 * If the backend is unreachable for any reason, the site still renders
 * using DEFAULT_CONTENT instead of crashing or going blank.
 */
export async function getContent() {
  try {
    const res = await fetch(`${API_URL}/api/content`, { cache: 'no-store' });
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    return { ...DEFAULT_CONTENT, ...data.content };
  } catch {
    return DEFAULT_CONTENT;
  }
}
