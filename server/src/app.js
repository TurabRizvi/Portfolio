require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Behind a reverse proxy (Render, Railway, Fly, nginx, etc.) this makes
// req.ip / rate-limiting see the real client IP instead of the proxy's.
app.set('trust proxy', 1);
app.disable('x-powered-by'); // helmet also does this, belt and suspenders

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true, // required so the browser sends/receives the admin session cookie
  })
);

app.use(express.json({ limit: '10kb' })); // small cap — this API only ever needs short JSON bodies
app.use(cookieParser());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'turab-portfolio-server' }));

app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
