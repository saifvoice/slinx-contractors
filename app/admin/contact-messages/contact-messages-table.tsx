"use client";

import { Mail } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusSelect } from "@/components/admin/status-select";
import { DeleteButton } from "@/components/admin/delete-button";
import { updateContactMessageStatus, deleteContactMessage } from "./actions";
import type { ContactMessageStatus } from "@/types/database";

const STATUS_OPTIONS: ContactMessageStatus[] = ["new", "read", "replied"];

interface Row {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
}

export function ContactMessagesTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState icon={Mail} title="No messages" description="Submissions from the contact form will appear here." />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-5 py-3 font-medium">From</th>
            <th className="px-5 py-3 font-medium">Subject</th>
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
                <p className="text-xs text-muted-foreground">{r.email}</p>
              </td>
              <td className="px-5 py-4">{r.subject}</td>
              <td className="max-w-xs px-5 py-4 text-muted-foreground">
                <p className="line-clamp-3">{r.message}</p>
              </td>
              <td className="px-5 py-4">
                <StatusSelect value={r.status} options={STATUS_OPTIONS} onChange={(s) => updateContactMessageStatus(r.id, s)} />
              </td>
              <td className="px-5 py-4 text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td className="px-5 py-4">
                <DeleteButton action={() => deleteContactMessage(r.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
