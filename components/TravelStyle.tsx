'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tiles = [
    {
        heading: 'Culture & Heritage',
        description: 'Walk through ancient kingdoms, sacred temples, and colonial towns — guided privately and experienced with depth, not crowds.',
        button: 'Explore Cultural Journeys',
        href: '/journeys',
        image: '/Photos/Other sections/Section 2 _ Classic Discovery.jpeg',
    },
    {
        heading: 'Wildlife & Wilderness',
        description: 'Track leopards at dawn, witness elephant gatherings, and stay in boutique safari lodges surrounded by untamed beauty.',
        button: 'Discover Wildlife Experiences',
        href: '/journeys',
        image: '/Photos/Other sections/Section 2 _ Wildlife Expedition.jpeg',
    },
    {
        heading: 'Coast & Island Escape',
        description: 'Boutique beach retreats, private villas, and overwater Maldives indulgence — designed for complete serenity.',
        button: 'Explore Beach & Island Escapes',
        href: '/journeys',
        image: '/Photos/Other sections/Section 2 _ Coast.jpeg',
    },
    {
        heading: 'Romance & Celebrations',
        description: 'Private candlelit dinners, scenic train journeys, and unforgettable honeymoon escapes.',
        button: 'View Romantic Journeys',
        href: '/journeys',
        image: '/Photos/Other sections/Section 2 Honeymoon.jpg',
    },
];

export default function TravelStyle() {
    return (
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-[#faf7f2]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                {/* Header */}
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        Discover Your Travel Style
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Four Distinct Ways to Experience Sri Lanka
                    </h2>
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Whether you&apos;re drawn to heritage, wildlife, or coastal serenity, each journey is privately curated around you.
                    </p>
                </div>

                {/* Tiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {tiles.map((tile, i) => (
                        <motion.div
                            key={tile.heading}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[3/2]"
                        >
                            <Image
                                src={tile.image}
                                alt={tile.heading}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                                    {tile.heading}
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-md">
                                    {tile.description}
                                </p>
                                <Link
                                    href={tile.href}
                                    className="inline-flex items-center gap-2 text-gold-light text-sm font-semibold hover:text-white transition-colors duration-300 group/link"
                                >
                                    {tile.button}
                                    <span className="translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
