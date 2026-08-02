import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Building2, Calendar, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { coverGradientFor } from "@/lib/cover-gradient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, summary")
    .eq("slug", slug)
    .single();

  if (!project) return {};
  return { title: project.title, description: project.summary, alternates: { canonical: `/projects/${slug}` } };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*, project_services(services(slug, title, category))")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!project) notFound();

  const coverGradient = coverGradientFor(project.slug);
  const relatedServices = (project.project_services ?? [])
    .map((ps: any) => ps.services)
    .filter(Boolean);

  return (
    <>
      <Navbar />

      <section className={`border-b border-border bg-gradient-to-br ${coverGradient} py-20 text-primary-foreground`}>
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">
            {project.category}
          </span>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-primary-foreground/80">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" /> {project.client_name}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {project.location}
            </span>
            {project.timeline && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {project.timeline}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <h2 className="mt-10 font-display text-xl font-semibold">Results</h2>
            <ul className="mt-3 space-y-2">
              {(project.results ?? []).map((r: string) => (
                <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Technologies used
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(project.technologies ?? []).map((t: string) => (
                  <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {relatedServices.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Related services
                </p>
                <ul className="mt-3 space-y-2">
                  {relatedServices.map((s: any) => {
                    const base = s.category === "ict" ? "/services/ict" : "/services/renewable-energy";
                    return (
                      <li key={s.slug}>
                        <Link href={`${base}#${s.slug}`} className="text-sm font-medium text-accent hover:underline">
                          {s.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <Link href="/contact/quote">
              <Button variant="accent" className="w-full">
                Start a similar project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
