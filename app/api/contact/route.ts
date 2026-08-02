import { NextRequest, NextResponse } from "next/server";
import { contactMessageSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyOrigin } from "@/lib/verify-origin";
import { notifyTeamOfContactMessage } from "@/lib/email/send";

export async function POST(req: NextRequest) {
  if (!verifyOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const rate = checkRateLimit(`contact:${getClientIp(req)}`);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests — please try again shortly" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds ?? 60) } }
    );
  }

  const body = await req.json();
  const parsed = contactMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website, ...contactMessage } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert(contactMessage);

  if (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json({ error: "Could not save your message" }, { status: 500 });
  }

  await notifyTeamOfContactMessage(contactMessage);

  return NextResponse.json({ ok: true });
}
