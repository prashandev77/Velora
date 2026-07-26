-- ============================================================
-- Avelora Travel — Guide Hub & Email Marketing Migration
-- Run this in: https://supabase.com → Your Project → SQL Editor
-- ============================================================

-- ── 1. GUIDE CATEGORIES ─────────────────────────────────────
create table if not exists guide_categories (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    slug        text unique not null,
    created_at  timestamptz default now(),
    updated_at  timestamptz default now()
);

drop trigger if exists guide_categories_updated_at on guide_categories;
create trigger guide_categories_updated_at
before update on guide_categories
for each row execute procedure update_updated_at();

alter table guide_categories enable row level security;

drop policy if exists "Public read guide_categories" on guide_categories;
create policy "Public read guide_categories"
    on guide_categories for select using (true);

drop policy if exists "Admin insert guide_categories" on guide_categories;
create policy "Admin insert guide_categories"
    on guide_categories for insert
    with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin update guide_categories" on guide_categories;
create policy "Admin update guide_categories"
    on guide_categories for update
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin delete guide_categories" on guide_categories;
create policy "Admin delete guide_categories"
    on guide_categories for delete
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- ── 2. GUIDES ───────────────────────────────────────────────
create table if not exists guides (
    id                uuid primary key default gen_random_uuid(),
    title             text not null,
    slug              text unique not null,
    short_description text not null,
    content           text not null default '',
    featured_image    text not null default '',
    category_id       uuid references guide_categories(id) on delete set null,
    status            text not null default 'draft'
                          check (status in ('draft','published')),
    published_at      timestamptz,
    created_at        timestamptz default now(),
    updated_at        timestamptz default now()
);

drop trigger if exists guides_updated_at on guides;
create trigger guides_updated_at
before update on guides
for each row execute procedure update_updated_at();

alter table guides enable row level security;

-- Public can only read published guides
drop policy if exists "Public read published guides" on guides;
create policy "Public read published guides"
    on guides for select using (status = 'published' or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin insert guides" on guides;
create policy "Admin insert guides"
    on guides for insert
    with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin update guides" on guides;
create policy "Admin update guides"
    on guides for update
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin delete guides" on guides;
create policy "Admin delete guides"
    on guides for delete
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- ── 3. SUBSCRIBERS ──────────────────────────────────────────
create table if not exists subscribers (
    id          uuid primary key default gen_random_uuid(),
    name        text not null default '',
    email       text unique not null,
    created_at  timestamptz default now()
);

alter table subscribers enable row level security;

drop policy if exists "Admin read subscribers" on subscribers;
create policy "Admin read subscribers"
    on subscribers for select
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin insert subscribers" on subscribers;
create policy "Admin insert subscribers"
    on subscribers for insert
    with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin delete subscribers" on subscribers;
create policy "Admin delete subscribers"
    on subscribers for delete
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- ── 4. EMAIL CAMPAIGNS ──────────────────────────────────────
create table if not exists email_campaigns (
    id              uuid primary key default gen_random_uuid(),
    subject         text not null,
    title           text not null default '',
    content         text not null default '',
    status          text not null default 'draft'
                        check (status in ('draft','sent')),
    sent_at         timestamptz,
    recipient_count integer default 0,
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);

drop trigger if exists email_campaigns_updated_at on email_campaigns;
create trigger email_campaigns_updated_at
before update on email_campaigns
for each row execute procedure update_updated_at();

alter table email_campaigns enable row level security;

drop policy if exists "Admin read email_campaigns" on email_campaigns;
create policy "Admin read email_campaigns"
    on email_campaigns for select
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin insert email_campaigns" on email_campaigns;
create policy "Admin insert email_campaigns"
    on email_campaigns for insert
    with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin update email_campaigns" on email_campaigns;
create policy "Admin update email_campaigns"
    on email_campaigns for update
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin delete email_campaigns" on email_campaigns;
create policy "Admin delete email_campaigns"
    on email_campaigns for delete
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- ── 5. STORAGE BUCKET (GUIDE IMAGES) ────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'guide-images',
  'guide-images',
  true,
  5242880,  -- 5MB per file limit
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

-- Storage RLS Policies
drop policy if exists "Public read guide images" on storage.objects;
create policy "Public read guide images"
  on storage.objects for select
  using (bucket_id = 'guide-images');

drop policy if exists "Admin upload guide images" on storage.objects;
create policy "Admin upload guide images"
  on storage.objects for insert
  with check (bucket_id = 'guide-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin update guide images" on storage.objects;
create policy "Admin update guide images"
  on storage.objects for update
  using (bucket_id = 'guide-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin delete guide images" on storage.objects;
create policy "Admin delete guide images"
  on storage.objects for delete
  using (bucket_id = 'guide-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
