"use client";

import { Briefcase, FileDown } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusSelect } from "@/components/admin/status-select";
import { DeleteButton } from "@/components/admin/delete-button";
import { updateApplicationStatus, deleteApplication } from "./actions";
import type { ApplicationStatus } from "@/types/database";

const STATUS_OPTIONS: ApplicationStatus[] = ["new", "reviewing", "interview", "rejected", "hired"];

interface Row {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string | null;
  cover_note: string;
  cv_url: string | null;
  cv_signed_url?: string | null;
  status: ApplicationStatus;
  created_at: string;
  jobs: { title: string } | null;
}

export function ApplicationsTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return <EmptyState icon={Briefcase} title="No applications" description="Job applications will appear here." />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-5 py-3 font-medium">Applicant</th>
            <th className="px-5 py-3 font-medium">Role</th>
            <th className="px-5 py-3 font-medium">Note</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border align-top last:border-b-0">
              <td className="px-5 py-4">
                <p className="font-medium">{r.full_name}</p>
                <p className="text-xs text-muted-foreground">{r.email}</p>
                <p className="text-xs text-muted-foreground">{r.phone}</p>
                {r.linkedin_url && (
                  <a href={r.linkedin_url} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">
                    LinkedIn
                  </a>
                )}
                {r.cv_signed_url && (
                  <a
                    href={r.cv_signed_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex items-center gap-1 text-xs text-accent hover:underline"
                  >
                    <FileDown className="h-3 w-3" /> Download CV
                  </a>
                )}
              </td>
              <td className="px-5 py-4">{r.jobs?.title ?? "—"}</td>
              <td className="max-w-xs px-5 py-4 text-muted-foreground">
                <p className="line-clamp-3">{r.cover_note}</p>
              </td>
              <td className="px-5 py-4">
                <StatusSelect value={r.status} options={STATUS_OPTIONS} onChange={(s) => updateApplicationStatus(r.id, s)} />
              </td>
              <td className="px-5 py-4 text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td className="px-5 py-4">
                <DeleteButton action={() => deleteApplication(r.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
