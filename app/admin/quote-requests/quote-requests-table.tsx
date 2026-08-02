"use client";

import { Inbox } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusSelect } from "@/components/admin/status-select";
import { DeleteButton } from "@/components/admin/delete-button";
import { updateQuoteRequestStatus, deleteQuoteRequest } from "./actions";
import type { QuoteRequestStatus } from "@/types/database";

const STATUS_OPTIONS: QuoteRequestStatus[] = ["new", "contacted", "quoted", "won", "lost"];

interface Row {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  service: string;
  budget: string | null;
  message: string;
  status: QuoteRequestStatus;
  created_at: string;
}

export function QuoteRequestsTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No quote requests"
        description="Submissions from the public quote form will appear here."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-5 py-3 font-medium">Contact</th>
            <th className="px-5 py-3 font-medium">Service</th>
            <th className="px-5 py-3 font-medium">Message</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border align-top last:border-b-0">
              <td className="px-5 py-4">
                <p className="font-medium">{r.name}</p>
                {r.company && <p className="text-xs text-muted-foreground">{r.company}</p>}
                <p className="text-xs text-muted-foreground">{r.email}</p>
                <p className="text-xs text-muted-foreground">{r.phone}</p>
              </td>
              <td className="px-5 py-4 capitalize text-muted-foreground">{r.service.replace("-", " ")}</td>
              <td className="max-w-xs px-5 py-4 text-muted-foreground">
                <p className="line-clamp-3">{r.message}</p>
                {r.budget && <p className="mt-1 text-xs">Budget: {r.budget}</p>}
              </td>
              <td className="px-5 py-4">
                <StatusSelect
                  value={r.status}
                  options={STATUS_OPTIONS}
                  onChange={(status) => updateQuoteRequestStatus(r.id, status)}
                />
              </td>
              <td className="px-5 py-4 text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td className="px-5 py-4">
                <DeleteButton action={() => deleteQuoteRequest(r.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
