import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, company, email")
    .eq("id", user?.id ?? "")
    .single();

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Keep your contact details current.</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Contact information</h2>
        <div className="mt-4">
          <ProfileForm
            fullName={profile?.full_name ?? null}
            phone={profile?.phone ?? null}
            company={profile?.company ?? null}
            email={profile?.email ?? user?.email ?? ""}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Password</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose a new password of at least 8 characters.
        </p>
        <div className="mt-4">
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
