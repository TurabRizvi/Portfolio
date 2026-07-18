# Turab Rizvi — Portfolio Backend

Express + Prisma API for the contact form and admin panel. Lives in
`Portfolio/server`, sibling to `Portfolio/client`.

## Setup

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

That last command starts the API on **http://localhost:4000**.

`.env` is already filled in and working (SQLite file DB, a generated JWT
secret, and a bcrypt hash of the admin password you gave me). You don't
need to create or edit it to get started — see "Changing the admin
password" below if you want a new one later.

## What each command does

- `npm install` — installs express, prisma, security middleware, etc.
- `npx prisma migrate dev --name init` — creates `prisma/dev.db` (a SQLite
  file) and the `Submission` table. Only needs to be run once, or again
  whenever you change `prisma/schema.prisma`.
- `npm run dev` — starts the server with nodemon (auto-restarts on file changes).
- `npm start` — same, without auto-restart (use this in production).
- `npx prisma studio` — opens a local GUI to browse/edit the database directly.

## Endpoints

| Method | Route                          | Auth   | Purpose                          |
|--------|--------------------------------|--------|-----------------------------------|
| GET    | `/api/health`                  | none   | Uptime check                     |
| POST   | `/api/contact`                 | none   | Create a submission (rate-limited)|
| POST   | `/api/admin/login`             | none   | Password → session cookie        |
| POST   | `/api/admin/logout`            | none   | Clears the session cookie        |
| GET    | `/api/admin/me`                | admin  | "Am I still logged in?"          |
| GET    | `/api/admin/submissions`       | admin  | List all submissions             |
| PATCH  | `/api/admin/submissions/:id/view` | admin | Mark one as viewed            |
| DELETE | `/api/admin/submissions/:id`   | admin  | Delete one                       |

## Security layers, and why each is there

- **helmet** — sets the standard hardening headers (CSP, no-sniff, etc.)
- **CORS locked to `CLIENT_ORIGIN`** with `credentials: true` — no wildcard
  origin, since wildcard + cookies is explicitly disallowed by browsers
  anyway and would be wrong here regardless
- **express-rate-limit** — 5 contact submissions / 15 min per IP, 8 login
  attempts / 15 min per IP (brute-force protection)
- **express-validator** — every input validated and length-capped server-side
  (never trust the frontend's validation alone)
- **Honeypot field** (`company`) on the contact form — a hidden input real
  visitors never fill in; bots that auto-fill every field get rejected.
  Already wired into the frontend's contact form, hidden via CSS
  positioning rather than `display:none` (which some bots skip over).
- **bcrypt** (12 rounds) — the admin password is never stored in plaintext,
  only its hash, in `.env`
- **JWT session in an httpOnly cookie** — invisible to JavaScript, so it
  can't be stolen via XSS; `sameSite: 'lax'` means it isn't sent on
  cross-site POST/PATCH/DELETE requests either, which is the main defense
  against CSRF
- **Origin/Referer check** (`verifyOrigin`) on every state-changing admin
  route as a second, independent CSRF layer on top of the cookie setting
- **Prisma** — all queries are parameterized by design, so SQL injection
  isn't a concern the way it would be with raw string-built queries
- **10kb JSON body limit** — blocks oversized-payload abuse
- **Centralized error handler** — no stack traces or internals ever leak
  into an API response

## Changing the admin password

```bash
npm run hash-password -- "your-new-password"
```

Copy the printed hash into `.env` as `ADMIN_PASSWORD_HASH`, restart the
server. The plaintext password is never written to disk anywhere.

## Connecting the frontend

Already done. `Portfolio/client` points at `NEXT_PUBLIC_API_URL`
(`http://localhost:4000` by default, set in `client/.env.local`), sends
`credentials: 'include'` on every request so the admin session cookie
travels with it, and the admin panel has no mock data or client-side
password left in it — it reads and writes this API directly.

Run both `npm run dev` in `server/` and `npm run dev` in `client/` at the
same time for the full thing to work.

## Moving off SQLite later

SQLite is fine for development and even a small personal site, but if you
deploy somewhere without persistent disk (like most serverless platforms),
switch to Postgres:

1. In `prisma/schema.prisma`, change `provider = "sqlite"` to `"postgresql"`.
2. Set `DATABASE_URL` in `.env` to a real Postgres connection string
   (Render, Railway, Neon, and Supabase all have free tiers).
3. Run `npx prisma migrate dev` again.

Nothing else in the code needs to change — the `Submission` model and
every route stay exactly as they are.

## A note on how this was tested

Dependency install, `npm audit` (0 vulnerabilities), every route's
validation/auth/CSRF logic, and the full login → CRUD → logout flow were
all verified against this exact code before it was handed to you. The one
thing I couldn't verify in my sandbox is the live SQLite connection
itself — my environment's network policy blocks Prisma's engine-binary
download, which is specific to that sandbox, not your machine. Run the
`npx prisma migrate dev --name init` step above and it'll fetch normally.
