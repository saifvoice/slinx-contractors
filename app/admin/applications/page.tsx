import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ApplicationsTable } from "./applications-table";

export default async function AdminApplicationsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("job_applications")
    .select("*, jobs(title)")
    .order("created_at", { ascending: false });

  // cv_url stores the storage path (bucket is private) — sign each one for
  // a time-limited download link rather than exposing the bucket publicly.
  const rowsWithSignedUrls = await Promise.all(
    (rows ?? []).map(async (row: any) => {
      if (!row.cv_url) return row;
      const { data: signed } = await supabase.storage.from("cvs").createSignedUrl(row.cv_url, 60 * 10);
      return { ...row, cv_signed_url: signed?.signedUrl ?? null };
    })
  );

  return (
    <div>
      <AdminPageHeader title="Applications" description="Candidates who applied through the careers site." />
      <ApplicationsTable rows={rowsWithSignedUrls} />
    </div>
  );
}
