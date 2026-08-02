"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createPost, updatePost, type BlogFormState } from "./actions";

type Category = { id: string; name: string };
type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category_id: string | null;
  read_time: string | null;
  status: string;
};

const initialState: BlogFormState = {};

export function PostForm({ post, categories }: { post?: PostRow; categories: Category[] }) {
  const action = post ? updatePost.bind(null, post.id) : createPost;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="title" placeholder="Title" defaultValue={post?.title} required />
        <Input name="slug" placeholder="slug-in-kebab-case" defaultValue={post?.slug} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <select name="category_id" defaultValue={post?.category_id ?? ""} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <Input name="read_time" placeholder="Read time (e.g. 6 min read)" defaultValue={post?.read_time ?? ""} />
        <select name="status" defaultValue={post?.status ?? "draft"} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <Textarea name="excerpt" placeholder="Excerpt (used on cards)" defaultValue={post?.excerpt} required />
      <Textarea name="content" placeholder="Full post content" defaultValue={post?.content} className="min-h-[240px]" required />

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" variant="accent" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {post ? "Save changes" : "Publish post"}
      </Button>
    </form>
  );
}
