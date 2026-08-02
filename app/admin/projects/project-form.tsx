"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createProject, updateProject, type ProjectFormState } from "./actions";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  location: string;
  industry: string;
  category: string;
  summary: string;
  description: string;
  timeline: string | null;
  technologies: string[];
  results: string[];
  status: string;
};

const initialState: ProjectFormState = {};

export function ProjectForm({ project }: { project?: ProjectRow }) {
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="title" placeholder="Title" defaultValue={project?.title} required />
        <Input name="slug" placeholder="slug-in-kebab-case" defaultValue={project?.slug} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="client_name" placeholder="Client name" defaultValue={project?.client_name} required />
        <Input name="location" placeholder="Location" defaultValue={project?.location} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <select name="industry" defaultValue={project?.industry ?? "ict"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="ict">ICT</option>
          <option value="renewable_energy">Renewable Energy</option>
        </select>
        <Input name="category" placeholder="Category (e.g. Networking)" defaultValue={project?.category} required />
        <select name="status" defaultValue={project?.status ?? "draft"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <Input name="timeline" placeholder="Timeline (e.g. 14 weeks)" defaultValue={project?.timeline ?? ""} />
      <Textarea name="summary" placeholder="Short summary (used on cards)" defaultValue={project?.summary} required />
      <Textarea name="description" placeholder="Full description" defaultValue={project?.description} className="min-h-[160px]" required />
      <Input name="technologies" placeholder="Technologies, comma separated" defaultValue={project?.technologies?.join(", ")} />
      <Input name="results" placeholder="Results, comma separated" defaultValue={project?.results?.join(", ")} />

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" variant="accent" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {project ? "Save changes" : "Create project"}
      </Button>
    </form>
  );
}
