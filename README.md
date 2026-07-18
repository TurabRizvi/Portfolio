# Portfolio — Turab Rizvi

Two apps, run together:

```
Portfolio/
  client/   Next.js frontend  (localhost:3000)
  server/   Express + Prisma backend  (localhost:4000)
```

## Run both

**Terminal 1:**
```bash
cd server
npm install
npx prisma migrate dev --name init
npm run dev
```

**Terminal 2:**
```bash
cd client
npm install
npm run dev
```

Then open http://localhost:3000. The contact form and the hidden `/admin`
panel (linked from the small dot next to "ISLAMABAD, PK" in the footer)
both talk to the real backend — no mock data, no client-side password,
anywhere.

See `client/README.md` and `server/README.md` for details on each half.
