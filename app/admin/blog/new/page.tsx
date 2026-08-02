import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PostForm } from "../post-form";

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("blog_categories").select("id, name").order("name");

  return (
    <div>
      <AdminPageHeader title="New Post" />
      <PostForm categories={categories ?? []} />
    </div>
  );
}
