const express = require('express');
const { body } = require('express-validator');
const prisma = require('../lib/prisma');
const { validate } = require('../middleware/validate');
const { contactLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name is too long'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email').isLength({ max: 200 }).normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 3000 }).withMessage('Message is too long'),
    // Honeypot: a hidden field real visitors never fill in. If your
    // frontend form adds a "company" input (kept invisible via CSS,
    // not display:none which some bots skip), reject anything that
    // arrives with it filled in.
    body('company').optional({ checkFalsy: true }).isEmpty().withMessage('Spam detected'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, message } = req.body;
      const submission = await prisma.submission.create({
        data: { name, email, message },
      });
      res.status(201).json({ ok: true, id: submission.id });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
