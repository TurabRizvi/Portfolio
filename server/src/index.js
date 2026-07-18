require('dotenv').config();

const REQUIRED_ENV = ['JWT_SECRET', 'ADMIN_PASSWORD_HASH', 'DATABASE_URL', 'CLIENT_ORIGIN'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing required environment variable(s): ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and fill these in before starting the server.');
  process.exit(1);
}

const app = require('./app');
const prisma = require('./lib/prisma');

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`✓ Server listening on http://localhost:${PORT}`);
  console.log(`✓ Accepting requests from ${process.env.CLIENT_ORIGIN}`);
});

async function shutdown(signal) {
  console.log(`\n${signal} received — shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
