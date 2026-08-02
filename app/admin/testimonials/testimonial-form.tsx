"use client";

import { useActionState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createTestimonial, type TestimonialFormState } from "./actions";

const initialState: TestimonialFormState = {};

export function TestimonialForm() {
  const [state, formAction, pending] = useActionState(createTestimonial, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state?.error) formRef.current?.reset();
  }, [pending, state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 rounded-lg border border-border bg-card p-6 sm:grid-cols-2">
      <Textarea name="quote" placeholder="Quote" className="sm:col-span-2" required />
      <Input name="author_name" placeholder="Author name" required />
      <Input name="author_role" placeholder="Author role" required />
      <Input name="company" placeholder="Company (optional)" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_featured" className="h-4 w-4 rounded border-input" />
        Feature on homepage
      </label>
      {state?.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}
      <Button type="submit" variant="accent" disabled={pending} className="sm:col-span-2 sm:w-fit">
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Add testimonial
      </Button>
    </form>
  );
}
