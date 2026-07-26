import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: guide } = await supabase
        .from('guides')
        .select('title, short_description')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (!guide) return { title: 'Guide Not Found | Avelora Travel' };

    return {
        title: `${guide.title} | Avelora Travel Guide Hub`,
        description: guide.short_description,
    };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: guide } = await supabase
        .from('guides')
        .select('*, guide_categories(id, name, slug)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (!guide) notFound();

    const category = guide.guide_categories as unknown as { id: string; name: string; slug: string } | null;

    // Fetch related guides (same category, excluding current)
    let relatedGuides: typeof guide[] = [];
    if (category) {
        const { data } = await supabase
            .from('guides')
            .select('id, title, slug, short_description, featured_image, published_at, guide_categories(name, slug)')
            .eq('status', 'published')
            .eq('category_id', category.id)
            .neq('id', guide.id)
            .order('published_at', { ascending: false })
            .limit(3);
        relatedGuides = data ?? [];
    }

    return (
        <div className="bg-sand min-h-screen">
            {/* Featured Image Hero */}
            {guide.featured_image && (
                <div className="relative h-[40vh] md:h-[50vh] lg:h-[55vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url("${guide.featured_image}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
            )}

            {/* Content */}
            <article className={`max-w-3xl mx-auto px-6 ${guide.featured_image ? '-mt-20 relative z-10' : 'pt-32 md:pt-40'}`}>
                {/* Back Link */}
                <Link
                    href="/guides"
                    className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm font-medium mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Guide Hub
                </Link>

                {/* Header Card */}
                <div className={`${guide.featured_image ? 'bg-white rounded-2xl border border-stone-100 p-8 md:p-10 shadow-lg shadow-stone-200/30' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                        {category && (
                            <span className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-medium">
                                {category.name}
                            </span>
                        )}
                        {guide.published_at && (
                            <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(guide.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        )}
                    </div>

                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                        {guide.title}
                    </h1>

                    {guide.short_description && (
                        <p className="mt-4 text-stone-500 text-lg leading-relaxed">
                            {guide.short_description}
                        </p>
                    )}
                </div>

                {/* Guide Content */}
                <div
                    className="guide-content mt-10 mb-16"
                    dangerouslySetInnerHTML={{ __html: guide.content }}
                />

                {/* Gold Accent Divider */}
                <div className="flex items-center gap-4 mb-16">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-gold/40" />
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                </div>
            </article>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 pb-20">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-8 text-center">
                        Related Guides
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedGuides.map((related) => {
                            return (
                                <Link
                                    key={related.id}
                                    href={`/guides/${related.slug}`}
                                    className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative h-44 overflow-hidden">
                                        {related.featured_image ? (
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                                style={{ backgroundImage: `url("${related.featured_image}")` }}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                                            {related.title}
                                        </h3>
                                        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-3">
                                            {related.short_description}
                                        </p>
                                        <div className="flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
