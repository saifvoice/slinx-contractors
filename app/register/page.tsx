"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp, type AuthActionState } from "@/lib/supabase/auth-actions";

const initialState: AuthActionState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <>
      <Navbar />
      <section className="flex min-h-[75vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
          <h1 className="font-display text-xl font-semibold">Create a Client Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track quotes, invoices and project updates in one place.
          </p>

          <form action={formAction} className="mt-6 space-y-4">
            <Input name="fullName" placeholder="Full name" required />
            <Input name="company" placeholder="Company (optional)" />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" minLength={8} required />

            {state?.error && <p className="text-xs text-destructive">{state.error}</p>}

            <Button type="submit" variant="accent" className="w-full" disabled={pending}>
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
