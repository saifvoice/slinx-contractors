import { NextRequest, NextResponse } from "next/server";
import { jobApplicationSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyOrigin } from "@/lib/verify-origin";
import { notifyTeamOfApplication } from "@/lib/email/send";

const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
  if (!verifyOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const rate = checkRateLimit(`apply:${getClientIp(req)}`);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests — please try again shortly" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds ?? 60) } }
    );
  }

  const formData = await req.formData();
  const jobSlug = String(formData.get("jobSlug") ?? "");
  const cv = formData.get("cv");

  const parsed = jobApplicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    linkedin: formData.get("linkedin") || undefined,
    coverNote: formData.get("coverNote"),
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();

  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .select("id, title")
    .eq("slug", jobSlug)
    .single();

  if (jobError || !job) {
    return NextResponse.json({ error: "That role no longer exists" }, { status: 404 });
  }

  let cv_url: string | null = null;

  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_SIZE_BYTES) {
      return NextResponse.json({ error: "CV file is too large (max 5MB)" }, { status: 400 });
    }
    if (!ALLOWED_CV_TYPES.includes(cv.type)) {
      return NextResponse.json({ error: "CV must be a PDF or Word document" }, { status: 400 });
    }

    const safeName = cv.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${jobSlug}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage.from("cvs").upload(path, cv, {
      contentType: cv.type,
      upsert: false,
    });

    if (uploadError) {
      console.error("CV upload failed:", uploadError);
      return NextResponse.json({ error: "Could not upload your CV — please try again" }, { status: 500 });
    }

    cv_url = path;
  }

  const { website, linkedin, fullName, coverNote, ...contactFields } = parsed.data;

  const { error } = await supabase.from("job_applications").insert({
    job_id: job.id,
    full_name: fullName,
    cover_note: coverNote,
    linkedin_url: linkedin || null,
    cv_url,
    ...contactFields,
  });

  if (error) {
    console.error("Failed to save job application:", error);
    return NextResponse.json({ error: "Could not submit your application" }, { status: 500 });
  }

  await notifyTeamOfApplication({ fullName, email: parsed.data.email, jobTitle: job.title });

  return NextResponse.json({ ok: true });
}
