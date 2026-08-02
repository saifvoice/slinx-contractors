"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile, type ProfileActionState } from "./actions";

const initialState: ProfileActionState = {};

export function ProfileForm({
  fullName,
  phone,
  company,
  email,
}: {
  fullName: string | null;
  phone: string | null;
  company: string | null;
  email: string;
}) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="text-xs font-medium text-muted-foreground">Email</label>
        <Input value={email} disabled className="mt-1" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Full name</label>
        <Input name="fullName" defaultValue={fullName ?? ""} className="mt-1" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Phone</label>
        <Input name="phone" defaultValue={phone ?? ""} className="mt-1" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Company</label>
        <Input name="company" defaultValue={company ?? ""} className="mt-1" />
      </div>

      {state?.error && <p className="text-xs text-destructive">{state.error}</p>}
      {state?.success && (
        <p className="flex items-center gap-1.5 text-xs text-secondary">
          <CheckCircle2 className="h-3.5 w-3.5" /> Profile updated
        </p>
      )}

      <Button type="submit" variant="accent" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}
