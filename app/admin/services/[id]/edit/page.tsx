import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "../../service-form";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: service } = await supabase.from("services").select("*").eq("id", params.id).single();

  if (!service) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Service" />
      <ServiceForm service={service} />
    </div>
  );
}
