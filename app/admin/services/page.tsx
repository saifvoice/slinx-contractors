import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ServicesTable } from "./services-table";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("services")
    .select("id, title, category, status")
    .order("category")
    .order("sort_order");

  return (
    <div>
      <AdminPageHeader title="Services" description="Service catalog shown across the public site." newHref="/admin/services/new" newLabel="New service" />
      <ServicesTable rows={rows ?? []} />
    </div>
  );
}
