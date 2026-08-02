import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import { coverGradientFor } from "@/lib/cover-gradient";

export async function FeaturedProjects() {
  const supabase = await createClient();
  const { data: featured } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3);

  if (!featured || featured.length === 0) return null;

  return (
    <section className="border-b border-border py-20">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Selected work
            </span>
            <h2 className="mt-2 text-2xl font-display font-semibold sm:text-3xl">
              Recent projects
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="outline">
              All projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={{
                slug: project.slug,
                title: project.title,
                summary: project.summary,
                category: project.category,
                location: project.location,
                coverGradient: coverGradientFor(project.slug),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
