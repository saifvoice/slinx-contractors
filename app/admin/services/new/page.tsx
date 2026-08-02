import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "../service-form";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="New Service" />
      <ServiceForm />
    </div>
  );
}
