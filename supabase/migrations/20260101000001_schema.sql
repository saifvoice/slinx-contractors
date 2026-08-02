-- =========================================================
-- S-LINx Contractors — Database Schema
-- Target: Supabase (PostgreSQL 15+)
-- Run order: schema.sql -> rls-policies.sql -> seed.sql
-- =========================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- ---------- Enums ----------
create type user_role as enum ('admin', 'staff', 'client');
create type service_category as enum ('ict', 'renewable_energy');
create type content_status as enum ('draft', 'published', 'archived');
create type job_department as enum ('ICT', 'Renewable Energy', 'Operations');
create type job_type as enum ('Full-time', 'Contract');
create type job_status as enum ('open', 'closed');
create type application_status as enum ('new', 'reviewing', 'interview', 'rejected', 'hired');
create type quote_request_status as enum ('new', 'contacted', 'quoted', 'won', 'lost');
create type contact_message_status as enum ('new', 'read', 'replied');
create type quote_status as enum ('draft', 'sent', 'accepted', 'declined');
create type invoice_status as enum ('unpaid', 'paid', 'overdue', 'void');
create type service_area as enum ('ict', 'renewable-energy', 'both');

-- ---------- updated_at trigger helper ----------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================================================
-- profiles — extends auth.users with app-level role & info
-- =========================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role user_role not null default 'client',
  company text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_role on profiles(role);

create trigger trg_profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- Auto-create a profile row whenever a new auth user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'client')
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- =========================================================
-- services
-- =========================================================
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category service_category not null,
  icon text not null default 'Zap',
  summary text not null,
  description text not null,
  capabilities text[] not null default '{}',
  status content_status not null default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_services_category on services(category);
create index idx_services_status on services(status);
create index idx_services_slug on services(slug);

create trigger trg_services_updated_at
  before update on services
  for each row execute function set_updated_at();

-- =========================================================
-- projects (portfolio)
-- =========================================================
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text not null,
  location text not null,
  industry service_category not null,
  category text not null,
  summary text not null,
  description text not null,
  timeline text,
  technologies text[] not null default '{}',
  results text[] not null default '{}',
  cover_image_url text,
  status content_status not null default 'published',
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_projects_industry on projects(industry);
create index idx_projects_status on projects(status);
create index idx_projects_slug on projects(slug);

create trigger trg_projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

create table project_services (
  project_id uuid not null references projects(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  primary key (project_id, service_id)
);

create table project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_project_gallery_project on project_gallery(project_id);

-- =========================================================
-- blog
-- =========================================================
create table blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  category_id uuid references blog_categories(id) on delete set null,
  author_id uuid references profiles(id) on delete set null,
  status content_status not null default 'draft',
  read_time text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_blog_posts_status on blog_posts(status);
create index idx_blog_posts_slug on blog_posts(slug);
create index idx_blog_posts_published_at on blog_posts(published_at desc);

create trigger trg_blog_posts_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();

create table blog_post_tags (
  post_id uuid not null references blog_posts(id) on delete cascade,
  tag_id uuid not null references blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references blog_posts(id) on delete cascade,
  author_name text not null,
  author_email text not null,
  body text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_blog_comments_post on blog_comments(post_id);

-- =========================================================
-- testimonials
-- =========================================================
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text not null,
  company text,
  avatar_url text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  status content_status not null default 'published',
  created_at timestamptz not null default now()
);

create index idx_testimonials_status on testimonials(status);

-- =========================================================
-- careers
-- =========================================================
create table jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  department job_department not null,
  location text not null,
  type job_type not null,
  summary text not null,
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  status job_status not null default 'open',
  posted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_jobs_status on jobs(status);
create index idx_jobs_slug on jobs(slug);

create trigger trg_jobs_updated_at
  before update on jobs
  for each row execute function set_updated_at();

create table job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  linkedin_url text,
  cover_note text not null,
  cv_url text,
  status application_status not null default 'new',
  created_at timestamptz not null default now()
);

create index idx_job_applications_job on job_applications(job_id);
create index idx_job_applications_status on job_applications(status);

-- =========================================================
-- lead capture: quote requests & contact messages
-- =========================================================
create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text not null,
  service service_area not null,
  budget text,
  message text not null,
  status quote_request_status not null default 'new',
  assigned_to uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index idx_quote_requests_status on quote_requests(status);
create index idx_quote_requests_created_at on quote_requests(created_at desc);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status contact_message_status not null default 'new',
  created_at timestamptz not null default now()
);

create index idx_contact_messages_status on contact_messages(status);

-- =========================================================
-- media library
-- =========================================================
create table media_library (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  file_type text not null,
  file_size_bytes bigint,
  alt_text text,
  uploaded_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index idx_media_library_uploaded_by on media_library(uploaded_by);

-- =========================================================
-- site settings (key/value, JSON payload)
-- =========================================================
create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references profiles(id) on delete set null
);

create trigger trg_site_settings_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

-- =========================================================
-- client portal: quotes, invoices, downloads, messages
-- =========================================================
create table quotes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  project_title text not null,
  line_items jsonb not null default '[]',
  amount numeric(12,2) not null,
  currency text not null default 'NGN',
  status quote_status not null default 'draft',
  valid_until date,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_quotes_client on quotes(client_id);
create index idx_quotes_status on quotes(status);

create trigger trg_quotes_updated_at
  before update on quotes
  for each row execute function set_updated_at();

create table invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  quote_id uuid references quotes(id) on delete set null,
  invoice_number text not null unique,
  amount numeric(12,2) not null,
  currency text not null default 'NGN',
  status invoice_status not null default 'unpaid',
  due_date date,
  issued_at timestamptz not null default now(),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_invoices_client on invoices(client_id);
create index idx_invoices_status on invoices(status);

create table downloads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  category text,
  created_at timestamptz not null default now()
);

create index idx_downloads_client on downloads(client_id);

create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles(id) on delete cascade,
  recipient_id uuid not null references profiles(id) on delete cascade,
  subject text,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_messages_sender on messages(sender_id);
create index idx_messages_recipient on messages(recipient_id);
create index idx_messages_created_at on messages(created_at desc);
