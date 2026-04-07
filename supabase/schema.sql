-- ============================================================
-- Velora Journeys — Supabase Schema (Complete Setup)
-- Run this entire script in: https://supabase.com → Your Project → SQL Editor
-- ============================================================

-- ── 1. PACKAGES ──────────────────────────────────────────────
create table if not exists packages (
    id             uuid primary key default gen_random_uuid(),
    slug           text unique not null,
    category       text not null check (category in ('luxury','honeymoon','wellness','adventure')),
    title          text not null,
    location       text not null,
    days           int  not null,
    price_from_aud integer check (price_from_aud is null or price_from_aud >= 0),
    image_url      text not null,
    tag            text not null,
    subtitle       text,
    travel_style   text,
    description    text not null,
    accommodation  text,
    highlights     text[] not null default '{}',
    why_special    text[] not null default '{}',
    perfect_for    text[] not null default '{}',
    route          text[] not null default '{}',
    route_coords   jsonb not null default '[]',
    included       text[] not null default '{}',
    not_included   text[] not null default '{}',
    itinerary      jsonb not null default '[]',
    gallery_images text[] not null default '{}',
    is_active      boolean default true,
    created_at     timestamptz default now(),
    updated_at     timestamptz default now()
);

-- Auto-update updated_at for packages
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists packages_updated_at on packages;
create trigger packages_updated_at
before update on packages
for each row execute procedure update_updated_at();



-- ── 3. ROW LEVEL SECURITY (DATABASE) ─────────────────────────
-- Packages: public can SELECT, only admin users can mutate
alter table packages enable row level security;

drop policy if exists "Public read packages" on packages;
create policy "Public read packages"
    on packages for select using (true);

drop policy if exists "Auth insert packages" on packages;
drop policy if exists "Admin insert packages" on packages;
create policy "Admin insert packages"
    on packages for insert
    with check ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

drop policy if exists "Auth update packages" on packages;
drop policy if exists "Admin update packages" on packages;
create policy "Admin update packages"
    on packages for update
    using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

drop policy if exists "Auth delete packages" on packages;
drop policy if exists "Admin delete packages" on packages;
create policy "Admin delete packages"
    on packages for delete
    using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');



-- ── 4. STORAGE BUCKET (JOURNEY IMAGES) ───────────────────────
-- Create the bucket if it doesn't exist
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'journey-images',
  'journey-images',
  true,
  5242880,  -- 5MB per file limit
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

-- Storage RLS Policies
drop policy if exists "Public read journey images" on storage.objects;
create policy "Public read journey images"
  on storage.objects for select
  using (bucket_id = 'journey-images');

drop policy if exists "Auth upload journey images" on storage.objects;
drop policy if exists "Admin upload journey images" on storage.objects;
create policy "Admin upload journey images"
  on storage.objects for insert
  with check (bucket_id = 'journey-images' and (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

drop policy if exists "Auth update journey images" on storage.objects;
drop policy if exists "Admin update journey images" on storage.objects;
create policy "Admin update journey images"
  on storage.objects for update
  using (bucket_id = 'journey-images' and (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

drop policy if exists "Auth delete journey images" on storage.objects;
drop policy if exists "Admin delete journey images" on storage.objects;
create policy "Admin delete journey images"
  on storage.objects for delete
  using (bucket_id = 'journey-images' and (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- ── 5. BOOKINGS ─────────────────────────────────────────────
create table if not exists bookings (
    id               uuid primary key default gen_random_uuid(),
    booking_ref      text unique not null,
    package_id       text not null,
    package_title    text not null,
    travel_date      date not null,
    guest_count      int not null default 1,
    guest_names      text[] not null default '{}',
    special_requests text,
    status           text not null default 'pending'
                         check (status in ('pending','confirmed','cancelled')),
    created_at       timestamptz default now(),
    updated_at       timestamptz default now()
);

drop trigger if exists bookings_updated_at on bookings;
create trigger bookings_updated_at
before update on bookings
for each row execute procedure update_updated_at();

alter table bookings enable row level security;

drop policy if exists "Public insert booking" on bookings;
create policy "Public insert booking"
    on bookings for insert with check (true);

drop policy if exists "Public read own booking" on bookings;
drop policy if exists "Admin read bookings" on bookings;
create policy "Admin read bookings"
    on bookings for select using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

drop policy if exists "Auth all bookings" on bookings;
drop policy if exists "Admin mutate bookings" on bookings;
create policy "Admin mutate bookings"
    on bookings for update using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin delete bookings" on bookings;
create policy "Admin delete bookings"
    on bookings for delete using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');
