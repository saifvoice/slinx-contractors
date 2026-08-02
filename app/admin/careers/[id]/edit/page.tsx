import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { JobForm } from "../../job-form";

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: job } = await supabase.from("jobs").select("*").eq("id", params.id).single();

  if (!job) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Role" />
      <JobForm job={job} />
    </div>
  );
}
