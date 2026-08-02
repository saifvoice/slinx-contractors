import Link from "next/link";
import {
  FolderKanban, Zap, Newspaper, Briefcase, Inbox, Mail, Users, ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    { count: projectsCount },
    { count: servicesCount },
    { count: postsCount },
    { count: jobsCount },
    { count: newQuotesCount },
    { count: newMessagesCount },
    { count: usersCount },
    { data: recentQuotes },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("quote_requests")
      .select("id, name, email, service, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Admin Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Site-wide content and lead activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label="New quote requests" value={newQuotesCount ?? 0} />
        <StatCard icon={Mail} label="New contact messages" value={newMessagesCount ?? 0} />
        <StatCard icon={Users} label="Registered users" value={usersCount ?? 0} />
        <StatCard icon={Briefcase} label="Open roles" value={jobsCount ?? 0} />
        <StatCard icon={FolderKanban} label="Projects published" value={projectsCount ?? 0} />
        <StatCard icon={Zap} label="Services listed" value={servicesCount ?? 0} />
        <StatCard icon={Newspaper} label="Blog posts" value={postsCount ?? 0} />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-base font-semibold">Recent quote requests</h2>
          <Link href="/admin/quote-requests" className="flex items-center gap-1 text-sm text-accent hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {!recentQuotes || recentQuotes.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">No quote requests yet.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {recentQuotes.map((q) => (
                <tr key={q.id} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-medium">{q.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{q.email}</td>
                  <td className="px-5 py-3 capitalize text-muted-foreground">{q.service.replace("-", " ")}</td>
                  <td className="px-5 py-3"><StatusBadge status={q.status} /></td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">
                    {new Date(q.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
