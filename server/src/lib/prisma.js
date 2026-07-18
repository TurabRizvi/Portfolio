const { PrismaClient } = require('@prisma/client');

// Reuse a single PrismaClient instance across nodemon restarts in dev
// (each restart would otherwise open a fresh connection pool).
const prisma = global.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}

module.exports = prisma;
