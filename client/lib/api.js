// Base URL of the Express backend. Override via .env.local if the API
// runs somewhere other than localhost:4000.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-ijuo.onrender.com';

/**
 * fetch wrapper that always talks to the backend, always sends/receives
 * the admin session cookie, and always sets JSON headers.
 */
export async function apiFetch(path, options = {}) {
  return fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
}
