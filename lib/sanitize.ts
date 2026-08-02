/**
 * Defense-in-depth input sanitization for text submitted through public
 * forms. React already escapes all string output by default (no
 * `dangerouslySetInnerHTML` is used anywhere on this site), so stored XSS
 * isn't actually reachable today — this exists as a second layer in case
 * that ever changes, and to strip characters that have no legitimate use
 * in a name/message field.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip any HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "") // strip control chars
    .trim();
}

export function sanitizeFields<T extends Record<string, unknown>>(obj: T): T {
  const out = { ...obj };
  for (const key in out) {
    if (typeof out[key] === "string") {
      out[key] = sanitizeText(out[key] as string) as T[Extract<keyof T, string>];
    }
  }
  return out;
}
