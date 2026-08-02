import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { BlogCard } from "@/components/cards/blog-card";
import { Button } from "@/components/ui/button";

export async function LatestNews() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="border-b border-border py-20">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Insights
            </span>
            <h2 className="mt-2 text-2xl font-display font-semibold sm:text-3xl">
              Latest from the field
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="outline">
              Visit the blog
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
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
      </div>
    </section>
  );
}
