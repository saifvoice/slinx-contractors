import { NextRequest, NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyOrigin } from "@/lib/verify-origin";
import { notifyTeamOfQuoteRequest } from "@/lib/email/send";

export async function POST(req: NextRequest) {
  if (!verifyOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const rate = checkRateLimit(`quote:${getClientIp(req)}`);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests — please try again shortly" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds ?? 60) } }
    );
  }

  const body = await req.json();
  const parsed = quoteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success, drop silently
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website, ...quoteRequest } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("quote_requests").insert(quoteRequest);

  if (error) {
    console.error("Failed to save quote request:", error);
    return NextResponse.json({ error: "Could not save your request" }, { status: 500 });
  }

  await notifyTeamOfQuoteRequest(quoteRequest);

  return NextResponse.json({ ok: true });
}
