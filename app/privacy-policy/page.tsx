import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16">
        <div className="container max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            This placeholder policy will be replaced with S-LINx Contractors' final legal copy
            covering data collection, quote/contact form submissions, cookies, and third-party
            processors (Supabase, Vercel).
          </p>
          <h2 className="font-display text-base font-semibold text-foreground">Information we collect</h2>
          <p>
            Contact details submitted through quote requests, contact forms and job applications,
            including name, email, phone number and any files uploaded (e.g. CVs).
          </p>
          <h2 className="font-display text-base font-semibold text-foreground">How we use it</h2>
          <p>
            To respond to enquiries, scope proposals, process job applications, and — with
            consent — send occasional updates about our services.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
