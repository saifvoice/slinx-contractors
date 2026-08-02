import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Stats } from "@/components/home/stats";
import { Target, Eye, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "S-LINx Contractors combines ICT infrastructure and renewable energy expertise under one accountable team.",
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To deliver ICT and renewable energy infrastructure that businesses can depend on — engineered to real conditions, not brochure specs.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "A future where reliable connectivity and clean power are standard infrastructure for every business, not a premium add-on.",
  },
  {
    icon: ShieldCheck,
    title: "How We Work",
    body: "One accountable team across both disciplines — fewer handoffs, fewer excuses, and a single point of contact from scoping to commissioning.",
  },
];

const leadership = [
  { name: "Tunde Bakare", role: "Head of ICT Infrastructure" },
  { name: "Amaka Eze", role: "Head of Renewable Energy Engineering" },
  { name: "Grace Nwosu", role: "Head of Operations" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="About S-LINx"
        title="Two disciplines. One accountable contractor."
        description="Founded to close the gap between IT infrastructure providers and energy contractors, we deliver both under a single team and a single point of accountability."
      />

      <section className="border-b border-border py-20">
        <div className="container grid gap-6 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-lg border border-border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/10 text-accent">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Stats />

      <section className="border-b border-border py-20">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            Leadership
          </span>
          <h2 className="mt-2 text-2xl font-display font-semibold sm:text-3xl">
            The team behind the work
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {leadership.map((person) => (
              <div key={person.name} className="rounded-lg border border-border bg-card p-6">
                <div className="h-32 w-full rounded-md bg-gradient-to-br from-primary to-accent" />
                <p className="mt-4 font-display text-base font-semibold">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
