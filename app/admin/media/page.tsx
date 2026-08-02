import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { MediaUploadForm } from "./upload-form";
import { MediaGrid } from "./media-grid";

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const { data: files } = await supabase
    .from("media_library")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (files ?? []).map((f) => ({
    id: f.id,
    file_name: f.file_name,
    file_url: f.file_url,
    file_type: f.file_type,
    // Public URL looks like .../storage/v1/object/public/media/<path> —
    // recover the path for the delete action, which needs it to remove
    // the object from Storage (the DB row alone isn't enough).
    storage_path: f.file_url.split("/media/")[1] ?? "",
  }));

  return (
    <div>
      <AdminPageHeader title="Media Library" description="Images used across the site." />
      <MediaUploadForm />
      <MediaGrid rows={rows} />
    </div>
  );
}
