"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface BlogFormState {
  error?: string;
}

function blogPayload(formData: FormData) {
  const status = String(formData.get("status") ?? "draft") as "draft" | "published" | "archived";
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    category_id: String(formData.get("category_id") ?? "") || null,
    read_time: String(formData.get("read_time") ?? "").trim() || null,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  };
}

export async function createPost(_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("blog_posts").insert({ ...blogPayload(formData), author_id: user?.id ?? null });
  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, _prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").update(blogPayload(formData)).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
}
