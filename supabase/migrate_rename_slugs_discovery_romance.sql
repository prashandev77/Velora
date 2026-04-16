-- ============================================================
-- Avelora Travel — Rename slugs: serendipity → discovery, honeymoon → romance
-- Run once in Supabase SQL Editor to update existing rows.
-- Safe to re-run (WHERE clause prevents no-op updates).
-- ============================================================

UPDATE public.packages SET slug = 'avelora-discovery'
  WHERE slug = 'avelora-serendipity';

UPDATE public.packages SET slug = 'avelora-romance'
  WHERE slug = 'avelora-honeymoon';
