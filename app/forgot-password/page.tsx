"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordReset, type AuthActionState } from "@/lib/supabase/auth-actions";

const initialState: AuthActionState = {};

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);
  const submitted = !pending && state && !state.error && Object.keys(state).length === 0;

  return (
    <>
      <Navbar />
      <section className="flex min-h-[70vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
          <h1 className="font-display text-xl font-semibold">Reset your password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll email you a link to set a new password.
          </p>

          {submitted ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-md bg-secondary/10 p-4 text-center">
              <CheckCircle2 className="h-6 w-6 text-secondary" />
              <p className="text-sm">If that email is registered, a reset link is on its way.</p>
            </div>
          ) : (
            <form action={formAction} className="mt-6 space-y-4">
              <Input name="email" type="email" placeholder="Email" required />
              {state?.error && <p className="text-xs text-destructive">{state.error}</p>}
              <Button type="submit" variant="accent" className="w-full" disabled={pending}>
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                Send reset link
              </Button>
            </form>
          )}

          <p className="mt-5 text-center text-xs text-muted-foreground">
            <Link href="/login" className="text-accent hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
