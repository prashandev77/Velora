-- ============================================================
-- Velora Journeys — Supabase Schema
-- Run this in: https://supabase.com → Your Project → SQL Editor
-- ============================================================

-- ── 1. PACKAGES ──────────────────────────────────────────────
create table if not exists packages (
    id          uuid primary key default gen_random_uuid(),
    slug        text unique not null,
    category    text not null check (category in ('luxury','honeymoon','wellness','adventure')),
    title       text not null,
    location    text not null,
    days        int  not null,
    image_url   text not null,
    tag         text not null,
    highlights  text[] not null default '{}',
    description text not null,
    itinerary   jsonb not null default '[]',
    is_active   boolean default true,
    created_at  timestamptz default now(),
    updated_at  timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger packages_updated_at
before update on packages
for each row execute procedure update_updated_at();

-- ── 2. INQUIRIES ─────────────────────────────────────────────
create table if not exists inquiries (
    id             uuid primary key default gen_random_uuid(),
    name           text not null,
    email          text not null,
    phone          text,
    travel_month   text,
    travel_style   text,
    num_travelers  text,
    message        text,
    status         text not null default 'new' check (status in ('new','read','replied','closed')),
    created_at     timestamptz default now()
);

-- ── 3. ROW LEVEL SECURITY ────────────────────────────────────
--- Packages: public can SELECT, only auth users can mutate
alter table packages enable row level security;

create policy "Public read packages"
    on packages for select using (true);

create policy "Auth insert packages"
    on packages for insert with check (auth.role() = 'authenticated');

create policy "Auth update packages"
    on packages for update using (auth.role() = 'authenticated');

create policy "Auth delete packages"
    on packages for delete using (auth.role() = 'authenticated');

--- Inquiries: only auth users can read/write
alter table inquiries enable row level security;

create policy "Auth all inquiries"
    on inquiries for all using (auth.role() = 'authenticated');

-- Allow public INSERT (form submissions from unauthenticated visitors)
create policy "Public insert inquiry"
    on inquiries for insert with check (true);
