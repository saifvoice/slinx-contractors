// Lightweight in-memory rate limiter for API routes.
//
// This is process-local: it resets on redeploy and doesn't share state
// across serverless instances or Vercel regions, so it's a real but
// partial defense — good enough to blunt casual abuse/spam. For a
// production deployment with multiple instances, swap this for
// Upstash Redis (`@upstash/ratelimit`), which Vercel integrates with
// directly; the call site below (`checkRateLimit`) is the only place
// that would need to change.

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string): { ok: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
