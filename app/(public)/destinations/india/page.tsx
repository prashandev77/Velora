import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Thermometer, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'India | Velora Journeys',
    description: 'Discover the timeless grandeur of India — royal Rajasthani palaces, serene Kerala backwaters, the Taj Mahal at sunrise, and vibrant Goa beaches. Handcrafted luxury journeys across India.',
};

const highlights = [
    {
        title: 'Rajasthan — Land of Kings',
        description: 'Sleep in converted maharaja palaces, ride camels over Thar Desert dunes, and explore the rose-gold fortresses of Jaipur, Jodhpur, and Jaisalmer.',
        image: '/Photos/Other sections/Rajasthan.jpg',
    },
    {
        title: 'Kerala Backwaters',
        description: 'Glide through tranquil palm-fringed waterways on a private houseboat. Discover authentic Ayurvedic healing, vibrant Kathakali performances, and spice-scented hillside estates.',
        image: '/Photos/Other sections/kerala backwater.jpg',
    },
    {
        title: 'Agra & the Taj Mahal',
        description: 'Stand before the Taj Mahal as the first rays of dawn turn the marble from silver to gold. Explore the mighty Agra Fort and the ghost city of Fatehpur Sikri.',
        image: '/Photos/Other sections/Taj_Mahal_2,_Agra,_India.jpg',
    },
    {
        title: 'Goa — Coastal Escape',
        description: 'Where colonial Portuguese heritage meets golden beaches and vibrant spice markets. Boutique beach resorts, sunset cruises, and the freshest seafood on the Arabian Sea.',
        image: '/Photos/Other sections/Goa-beach.jpg',
    },
];

const experiences = [
    { icon: '🏰', label: 'Palace Hotels' },
    { icon: '🐪', label: 'Desert Safari' },
    { icon: '🚢', label: 'Houseboat Stay' },
    { icon: '🌿', label: 'Ayurveda' },
    { icon: '🕌', label: 'Taj Mahal' },
    { icon: '🎭', label: 'Kathakali Dance' },
    { icon: '🫖', label: 'Tea Estates' },
    { icon: '🦅', label: 'Wildlife Safari' },
];

export default function IndiaPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-24 bg-[#faf7f2] overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/8 rounded-full blur-[140px]" />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Land of Maharajas
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-stone-900 mt-4 mb-6">
                        <span className="text-gold">India</span>
                    </h1>
                    <p className="text-stone-500 text-lg max-w-3xl mx-auto leading-relaxed">
                        A land of extraordinary contrasts — ancient palaces and vibrant bazaars,
                        serene backwaters and golden deserts, sacred temples and colonial shores.
                        India is not just a destination; it is an experience that changes you.
                    </p>

                    {/* Quick Facts */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-stone-500 text-sm">
                        <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4 text-gold" />
                            <span>Best: Oct — Mar</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-gold" />
                            <span>Avg: 27°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gold" />
                            <span>40 UNESCO Sites</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Chips */}
            <section className="py-10 bg-white border-y border-stone-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-3">
                        {experiences.map((exp) => (
                            <span
                                key={exp.label}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-stone-600 text-sm"
                            >
                                <span>{exp.icon}</span>
                                {exp.label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20 bg-[#faf7f2]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Discover
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mt-3 mb-4">
                            Highlights of <span className="text-gold">India</span>
                        </h2>
                        <p className="text-stone-500 text-base max-w-xl mx-auto">
                            Four iconic regions, each a world unto itself. Your Velora designer
                            will craft the perfect combination for your journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {highlights.map((h) => (
                            <div
                                key={h.title}
                                className="rounded-3xl overflow-hidden bg-white border border-stone-100 hover:shadow-lg hover:border-gold/15 transition-all duration-500 group"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={h.image}
                                        alt={h.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                                        {h.title}
                                    </h3>
                                    <p className="text-stone-500 text-sm leading-relaxed">
                                        {h.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        India Journeys
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mt-3 mb-6">
                        Our India Packages
                    </h2>
                    <p className="text-stone-500 text-base max-w-2xl mx-auto mb-10">
                        Three carefully curated packages — a royal Rajasthan palace tour, a rejuvenating
                        Kerala wellness retreat, and the legendary Golden Triangle discovery.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
                        {[
                            { title: 'Royal Rajasthan', days: 10, tag: 'Luxury · Regal', slug: '/journeys/luxury' },
                            { title: 'Kerala Backwaters & Soul', days: 8, tag: 'Wellness · Rejuvenate', slug: '/journeys/wellness' },
                            { title: 'Golden Triangle Discovery', days: 7, tag: 'Adventure · Heritage', slug: '/journeys/adventure' },
                        ].map((pkg) => (
                            <Link key={pkg.title} href={pkg.slug} className="group">
                                <div className="p-6 rounded-2xl border border-stone-100 hover:border-gold/30 hover:shadow-md bg-white transition-all duration-300">
                                    <span className="text-xs font-medium text-gold uppercase tracking-wider">{pkg.tag}</span>
                                    <h3 className="font-heading text-lg font-bold text-stone-900 mt-2 mb-1 group-hover:text-gold transition-colors">{pkg.title}</h3>
                                    <p className="text-stone-400 text-sm">{pkg.days} days</p>
                                    <div className="flex items-center gap-1 mt-3 text-gold text-xs font-semibold">
                                        View details <ChevronRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-stone-900">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        Plan Your India Journey
                    </h2>
                    <p className="text-white/60 text-lg mb-8">
                        Share your vision with our India specialist and receive a bespoke itinerary
                        crafted for your perfect adventure.
                    </p>
                    <Link href="/plan-your-trip">
                        <Button className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-6 text-base rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25">
                            Start Planning
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
