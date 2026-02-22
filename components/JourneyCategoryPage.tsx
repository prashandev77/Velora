import Link from 'next/link';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPackagesByCategory } from '@/lib/data';

interface JourneyCategoryProps {
    /* kept for the hero & features */
    category: string;
    tagline: string;
    title: string;
    titleAccent: string;
    intro: string;
    heroImage: string;
    features: { title: string; description: string }[];
}

export default function JourneyCategoryPage({
    category,
    tagline,
    title,
    titleAccent,
    intro,
    heroImage,
    features,
}: JourneyCategoryProps) {
    const categoryPackages = getPackagesByCategory(category);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-24 bg-deep overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/90 to-deep" />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        {tagline}
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
                        {title} <span className="text-gradient-gold">{titleAccent}</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
                        {intro}
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-sand">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="p-7 rounded-2xl bg-white border border-deep/5 hover:shadow-lg transition-all"
                            >
                                <h3 className="font-heading text-lg font-bold text-deep mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-deep/50 text-sm leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages / Itineraries — pulled from data */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Our Packages
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-deep mt-3 mb-4">
                            Signature <span className="text-gradient-gold">Experiences</span>
                        </h2>
                        <p className="text-deep/50 text-base max-w-xl mx-auto">
                            Each journey can be fully customised to your preferences. Click any
                            package to explore the full day-by-day itinerary.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryPackages.map((pkg) => (
                            <Link
                                key={pkg.id}
                                href={`/journeys/${pkg.category}/${pkg.slug}`}
                                className="group rounded-3xl overflow-hidden bg-sand border border-deep/5 hover:shadow-xl transition-all"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden">
                                    <div
                                        className="aspect-[4/3] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                        style={{ backgroundImage: `url(${pkg.image_url})` }}
                                    />
                                    {pkg.tag && (
                                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold/90 text-deep text-xs font-semibold uppercase tracking-wider">
                                            {pkg.tag}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-heading text-xl font-bold text-deep mb-2 group-hover:text-gold transition-colors">
                                        {pkg.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-deep/40 text-sm mb-3">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {pkg.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {pkg.days} Days
                                        </span>
                                    </div>

                                    <p className="text-deep/50 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {pkg.description}
                                    </p>

                                    {/* Highlights */}
                                    {pkg.highlights && (
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {pkg.highlights.slice(0, 3).map((h) => (
                                                <span
                                                    key={h}
                                                    className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium"
                                                >
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-deep/5">
                                        <span className="text-deep/40 text-sm">
                                            {pkg.days} Days · {pkg.location}
                                        </span>
                                        <span className="flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-deep">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Planning?
                    </h2>
                    <p className="text-white/50 text-lg mb-8">
                        Every journey is fully customisable. Tell us your vision and we&apos;ll
                        design something perfect.
                    </p>
                    <Link href="/plan-your-trip">
                        <Button className="bg-gold hover:bg-gold-dark text-deep font-semibold px-8 py-6 text-base rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25">
                            Plan Your Journey
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
