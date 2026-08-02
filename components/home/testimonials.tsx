import { Quote } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function Testimonials() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("sort_order")
    .limit(3);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="border-b border-border bg-muted/40 py-20">
      <div className="container">
        <div className="mb-10 max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            Client feedback
          </span>
          <h2 className="mt-2 text-2xl font-display font-semibold sm:text-3xl">
            What clients say
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-lg border border-border bg-card p-6">
              <Quote className="h-6 w-6 text-secondary" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-medium">{t.author_name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.author_role}{t.company ? ` · ${t.company}` : ""}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
