export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated server-side from typed fields, not raw
      // user input, so this is safe from injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
