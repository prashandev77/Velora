-- Add optional from-price (whole AUD) for journey pages and admin editing.
-- Run once in Supabase SQL Editor after pulling latest schema.

ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS price_from_aud integer;

ALTER TABLE public.packages
DROP CONSTRAINT IF EXISTS packages_price_from_aud_check;

ALTER TABLE public.packages
ADD CONSTRAINT packages_price_from_aud_check
CHECK (price_from_aud IS NULL OR price_from_aud >= 0);

COMMENT ON COLUMN public.packages.price_from_aud IS 'From-price in whole Australian dollars; shown on public journey detail.';

-- Backfill known catalogue journeys (matches legacy hardcoded map in PackageDetail.tsx)
UPDATE public.packages SET price_from_aud = 1950 WHERE slug = 'avelora-serendipity' AND price_from_aud IS NULL;
UPDATE public.packages SET price_from_aud = 5450 WHERE slug = 'avelora-signature' AND price_from_aud IS NULL;
UPDATE public.packages SET price_from_aud = 7450 WHERE slug = 'avelora-honeymoon' AND price_from_aud IS NULL;
UPDATE public.packages SET price_from_aud = 3750 WHERE slug = 'avelora-wellness' AND price_from_aud IS NULL;
UPDATE public.packages SET price_from_aud = 6950 WHERE slug = 'avelora-wild' AND price_from_aud IS NULL;
UPDATE public.packages SET price_from_aud = 6200 WHERE slug = 'grand-explorer' AND price_from_aud IS NULL;
