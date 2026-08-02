"use client";

import { useActionState, useRef, useEffect } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadMedia, type MediaFormState } from "./actions";

const initialState: MediaFormState = {};

export function MediaUploadForm() {
  const [state, formAction, pending] = useActionState(uploadMedia, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state?.error) formRef.current?.reset();
  }, [pending, state]);

  return (
    <form ref={formRef} action={formAction} className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-5">
      <label className="flex h-11 cursor-pointer items-center gap-2 rounded-md border border-dashed border-input bg-background px-3.5 text-sm text-muted-foreground hover:border-accent">
        <Upload className="h-4 w-4" />
        Choose file
        <input type="file" name="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" required />
      </label>
      <Input name="alt_text" placeholder="Alt text (optional)" className="max-w-xs" />
      <Button type="submit" variant="accent" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Upload
      </Button>
      {state?.error && <p className="w-full text-sm text-destructive">{state.error}</p>}
    </form>
  );
}
