const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, param } = require('express-validator');
const prisma = require('../lib/prisma');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiters');
const { verifyOrigin } = require('../middleware/csrf');
const { COOKIE_NAME, cookieOptions } = require('../utils/cookies');

const router = express.Router();

// ---------- POST /api/admin/login ----------
router.post(
  '/login',
  loginLimiter,
  verifyOrigin,
  [body('password').isString().withMessage('Password is required').isLength({ min: 1, max: 200 })],
  validate,
  async (req, res, next) => {
    try {
      const { password } = req.body;
      const hash = process.env.ADMIN_PASSWORD_HASH;

      if (!hash) {
        return res.status(500).json({ error: 'Admin auth is not configured on the server' });
      }

      const ok = await bcrypt.compare(password, hash);
      if (!ok) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
      res.cookie(COOKIE_NAME, token, cookieOptions);
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);

// ---------- POST /api/admin/logout ----------
router.post('/logout', verifyOrigin, (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  res.json({ ok: true });
});

// ---------- GET /api/admin/me ----------
// Lets the frontend check "am I still logged in?" on page load.
router.get('/me', requireAdmin, (req, res) => {
  res.json({ ok: true, role: req.admin.role });
});

// ---------- GET /api/admin/submissions ----------
router.get('/submissions', requireAdmin, async (req, res, next) => {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ ok: true, submissions });
  } catch (err) {
    next(err);
  }
});

// ---------- PATCH /api/admin/submissions/:id/view ----------
router.patch(
  '/submissions/:id/view',
  requireAdmin,
  verifyOrigin,
  [param('id').isInt({ min: 1 }).withMessage('Invalid id').toInt()],
  validate,
  async (req, res, next) => {
    try {
      const submission = await prisma.submission.update({
        where: { id: req.params.id },
        data: { viewed: true, viewedAt: new Date() },
      });
      res.json({ ok: true, submission });
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Submission not found' });
      }
      next(err);
    }
  }
);

// ---------- DELETE /api/admin/submissions/:id ----------
router.delete(
  '/submissions/:id',
  requireAdmin,
  verifyOrigin,
  [param('id').isInt({ min: 1 }).withMessage('Invalid id').toInt()],
  validate,
  async (req, res, next) => {
    try {
      await prisma.submission.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Submission not found' });
      }
      next(err);
    }
  }
);

module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, param } = require('express-validator');
const prisma = require('../lib/prisma');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiters');
const { verifyOrigin } = require('../middleware/csrf');
const { COOKIE_NAME, cookieOptions } = require('../utils/cookies');
const { validateContent } = require('../lib/validateContent');

const router = express.Router();

// ---------- POST /api/admin/login ----------
router.post(
  '/login',
  loginLimiter,
  verifyOrigin,
  [body('password').isString().withMessage('Password is required').isLength({ min: 1, max: 200 })],
  validate,
  async (req, res, next) => {
    try {
      const { password } = req.body;
      const hash = process.env.ADMIN_PASSWORD_HASH;

      if (!hash) {
        return res.status(500).json({ error: 'Admin auth is not configured on the server' });
      }

      const ok = await bcrypt.compare(password, hash);
      if (!ok) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
      res.cookie(COOKIE_NAME, token, cookieOptions);
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);

// ---------- POST /api/admin/logout ----------
router.post('/logout', verifyOrigin, (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  res.json({ ok: true });
});

// ---------- GET /api/admin/me ----------
// Lets the frontend check "am I still logged in?" on page load.
router.get('/me', requireAdmin, (req, res) => {
  res.json({ ok: true, role: req.admin.role });
});

// ---------- GET /api/admin/submissions ----------
router.get('/submissions', requireAdmin, async (req, res, next) => {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ ok: true, submissions });
  } catch (err) {
    next(err);
  }
});

// ---------- PATCH /api/admin/submissions/:id/view ----------
router.patch(
  '/submissions/:id/view',
  requireAdmin,
  verifyOrigin,
  [param('id').isInt({ min: 1 }).withMessage('Invalid id').toInt()],
  validate,
  async (req, res, next) => {
    try {
      const submission = await prisma.submission.update({
        where: { id: req.params.id },
        data: { viewed: true, viewedAt: new Date() },
      });
      res.json({ ok: true, submission });
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Submission not found' });
      }
      next(err);
    }
  }
);

// ---------- DELETE /api/admin/submissions/:id ----------
router.delete(
  '/submissions/:id',
  requireAdmin,
  verifyOrigin,
  [param('id').isInt({ min: 1 }).withMessage('Invalid id').toInt()],
  validate,
  async (req, res, next) => {
    try {
      await prisma.submission.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Submission not found' });
      }
      next(err);
    }
  }
);

// ---------- PUT /api/admin/content ----------
// Replaces the entire site content object (every text field and every
// link, editable from the admin panel's "Edit Site" tab). The frontend
// always sends the full object back — it GETs the current content, edits
// it in memory, then PUTs the whole thing — so this is a straightforward
// overwrite rather than a partial merge.
router.put(
  '/content',
  requireAdmin,
  verifyOrigin,
  [body().isObject().withMessage('Body must be a JSON object')],
  validate,
  async (req, res, next) => {
    try {
      const data = req.body;

      const check = validateContent(data);
      if (!check.valid) {
        return res.status(400).json({ error: check.error });
      }

      const row = await prisma.siteContent.upsert({
        where: { id: 1 },
        update: { data },
        create: { id: 1, data },
      });

      res.json({ ok: true, content: row.data, updatedAt: row.updatedAt });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
