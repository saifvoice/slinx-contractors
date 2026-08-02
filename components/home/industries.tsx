import Link from "next/link";
import { ArrowRight, Cpu, Sun } from "lucide-react";

const industries = [
  {
    icon: Cpu,
    title: "ICT Solutions",
    href: "/services/ict",
    description:
      "Networking, cybersecurity, cloud and custom software for businesses that can't afford downtime.",
    accent: "text-accent bg-accent/10",
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    href: "/services/renewable-energy",
    description:
      "Solar, battery storage and EV infrastructure engineered against real load data, not assumptions.",
    accent: "text-secondary bg-secondary/10",
  },
];

export function Industries() {
  return (
    <section className="border-b border-border py-20">
      <div className="container grid gap-6 lg:grid-cols-2">
        {industries.map((ind) => (
          <Link
            key={ind.title}
            href={ind.href}
            className="group flex flex-col justify-between rounded-lg border border-border bg-card p-8 transition-colors hover:border-accent/40"
          >
            <div>
              <span className={`flex h-12 w-12 items-center justify-center rounded-md ${ind.accent}`}>
                <ind.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{ind.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{ind.description}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Explore {ind.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
