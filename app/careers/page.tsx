import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";
import { JobCard } from "@/components/cards/job-card";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles across ICT infrastructure and renewable energy at S-LINx Contractors.",
};

export default async function CareersPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "open")
    .order("posted_at", { ascending: false });

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Careers"
        title="Build the infrastructure others depend on"
        description="We're hiring across ICT and renewable energy — field roles and remote."
      />
      <section className="py-20">
        <div className="container space-y-4">
          {(jobs ?? []).map((job) => (
            <JobCard
              key={job.slug}
              job={{ slug: job.slug, title: job.title, department: job.department, location: job.location, type: job.type }}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
