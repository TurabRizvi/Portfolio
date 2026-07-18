# Turab Rizvi — Portfolio (Next.js frontend)

Lives in `Portfolio/client`. Talks to the real backend in `Portfolio/server`
— both need to be running for the contact form and admin panel to work.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Also start the backend (see `../server/README.md`)
so the contact form and `/admin` actually have something to talk to.

`.env.local` already points at `http://localhost:4000` — change
`NEXT_PUBLIC_API_URL` there if your backend runs somewhere else.

## Structure

```
app/
  layout.jsx          root layout — fonts, loader, cursor, nav/footer wiring
  page.jsx             Home
  about/page.jsx        About
  work/page.jsx         Work
  stack/page.jsx        Stack
  contact/page.jsx      Contact — real form, posts to the Express backend
  admin/page.jsx        Admin dashboard — reads/writes the real backend
  globals.css          all shared styling
components/
  Nav, Footer, Loader, CustomCursor, ProgressBeam, ScrollToTop, ScrollReveal, Chrome
lib/api.js            fetch wrapper pointed at NEXT_PUBLIC_API_URL
public/favicon.png
public/img/portrait.jpg
```

## What's real

- **Contact form** — validates client-side, then POSTs to the backend's
  `/api/contact`. Handles success, validation errors, and rate-limiting
  (429) with distinct messages. Includes an invisible honeypot field
  (`company`) real visitors never see or fill in.
- **Admin panel** (linked from "Admin Login" in the footer) — no password
  or data lives in this codebase. On load it asks the backend "am I logged
  in?" (`/api/admin/me`); if not, it shows a login form that POSTs to
  `/api/admin/login`. Once authenticated, submissions are fetched live from
  `/api/admin/submissions`, and "mark viewed" / "delete" call the real
  `PATCH` / `DELETE` endpoints.

## Notes on a couple of intentional choices already in this build

- The admin link in the footer is visible text ("Admin Login"), not hidden —
  that was changed on purpose.
- The portrait's entrance no longer uses a clip-path reveal animation — it
  was cut because that animation depended on a scroll-observer that didn't
  reliably fire for elements already on screen at load, which is what made
  the photo disappear intermittently. The scanning light beam over the
  portrait still runs independently of this and is unaffected.
- `components/ScrollReveal.jsx` now treats anything inside the hero section
  (title, portrait, kicker/lede/buttons) as "reveal immediately on mount"
  rather than "wait for scroll intersection" — the same class of timing bug
  could otherwise resurface any time a `.reveal` class gets added to an
  above-the-fold element.

## Still placeholder

- `public/resume.pdf` doesn't exist yet — drop a PDF there with that exact
  filename, or tell me the real filename and I'll update the link.
- WhatsApp is shown as "coming soon" until you have a number to publish.

## If the contact form or admin panel say "couldn't reach the server"

The backend isn't running, or it's running on a different port than
`NEXT_PUBLIC_API_URL` in `.env.local`. Start it with `npm run dev` inside
`Portfolio/server` and confirm it logs `Server listening on
http://localhost:4000`.
