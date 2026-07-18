const COOKIE_NAME = process.env.COOKIE_NAME || 'tr_admin_session';

// Locally, client (localhost:3000) and server (localhost:4000) are on
// different ports but the same "site", so SameSite=Lax is enough and
// keeps things simple over plain http.
//
// In production, client and server live on genuinely different domains
// (e.g. *.vercel.app and *.onrender.com) — that's cross-site, and
// SameSite=Lax cookies are NOT sent on cross-site fetch requests at all.
// That would make every post-login request look logged-out. Cross-site
// cookies need SameSite=None, which browsers only allow when Secure is
// also set (i.e. HTTPS) — true for both Vercel and Render by default.
//
// CSRF protection doesn't disappear here: the verifyOrigin middleware
// (src/middleware/csrf.js) independently checks the Origin/Referer header
// on every state-changing admin route, so it's not relying on SameSite
// to do that job in production.
const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  path: '/',
  maxAge: 12 * 60 * 60 * 1000, // 12 hours
};

module.exports = { COOKIE_NAME, cookieOptions };
