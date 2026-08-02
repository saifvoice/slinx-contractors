import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "./testimonial-form";
import { TestimonialsList } from "./testimonials-list";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("testimonials")
    .select("id, quote, author_name, author_role, company, is_featured")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Testimonials" description="Client quotes shown across the site." />
      <TestimonialForm />
      <TestimonialsList rows={rows ?? []} />
    </div>
  );
}
