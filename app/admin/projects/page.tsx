import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectsTable } from "./projects-table";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("projects")
    .select("id, title, client_name, industry, category, status")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Projects" description="Portfolio case studies shown on the public site." newHref="/admin/projects/new" newLabel="New project" />
      <ProjectsTable rows={rows ?? []} />
    </div>
  );
}
