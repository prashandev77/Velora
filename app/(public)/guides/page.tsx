import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Guide Hub | Avelora Travel',
    description: 'Explore our curated collection of travel guides for Sri Lanka, the Maldives, and beyond. Expert tips, destination insights, and travel inspiration.',
};

interface SearchParams {
    q?: string;
    category?: string;
}

export default async function GuideHubPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const supabase = await createClient();

    // Fetch categories
    const { data: categories } = await supabase
        .from('guide_categories')
        .select('id, name, slug')
        .order('name');

    // Build guide query
    let query = supabase
        .from('guides')
        .select('id, title, slug, short_description, featured_image, published_at, category_id, guide_categories(name, slug)')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (params.q) {
        query = query.or(`title.ilike.%${params.q}%,short_description.ilike.%${params.q}%`);
    }

    if (params.category) {
        const cat = categories?.find(c => c.slug === params.category);
        if (cat) {
            query = query.eq('category_id', cat.id);
        } else {
            // Category slug in URL doesn't match any category -> return empty list
            query = query.eq('category_id', '00000000-0000-0000-0000-000000000000');
        }
    }

    const { data: guides } = await query;

    return (
        <div className="bg-sand min-h-screen">
            {/* Hero */}
            <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Travel Insights</p>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
                        Guide Hub
                    </h1>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Curated travel guides and expert insights for your next journey across Sri Lanka, the Maldives, and beyond.
                    </p>

                    {/* Search */}
                    <form method="GET" className="mt-8 max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                            <input
                                type="text"
                                name="q"
                                defaultValue={params.q ?? ''}
                                placeholder="Search guides..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 bg-white text-stone-900 text-sm placeholder:text-stone-400 focus:ring-2 focus:ring-gold/20 focus:border-gold/40 transition-all shadow-sm"
                            />
                            {params.category && (
                                <input type="hidden" name="category" value={params.category} />
                            )}
                        </div>
                    </form>
                </div>
            </section>

            {/* Category Filter */}
            {categories && categories.length > 0 && (
                <section className="px-6 pb-8">
                    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2">
                        <Link
                            href="/guides"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                !params.category
                                    ? 'bg-stone-900 text-white shadow-sm'
                                    : 'bg-white text-stone-500 border border-stone-200 hover:bg-stone-50 hover:text-stone-700'
                            }`}
                        >
                            All
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/guides?category=${cat.slug}${params.q ? `&q=${params.q}` : ''}`}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    params.category === cat.slug
                                        ? 'bg-stone-900 text-white shadow-sm'
                                        : 'bg-white text-stone-500 border border-stone-200 hover:bg-stone-50 hover:text-stone-700'
                                }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Guide Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    {!guides || guides.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-stone-400 text-lg mb-2">No guides found</p>
                            <p className="text-stone-400 text-sm">
                                {params.q ? 'Try a different search term.' : 'Check back soon for new guides.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {guides.map((guide) => {
                                const category = guide.guide_categories as unknown as { name: string; slug: string } | null;
                                return (
                                    <Link
                                        key={guide.id}
                                        href={`/guides/${guide.slug}`}
                                        className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative h-52 overflow-hidden">
                                            {guide.featured_image ? (
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                                    style={{ backgroundImage: `url("${guide.featured_image}")` }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            {category && (
                                                <div className="absolute top-3 left-3">
                                                    <span className="text-[11px] px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 font-medium border border-white/50">
                                                        {category.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            {guide.published_at && (
                                                <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-2">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(guide.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </div>
                                            )}
                                            <h2 className="font-heading text-lg font-semibold text-stone-900 mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                                                {guide.title}
                                            </h2>
                                            <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-4">
                                                {guide.short_description}
                                            </p>
                                            <div className="flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                                                Read More
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
