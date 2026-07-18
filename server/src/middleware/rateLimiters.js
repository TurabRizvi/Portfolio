const rateLimit = require('express-rate-limit');

// Public contact form: generous enough for a real visitor, tight enough
// to blunt scripted spam.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent from this network. Please try again later.' },
});

// Admin login: brute-force protection. Deliberately strict — this endpoint
// exists to guard one password.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});

module.exports = { contactLimiter, loginLimiter };
