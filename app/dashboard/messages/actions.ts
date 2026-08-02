"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface MessageActionState {
  error?: string;
}

export async function sendMessage(
  _prevState: MessageActionState,
  formData: FormData
): Promise<MessageActionState> {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { error: "Message can't be empty" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You must be signed in" };

  // MVP routing: send to the first staff/admin account. Proper per-client
  // account-manager assignment lands with the admin dashboard (Phase 5).
  const { data: recipient } = await supabase
    .from("profiles")
    .select("id")
    .in("role", ["admin", "staff"])
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (!recipient) return { error: "No support contact is available right now" };

  const { error } = await supabase.from("messages").insert({
    sender_id: user.id,
    recipient_id: recipient.id,
    body,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/messages");
  return {};
}
