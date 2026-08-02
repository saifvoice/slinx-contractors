"use client";

import { Quote, Star } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DeleteButton } from "@/components/admin/delete-button";
import { toggleFeatured, deleteTestimonial } from "./actions";
import { cn } from "@/lib/utils";

interface Row {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  company: string | null;
  is_featured: boolean;
}

export function TestimonialsList({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return <EmptyState icon={Quote} title="No testimonials yet" description="Add one above to feature it on the homepage." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rows.map((t) => (
        <div key={t.id} className="flex flex-col rounded-lg border border-border bg-card p-5">
          <p className="flex-1 text-sm text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <div>
              <p className="text-sm font-medium">{t.author_name}</p>
              <p className="text-xs text-muted-foreground">{t.author_role}{t.company ? ` · ${t.company}` : ""}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleFeatured(t.id, !t.is_featured)}
                className={cn("rounded-md p-1.5", t.is_featured ? "text-secondary" : "text-muted-foreground hover:text-foreground")}
                aria-label="Toggle featured"
                title="Feature on homepage"
              >
                <Star className="h-4 w-4" fill={t.is_featured ? "currentColor" : "none"} />
              </button>
              <DeleteButton action={() => deleteTestimonial(t.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
