import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.slinxcontractors.com";

const staticRoutes = [
  "", "/about", "/services/ict", "/services/renewable-energy", "/projects", "/blog",
  "/careers", "/contact", "/contact/quote", "/privacy-policy", "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: projects }, { data: posts }, { data: jobs }] = await Promise.all([
    supabase.from("projects").select("slug, updated_at").eq("status", "published"),
    supabase.from("blog_posts").select("slug, updated_at").eq("status", "published"),
    supabase.from("jobs").select("slug, updated_at").eq("status", "open"),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const jobEntries: MetadataRoute.Sitemap = (jobs ?? []).map((j) => ({
    url: `${SITE_URL}/careers/${j.slug}`,
    lastModified: new Date(j.updated_at),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...projectEntries, ...postEntries, ...jobEntries];
}
