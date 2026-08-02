"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface JobFormState {
  error?: string;
}

function toArray(value: FormDataEntryValue | null) {
  return String(value ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
}

function jobPayload(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    department: String(formData.get("department") ?? "ICT") as "ICT" | "Renewable Energy" | "Operations",
    location: String(formData.get("location") ?? "").trim(),
    type: String(formData.get("type") ?? "Full-time") as "Full-time" | "Contract",
    summary: String(formData.get("summary") ?? "").trim(),
    responsibilities: toArray(formData.get("responsibilities")),
    requirements: toArray(formData.get("requirements")),
    status: String(formData.get("status") ?? "open") as "open" | "closed",
  };
}

export async function createJob(_prevState: JobFormState, formData: FormData): Promise<JobFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("jobs").insert(jobPayload(formData));
  if (error) return { error: error.message };
  revalidatePath("/admin/careers");
  redirect("/admin/careers");
}

export async function updateJob(id: string, _prevState: JobFormState, formData: FormData): Promise<JobFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("jobs").update(jobPayload(formData)).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/careers");
  redirect("/admin/careers");
}

export async function deleteJob(id: string) {
  const supabase = await createClient();
  await supabase.from("jobs").delete().eq("id", id);
  revalidatePath("/admin/careers");
}
