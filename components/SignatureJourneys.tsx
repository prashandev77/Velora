'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const journeys = [
    {
        duration: '12 Days | 11 Nights',
        title: 'Classic Discovery',
        description:
            'An immersive introduction to Sri Lanka\'s cultural heart — ancient kingdoms, sacred temples, scenic hill country, and refined coastal elegance, experienced privately and at your pace.',
        image: '/Photos/Other sections/Our Journeys_Classic Discovery.jpeg',
    },
    {
        duration: '14 Days | 13 Nights',
        title: 'Wildlife & Nature Expedition',
        description:
            'Luxury safari experiences across Sri Lanka\'s most extraordinary national parks — leopard tracking at dawn, elephant gatherings, and boutique lodge stays immersed in untamed beauty.',
        image: '/Photos/Other sections/Our Journeys_Wildlife.jpeg',
    },
    {
        duration: '16 Days | 15 Nights',
        title: 'Sri Lanka & Maldives Escape',
        description:
            'A seamless blend of Sri Lankan heritage and Maldives island indulgence — private cultural exploration followed by overwater villa serenity.',
        image: '/Photos/Other sections/Sec 2  Maldives.jpeg',
    },
    {
        duration: '10–14 Days',
        title: 'Romance & Honeymoon',
        description:
            'Designed for couples seeking privacy and unforgettable moments — scenic train journeys, candlelit beach dinners, boutique villas, and curated experiences crafted for two.',
        image: '/Photos/Other sections/Section 2 Honeymoon.jpg',
    },
    {
        duration: '9–12 Days',
        title: 'Wellness & Boutique Retreats',
        description:
            'Tea estate escapes, coastal sanctuaries, and curated wellness experiences blending Ayurveda, relaxation, and refined comfort.',
        image: '/Photos/Other sections/Sec 2-Luxe-Wellness-Club.jpg',
    },
];

export default function SignatureJourneys() {
    return (
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                {/* Header */}
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        Signature Journeys
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Curated Experiences, Thoughtfully Designed
                    </h2>
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Every Velora journey is privately tailored, combining boutique stays, trusted local experts, and seamless coordination from arrival to departure.
                    </p>
                </div>

                {/* Journeys Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {journeys.map((j, i) => (
                        <motion.div
                            key={j.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className="group relative overflow-hidden rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-500"
                        >
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={j.image}
                                    alt={j.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block bg-white/90 backdrop-blur-md text-stone-700 text-[11px] font-medium px-3 py-1.5 rounded-full border border-stone-200">
                                        {j.duration}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white border-t border-stone-100 p-6">
                                <h3 className="font-heading text-lg md:text-xl font-bold text-stone-900 mb-2">
                                    {j.title}
                                </h3>
                                <p className="text-stone-500 text-sm leading-relaxed mb-5 line-clamp-3">
                                    {j.description}
                                </p>
                                <div className="flex items-center gap-4">
                                    <Link href="/journeys" className="text-gold text-sm font-semibold hover:text-gold-dark transition-colors">
                                        View Itinerary →
                                    </Link>
                                    <Link href="/contact" className="text-stone-400 text-sm font-medium hover:text-stone-700 transition-colors">
                                        Plan My Journey
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
