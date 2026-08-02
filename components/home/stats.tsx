import { createClient } from "@/lib/supabase/server";

const FALLBACK = { projects_delivered: "180+", mw_installed: "42", years_in_operation: "12", client_retention_rate: "94%" };

export async function Stats() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "company_stats").single();
  const s = (data?.value as Record<string, string>) ?? FALLBACK;

  const stats = [
    { label: "Projects delivered", value: s.projects_delivered ?? FALLBACK.projects_delivered },
    { label: "MW of solar installed", value: s.mw_installed ?? FALLBACK.mw_installed },
    { label: "Years in operation", value: s.years_in_operation ?? FALLBACK.years_in_operation },
    { label: "Client retention rate", value: s.client_retention_rate ?? FALLBACK.client_retention_rate },
  ];

  return (
    <section className="border-b border-border bg-primary py-16 text-primary-foreground">
      <div className="container grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:text-left">
            <p className="font-display text-4xl font-semibold text-secondary">{stat.value}</p>
            <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
