/**
 * Seed script: copies all packages from lib/data.ts into your Supabase database.
 * Run AFTER you've created the Supabase tables using supabase/schema.sql.
 *
 * Usage:
 *   npx ts-node --project tsconfig.json -e "require('./scripts/seed-supabase.ts')"
 * Or simply paste the output JSON into the Supabase dashboard Table Editor.
 *
 * Requirements: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';
import { packages } from '../lib/data';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

async function seed() {
    const rows = packages.map((pkg) => ({
        slug: pkg.slug,
        category: pkg.category,
        title: pkg.title,
        location: pkg.location,
        days: pkg.days,
        image_url: pkg.image_url,
        tag: pkg.tag,
        highlights: pkg.highlights ?? [],
        description: pkg.description,
        itinerary: pkg.itinerary ?? [],
        is_active: true,
    }));

    const { data, error } = await supabase.from('packages').insert(rows).select('id,title');

    if (error) {
        console.error('❌ Seed failed:', error.message);
        process.exit(1);
    }

    console.log(`✅ Seeded ${data?.length ?? 0} packages:`);
    data?.forEach((p) => console.log(`   • ${p.title}`));
}

seed();
