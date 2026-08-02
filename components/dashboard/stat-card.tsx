import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-display text-2xl font-semibold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
