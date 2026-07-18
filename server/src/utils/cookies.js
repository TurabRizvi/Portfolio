const COOKIE_NAME = process.env.COOKIE_NAME || 'tr_admin_session';

// SameSite=Lax already blocks this cookie from being sent on cross-site
// POST/PATCH/DELETE requests (the main CSRF vector), which is why the
// session survives normal navigation but not a forged form on another
// site. Secure is forced on in production (requires HTTPS); left off in
// dev so it still works over plain http://localhost.
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 12 * 60 * 60 * 1000, // 12 hours
};

module.exports = { COOKIE_NAME, cookieOptions };
