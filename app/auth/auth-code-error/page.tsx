import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";

export default function AuthCodeErrorPage() {
  return (
    <>
      <Navbar />
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="font-display text-xl font-semibold">That link didn't work</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The sign-in link may have expired or already been used. Request a new one and try again.
        </p>
        <Link href="/login" className="mt-6">
          <Button variant="accent">Back to login</Button>
        </Link>
      </section>
      <Footer />
    </>
  );
}
