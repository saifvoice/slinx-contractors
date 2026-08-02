import { trustedCompanies } from "@/lib/data/home";

export function TrustedCompanies() {
  return (
    <section className="border-b border-border py-10">
      <div className="container">
        <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Trusted by operations teams across industries
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustedCompanies.map((name) => (
            <span
              key={name}
              className="font-display text-sm font-semibold text-muted-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
