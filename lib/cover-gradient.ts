// Deterministic placeholder cover gradient for content that doesn't have a
// real image yet — picks consistently from the slug so the same project
// always gets the same look, without needing a stored value in the DB.
const GRADIENTS = [
  "from-primary via-primary to-accent",
  "from-secondary via-secondary to-accent",
  "from-primary via-accent to-primary",
  "from-secondary via-primary to-secondary",
  "from-accent via-primary to-accent",
  "from-secondary via-accent to-primary",
];

export function coverGradientFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return GRADIENTS[hash % GRADIENTS.length];
}
