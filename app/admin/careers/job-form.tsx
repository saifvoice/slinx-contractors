"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createJob, updateJob, type JobFormState } from "./actions";

type JobRow = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status: string;
};

const initialState: JobFormState = {};

export function JobForm({ job }: { job?: JobRow }) {
  const action = job ? updateJob.bind(null, job.id) : createJob;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="title" placeholder="Job title" defaultValue={job?.title} required />
        <Input name="slug" placeholder="slug-in-kebab-case" defaultValue={job?.slug} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <select name="department" defaultValue={job?.department ?? "ICT"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="ICT">ICT</option>
          <option value="Renewable Energy">Renewable Energy</option>
          <option value="Operations">Operations</option>
        </select>
        <select name="type" defaultValue={job?.type ?? "Full-time"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="Full-time">Full-time</option>
          <option value="Contract">Contract</option>
        </select>
        <select name="status" defaultValue={job?.status ?? "open"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <Input name="location" placeholder="Location" defaultValue={job?.location} required />
      <Textarea name="summary" placeholder="One-line summary" defaultValue={job?.summary} required />
      <Textarea
        name="responsibilities"
        placeholder="Responsibilities — one per line"
        defaultValue={job?.responsibilities?.join("\n")}
        className="min-h-[120px]"
      />
      <Textarea
        name="requirements"
        placeholder="Requirements — one per line"
        defaultValue={job?.requirements?.join("\n")}
        className="min-h-[120px]"
      />

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" variant="accent" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {job ? "Save changes" : "Post role"}
      </Button>
    </form>
  );
}
