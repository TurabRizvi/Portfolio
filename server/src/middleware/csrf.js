// SameSite=Lax on the session cookie already stops it being sent on
// cross-site POST/PATCH/DELETE requests, which covers the classic CSRF
// case. This middleware is a second, independent layer: it explicitly
// rejects state-changing admin requests whose Origin (or, failing that,
// Referer) doesn't match the configured frontend origin.
//
// Non-browser tools (curl, Postman, server-to-server calls) don't send
// an Origin header by default — this only enforces the check when one
// (or a Referer) is actually present, so it targets browser-driven CSRF
// specifically rather than blocking legitimate API testing.
function verifyOrigin(req, res, next) {
  const allowed = process.env.CLIENT_ORIGIN;
  const origin = req.get('origin');
  const referer = req.get('referer');

  if (!allowed) return next(); // misconfiguration shouldn't hard-lock the app in dev

  if (origin) {
    if (origin === allowed) return next();
    return res.status(403).json({ error: 'Cross-origin request blocked' });
  }

  if (referer) {
    if (referer.startsWith(allowed)) return next();
    return res.status(403).json({ error: 'Cross-origin request blocked' });
  }

  next();
}

module.exports = { verifyOrigin };
