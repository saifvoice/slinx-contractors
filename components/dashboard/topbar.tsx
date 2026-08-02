import { signOut } from "@/lib/supabase/auth-actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function DashboardTopbar({
  name,
  email,
}: {
  name: string | null;
  email: string;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div>
        <p className="text-sm font-medium">{name ?? email}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
      <form action={signOut}>
        <Button type="submit" variant="ghost" size="sm">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </form>
    </header>
  );
}
