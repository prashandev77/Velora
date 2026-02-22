'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Calendar,
    ChevronRight,
    Star,
    Clock,
    Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package } from '@/lib/types';

export default function PackageDetail({ pkg }: { pkg: Package }) {
    const [expandedDay, setExpandedDay] = useState<number | null>(0);

    return (
        <>
            {/* ── Hero ── */}
            <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${pkg.image_url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/50 to-deep/20" />

                <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-white/40 text-sm mb-4"
                    >
                        <Link href="/journeys" className="hover:text-gold transition-colors">
                            Journeys
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link
                            href={`/journeys/${pkg.category}`}
                            className="hover:text-gold transition-colors capitalize"
                        >
                            {pkg.category}
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white/60">{pkg.title}</span>
                    </motion.div>

                    {/* Tag */}
                    {pkg.tag && (
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block w-fit px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold tracking-widest uppercase mb-4"
                        >
                            {pkg.tag}
                        </motion.span>
                    )}

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
                    >
                        {pkg.title}
                    </motion.h1>

                    {/* Meta Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        className="flex flex-wrap items-center gap-6 text-white/60 text-sm"
                    >
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gold" />
                            {pkg.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gold" />
                            {pkg.days} Days
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="bg-deep py-16">
                <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
                    {/* Left — Description + Itinerary */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-2xl font-bold text-white mb-4">
                                About This Journey
                            </h2>
                            <p className="text-white/60 leading-relaxed text-base">
                                {pkg.description}
                            </p>
                        </motion.div>

                        {/* Highlights */}
                        {pkg.highlights && pkg.highlights.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="font-heading text-2xl font-bold text-white mb-4">
                                    Highlights
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {pkg.highlights.map((h) => (
                                        <div
                                            key={h}
                                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                                        >
                                            <Check className="w-4 h-4 text-gold shrink-0" />
                                            <span className="text-white/70 text-sm">{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Day-by-Day Itinerary */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-2xl font-bold text-white mb-6">
                                Day-by-Day Itinerary
                            </h2>
                            <div className="space-y-3">
                                {pkg.itinerary.map((day, i) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <button
                                            onClick={() =>
                                                setExpandedDay(expandedDay === i ? null : i)
                                            }
                                            className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 ${expandedDay === i
                                                ? 'bg-gold/10 border-gold/30'
                                                : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            {/* Day Number */}
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${expandedDay === i
                                                    ? 'bg-gold text-deep'
                                                    : 'bg-white/10 text-white/50'
                                                    }`}
                                            >
                                                {day.day}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-semibold text-sm truncate">
                                                    {day.title}
                                                </h4>
                                            </div>

                                            <ChevronRight
                                                className={`w-4 h-4 text-white/30 transition-transform duration-300 shrink-0 ${expandedDay === i ? 'rotate-90' : ''
                                                    }`}
                                            />
                                        </button>

                                        {/* Expanded Content */}
                                        {expandedDay === i && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="ml-14 mt-2 mb-4"
                                            >
                                                <p className="text-white/50 text-sm leading-relaxed mb-3">
                                                    {day.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {day.highlights.map((hl) => (
                                                        <span
                                                            key={hl}
                                                            className="px-2.5 py-1 rounded-lg bg-white/5 text-white/40 text-xs"
                                                        >
                                                            {hl}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            {/* Enquiry Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10"
                            >
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                                    Tailored Pricing
                                </p>
                                <p className="font-heading text-lg font-bold text-white mb-1">
                                    Customised for You
                                </p>
                                <p className="text-white/30 text-xs mb-6">
                                    {pkg.days} days · {pkg.location}
                                </p>

                                <Link href="/plan-your-trip" className="block">
                                    <Button className="w-full bg-gold hover:bg-gold-dark text-deep font-semibold rounded-xl h-12 text-sm transition-all hover:shadow-lg hover:shadow-gold/25">
                                        Enquire About This Journey
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>

                                <p className="text-white/25 text-[11px] text-center mt-3">
                                    No commitment · Reply within 24 hours
                                </p>
                            </motion.div>

                            {/* Quick Facts */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h4 className="font-heading text-sm text-white font-semibold mb-4">
                                    Quick Facts
                                </h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/40 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" /> Duration
                                        </span>
                                        <span className="text-white/70">
                                            {pkg.days} days / {pkg.days - 1} nights
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/40 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" /> Location
                                        </span>
                                        <span className="text-white/70">{pkg.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/40 flex items-center gap-1.5">
                                            <Star className="w-3.5 h-3.5" /> Category
                                        </span>
                                        <span className="text-gold capitalize">{pkg.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Back Link */}
                            <Link
                                href={`/journeys/${pkg.category}`}
                                className="flex items-center justify-center gap-2 text-white/40 hover:text-gold text-sm transition-colors py-2"
                            >
                                ← Browse more {pkg.category} journeys
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="bg-deep border-t border-white/5 py-16">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-3xl font-bold text-white mb-4">
                        Ready to Begin?
                    </h2>
                    <p className="text-white/50 mb-8">
                        This itinerary is just a starting point. Our travel designers will
                        customise every detail to match your vision perfectly.
                    </p>
                    <Link href="/plan-your-trip">
                        <Button className="bg-gold hover:bg-gold-dark text-deep font-semibold px-10 py-6 rounded-xl text-base transition-all hover:shadow-xl hover:shadow-gold/25">
                            Start Planning
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
