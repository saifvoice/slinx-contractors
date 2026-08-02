import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getIcon } from "@/lib/icon-map";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Renewable Energy",
  description:
    "Solar installations, battery storage, hybrid systems and EV charging engineered against real load data.",
};

export default async function RenewableEnergyServicesPage() {
  const supabase = await createClient();
  const { data: energyServices } = await supabase
    .from("services")
    .select("*")
    .eq("category", "renewable_energy")
    .eq("status", "published")
    .order("sort_order");

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Renewable Energy"
        title="Power systems engineered to your actual load"
        description="From residential rooftops to industrial hybrid systems, every design starts with real consumption data — not assumptions."
      />

      <section className="py-20">
        <div className="container space-y-16">
          {(energyServices ?? []).map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-24 gap-8 border-b border-border pb-16 last:border-b-0 last:pb-0 lg:grid-cols-[1fr_1.4fr]"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/10 text-secondary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold">{service.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
                  <Link href="/contact/quote" className="mt-5 inline-block">
                    <Button variant="secondary" size="sm">
                      Request a quote
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    What's included
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.capabilities.map((cap: string) => (
                      <li key={cap} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
