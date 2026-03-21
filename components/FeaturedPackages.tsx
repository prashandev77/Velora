'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { packages } from '@/lib/data';
import PackageCard from '@/components/PackageCard';
import Link from 'next/link';

export default function FeaturedPackages() {
    return (
        <section id="packages" className="relative py-20 md:py-32 bg-sand overflow-hidden">
            {/* Decorative Blurs */}
            <div className="absolute top-20 -right-40 w-96 h-96 bg-ocean/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative max-w-7xl mx-auto px-5 md:px-6 text-center mb-10 md:mb-16"
            >
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-ocean text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                        Featured Packages
                    </span>
                    <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <h2 className="font-heading text-3xl md:text-6xl font-bold text-deep mb-3">
                    Curated <span className="text-gradient-ocean">Experiences</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto">
                    Hand-picked accommodations, local experts, and unforgettable moments.
                </p>
            </motion.div>

            {/* ── MOBILE: horizontal snap-scroll ── */}
            <div className="md:hidden">
                <div
                    className="flex gap-4 px-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {packages.map((pkg, index) => (
                        <div key={pkg.id} className="flex-shrink-0 w-[82vw] max-w-[320px] snap-center">
                            <PackageCard pkg={pkg} index={index} />
                        </div>
                    ))}
                </div>

                {/* "See All" link on mobile */}
                <div className="flex justify-center mt-6 px-5">
                    <Link
                        href="/journeys"
                        className="inline-flex items-center gap-2 text-ocean font-semibold text-sm border border-ocean/30 rounded-xl px-6 py-3 hover:bg-ocean/5 active:bg-ocean/10 transition-colors"
                    >
                        See all journeys
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* ── DESKTOP: grid ── */}
            <div className="relative hidden md:block max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <PackageCard key={pkg.id} pkg={pkg} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
