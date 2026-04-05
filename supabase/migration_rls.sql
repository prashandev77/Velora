-- ============================================================
-- Avelora Travel — Row Level Security (run in Supabase SQL Editor)
-- Deny-by-default for anon; public reads only for active packages.
-- Server actions using the service role key bypass RLS as intended.
-- ============================================================

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Drop if re-running migration
DROP POLICY IF EXISTS "packages_public_read_active" ON public.packages;

-- Anonymous users may only SELECT active packages (public site)
CREATE POLICY "packages_public_read_active"
  ON public.packages
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- No INSERT/UPDATE/DELETE policies for anon on bookings/inquiries/packages:
-- anon cannot read or write those tables via PostgREST with the anon key.
