import { createClient } from '@supabase/supabase-js';
import { Package, Journey } from './types';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function mapDbToPackage(dbPkg: any): Package {
    return {
        id: dbPkg.id,
        slug: dbPkg.slug,
        category: dbPkg.category,
        title: dbPkg.title,
        location: dbPkg.location,
        days: dbPkg.days,
        image_url: dbPkg.image_url,
        tag: dbPkg.tag,
        subtitle: dbPkg.subtitle,
        travelStyle: dbPkg.travel_style,
        description: dbPkg.description,
        accommodation: dbPkg.accommodation,
        highlights: dbPkg.highlights,
        whySpecial: dbPkg.why_special,
        perfectFor: dbPkg.perfect_for,
        route: dbPkg.route,
        routeCoords: dbPkg.route_coords,
        included: dbPkg.included,
        notIncluded: dbPkg.not_included,
        itinerary: dbPkg.itinerary,
        galleryImages: dbPkg.gallery_images,
    };
}

export async function getAllPackages(): Promise<Package[]> {
    const { data } = await supabase.from('packages').select('*').eq('is_active', true).order('created_at', { ascending: true });
    return (data || []).map(mapDbToPackage);
}

export async function getPackagesByCategory(category: string): Promise<Package[]> {
    const { data } = await supabase.from('packages').select('*').eq('category', category).eq('is_active', true).order('created_at', { ascending: true });
    return (data || []).map(mapDbToPackage);
}

export async function getPackageBySlug(category: string, slug: string): Promise<Package | undefined> {
    const { data } = await supabase.from('packages').select('*').eq('category', category).eq('slug', slug).single();
    return data ? mapDbToPackage(data) : undefined;
}

export async function getPackageById(id: string): Promise<Package | undefined> {
    const { data } = await supabase.from('packages').select('*').eq('id', id).single();
    return data ? mapDbToPackage(data) : undefined;
}

export const journeys: Journey[] = [
    {
        id: 'culture',
        title: 'Culture',
        subtitle: 'Ancient Wonders Await',
        description: 'Walk through centuries of history among sacred temples, towering rock fortresses, and vibrant festivals. From the ruins of Polonnaruwa to the sacred tooth relic of Kandy.',
        image: '/images/safari-wildlife.jpg',
        color: 'from-amber-600/80 to-orange-900/80',
    },
    {
        id: 'relaxation',
        title: 'Relaxation',
        subtitle: 'Serenity Redefined',
        description: 'Surrender to crystal lagoons, overwater villas, and world-class spas. Let the rhythm of the Indian Ocean wash away the world as you find your perfect state of bliss.',
        image: '/images/wellness-hero.jpg',
        color: 'from-cyan-600/80 to-blue-900/80',
    },
    {
        id: 'adventure',
        title: 'Adventure',
        subtitle: 'Thrills Beyond Borders',
        description: 'Dive with manta rays, trek misty peaks, and ride the world\'s most scenic train. Every day brings a new frontier of excitement across two extraordinary destinations.',
        image: '/images/tea-plantation.jpg',
        color: 'from-emerald-600/80 to-teal-900/80',
    },
];
