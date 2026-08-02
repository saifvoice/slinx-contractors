import Link from "next/link";
import { MapPin } from "lucide-react";

export interface ProjectCardData {
  slug: string;
  title: string;
  summary: string;
  category: string;
  location: string;
  coverGradient: string;
}

export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent/40"
    >
      <div className={`h-44 w-full bg-gradient-to-br ${project.coverGradient}`} />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-medium uppercase tracking-wide text-secondary">
          {project.category}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {project.location}
        </div>
      </div>
    </Link>
  );
}
