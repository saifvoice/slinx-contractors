import { AdminPageHeader } from "@/components/admin/page-header";
import { JobForm } from "../job-form";

export default function NewJobPage() {
  return (
    <div>
      <AdminPageHeader title="Post a Role" />
      <JobForm />
    </div>
  );
}
