// Same-origin check for API routes. Next.js Server Actions get CSRF
// protection for free (Origin header validation is built in); plain
// Route Handlers under app/api/** don't, so this closes that gap for
// the public-facing POST endpoints (quote requests, contact, applications).
export function verifyOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;

  const allowed = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  try {
    return new URL(origin).host === new URL(allowed).host;
  } catch {
    return false;
  }
}
