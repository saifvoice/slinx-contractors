"use client";

import { Users } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusSelect } from "@/components/admin/status-select";
import { updateUserRole } from "./actions";
import type { UserRole } from "@/types/database";

const ROLE_OPTIONS: UserRole[] = ["client", "staff", "admin"];

interface Row {
  id: string;
  full_name: string | null;
  email: string;
  company: string | null;
  role: UserRole;
  created_at: string;
}

export function UsersTable({ rows, currentUserId }: { rows: Row[]; currentUserId: string }) {
  if (rows.length === 0) {
    return <EmptyState icon={Users} title="No users yet" description="Registered clients and staff will appear here." />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Company</th>
            <th className="px-5 py-3 font-medium">Role</th>
            <th className="px-5 py-3 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-b-0">
              <td className="px-5 py-4 font-medium">{r.full_name ?? "—"}</td>
              <td className="px-5 py-4 text-muted-foreground">{r.email}</td>
              <td className="px-5 py-4 text-muted-foreground">{r.company ?? "—"}</td>
              <td className="px-5 py-4">
                {r.id === currentUserId ? (
                  <span className="text-xs capitalize text-muted-foreground">{r.role} (you)</span>
                ) : (
                  <StatusSelect value={r.role} options={ROLE_OPTIONS} onChange={(role) => updateUserRole(r.id, role)} />
                )}
              </td>
              <td className="px-5 py-4 text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
