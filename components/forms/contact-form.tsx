"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { contactMessageSchema, type ContactMessageInput } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
  });

  const onSubmit = async (data: ContactMessageInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-secondary" />
        <p className="font-display text-base font-semibold">Message sent</p>
        <p className="text-sm text-muted-foreground">We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Full name" {...register("name")} error={errors.name?.message} />
        <Input placeholder="Email" type="email" {...register("email")} error={errors.email?.message} />
      </div>
      <Input placeholder="Subject" {...register("subject")} error={errors.subject?.message} />
      <Textarea placeholder="Message" {...register("message")} error={errors.message?.message} />
      <Button type="submit" variant="accent" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send message
      </Button>
      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
