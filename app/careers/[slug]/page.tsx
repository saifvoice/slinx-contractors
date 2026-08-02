import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { ApplyForm } from "@/components/forms/apply-form";
import { JsonLd } from "@/components/seo/json-ld";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: job } = await supabase.from("jobs").select("title, summary").eq("slug", params.slug).single();
  if (!job) return {};
  return { title: job.title, description: job.summary, alternates: { canonical: `/careers/${params.slug}` } };
}

export default async function CareerDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: job } = await supabase.from("jobs").select("*").eq("slug", params.slug).eq("status", "open").single();

  if (!job) notFound();

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.posted_at,
    employmentType: job.type === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: "S-LINx Contractors" },
    jobLocation: { "@type": "Place", address: job.location },
  };

  return (
    <>
      <Navbar />
      <JsonLd data={jobPostingSchema} />

      <section className="border-b border-border bg-primary py-16 text-primary-foreground">
        <div className="container">
          <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-2.5 py-0.5 text-xs font-medium">
            {job.department}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{job.title}</h1>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Posted {new Date(job.posted_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">{job.summary}</p>

            <h2 className="mt-8 font-display text-lg font-semibold">Responsibilities</h2>
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((r: string) => (
                <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-display text-lg font-semibold">Requirements</h2>
            <ul className="mt-3 space-y-2">
              {job.requirements.map((r: string) => (
                <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Apply for this role</h2>
            <p className="mt-1 text-sm text-muted-foreground">We reply to every applicant within 5 business days.</p>
            <div className="mt-5">
              <ApplyForm jobTitle={job.title} jobSlug={job.slug} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
