import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", params.id).single();

  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Project" />
      <ProjectForm project={project} />
    </div>
  );
}
