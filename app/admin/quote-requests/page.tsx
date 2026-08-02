import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { QuoteRequestsTable } from "./quote-requests-table";

export default async function AdminQuoteRequestsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Quote Requests" description="Leads submitted through the public quote form." />
      <QuoteRequestsTable rows={rows ?? []} />
    </div>
  );
}
