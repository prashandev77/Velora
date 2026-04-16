-- ============================================================
-- Avelora Travel — One-time migration: rename package titles & slugs
-- Run in Supabase SQL Editor after deploy (updates existing rows).
-- ============================================================

UPDATE public.packages SET title = 'Avelora Signature', slug = 'avelora-signature'
  WHERE slug = 'velora-luxe';

UPDATE public.packages SET title = 'Avelora Wellness', slug = 'avelora-wellness'
  WHERE slug = 'velora-serene';

UPDATE public.packages SET title = 'Avelora Wild', slug = 'avelora-wild'
  WHERE slug = 'velora-wild';

UPDATE public.packages SET title = 'Avelora Romance', slug = 'avelora-romance'
  WHERE slug = 'velora-honeymoon';

UPDATE public.packages SET title = 'Avelora Discovery', slug = 'avelora-discovery'
  WHERE slug = 'serendipity-of-sri-lanka';
