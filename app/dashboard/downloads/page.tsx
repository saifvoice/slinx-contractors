import { Download as DownloadIcon, FileDown } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/empty-state";

export default async function DownloadsPage() {
  const supabase = await createClient();
  const { data: downloads } = await supabase
    .from("downloads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Downloads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Project documents, reports and design files shared with you.
        </p>
      </div>

      {!downloads || downloads.length === 0 ? (
        <EmptyState
          icon={DownloadIcon}
          title="Nothing here yet"
          description="Documents your project team shares with you — site reports, drawings, warranties — will appear here."
        />
      ) : (
        <div className="grid gap-3">
          {downloads.map((file) => (
            <a
              key={file.id}
              href={file.file_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <FileDown className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{file.file_name}</p>
                  {file.category && (
                    <p className="text-xs text-muted-foreground">{file.category}</p>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(file.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
