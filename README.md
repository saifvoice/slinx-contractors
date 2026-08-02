# S-LINx Contractors

ICT Solutions & Renewable Energy contractor platform — Next.js 15, React 19, TypeScript, Tailwind, shadcn/ui conventions, Framer Motion, Supabase.

## Phase 1 — Foundation & Design System (this delivery)

**What's built:**
- Project scaffold: `package.json`, `tsconfig.json`, `next.config.ts`, Tailwind + PostCSS config
- Design tokens in `app/globals.css` (light + dark), derived from the brand spec:
  - Primary `#0F172A` · Secondary `#16A34A` · Accent `#2563EB` · Background `#F8FAFC`
  - Fonts: Poppins (display) + Inter (body), loaded via `next/font`
- Core UI primitives: `Button`, `Card` (`components/ui/`)
- `Navbar` with services mega-link and mobile menu (`components/navigation/`)
- `Footer` with sitemap columns and contact strip (`components/footer/`)
- Signature hero: a circuit-trace line that resolves into a solar glow, with an
  animated signal dot — the one visual idea tying ICT + renewable energy together
  (`components/hero/`)
- `app/layout.tsx` + `app/page.tsx` wiring it all together with a token preview section

## Phase 2 — Public Marketing Site (this delivery)

**What's built:**
- Full home page: Hero, Trusted Companies, Stats, Featured Services, Industries,
  Featured Projects, Testimonials, Latest News, Call to Action
- Interior pages: About, ICT Solutions, Renewable Energy (22 services total across
  both, anchor-linked), Projects (list + detail for 6 case studies), Blog (list +
  detail for 3 posts), Careers (list + detail w/ apply form for 3 roles), Contact,
  Request Quote, Privacy Policy, Terms, custom 404
- Working forms — quote request, contact, job application (with CV file picker) —
  built with React Hook Form + Zod, each posting to a real API route
  (`app/api/quote-requests`, `app/api/contact`, `app/api/careers/apply`) with
  validation, a honeypot spam field, and `TODO (Phase 3)` markers showing exactly
  where the Supabase insert + email notification will go
- Mock data layer in `lib/data/` (services, projects, blog, careers, testimonials,
  stats) standing in for the database until Phase 3

**Not built yet:** Supabase schema/auth, client portal, admin dashboard, real
persistence behind the forms, SEO files (sitemap/robots/structured data), security
hardening, deployment config.

## Phase 3 — Supabase Schema, RLS & Auth (this delivery)

**What's built:**
- `database/schema.sql` — full Postgres schema: enums, `profiles` (role: admin/staff/client)
  with an auto-provisioning trigger on `auth.users`, services, projects (+ junction/gallery
  tables), blog (categories/tags/posts/comments), testimonials, jobs + applications, quote
  requests, contact messages, media library, site settings, and client-portal tables
  (quotes, invoices, downloads, messages) — indexes and foreign keys included inline
- `database/rls-policies.sql` — Row Level Security enabled on every table: public read for
  published content, staff/admin full access via `is_staff_or_admin()`/`is_admin()` helpers,
  clients scoped to their own rows in the portal tables, a trigger blocking self role-escalation
- `database/seed.sql` — seed data mirroring `lib/data/` exactly, so swapping mock data for
  live Supabase queries in Phase 4 is a drop-in change
- `lib/supabase/client.ts` / `server.ts` — typed Supabase clients for Client and Server
  Components, backed by `types/database.ts` (hand-authored `Database` type)
- `middleware.ts` + `lib/supabase/middleware.ts` — refreshes the session on every request
  and enforces route protection: `/dashboard/**` requires sign-in, `/admin/**` requires
  admin or staff role (redirects otherwise)
- Auth pages: `/login`, `/register` (always provisions a `client`-role account — admin/staff
  accounts are created from the admin dashboard, not public signup), `/forgot-password`,
  plus `/auth/callback` to exchange the email confirmation code for a session
- `lib/supabase/auth-actions.ts` — server actions (`signIn`, `signUp`, `signOut`,
  `requestPasswordReset`) used by the auth pages

**Run order:** `schema.sql` → `rls-policies.sql` → `seed.sql` in the Supabase SQL editor
(or `supabase db push` if you migrate them into `supabase/migrations/`).

**Not built yet:** the actual `/dashboard` and `/admin` pages (currently just protected by
middleware — visiting them 404s until Phase 4/5 build the UI), wiring the Phase 2 forms to
insert into these tables instead of `console.log`, Supabase Storage for CV/media uploads.

## Phase 4 — Client Portal (this delivery)

**What's built:**
- `/dashboard` — full portal UI, gated by `middleware.ts` + a server-side redirect in
  `app/dashboard/layout.tsx` as a second guard: sidebar (Overview, Quotes, Invoices,
  Downloads, Messages, Profile), topbar with sign-out
- **Overview** — live counts (quotes, unpaid invoices, downloads, unread messages) pulled
  straight from Supabase, no mock data
- **Quotes / Invoices / Downloads** — real tables reading through RLS (`client_id = auth.uid()`),
  with empty states since seed data has no client-linked rows yet — those get created from
  the admin dashboard in Phase 5
- **Messages** — a working two-way thread against the `messages` table: send, receive,
  auto-mark-as-read on view. Routing to a specific staff member is a placeholder (sends to
  the first admin/staff account) until Phase 5 adds account-manager assignment
- **Profile** — edit contact info (name/phone/company) via a server action; role changes are
  blocked by both the RLS policy and the `prevent_role_escalation` trigger from Phase 3.
  Password change wired directly to `supabase.auth.updateUser()`
- The Phase 2 quote/contact/careers forms now actually insert into Supabase instead of
  `console.log`-ing — `TODO (Phase 6)` markers show where email notifications still need
  to go, and CV upload still needs Supabase Storage wiring

**Not built yet:** the admin dashboard (CRUD, quote/invoice creation, account-manager
assignment, CV/media upload to Storage), SEO files, security hardening, deploy config.

## Phase 5 — Admin Dashboard (this delivery)

**What's built:** `/admin`, gated by `middleware.ts` (edge) + a server-side role check in
`app/admin/layout.tsx` (second guard) — only `admin`/`staff` profiles get in, everyone
else bounces to `/dashboard`.

- **Overview** — live counts across every content type, plus the 5 most recent quote requests
- **Quote Requests / Contact Messages / Applications** — lead inboxes with inline status
  changes (`new → contacted → quoted → won/lost`, etc.) and delete
- **Projects / Services / Blog / Careers** — full CRUD: list, create, edit, delete, with
  draft/published/archived status control so content can be prepped before going live
- **Testimonials** — single-page CRUD with a featured toggle (star icon) controlling what
  shows on the homepage
- **Users** — every registered account with inline role changes; only an `admin` can
  actually change a role (enforced in the server action, on top of the RLS policy and the
  `prevent_role_escalation` trigger from Phase 3 — three independent layers)
- **Media Library** — reads live from `media_library`; upload UI is stubbed until Storage
  wiring in Phase 6
- **Settings** — edits the `contact_info` and `company_stats` rows in `site_settings`,
  which the public Footer/Contact page and homepage stats strip will read from once Phase 6
  swaps their remaining mock data for live queries

**Not built yet:** quote/invoice *creation* for clients (the client portal in Phase 4 can
only display them — an admin-side "create a quote for this client" flow would close that
loop but wasn't in this phase's core CRUD scope), CV/media upload to Supabase Storage, email
notifications, sitemap/robots/structured data, security hardening beyond RLS, deploy config.

## Phase 6 — SEO, Security, Storage, Deploy Config (this delivery)

**Data-layer fix (found during this phase, not part of the original scope but necessary):**
the public content pages — services, projects, blog, careers, and the homepage sections —
were still reading from the Phase 2 mock data in `lib/data/` even after Phase 5 shipped
admin CRUD against Supabase. That meant admin edits had no visible effect on the site. All
of the following now read live from Supabase instead, with `revalidate = 60` (ISR) so
published changes show up within a minute without a redeploy:
`app/services/ict`, `app/services/renewable-energy`, `app/projects` (+ detail),
`app/blog` (+ detail), `app/careers` (+ detail), and the home page's
`FeaturedServices` / `FeaturedProjects` / `LatestNews` / `Testimonials` / `Stats` sections.
The four card components (`ServiceCard`, `ProjectCard`, `BlogCard`, `JobCard`) were
decoupled from the `lib/data/` types so they work with either source. `lib/data/*.ts` is
now unused dead weight except `home.ts`'s `trustedCompanies` list (client logos have no
DB table — out of scope) — safe to delete once you're confident in the live data.

**SEO:**
- `app/sitemap.ts` / `app/robots.ts` — dynamic, pulling published slugs from Supabase
- Organization JSON-LD in the root layout, Article JSON-LD on blog posts, JobPosting
  JSON-LD on career pages (`components/seo/json-ld.tsx`)
- Canonical URLs + Twitter card metadata on detail pages

**Security:**
- `next.config.ts` — CSP, HSTS, X-Frame-Options, and the rest of the standard header set
- `lib/verify-origin.ts` — same-origin check on the three public API routes (Server Actions
  get this for free; plain Route Handlers don't)
- `lib/rate-limit.ts` — in-memory per-IP rate limit on those same routes (see its own
  comments for the multi-instance caveat and the Upstash upgrade path)

**Storage:**
- `database/storage.sql` — `cvs` (private, admin/staff-only read) and `media` (public read)
  buckets with RLS policies on `storage.objects`
- The careers apply flow now genuinely uploads the CV file to the `cvs` bucket (was
  filename-only since Phase 2); `/admin/applications` generates a time-limited signed URL
  to download it
- `/admin/media` now actually uploads to the `media` bucket and inserts into
  `media_library` (this was still a "wires up in Phase 6" placeholder from Phase 5 —
  closed out here, with delete removing both the Storage object and the DB row)

**Email:** `lib/email/send.ts` wraps the Resend API, gated behind `RESEND_API_KEY` — runs
fine without it (logs instead of sending). Wired into all three public form API routes.

**Deploy config:** `vercel.json`, `supabase/config.toml` + `supabase/migrations/` (the
same four `database/*.sql` files, numbered for `supabase db push`), and `DEPLOYMENT.md`
with the full setup walkthrough.

**Not built yet:** admin-side quote/invoice creation for clients (see Phase 5 note above),
a persisted rate limiter for multi-region deployments, automated tests.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + keys
npm run dev
```

Run the four files in `database/` (in order — see each file's header comment) against your
Supabase project. Register a test account at `/register`, then promote it to `admin`
directly in the Supabase table editor (`profiles.role`) to reach `/admin` — public
registration only ever creates `client`-role accounts by design.

Open http://localhost:3000. For a production deploy, see `DEPLOYMENT.md`.

## Roadmap

1. ✅ Foundation & design system
2. ✅ Public marketing site
3. ✅ Supabase schema + RLS + auth
4. ✅ Client portal
5. ✅ Admin dashboard
6. ✅ SEO, security hardening, Storage wiring, email notifications, deploy config
