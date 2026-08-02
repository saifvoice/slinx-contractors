import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { UsersTable } from "./users-table";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: rows } = await supabase
    .from("profiles")
    .select("id, full_name, email, company, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Users" description="Everyone with an account — clients, staff and admins." />
      <UsersTable rows={rows ?? []} currentUserId={user?.id ?? ""} />
    </div>
  );
}
