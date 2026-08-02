import Link from "next/link";
import { FileText, Receipt, Download, MessageSquare, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: quotesCount }, { count: invoicesCount }, { count: downloadsCount }, { count: unreadCount }] =
    await Promise.all([
      supabase.from("quotes").select("*", { count: "exact", head: true }),
      supabase.from("invoices").select("*", { count: "exact", head: true }).eq("status", "unpaid"),
      supabase.from("downloads").select("*", { count: "exact", head: true }),
      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("recipient_id", user?.id ?? "")
        .eq("is_read", false),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening with your projects.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Quotes" value={quotesCount ?? 0} />
        <StatCard icon={Receipt} label="Unpaid invoices" value={invoicesCount ?? 0} />
        <StatCard icon={Download} label="Downloads available" value={downloadsCount ?? 0} />
        <StatCard icon={MessageSquare} label="Unread messages" value={unreadCount ?? 0} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/contact/quote">
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/40">
            <div>
              <p className="text-sm font-medium">Request a new quote</p>
              <p className="text-xs text-muted-foreground">Scope a new project</p>
            </div>
            <ArrowRight className="h-4 w-4 text-accent" />
          </div>
        </Link>
        <Link href="/dashboard/messages">
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/40">
            <div>
              <p className="text-sm font-medium">Message your team</p>
              <p className="text-xs text-muted-foreground">Get an update on a project</p>
            </div>
            <ArrowRight className="h-4 w-4 text-accent" />
          </div>
        </Link>
        <Link href="/dashboard/profile">
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/40">
            <div>
              <p className="text-sm font-medium">Update your profile</p>
              <p className="text-xs text-muted-foreground">Keep your contact info current</p>
            </div>
            <ArrowRight className="h-4 w-4 text-accent" />
          </div>
        </Link>
      </div>
    </div>
  );
}
