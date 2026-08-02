import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ContactInfoForm, CompanyStatsForm } from "./settings-forms";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("site_settings").select("key, value");

  const contactInfo = (rows?.find((r) => r.key === "contact_info")?.value ?? {}) as Record<string, string>;
  const companyStats = (rows?.find((r) => r.key === "company_stats")?.value ?? {}) as Record<string, string>;

  return (
    <div className="max-w-2xl space-y-8">
      <AdminPageHeader title="Site Settings" description="Global values used across the public site." />

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Contact Information</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Shown in the footer and the Contact page.
        </p>
        <div className="mt-4">
          <ContactInfoForm value={contactInfo} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Homepage Stats</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          The four numbers shown in the homepage stats strip.
        </p>
        <div className="mt-4">
          <CompanyStatsForm value={companyStats} />
        </div>
      </div>
    </div>
  );
}
