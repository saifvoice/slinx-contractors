"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

export async function updateContactInfo(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const supabase = await createClient();
  const value = {
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    address: String(formData.get("address") ?? ""),
  };
  const { error } = await supabase.from("site_settings").update({ value }).eq("key", "contact_info");
  if (error) return { error: error.message };
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function updateCompanyStats(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const supabase = await createClient();
  const value = {
    projects_delivered: String(formData.get("projects_delivered") ?? ""),
    mw_installed: String(formData.get("mw_installed") ?? ""),
    years_in_operation: String(formData.get("years_in_operation") ?? ""),
    client_retention_rate: String(formData.get("client_retention_rate") ?? ""),
  };
  const { error } = await supabase.from("site_settings").update({ value }).eq("key", "company_stats");
  if (error) return { error: error.message };
  revalidatePath("/admin/settings");
  return { success: true };
}
