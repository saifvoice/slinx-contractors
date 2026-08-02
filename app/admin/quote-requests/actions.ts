"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { QuoteRequestStatus } from "@/types/database";

export async function updateQuoteRequestStatus(id: string, status: QuoteRequestStatus) {
  const supabase = await createClient();
  await supabase.from("quote_requests").update({ status }).eq("id", id);
  revalidatePath("/admin/quote-requests");
  revalidatePath("/admin");
}

export async function deleteQuoteRequest(id: string) {
  const supabase = await createClient();
  await supabase.from("quote_requests").delete().eq("id", id);
  revalidatePath("/admin/quote-requests");
}
