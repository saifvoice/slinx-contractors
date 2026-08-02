export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-primary py-16 text-primary-foreground">
      <div className="container">
        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {eyebrow}
        </span>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-sm text-primary-foreground/70">{description}</p>
        )}
      </div>
    </section>
  );
}
