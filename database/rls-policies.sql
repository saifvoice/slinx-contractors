-- =========================================================
-- S-LINx Contractors — Row Level Security Policies
-- Run after schema.sql
-- =========================================================

-- ---------- Helper functions ----------
create or replace function public.is_staff_or_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role in ('admin', 'staff')
  );
$$ language sql security definer stable;

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Prevent a non-admin from escalating their own role via profile update
create or replace function public.prevent_role_escalation()
returns trigger as $$
begin
  if new.role <> old.role and not public.is_admin() then
    new.role = old.role;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_prevent_role_escalation
  before update on profiles
  for each row execute function public.prevent_role_escalation();

-- =========================================================
-- profiles
-- =========================================================
alter table profiles enable row level security;

create policy "profiles_select" on profiles
  for select using (id = auth.uid() or public.is_staff_or_admin());

create policy "profiles_update_own" on profiles
  for update using (id = auth.uid() or public.is_admin());

create policy "profiles_delete_admin" on profiles
  for delete using (public.is_admin());

-- =========================================================
-- services / projects / project_services / project_gallery
-- =========================================================
alter table services enable row level security;
alter table projects enable row level security;
alter table project_services enable row level security;
alter table project_gallery enable row level security;

create policy "services_public_read" on services
  for select using (status = 'published' or public.is_staff_or_admin());
create policy "services_staff_write" on services
  for insert with check (public.is_staff_or_admin());
create policy "services_staff_update" on services
  for update using (public.is_staff_or_admin());
create policy "services_staff_delete" on services
  for delete using (public.is_admin());

create policy "projects_public_read" on projects
  for select using (status = 'published' or public.is_staff_or_admin());
create policy "projects_staff_write" on projects
  for insert with check (public.is_staff_or_admin());
create policy "projects_staff_update" on projects
  for update using (public.is_staff_or_admin());
create policy "projects_staff_delete" on projects
  for delete using (public.is_admin());

create policy "project_services_public_read" on project_services
  for select using (true);
create policy "project_services_staff_write" on project_services
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "project_gallery_public_read" on project_gallery
  for select using (true);
create policy "project_gallery_staff_write" on project_gallery
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

-- =========================================================
-- blog
-- =========================================================
alter table blog_categories enable row level security;
alter table blog_tags enable row level security;
alter table blog_posts enable row level security;
alter table blog_post_tags enable row level security;
alter table blog_comments enable row level security;

create policy "blog_categories_public_read" on blog_categories for select using (true);
create policy "blog_categories_staff_write" on blog_categories
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "blog_tags_public_read" on blog_tags for select using (true);
create policy "blog_tags_staff_write" on blog_tags
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "blog_posts_public_read" on blog_posts
  for select using (status = 'published' or public.is_staff_or_admin());
create policy "blog_posts_staff_write" on blog_posts
  for insert with check (public.is_staff_or_admin());
create policy "blog_posts_staff_update" on blog_posts
  for update using (public.is_staff_or_admin());
create policy "blog_posts_staff_delete" on blog_posts
  for delete using (public.is_admin());

create policy "blog_post_tags_public_read" on blog_post_tags for select using (true);
create policy "blog_post_tags_staff_write" on blog_post_tags
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "blog_comments_public_read" on blog_comments
  for select using (is_approved = true or public.is_staff_or_admin());
create policy "blog_comments_public_insert" on blog_comments
  for insert with check (true);
create policy "blog_comments_staff_moderate" on blog_comments
  for update using (public.is_staff_or_admin());
create policy "blog_comments_staff_delete" on blog_comments
  for delete using (public.is_staff_or_admin());

-- =========================================================
-- testimonials
-- =========================================================
alter table testimonials enable row level security;

create policy "testimonials_public_read" on testimonials
  for select using (status = 'published' or public.is_staff_or_admin());
create policy "testimonials_staff_write" on testimonials
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

-- =========================================================
-- careers
-- =========================================================
alter table jobs enable row level security;
alter table job_applications enable row level security;

create policy "jobs_public_read" on jobs
  for select using (status = 'open' or public.is_staff_or_admin());
create policy "jobs_staff_write" on jobs
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "job_applications_public_insert" on job_applications
  for insert with check (true);
create policy "job_applications_staff_read" on job_applications
  for select using (public.is_staff_or_admin());
create policy "job_applications_staff_update" on job_applications
  for update using (public.is_staff_or_admin());
create policy "job_applications_staff_delete" on job_applications
  for delete using (public.is_staff_or_admin());

-- =========================================================
-- lead capture: quote requests & contact messages
-- =========================================================
alter table quote_requests enable row level security;
alter table contact_messages enable row level security;

create policy "quote_requests_public_insert" on quote_requests
  for insert with check (true);
create policy "quote_requests_staff_read" on quote_requests
  for select using (public.is_staff_or_admin());
create policy "quote_requests_staff_update" on quote_requests
  for update using (public.is_staff_or_admin());
create policy "quote_requests_staff_delete" on quote_requests
  for delete using (public.is_staff_or_admin());

create policy "contact_messages_public_insert" on contact_messages
  for insert with check (true);
create policy "contact_messages_staff_read" on contact_messages
  for select using (public.is_staff_or_admin());
create policy "contact_messages_staff_update" on contact_messages
  for update using (public.is_staff_or_admin());
create policy "contact_messages_staff_delete" on contact_messages
  for delete using (public.is_staff_or_admin());

-- =========================================================
-- media library & site settings
-- =========================================================
alter table media_library enable row level security;
alter table site_settings enable row level security;

create policy "media_library_staff_all" on media_library
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "site_settings_public_read" on site_settings
  for select using (true);
create policy "site_settings_staff_write" on site_settings
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

-- =========================================================
-- client portal: quotes, invoices, downloads, messages
-- =========================================================
alter table quotes enable row level security;
alter table invoices enable row level security;
alter table downloads enable row level security;
alter table messages enable row level security;

create policy "quotes_client_or_staff_read" on quotes
  for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "quotes_staff_write" on quotes
  for insert with check (public.is_staff_or_admin());
create policy "quotes_staff_update" on quotes
  for update using (public.is_staff_or_admin());
create policy "quotes_staff_delete" on quotes
  for delete using (public.is_admin());

create policy "invoices_client_or_staff_read" on invoices
  for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "invoices_staff_write" on invoices
  for insert with check (public.is_staff_or_admin());
create policy "invoices_staff_update" on invoices
  for update using (public.is_staff_or_admin());
create policy "invoices_staff_delete" on invoices
  for delete using (public.is_admin());

create policy "downloads_client_or_staff_read" on downloads
  for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "downloads_staff_write" on downloads
  for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "messages_participant_read" on messages
  for select using (
    sender_id = auth.uid() or recipient_id = auth.uid() or public.is_staff_or_admin()
  );
create policy "messages_send_as_self" on messages
  for insert with check (sender_id = auth.uid());
create policy "messages_mark_read" on messages
  for update using (recipient_id = auth.uid() or public.is_staff_or_admin());
