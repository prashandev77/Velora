'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Palmtree, Mountain, Waves } from 'lucide-react';
import { journeys } from '@/lib/data';

const icons = {
    culture: Mountain,
    relaxation: Palmtree,
    adventure: Waves,
};

export default function JourneysSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.8', 'end start'],
    });

    // Desktop: scroll-driven slide. The total cards width minus one viewport width.
    // 3 cards × 500px + 2 gaps × 32px = 1564px total. Viewport ~1280px. Need to move ~284px.
    // Using -28% works well on wide screens.
    const x = useTransform(scrollYProgress, [0.2, 0.95], ['0%', '-42%']);

    return (
        <section
            id="journeys"
            ref={containerRef}
            className="relative py-24 bg-deep overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ocean/5 rounded-full blur-[120px]" />

            {/* Section Header */}
            <div className="relative max-w-7xl mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Choose Your Path
                    </span>
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
                        Three Ways to <span className="text-gradient-gold">Explore</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl">
                        Whether you seek culture, serenity, or adventure — every path leads
                        to the extraordinary.
                    </p>
                </motion.div>
            </div>

            {/* ── MOBILE: native snap-scroll carousel ── */}
            <div className="md:hidden relative">
                <div
                    className="flex gap-5 px-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {journeys.map((journey) => {
                        const Icon = icons[journey.id as keyof typeof icons] || Mountain;
                        return (
                            <Link
                                key={journey.id}
                                href={`/journeys/${journey.id}`}
                                className="relative flex-shrink-0 w-[85vw] max-w-[340px] h-[460px] rounded-3xl overflow-hidden snap-center block"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${journey.image})` }}
                                />
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${journey.color} opacity-80`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-7">
                                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-3">
                                        <Icon className="w-5 h-5 text-gold" />
                                    </div>
                                    <h3 className="font-heading text-3xl font-bold text-white mb-1">
                                        {journey.title}
                                    </h3>
                                    <p className="text-gold/80 text-sm font-medium tracking-wide mb-2">
                                        {journey.subtitle}
                                    </p>
                                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
                                        {journey.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-gold text-sm font-medium">
                                        <span>Explore</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Scroll hint dots */}
                <div className="flex justify-center gap-2 mt-2">
                    {journeys.map((j) => (
                        <div key={j.id} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    ))}
                </div>
            </div>

            {/* ── DESKTOP: scroll-driven horizontal slide ── */}
            <div className="hidden md:block relative min-h-[70vh]">
                <div className="sticky top-[15vh]">
                    <motion.div
                        style={{ x }}
                        className="flex gap-8 pl-[max(24px,calc((100vw-1280px)/2+24px))]"
                    >
                        {journeys.map((journey, index) => {
                            const Icon = icons[journey.id as keyof typeof icons] || Mountain;
                            return (
                                <motion.div
                                    key={journey.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    className="relative flex-shrink-0 w-[500px] h-[600px] rounded-3xl overflow-hidden group cursor-pointer"
                                >
                                    <Link href={`/journeys/${journey.id}`} className="absolute inset-0">
                                        {/* Background Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${journey.image})` }}
                                        />
                                        {/* Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-t ${journey.color} opacity-80`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        {/* Content */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-10">
                                            <div className="mb-4">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                                                    <Icon className="w-6 h-6 text-gold" />
                                                </div>
                                                <h3 className="font-heading text-4xl font-bold text-white mb-1">
                                                    {journey.title}
                                                </h3>
                                                <p className="text-gold/80 text-sm font-medium tracking-wide mb-3">
                                                    {journey.subtitle}
                                                </p>
                                                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                                                    {journey.description}
                                                </p>
                                            </div>
                                            <motion.div
                                                className="flex items-center gap-2 text-gold text-sm font-medium group/btn"
                                                whileHover={{ x: 5 }}
                                            >
                                                <span>Explore</span>
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </motion.div>
                                        </div>
                                        {/* Hover Shine */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/5 to-transparent" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
