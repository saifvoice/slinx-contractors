import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, Tag } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", params.slug)
    .single();

  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${params.slug}` } };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name), profiles(full_name), blog_post_tags(blog_tags(name))")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const authorName = (post as any).profiles?.full_name ?? "S-LINx Team";
  const categoryName = (post as any).blog_categories?.name ?? "General";
  const tags = ((post as any).blog_post_tags ?? []).map((t: any) => t.blog_tags?.name).filter(Boolean);
  const paragraphs = post.content.split("\n\n").filter(Boolean);
  const publishedDate = post.published_at ?? post.created_at;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: publishedDate,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: authorName },
  };

  return (
    <>
      <Navbar />
      <JsonLd data={articleSchema} />

      <article className="py-16">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            {categoryName}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{post.title}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 border-b border-border pb-6 text-sm text-muted-foreground">
            <span>{authorName}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(publishedDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {post.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.read_time}
              </span>
            )}
          </div>

          <div className="mt-8 space-y-5">
            {paragraphs.map((paragraph: string, i: number) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {tags.map((tag: string) => (
                <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <Footer />
    </>
  );
}
