"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

export async function updateUserRole(id: string, role: UserRole) {
  const supabase = await createClient();

  // Extra guard alongside the `prevent_role_escalation` DB trigger and the
  // `profiles_update_own` RLS policy: only an admin can change roles here.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: actor } = await supabase.from("profiles").select("role").eq("id", user?.id ?? "").single();
  if (actor?.role !== "admin") return;

  await supabase.from("profiles").update({ role }).eq("id", id);
  revalidatePath("/admin/users");
}
