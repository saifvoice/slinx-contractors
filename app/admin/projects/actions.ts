"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ProjectFormState {
  error?: string;
}

function toArray(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function projectPayload(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    client_name: String(formData.get("client_name") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    industry: String(formData.get("industry") ?? "ict") as "ict" | "renewable_energy",
    category: String(formData.get("category") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    timeline: String(formData.get("timeline") ?? "").trim() || null,
    technologies: toArray(formData.get("technologies")),
    results: toArray(formData.get("results")),
    status: String(formData.get("status") ?? "draft") as "draft" | "published" | "archived",
  };
}

export async function createProject(_prevState: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert(projectPayload(formData));
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update(projectPayload(formData)).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
}
