'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// All photos mapped by name → used in the right context
const galleryImages = [
    {
        src: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg',
        alt: 'Sigiriya Rock Fortress',
        span: 'col-span-2 row-span-2',
    },
    {
        src: '/Photos/Other sections/Hill Country.jpg',
        alt: 'Sri Lanka Hill Country',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/Destination Galle.jpeg',
        alt: 'Galle Fort',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/Elephants Rambukkhana.jpeg',
        alt: 'Elephant Gathering',
        span: 'col-span-1 row-span-2',
    },
    {
        src: '/Photos/Other sections/Destination Ella.jpeg',
        alt: 'Ella Nine Arches Bridge',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Hero Slide 2 Cape Weligama.jpg',
        alt: 'Cape Weligama Coastline',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/Rice Field.jpeg',
        alt: 'Lush Rice Fields',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/Destination Tea.jpeg',
        alt: 'Tea Estate Sunrise',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Hero Slide 4 Maldives.jpg',
        alt: 'Maldives Overwater Villa',
        span: 'col-span-1 row-span-2',
    },
    {
        src: '/Photos/Other sections/Destination Mirissa.jpeg',
        alt: 'Mirissa Beach',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/Wild life .jpeg',
        alt: 'Wildlife Safari',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/jafna culture.jpg',
        alt: 'Jaffna Cultural Heritage',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/Water Rafting Kitulgala.jpg',
        alt: 'White-Water Rafting Kitulgala',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/Photos/Other sections/Nuwara Eliya.jpeg',
        alt: 'Nuwara Eliya Tea Country',
        span: 'col-span-1 row-span-1',
    },
];

const mobileImages = galleryImages.slice(0, 7);

export default function Gallery() {
    return (
        <section id="gallery" className="relative py-20 md:py-28 bg-[#faf7f2] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-5 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 md:mb-14"
                >
                    <span className="text-gold text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                        Visual Stories
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mt-3 mb-3">
                        Sri Lanka in Every Frame
                    </h2>
                    <p className="text-stone-400 text-sm md:text-base max-w-xl mx-auto">
                        From ancient fortresses to ocean villas, a glimpse into the extraordinary moments awaiting you.
                    </p>
                </motion.div>

                {/* ── MOBILE: vertical feed ── */}
                <div className="md:hidden">
                    {/* Hero image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-72 rounded-2xl overflow-hidden mb-3 group"
                    >
                        <Image
                            src={galleryImages[0].src}
                            alt={galleryImages[0].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <p className="text-white font-semibold text-sm">{galleryImages[0].alt}</p>
                        </div>
                    </motion.div>

                    {/* 2-column grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {mobileImages.slice(1).map((img, i) => (
                            <motion.div
                                key={img.alt}
                                initial={{ opacity: 0, scale: 0.94 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="relative rounded-2xl overflow-hidden group"
                                style={{ aspectRatio: '4/3' }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-active:scale-105"
                                    sizes="50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-2 left-3">
                                    <p className="text-white/85 text-xs font-medium leading-tight">{img.alt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center"
                    >
                        <Link
                            href="/destinations"
                            className="inline-flex items-center gap-2 text-gold text-sm font-semibold border border-gold/30 rounded-xl px-6 py-3 hover:bg-gold/10 transition-colors"
                        >
                            Explore all destinations
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* ── DESKTOP: masonry CSS grid ── */}
                <div className="hidden md:grid md:grid-cols-4 auto-rows-[190px] gap-4">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={img.alt + index}
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.55, delay: index * 0.06 }}
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 ${img.span}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 1280px) 25vw, 320px"
                            />
                            {/* Subtle hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-400" />
                            {/* Label on hover */}
                            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5">
                                    <p className="text-white text-xs font-medium">{img.alt}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="hidden md:flex justify-center mt-10"
                >
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                        Explore All Destinations
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
