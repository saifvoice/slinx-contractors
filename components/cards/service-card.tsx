import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";

export interface ServiceCardData {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  category: "ict" | "renewable_energy";
}

export function ServiceCard({ service }: { service: ServiceCardData }) {
  const Icon = getIcon(service.icon);
  const base = service.category === "ict" ? "/services/ict" : "/services/renewable-energy";

  return (
    <Link
      href={`${base}#${service.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/40"
    >
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-display text-base font-semibold">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Learn more
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
