"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface TestimonialFormState {
  error?: string;
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    quote: String(formData.get("quote") ?? "").trim(),
    author_name: String(formData.get("author_name") ?? "").trim(),
    author_role: String(formData.get("author_role") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim() || null,
    is_featured: formData.get("is_featured") === "on",
    status: "published",
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/testimonials");
  return {};
}

export async function toggleFeatured(id: string, is_featured: boolean) {
  const supabase = await createClient();
  await supabase.from("testimonials").update({ is_featured }).eq("id", id);
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
}
