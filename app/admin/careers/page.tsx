import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { JobsTable } from "./jobs-table";

export default async function AdminCareersPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("jobs")
    .select("id, title, department, location, status")
    .order("posted_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Careers" description="Open roles shown on the careers page." newHref="/admin/careers/new" newLabel="Post a role" />
      <JobsTable rows={rows ?? []} />
    </div>
  );
}
