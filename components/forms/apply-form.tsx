"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { jobApplicationSchema, type JobApplicationInput } from "@/lib/validations";

const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function ApplyForm({ jobTitle, jobSlug }: { jobTitle: string; jobSlug: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const onSubmit = async (data: JobApplicationInput) => {
    if (cvFile && cvFile.size > MAX_CV_SIZE_BYTES) {
      setErrorMessage("CV file is too large — please keep it under 5MB");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.set(key, value);
      });
      formData.set("jobSlug", jobSlug);
      if (cvFile) formData.set("cv", cvFile);

      const res = await fetch("/api/careers/apply", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Request failed");
      }
      setStatus("success");
      reset();
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-secondary" />
        <p className="font-display text-base font-semibold">Application submitted</p>
        <p className="text-sm text-muted-foreground">
          Thanks for applying to {jobTitle}. We'll review and follow up by email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Full name" {...register("fullName")} error={errors.fullName?.message} />
        <Input placeholder="Email" type="email" {...register("email")} error={errors.email?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Phone" {...register("phone")} error={errors.phone?.message} />
        <Input placeholder="LinkedIn (optional)" {...register("linkedin")} error={errors.linkedin?.message} />
      </div>

      <div>
        <label className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-md border border-dashed border-input bg-card px-3.5 text-sm text-muted-foreground hover:border-accent">
          <Upload className="h-4 w-4" />
          {cvFile?.name ?? "Upload CV (PDF or DOCX, max 5MB)"}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <Textarea
        placeholder="Briefly, why are you a fit for this role?"
        {...register("coverNote")}
        error={errors.coverNote?.message}
      />

      <Button type="submit" variant="accent" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit application
      </Button>

      {status === "error" && errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </form>
  );
}
