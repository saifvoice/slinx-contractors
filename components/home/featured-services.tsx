import { createClient } from "@/lib/supabase/server";
import { ServiceCard } from "@/components/cards/service-card";

export async function FeaturedServices() {
  const supabase = await createClient();
  const [{ data: ict }, { data: energy }] = await Promise.all([
    supabase.from("services").select("*").eq("category", "ict").eq("status", "published").order("sort_order").limit(3),
    supabase.from("services").select("*").eq("category", "renewable_energy").eq("status", "published").order("sort_order").limit(3),
  ]);
  const featured = [...(ict ?? []), ...(energy ?? [])];

  if (featured.length === 0) return null;

  return (
    <section className="border-b border-border py-20">
      <div className="container">
        <div className="mb-10 max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            What we do
          </span>
          <h2 className="mt-2 text-2xl font-display font-semibold sm:text-3xl">
            Two disciplines, one contractor
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We deliver ICT infrastructure and renewable energy systems as a single
            accountable team — fewer handoffs, faster delivery.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard
              key={service.slug}
              service={{ slug: service.slug, title: service.title, summary: service.summary, icon: service.icon, category: service.category }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
