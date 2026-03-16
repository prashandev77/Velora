import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    MapPin,
    Clock,
    ArrowLeft,
    CalendarDays,
    Sparkles,
    Check,
    Utensils,
    Car,
    Building2,
    Headphones,
    Camera,
    ShieldCheck,
    Plane,
    Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { packages } from '@/lib/data';
import Timeline from '@/components/Timeline';

// Generate static paths for all packages
export function generateStaticParams() {
    return packages.map((pkg) => ({
        id: pkg.id,
    }));
}

export function generateMetadata({ params: _params }: { params: Promise<{ id: string }> }) {
    return {
        title: 'Package Details | Velora Journeys',
        description: 'Explore your dream travel package with Velora Journeys.',
    };
}

const inclusions = [
    { icon: Building2, label: 'Luxury Accommodation' },
    { icon: Car, label: 'Private Transfers' },
    { icon: Utensils, label: 'Gourmet Meals' },
    { icon: Headphones, label: '24/7 Concierge' },
    { icon: Camera, label: 'Guided Excursions' },
    { icon: ShieldCheck, label: 'Travel Insurance' },
    { icon: Plane, label: 'Domestic Flights' },
    { icon: Sparkles, label: 'VIP Experiences' },
];

const reviews = [
    {
        name: 'James & Sarah M.',
        location: 'London, UK',
        rating: 5,
        text: 'An absolutely unforgettable experience. Every moment was crafted to perfection. The attention to detail by our travel designer was extraordinary.',
    },
    {
        name: 'Akira T.',
        location: 'Tokyo, Japan',
        rating: 5,
        text: 'Velora exceeded all expectations. The local guides were knowledgeable and passionate. Already planning our return trip.',
    },
    {
        name: 'Elena R.',
        location: 'Milan, Italy',
        rating: 5,
        text: 'The perfect honeymoon. Every transfer, every meal, every sunset — it all felt seamlessly orchestrated. Pure luxury.',
    },
];

export default async function PackageDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const pkg = packages.find((p) => p.id === id);

    if (!pkg) {
        notFound();
    }

    const validPackageIds = ['5', '8', '10', '11'];
    const otherPackages = packages.filter((p) => p.id !== id && validPackageIds.includes(p.id));

    return (
        <div className="min-h-screen bg-[#faf7f2]">
            {/* Hero Banner */}
            <div className="relative h-[65vh] min-h-[550px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${pkg.image_url}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-12">
                    <Link
                        href="/#packages"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Packages
                    </Link>

                    {pkg.tag && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/90 text-deep text-xs font-bold uppercase tracking-wider w-fit mb-4">
                            <Sparkles className="w-3 h-3" />
                            {pkg.tag}
                        </span>
                    )}

                    <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                        {pkg.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-white/70 mb-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gold" />
                            <span>{pkg.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gold" />
                            <span>{pkg.days} Days</span>
                        </div>
                    </div>

                    <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
                        {pkg.description}
                    </p>
                </div>
            </div>

            {/* Quick Booking Bar */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6 text-stone-500 text-sm">
                        <span>{pkg.days} Days / {pkg.days - 1} Nights</span>
                        <Separator orientation="vertical" className="h-6 bg-stone-200 hidden sm:block" />
                        <span>Private guided tour</span>
                        <Separator orientation="vertical" className="h-6 bg-stone-200 hidden sm:block" />
                        <span>All inclusive</span>
                    </div>
                    <Link href={`/book/${pkg.id}`}>
                        <Button className="bg-gold hover:bg-gold-dark text-white font-semibold px-6 rounded-xl transition-all shadow-sm">
                            <CalendarDays className="w-4 h-4 mr-2" />
                            Book Now
                        </Button>
                    </Link>
                </div>
            </div>

            {/* What's Included */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Everything You Need
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mt-3">
                        What&apos;s <span className="text-gold">Included</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {inclusions.map((item) => (
                        <div
                            key={item.label}
                            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-stone-100 hover:border-gold/20 hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                <item.icon className="w-6 h-6 text-stone-400 group-hover:text-gold transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-stone-700 text-center">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="max-w-7xl mx-auto bg-stone-200" />

            {/* Itinerary Section */}
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Your Journey
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mt-3 mb-4">
                        Day-by-Day <span className="text-gold">Itinerary</span>
                    </h2>
                    <p className="text-stone-500 text-lg max-w-xl mx-auto">
                        Every moment thoughtfully planned, every experience carefully
                        curated.
                    </p>
                </div>

                <Timeline itinerary={pkg.itinerary} />
            </div>

            {/* Highlights Strip */}
            <div className="bg-white border-y border-stone-200 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <p className="font-heading text-4xl font-bold text-gold mb-2">
                                {pkg.itinerary.length}
                            </p>
                            <p className="text-stone-500 text-sm font-medium uppercase tracking-wider">Unique Experiences</p>
                        </div>
                        <div className="text-center">
                            <p className="font-heading text-4xl font-bold text-gold mb-2">
                                5★
                            </p>
                            <p className="text-stone-500 text-sm font-medium uppercase tracking-wider">Luxury Accommodations</p>
                        </div>
                        <div className="text-center">
                            <p className="font-heading text-4xl font-bold text-gold mb-2">
                                24/7
                            </p>
                            <p className="text-stone-500 text-sm font-medium uppercase tracking-wider">Personal Concierge</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose This */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            The Velora Difference
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mt-3 mb-6">
                            Why Choose This{' '}
                            <span className="text-gold">Journey</span>
                        </h2>
                        <div className="space-y-4">
                            {[
                                'Handpicked luxury accommodation at every stop',
                                'Private, English-speaking expert guides throughout',
                                'Exclusive access to off-the-beaten-path experiences',
                                'Flexible itinerary, adjust activities to your mood',
                                'All ground transportation in premium vehicles',
                                'Pre-departure planning sessions with your travel designer',
                                'Complimentary 24/7 emergency support',
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <span className="text-stone-600 text-sm leading-relaxed">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="rounded-3xl overflow-hidden h-[400px] bg-cover bg-center"
                            style={{ backgroundImage: `url('${pkg.image_url}')` }}
                        />
                        <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl bg-white shadow-xl border border-stone-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-gold-dark" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-stone-900">
                                        100% Satisfaction
                                    </p>
                                    <p className="text-xs text-stone-500">
                                        Full refund if not delighted
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border-y border-stone-200">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-12">
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Traveler Reviews
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mt-3">
                            What Our Guests <span className="text-gold">Say</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.name}
                                className="p-6 rounded-2xl bg-stone-50 border border-stone-100"
                            >
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-gold/80 text-gold/80"
                                        />
                                    ))}
                                </div>
                                <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">
                                    &ldquo;{review.text}&rdquo;
                                </p>
                                <div className="border-t border-stone-200 pt-4">
                                    <p className="text-sm font-semibold text-stone-900">
                                        {review.name}
                                    </p>
                                    <p className="text-xs text-stone-500">
                                        {review.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Other Packages */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900">
                        You May Also <span className="text-gold">Love</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {otherPackages.slice(0, 2).map((other) => (
                        <Link
                            key={other.id}
                            href={`/package/${other.id}`}
                            className="group"
                        >
                            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-stone-100 hover:border-gold/20 hover:shadow-md transition-all duration-300">
                                <div
                                    className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${other.image_url}')` }}
                                />
                                <div className="flex-1">
                                    <h3 className="font-heading text-lg font-bold text-stone-900 group-hover:text-gold transition-colors">
                                        {other.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-stone-500 text-sm mt-1">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {other.location}
                                        </span>
                                        <span>{other.days} Days</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Final CTA */}
            <div className="bg-stone-900">
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready for Your <span className="text-gold">{pkg.title}</span>?
                    </h3>
                    <p className="text-stone-400 text-lg mb-8 max-w-md mx-auto">
                        Secure your spot with a personalized booking. Our travel designers
                        will tailor every detail to perfection.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/book/${pkg.id}`}>
                            <Button
                                size="lg"
                                className="bg-gold hover:bg-gold-dark text-stone-900 font-semibold px-10 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25 border-none"
                            >
                                <CalendarDays className="w-5 h-5 mr-2" />
                                Book This Journey
                            </Button>
                        </Link>
                        <Link href="/journeys">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-stone-700 bg-transparent text-white hover:bg-stone-800 hover:text-white px-8 rounded-xl"
                            >
                                Explore Others
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
