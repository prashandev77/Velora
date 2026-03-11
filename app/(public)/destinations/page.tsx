import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Destinations | Velora Journeys',
    description: 'Explore our handpicked destinations — the cultural wonders of Sri Lanka, the pristine paradise of the Maldives, and the timeless grandeur of India.',
};

const destinations = [
    {
        slug: 'sri-lanka',
        name: 'Sri Lanka',
        tagline: 'The Pearl of the Indian Ocean',
        description: 'Ancient temples, misty highlands, golden beaches, and an island brimming with warmth. Sri Lanka offers a journey through centuries of heritage and breathtaking natural beauty.',
        image: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg',
    },
    {
        slug: 'maldives',
        name: 'Maldives',
        tagline: 'Paradise Perfected',
        description: 'Crystal-clear lagoons, pristine coral reefs, and overwater luxury that redefines island living. The Maldives is the ultimate destination for romance and relaxation.',
        image: '/Photos/Other sections/Sec 2  Maldives.jpeg',
    },
    {
        slug: 'india',
        name: 'India',
        tagline: 'Land of Maharajas & Timeless Wonders',
        description: 'From the ivory splendour of the Taj Mahal to the rose-gold palaces of Rajasthan and the serene backwaters of Kerala — India is a journey into a world of extraordinary contrasts and living heritage.',
        image: '/Photos/Other sections/Taj_Mahal_2,_Agra,_India.jpg',
    },
];

export default function DestinationsPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-[#faf7f2] overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/8 rounded-full blur-[140px]" />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Where We Travel
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-stone-900 mt-4 mb-6">
                        Our <span className="text-gold">Destinations</span>
                    </h1>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto">
                        Three extraordinary destinations, each offering a world of discovery.
                        Together, they create the ultimate multi-destination journey.
                    </p>
                </div>
            </section>

            {/* Destination Cards */}
            <section className="bg-[#faf7f2] py-20">
                <div className="max-w-6xl mx-auto px-6 space-y-12">
                    {destinations.map((dest) => (
                        <Link
                            key={dest.slug}
                            href={`/destinations/${dest.slug}`}
                            className="block group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-lg hover:border-gold/15 transition-all duration-500">
                                <div className="relative aspect-[4/3] lg:aspect-auto min-h-[280px] overflow-hidden">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-10 lg:p-14 flex flex-col justify-center">
                                    <span className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-2">
                                        {dest.tagline}
                                    </span>
                                    <h2 className="font-heading text-4xl font-bold text-stone-900 mb-4">
                                        {dest.name}
                                    </h2>
                                    <p className="text-stone-500 text-base leading-relaxed mb-6">
                                        {dest.description}
                                    </p>
                                    <div className="flex items-center text-gold font-medium text-sm gap-2 group-hover:gap-3 transition-all duration-300">
                                        Explore {dest.name}
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
