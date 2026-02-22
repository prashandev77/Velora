'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
    { src: '/images/sigiriya.jpg', alt: 'Sigiriya Rock Fortress', span: 'col-span-2 row-span-2' },
    { src: '/images/maldives-beach.jpg', alt: 'Maldives Beach', span: 'col-span-1 row-span-1' },
    { src: '/images/wellness-hero.jpg', alt: 'Wellness Sanctuary', span: 'col-span-1 row-span-1' },
    { src: '/images/temple.jpg', alt: 'Temple of the Tooth', span: 'col-span-1 row-span-1' },
    { src: '/images/safari-wildlife.jpg', alt: 'Wildlife Safari', span: 'col-span-1 row-span-1' },
    { src: '/images/luxury-hero.jpg', alt: 'Luxury Resort', span: 'col-span-1 row-span-2' },
    { src: '/images/coastline.jpg', alt: 'Coastal Lagoon', span: 'col-span-1 row-span-1' },
    { src: '/images/tea-plantation.jpg', alt: 'Tea Plantations', span: 'col-span-1 row-span-1' },
];

// Only show 6 images on mobile (hero + 5 tiles)
const mobileImages = galleryImages.slice(0, 6);

export default function Gallery() {
    return (
        <section id="gallery" className="relative py-20 md:py-32 bg-deep overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-5 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-gold text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                        Visual Stories
                    </span>
                    <h2 className="font-heading text-3xl md:text-6xl font-bold text-white mt-3 mb-3">
                        Captured <span className="text-gradient-gold">Moments</span>
                    </h2>
                    <p className="text-white/50 text-sm md:text-lg max-w-xl mx-auto">
                        A glimpse into the extraordinary moments awaiting you.
                    </p>
                </motion.div>

                {/* ── MOBILE: vertical feed grid (2 col) ── */}
                <div className="md:hidden">
                    {/* Hero image — full width */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-64 rounded-2xl overflow-hidden mb-3 group"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${galleryImages[0].src})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <p className="text-white font-semibold text-sm">{galleryImages[0].alt}</p>
                        </div>
                    </motion.div>

                    {/* 2-column grid for remaining */}
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
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-active:scale-105"
                                    style={{ backgroundImage: `url(${img.src})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute bottom-2 left-3">
                                    <p className="text-white/80 text-xs font-medium leading-tight">{img.alt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View all link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center"
                    >
                        <Link
                            href="/destinations"
                            className="inline-flex items-center gap-2 text-gold text-sm font-semibold border border-gold/30 rounded-xl px-6 py-3 hover:bg-gold/10 active:bg-gold/20 transition-colors"
                        >
                            Explore destinations
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* ── DESKTOP: masonry CSS grid ── */}
                <div className="hidden md:grid md:grid-cols-4 auto-rows-[200px] gap-4">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={img.alt + index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${img.src})` }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-sm font-medium">{img.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
