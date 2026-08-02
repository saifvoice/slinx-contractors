"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ContactMessageStatus } from "@/types/database";

export async function updateContactMessageStatus(id: string, status: ContactMessageStatus) {
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ status }).eq("id", id);
  revalidatePath("/admin/contact-messages");
  revalidatePath("/admin");
}

export async function deleteContactMessage(id: string) {
  const supabase = await createClient();
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/contact-messages");
}
