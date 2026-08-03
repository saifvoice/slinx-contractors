import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PostForm } from "../../post-form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: post }, { data: categories }] = await Promise.all([
    supabase.from("blog_posts").select("*").eq("id", id).single(),
    supabase.from("blog_categories").select("id, name").order("name"),
  ]);

  if (!post) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Post" />
      <PostForm post={post} categories={categories ?? []} />
    </div>
  );
}
