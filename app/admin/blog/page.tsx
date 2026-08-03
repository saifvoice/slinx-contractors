import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PostsTable } from "./posts-table";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("blog_posts")
    .select("id, title, status, published_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Blog" description="Articles shown on the public blog." newHref="/admin/blog/new" newLabel="New post" />
      <PostsTable rows={rows ?? []} />
    </div>
  );
}
