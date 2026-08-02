import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
}

export function BlogCard({ post }: { post: BlogCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/40"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-accent">
        {post.category}
      </span>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime}
        </span>
      </div>
    </Link>
  );
}
