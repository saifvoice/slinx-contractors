import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/cards/project-card";
import { createClient } from "@/lib/supabase/server";
import { coverGradientFor } from "@/lib/cover-gradient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of ICT infrastructure and renewable energy projects delivered by S-LINx Contractors.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Our Work"
        title="Projects across ICT and renewable energy"
        description="Every project here shipped with a documented scope, timeline and measured result."
      />
      <section className="py-20">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(projects ?? []).map((project) => (
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
      </section>
      <Footer />
    </>
  );
}
