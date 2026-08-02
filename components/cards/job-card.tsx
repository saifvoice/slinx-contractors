import Link from "next/link";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

export interface JobCardData {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

export function JobCard({ job }: { job: JobCardData }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {job.department}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-accent">
          {job.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {job.type}
          </span>
        </div>
      </div>
      <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-accent">
        View role
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
