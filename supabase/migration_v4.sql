-- ============================================================
-- Velora Journeys — Migration v4: Update bookings table
-- to match the Plan Your Trip form fields
-- Run this in: https://supabase.com → Your Project → SQL Editor
-- ============================================================

-- Add contact and travel preference fields to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS departing_city text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS travel_month text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS trip_length text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS travel_styles text[] NOT NULL DEFAULT '{}';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS message text;

-- Make previously required fields optional (they were for the /book/[id] flow)
ALTER TABLE bookings ALTER COLUMN package_id DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN package_title DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN travel_date DROP NOT NULL;

-- Set default for travel_date so Plan Your Trip form doesn't need it
ALTER TABLE bookings ALTER COLUMN travel_date SET DEFAULT CURRENT_DATE;
