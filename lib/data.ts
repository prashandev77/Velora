import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { Package, Journey } from './types';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PACKAGE_COLUMNS = 'id,slug,category,title,location,days,image_url,tag,subtitle,travel_style,description,accommodation,highlights,why_special,perfect_for,route,route_coords,included,not_included,itinerary,gallery_images,is_active,created_at';
const PACKAGE_ROUTE_COLUMNS = 'id,slug,category';

type DbPackage = {
    id: string;
    slug: string;
    category: Package['category'];
    title: string;
    location: string;
    days: number;
    image_url: string;
    tag: string;
    subtitle: string | null;
    travel_style: string | null;
    description: string;
    accommodation: string | null;
    highlights: string[];
    why_special: string[];
    perfect_for: string[];
    route: string[];
    route_coords: Package['routeCoords'];
    included: string[];
    not_included: string[];
    itinerary: Package['itinerary'];
    gallery_images: string[];
};

export function mapDbToPackage(dbPkg: DbPackage): Package {
    return {
        id: dbPkg.id,
        slug: dbPkg.slug,
        category: dbPkg.category,
        title: dbPkg.title,
        location: dbPkg.location,
        days: dbPkg.days,
        image_url: dbPkg.image_url,
        tag: dbPkg.tag,
        subtitle: dbPkg.subtitle ?? undefined,
        travelStyle: dbPkg.travel_style ?? undefined,
        description: dbPkg.description,
        accommodation: dbPkg.accommodation ?? undefined,
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
    const getCached = unstable_cache(
        async () => {
            const { data } = await supabase
                .from('packages')
                .select(PACKAGE_COLUMNS)
                .eq('is_active', true)
                .order('created_at', { ascending: true });
            return (data || []).map(mapDbToPackage);
        },
        ['packages-all'],
        { revalidate: 300, tags: ['packages'] }
    );
    return getCached();
}

export async function getPackagesByCategory(category: string): Promise<Package[]> {
    const getCached = unstable_cache(
        async () => {
            const { data } = await supabase
                .from('packages')
                .select(PACKAGE_COLUMNS)
                .eq('category', category)
                .eq('is_active', true)
                .order('created_at', { ascending: true });
            return (data || []).map(mapDbToPackage);
        },
        ['packages-category', category],
        { revalidate: 300, tags: ['packages', `packages-category-${category}`] }
    );
    return getCached();
}

export async function getPackageBySlug(category: string, slug: string): Promise<Package | undefined> {
    const getCached = unstable_cache(
        async () => {
            const { data } = await supabase
                .from('packages')
                .select(PACKAGE_COLUMNS)
                .eq('category', category)
                .eq('slug', slug)
                .single();
            return data ? mapDbToPackage(data) : undefined;
        },
        ['package-by-slug', category, slug],
        { revalidate: 300, tags: ['packages', `package-${category}-${slug}`] }
    );
    return getCached();
}

export async function getPackageById(id: string): Promise<Package | undefined> {
    const getCached = unstable_cache(
        async () => {
            const { data } = await supabase
                .from('packages')
                .select(PACKAGE_COLUMNS)
                .eq('id', id)
                .single();
            return data ? mapDbToPackage(data) : undefined;
        },
        ['package-by-id', id],
        { revalidate: 300, tags: ['packages', `package-${id}`] }
    );
    return getCached();
}

export async function getPackageRouteParams(): Promise<Array<{ id: string; slug: string; category: string }>> {
    const getCached = unstable_cache(
        async () => {
            const { data } = await supabase
                .from('packages')
                .select(PACKAGE_ROUTE_COLUMNS)
                .eq('is_active', true)
                .order('created_at', { ascending: true });
            return (data || []) as Array<{ id: string; slug: string; category: string }>;
        },
        ['packages-route-params'],
        { revalidate: 300, tags: ['packages'] }
    );
    return getCached();
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
