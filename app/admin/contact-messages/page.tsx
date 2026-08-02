import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ContactMessagesTable } from "./contact-messages-table";

export default async function AdminContactMessagesPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Contact Messages" description="General enquiries submitted through the contact form." />
      <ContactMessagesTable rows={rows ?? []} />
    </div>
  );
}
