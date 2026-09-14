-- ============================================================
-- Migration: Add CMS blocks to guides
-- Run this in: https://supabase.com → Your Project → SQL Editor
-- ============================================================

-- 1. Alter content column from text to jsonb. 
-- Since we have existing text data (HTML), we need to migrate it to a 'rich-text' block.
-- We cast existing text into a JSON array containing a single rich-text block.

-- Drop existing default to avoid type casting errors during the alter
ALTER TABLE guides
ALTER COLUMN content DROP DEFAULT;

ALTER TABLE guides
ALTER COLUMN content TYPE jsonb USING jsonb_build_array(
    jsonb_build_object(
        'type', 'rich-text',
        'html', content
    )
);

-- Set new default for content to be an empty JSON array
ALTER TABLE guides
ALTER COLUMN content SET DEFAULT '[]'::jsonb;

-- 2. Add tags column for taxonomy filtering
ALTER TABLE guides
ADD COLUMN IF NOT EXISTS tags text[] not null default '{}';
