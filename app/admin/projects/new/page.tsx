import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="New Project" />
      <ProjectForm />
    </div>
  );
}
