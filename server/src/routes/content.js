const express = require('express');
const prisma = require('../lib/prisma');
const { DEFAULT_CONTENT } = require('../lib/defaultContent');

const router = express.Router();

// ---------- GET /api/content ----------
// Public — this is what every page on the live site fetches to render
// its text and links. If the table is empty (first run), seed it with
// DEFAULT_CONTENT so there's always something to serve.
router.get('/', async (req, res, next) => {
  try {
    let row = await prisma.siteContent.findUnique({ where: { id: 1 } });

    if (!row) {
      row = await prisma.siteContent.create({
        data: { id: 1, data: DEFAULT_CONTENT },
      });
    }

    res.json({ ok: true, content: row.data, updatedAt: row.updatedAt });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
