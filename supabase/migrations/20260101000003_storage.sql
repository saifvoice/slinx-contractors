-- =========================================================
-- S-LINx Contractors — Supabase Storage buckets & policies
-- Run after rls-policies.sql (uses is_staff_or_admin() from there)
-- =========================================================

-- ---------- CV uploads (private — only staff/admin can read) ----------
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;

create policy "cv_public_upload" on storage.objects
  for insert to public
  with check (bucket_id = 'cvs');

create policy "cv_staff_read" on storage.objects
  for select using (bucket_id = 'cvs' and public.is_staff_or_admin());

create policy "cv_staff_delete" on storage.objects
  for delete using (bucket_id = 'cvs' and public.is_staff_or_admin());

-- ---------- Media library (public read — used on the public site) ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');

create policy "media_staff_write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.is_staff_or_admin());

create policy "media_staff_update" on storage.objects
  for update using (bucket_id = 'media' and public.is_staff_or_admin());

create policy "media_staff_delete" on storage.objects
  for delete using (bucket_id = 'media' and public.is_staff_or_admin());
