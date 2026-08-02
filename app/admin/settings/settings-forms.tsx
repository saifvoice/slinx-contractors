"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateContactInfo, updateCompanyStats, type SettingsFormState } from "./actions";

const initialState: SettingsFormState = {};

export function ContactInfoForm({ value }: { value: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(updateContactInfo, initialState);

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <Input name="phone" placeholder="Phone" defaultValue={value.phone} />
      <Input name="email" placeholder="Email" defaultValue={value.email} />
      <Input name="whatsapp" placeholder="WhatsApp link" defaultValue={value.whatsapp} />
      <Input name="address" placeholder="Office address" defaultValue={value.address} />
      {state?.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}
      {state?.success && (
        <p className="flex items-center gap-1.5 text-xs text-secondary sm:col-span-2">
          <CheckCircle2 className="h-3.5 w-3.5" /> Saved
        </p>
      )}
      <Button type="submit" variant="accent" disabled={pending} className="sm:col-span-2 sm:w-fit">
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Save contact info
      </Button>
    </form>
  );
}

export function CompanyStatsForm({ value }: { value: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(updateCompanyStats, initialState);

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <Input name="projects_delivered" placeholder="Projects delivered (e.g. 180+)" defaultValue={value.projects_delivered} />
      <Input name="mw_installed" placeholder="MW installed (e.g. 42)" defaultValue={value.mw_installed} />
      <Input name="years_in_operation" placeholder="Years in operation (e.g. 12)" defaultValue={value.years_in_operation} />
      <Input name="client_retention_rate" placeholder="Client retention (e.g. 94%)" defaultValue={value.client_retention_rate} />
      {state?.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}
      {state?.success && (
        <p className="flex items-center gap-1.5 text-xs text-secondary sm:col-span-2">
          <CheckCircle2 className="h-3.5 w-3.5" /> Saved
        </p>
      )}
      <Button type="submit" variant="accent" disabled={pending} className="sm:col-span-2 sm:w-fit">
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Save homepage stats
      </Button>
    </form>
  );
}
