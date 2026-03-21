'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { travelStyleContent } from '@/lib/content';

const tiles = [
    {
        heading: 'Culture & Heritage',
        description: 'Walk through ancient kingdoms, sacred temples, and colonial towns, guided privately and experienced with depth, not crowds.',
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
        description: 'Boutique beach retreats, private villas, and overwater Maldives indulgence, designed for complete serenity.',
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
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                {/* Header */}
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        {travelStyleContent.tag}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        {travelStyleContent.heading}
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        {travelStyleContent.subtitle}
                    </p>
                </div>

                {/* Tiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 lg:gap-8">
                    {tiles.map((tile, i) => (
                        <motion.div
                            key={tile.heading}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group flex flex-col p-5 md:p-0 rounded-[2.5rem] md:rounded-2xl border border-gold/10 md:border-transparent hover:border-gold/30 md:hover:border-transparent transition-all duration-500 bg-[#F7F5F2]/40 md:bg-transparent hover:bg-white md:hover:bg-transparent"
                        >
                            <div className="relative overflow-hidden rounded-2xl md:rounded-2xl aspect-[16/10] md:aspect-[3/2] md:border md:border-gold/10 md:group-hover:border-gold/30 md:transition-colors md:duration-500">
                                <Image
                                    src={tile.image}
                                    alt={tile.heading}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Overlay only for desktop */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 md:opacity-100 transition-opacity duration-500" />
                                
                                <div className="hidden md:flex absolute inset-0 flex-col justify-end p-8">
                                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
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
                            </div>

                            {/* Minimal details for mobile view — outside image */}
                            <div className="flex md:hidden flex-col mt-5">
                                <h3 className="font-heading text-xl font-bold text-stone-900 mb-2">
                                    {tile.heading}
                                </h3>
                                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                                    {tile.description}
                                </p>
                                <Link
                                    href={tile.href}
                                    className="inline-flex items-center gap-2 text-gold text-sm font-semibold group/link"
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
