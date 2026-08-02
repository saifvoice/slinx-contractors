"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ServiceFormState {
  error?: string;
}

function toArray(value: FormDataEntryValue | null) {
  return String(value ?? "").split(",").map((s) => s.trim()).filter(Boolean);
}

function servicePayload(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "ict") as "ict" | "renewable_energy",
    icon: String(formData.get("icon") ?? "Zap").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    capabilities: toArray(formData.get("capabilities")),
    status: String(formData.get("status") ?? "draft") as "draft" | "published" | "archived",
  };
}

export async function createService(_prevState: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("services").insert(servicePayload(formData));
  if (error) return { error: error.message };
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("services").update(servicePayload(formData)).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
}
