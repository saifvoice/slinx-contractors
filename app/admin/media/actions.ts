"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface MediaFormState {
  error?: string;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export async function uploadMedia(_prevState: MediaFormState, formData: FormData): Promise<MediaFormState> {
  const file = formData.get("file");
  const altText = String(formData.get("alt_text") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file to upload" };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { error: "File is too large (max 5MB)" };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Only PNG, JPEG, WebP or SVG images are supported" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(path);

  const { error: insertError } = await supabase.from("media_library").insert({
    file_name: file.name,
    file_url: publicUrl.publicUrl,
    file_type: file.type,
    file_size_bytes: file.size,
    alt_text: altText || null,
    uploaded_by: user?.id ?? null,
  });
  if (insertError) return { error: insertError.message };

  revalidatePath("/admin/media");
  return {};
}

export async function deleteMedia(id: string, storagePath: string) {
  const supabase = await createClient();
  await supabase.storage.from("media").remove([storagePath]);
  await supabase.from("media_library").delete().eq("id", id);
  revalidatePath("/admin/media");
}
