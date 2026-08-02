import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";
import { BlogCard } from "@/components/cards/blog-card";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes on ICT infrastructure and renewable energy from the S-LINx engineering team.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Insights"
        title="Notes from the field"
        description="Practical write-ups from the engineers doing the work — not marketing copy."
      />
      <section className="py-20">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(posts ?? []).map((post: any) => (
            <BlogCard
              key={post.slug}
              post={{
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                category: post.blog_categories?.name ?? "General",
                publishedAt: post.published_at ?? post.created_at,
                readTime: post.read_time ?? "5 min read",
              }}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
