import { MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/dashboard/empty-state";
import { MessageComposer } from "./message-composer";
import { cn } from "@/lib/utils";

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mark received messages as read on view.
  if (user) {
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("recipient_id", user.id)
      .eq("is_read", false);
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="flex h-full flex-col space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Direct line to your project team.
        </p>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border border-border bg-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {!messages || messages.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No messages yet"
              description="Send a message below and your project team will get back to you here."
            />
          ) : (
            messages.map((msg) => {
              const isOwn = msg.sender_id === user?.id;
              return (
                <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-md rounded-lg px-4 py-2.5 text-sm",
                      isOwn ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                    )}
                  >
                    <p>{msg.body}</p>
                    <p
                      className={cn(
                        "mt-1 text-[10px]",
                        isOwn ? "text-accent-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      {new Date(msg.created_at).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-border p-4">
          <MessageComposer />
        </div>
      </div>
    </div>
  );
}
