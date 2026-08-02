"use client";

import { useActionState, useRef, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { sendMessage, type MessageActionState } from "./actions";

const initialState: MessageActionState = {};

export function MessageComposer() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state?.error) {
      formRef.current?.reset();
    }
  }, [pending, state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <Textarea name="body" placeholder="Write a message to your project team..." required className="min-h-[90px]" />
      {state?.error && <p className="text-xs text-destructive">{state.error}</p>}
      <Button type="submit" variant="accent" className="self-end" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send
      </Button>
    </form>
  );
}
