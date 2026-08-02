"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationStatus } from "@/types/database";

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const supabase = await createClient();
  await supabase.from("job_applications").update({ status }).eq("id", id);
  revalidatePath("/admin/applications");
}

export async function deleteApplication(id: string) {
  const supabase = await createClient();
  await supabase.from("job_applications").delete().eq("id", id);
  revalidatePath("/admin/applications");
}
