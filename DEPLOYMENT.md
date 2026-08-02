# Deploying S-LINx Contractors

## 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the files in `database/` **in this order**:
   1. `schema.sql`
   2. `rls-policies.sql`
   3. `storage.sql`
   4. `seed.sql`

   (Equivalent CLI path: `supabase link --project-ref <ref>` then `supabase db push`,
   which applies `supabase/migrations/` — the same four files, already numbered.)
3. Confirm two Storage buckets exist under **Storage**: `cvs` (private) and `media` (public).
   `storage.sql` creates them, but double-check after running it.
4. Under **Authentication → URL Configuration**, set:
   - Site URL: your production URL (e.g. `https://www.slinxcontractors.com`)
   - Redirect URLs: `https://www.slinxcontractors.com/auth/callback`
5. Copy your Project URL, anon key, and service role key from **Settings → API**.

## 2. Environment variables

Copy `.env.example` to `.env.local` for local dev, and set the same keys in Vercel
(**Project Settings → Environment Variables**) for production:

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | From Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | From Supabase Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only — never expose client-side |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production domain — used for auth redirects, sitemap, CSRF origin check |
| `RESEND_API_KEY` | No | Enables email notifications (Resend). Skipped gracefully if unset |
| `EMAIL_FROM`, `SALES_TEAM_EMAIL`, `SUPPORT_TEAM_EMAIL`, `HR_TEAM_EMAIL` | No | Only used if `RESEND_API_KEY` is set |

## 3. First admin account

Public registration (`/register`) only ever creates `client`-role accounts by design
(see Phase 3 notes in `README.md`). To get your first admin:

1. Register a normal account at `/register`.
2. In the Supabase Table Editor, open `profiles` and change that row's `role` to `admin`.
3. Sign in and visit `/admin`.

## 4. Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — it auto-detects Next.js from `vercel.json`.
3. Add the environment variables from step 2.
4. Deploy. Vercel builds with `next build`.
5. Point your domain at the Vercel deployment, then update `NEXT_PUBLIC_SITE_URL` and
   the Supabase Auth redirect URLs to match the final domain.

## 5. Post-deploy checklist

- [ ] Submit the quote/contact/careers forms once each — confirm rows land in Supabase
      and (if `RESEND_API_KEY` is set) notification emails arrive
- [ ] Confirm `/sitemap.xml` and `/robots.txt` resolve and list the right URLs
- [ ] Promote your admin account and confirm `/admin` CRUD works end-to-end
- [ ] Upload a CV through `/careers/[slug]` and confirm it's downloadable from
      `/admin/applications`
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) against the production URL

## Notes on scale

- The in-memory rate limiter (`lib/rate-limit.ts`) is per-instance and resets on
  redeploy — adequate for a single-region low-traffic launch. For multi-region or
  high-traffic deployments, swap it for Upstash Redis
  (`@upstash/ratelimit`, which Vercel integrates with directly).
- ISR (`revalidate = 60`) is used on public content pages so published/edited content
  in the admin dashboard appears within a minute without a full redeploy.
