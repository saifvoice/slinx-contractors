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
  title: "ICT Solutions",
  description:
    "Networking, structured cabling, cybersecurity, cloud, software and IT support for businesses that can't afford downtime.",
};

export default async function IctServicesPage() {
  const supabase = await createClient();
  const { data: ictServices } = await supabase
    .from("services")
    .select("*")
    .eq("category", "ict")
    .eq("status", "published")
    .order("sort_order");

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="ICT Solutions"
        title="Digital infrastructure that doesn't go down"
        description="From structured cabling to cybersecurity, we design and support the systems your business runs on."
      />

      <section className="py-20">
        <div className="container space-y-16">
          {(ictServices ?? []).map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-24 gap-8 border-b border-border pb-16 last:border-b-0 last:pb-0 lg:grid-cols-[1fr_1.4fr]"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold">{service.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
                  <Link href="/contact/quote" className="mt-5 inline-block">
                    <Button variant="accent" size="sm">
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
