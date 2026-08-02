"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/validations";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
  });

  const onSubmit = async (data: QuoteRequestInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote-requests", {
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
      <div className="flex flex-col items-center gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-secondary" />
        <p className="font-display text-lg font-semibold">Quote request received</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          We'll come back with a scoped proposal within two business days.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* honeypot field, hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Full name" {...register("name")} error={errors.name?.message} />
        <Input placeholder="Company (optional)" {...register("company")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Email" type="email" {...register("email")} error={errors.email?.message} />
        <Input placeholder="Phone" {...register("phone")} error={errors.phone?.message} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <select
            {...register("service")}
            defaultValue=""
            className="flex h-11 w-full rounded-md border border-input bg-card px-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <option value="" disabled>
              Service area
            </option>
            <option value="ict">ICT Solutions</option>
            <option value="renewable-energy">Renewable Energy</option>
            <option value="both">Both</option>
          </select>
          {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service.message}</p>}
        </div>
        <Input placeholder="Estimated budget (optional)" {...register("budget")} />
      </div>

      <Textarea
        placeholder="Tell us about the project — scope, location, timeline"
        {...register("message")}
        error={errors.message?.message}
      />

      <Button type="submit" variant="accent" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit quote request
      </Button>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong sending your request — please try again.
        </p>
      )}
    </form>
  );
}
