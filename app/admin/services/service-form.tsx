"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createService, updateService, type ServiceFormState } from "./actions";

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  description: string;
  capabilities: string[];
  status: string;
};

const initialState: ServiceFormState = {};

export function ServiceForm({ service }: { service?: ServiceRow }) {
  const action = service ? updateService.bind(null, service.id) : createService;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="title" placeholder="Title" defaultValue={service?.title} required />
        <Input name="slug" placeholder="slug-in-kebab-case" defaultValue={service?.slug} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <select name="category" defaultValue={service?.category ?? "ict"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="ict">ICT</option>
          <option value="renewable_energy">Renewable Energy</option>
        </select>
        <Input name="icon" placeholder="Lucide icon name (e.g. Zap)" defaultValue={service?.icon ?? "Zap"} />
        <select name="status" defaultValue={service?.status ?? "draft"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <Textarea name="summary" placeholder="One-line summary (used on cards)" defaultValue={service?.summary} required />
      <Textarea name="description" placeholder="Full description" defaultValue={service?.description} className="min-h-[140px]" required />
      <Input name="capabilities" placeholder="Capabilities, comma separated" defaultValue={service?.capabilities?.join(", ")} />

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" variant="accent" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {service ? "Save changes" : "Create service"}
      </Button>
    </form>
  );
}
