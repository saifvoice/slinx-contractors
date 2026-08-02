"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteMedia } from "./actions";

interface Row {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  storage_path: string;
}

export function MediaGrid({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return <EmptyState icon={ImageIcon} title="No media yet" description="Upload an image above to use it across the site." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {rows.map((f) => (
        <div key={f.id} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="relative flex h-32 items-center justify-center bg-muted">
            {f.file_type === "image/svg+xml" ? (
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Image src={f.file_url} alt={f.file_name} fill className="object-cover" unoptimized />
            )}
          </div>
          <div className="flex items-center justify-between gap-2 p-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{f.file_name}</p>
              <p className="text-[10px] text-muted-foreground">{f.file_type}</p>
            </div>
            <DeleteButton action={() => deleteMedia(f.id, f.storage_path)} />
          </div>
        </div>
      ))}
    </div>
  );
}
