import { cn } from "@/lib/utils";

const defaultStyles: Record<string, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-amber-500/10 text-amber-600",
  quoted: "bg-secondary/10 text-secondary",
  won: "bg-secondary/10 text-secondary",
  lost: "bg-destructive/10 text-destructive",
  read: "bg-muted text-muted-foreground",
  replied: "bg-secondary/10 text-secondary",
  reviewing: "bg-amber-500/10 text-amber-600",
  interview: "bg-accent/10 text-accent",
  rejected: "bg-destructive/10 text-destructive",
  hired: "bg-secondary/10 text-secondary",
  published: "bg-secondary/10 text-secondary",
  draft: "bg-muted text-muted-foreground",
  archived: "bg-destructive/10 text-destructive",
  open: "bg-secondary/10 text-secondary",
  closed: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        defaultStyles[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
}
