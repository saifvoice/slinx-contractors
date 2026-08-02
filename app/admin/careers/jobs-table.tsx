"use client";

import Link from "next/link";
import { Briefcase, Pencil } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteJob } from "./actions";

interface Row {
  id: string;
  title: string;
  department: string;
  location: string;
  status: string;
}

export function JobsTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return <EmptyState icon={Briefcase} title="No roles posted" description="Post your first opening to show it on the careers page." />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-5 py-3 font-medium">Title</th>
            <th className="px-5 py-3 font-medium">Department</th>
            <th className="px-5 py-3 font-medium">Location</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-b-0">
              <td className="px-5 py-4 font-medium">{r.title}</td>
              <td className="px-5 py-4 text-muted-foreground">{r.department}</td>
              <td className="px-5 py-4 text-muted-foreground">{r.location}</td>
              <td className="px-5 py-4"><StatusBadge status={r.status} /></td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-1">
                  <Link href={`/admin/careers/${r.id}/edit`} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteButton action={() => deleteJob(r.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
