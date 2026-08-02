import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="py-16">
        <div className="container max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            This placeholder will be replaced with S-LINx Contractors' final terms governing use
            of this website and the client/admin portals.
          </p>
          <h2 className="font-display text-base font-semibold text-foreground">Use of this site</h2>
          <p>
            Content on this site is provided for informational purposes. Project quotes are
            estimates until confirmed in a signed proposal.
          </p>
          <h2 className="font-display text-base font-semibold text-foreground">Client portal</h2>
          <p>
            Access to the client dashboard is granted per project and may be revoked on contract
            completion or breach of these terms.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
