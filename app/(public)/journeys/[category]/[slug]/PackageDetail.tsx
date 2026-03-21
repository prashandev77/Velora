'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Calendar,
    ChevronRight,
    ChevronDown,
    Check,
    X as XIcon,
    ArrowRight,
    Users,
    Hotel,
    Shield,
    CreditCard,
    Clock,
} from 'lucide-react';
import { Package } from '@/lib/types';
import { packages } from '@/lib/data';

// Lazy-load the Leaflet map (client-only, no SSR)
const JourneyMap = dynamic(() => import('@/components/JourneyMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[380px] rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center">
            <span className="text-stone-400 text-sm">Loading map…</span>
        </div>
    ),
});

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: [0, 0, 0.58, 1] as const },
};

const pricing: Record<number, string> = {
    8: '1,950',
    11: '5,450',
    12: '7,450',
    15: '3,750',
    17: '6,950',
    20: '6,200',
};

export default function PackageDetail({ pkg }: { pkg: Package }) {
    const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));
    
    const toggleDay = (i: number) => {
        setExpandedDays(prev => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });
    };
    
    const toggleAll = () => {
        if (expandedDays.size === pkg.itinerary.length) {
            setExpandedDays(new Set());
        } else {
            setExpandedDays(new Set(pkg.itinerary.map((_, i) => i)));
        }
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const price = pricing[pkg.days];

    // Determine 2 related packages (prioritize same category, then others)
    const relatedPackages = packages
        .filter((p) => p.category === pkg.category && p.id !== pkg.id)
        .concat(packages.filter((p) => p.category !== pkg.category && p.id !== pkg.id))
        .slice(0, 2);

    // Auto-slider for the photo gallery
    useEffect(() => {
        if (!pkg.galleryImages || pkg.galleryImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % pkg.galleryImages!.length);
        }, 5000); // Crossfade every 5 seconds
        return () => clearInterval(interval);
    }, [pkg.galleryImages]);

    return (
        <div className="min-h-screen bg-white">
            {/* ═══════════════════════════════════════
               1. HERO SECTION
            ═══════════════════════════════════════ */}
            <section className="relative h-[75vh] min-h-[500px] overflow-hidden">
                <Image
                    src={pkg.image_url}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-20 px-6 max-w-6xl mx-auto">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 text-white/50 text-xs mb-4"
                    >
                        <Link href="/journeys" className="hover:text-gold transition-colors">Journeys</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/journeys/${pkg.category}`} className="hover:text-gold transition-colors capitalize">{pkg.category}</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white/70">{pkg.title}</span>
                    </motion.div>

                    {/* Travel Style Pills */}
                    {pkg.travelStyle && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="text-white/60 text-xs font-light tracking-wider uppercase">
                                {pkg.travelStyle}
                            </span>
                        </motion.div>
                    )}

                    {/* Title & Subtitle */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-3 leading-tight tracking-tight"
                    >
                        {pkg.title}
                    </motion.h1>

                    {pkg.subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/70 text-base md:text-lg font-light max-w-xl"
                        >
                            {pkg.subtitle}
                        </motion.p>
                    )}

                    {/* Meta */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-white/60 text-sm"
                    >
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <Calendar className="w-4 h-4 text-gold/80" />
                            {pkg.days} Days / {pkg.days - 1} Nights
                        </span>
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <MapPin className="w-4 h-4 text-gold/80" />
                            {pkg.location}
                        </span>
                        {price && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gold/15 backdrop-blur-md rounded-full border border-gold/30 text-white font-medium whitespace-nowrap">
                                From AUD {price}
                            </span>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               2. PHOTO GALLERY (AUTO-SLIDING)
            ═══════════════════════════════════════ */}
            {pkg.galleryImages && pkg.galleryImages.length > 0 && (
                <section className="bg-white py-10 md:py-14">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={pkg.galleryImages[currentImageIndex]}
                                        alt={`${pkg.title} (Gallery ${currentImageIndex + 1})`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1280px) 100vw, 1280px"
                                        priority={currentImageIndex === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Dot Indicators */}
                            {pkg.galleryImages.length > 1 && (
                                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-10">
                                    {pkg.galleryImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentImageIndex(i)}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                                currentImageIndex === i 
                                                    ? 'w-8 bg-white' 
                                                    : 'w-2 bg-white/50 hover:bg-white/80'
                                            }`}
                                            aria-label={`Go to slide ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
               3. ABOUT & JOURNEY HIGHLIGHTS
            ═══════════════════════════════════════ */}
            <section className="bg-[#F7F5F2] py-14 md:py-20">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* About */}
                        <motion.div {...fadeUp} className="lg:col-span-3">
                            <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">About This Journey</span>
                            <div className="w-10 h-[2px] bg-gold mb-5" />
                            <p className="text-stone-600 text-base leading-relaxed">
                                {pkg.description}
                            </p>
                        </motion.div>

                        {/* Highlights */}
                        {pkg.highlights && pkg.highlights.length > 0 && (
                            <motion.div {...fadeUp} className="lg:col-span-2">
                                <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Highlights</span>
                                <div className="w-10 h-[2px] bg-gold mb-5" />
                                <div className="flex flex-wrap gap-2">
                                    {pkg.highlights.map((h) => (
                                        <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-100 rounded-full text-stone-600 text-xs">
                                            <Check className="w-3 h-3 text-gold" />
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               4. WHY THIS JOURNEY
            ═══════════════════════════════════════ */}
            {pkg.whySpecial && pkg.whySpecial.length > 0 && (
                <section className="bg-white py-14 md:py-20">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} className="text-center mb-10">
                            <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Why This Journey</span>
                            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-stone-900 mb-3">
                                Why This Journey Is Special
                            </h2>
                            <div className="w-12 h-[2px] bg-gold mx-auto" />
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                            {pkg.whySpecial.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                    className="flex items-start gap-3 p-4 bg-[#F7F5F2] rounded-xl"
                                >
                                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-stone-600 text-sm leading-relaxed">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
               5. PERFECT FOR
            ═══════════════════════════════════════ */}
            {pkg.perfectFor && pkg.perfectFor.length > 0 && (
                <section className="bg-[#F7F5F2] py-12 md:py-16">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} className="text-center">
                            <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Perfect For</span>
                            <div className="w-10 h-[2px] bg-gold mx-auto mb-6" />
                            <div className="flex flex-wrap justify-center gap-3">
                                {pkg.perfectFor.map((item, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.08 }}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-100 rounded-full text-stone-700 text-sm"
                                    >
                                        <Users className="w-3.5 h-3.5 text-gold" />
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
               6. ROUTE OVERVIEW — INTERACTIVE MAP
            ═══════════════════════════════════════ */}
            {pkg.routeCoords && pkg.routeCoords.length > 0 && (
                <section className="bg-white py-14 md:py-20">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} className="text-center mb-10">
                            <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Route Overview</span>
                            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-stone-900 mb-3">
                                Your Journey Path
                            </h2>
                            <div className="w-12 h-[2px] bg-gold mx-auto mb-4" />
                            <p className="text-stone-400 text-sm">Click any marker to see what awaits at each stop.</p>
                        </motion.div>

                        {/* Interactive Leaflet map */}
                        <motion.div {...fadeUp}>
                            <JourneyMap points={pkg.routeCoords} journeyTitle={pkg.title} />
                        </motion.div>

                        {/* Stop list below map */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {pkg.routeCoords.map((stop, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 border border-stone-100 px-3 py-1.5 rounded-full">
                                    <span className="w-4 h-4 rounded-full bg-gold/20 text-gold text-[9px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                                    {stop.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
               7. DAY-BY-DAY ITINERARY — TIMELINE
            ═══════════════════════════════════════ */}
            <section className="bg-[#F7F5F2] py-14 md:py-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <motion.div {...fadeUp} className="text-center mb-10">
                        <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Itinerary</span>
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-stone-900 mb-3">
                            Day-by-Day Itinerary
                        </h2>
                        <div className="w-12 h-[2px] bg-gold mx-auto" />
                    </motion.div>

                    {/* Timeline */}
                    <div className="flex justify-end mb-4 relative z-10">
                        <button 
                            onClick={toggleAll} 
                            className="text-gold text-xs font-semibold tracking-wider uppercase hover:text-stone-900 transition-colors"
                        >
                            {expandedDays.size === pkg.itinerary.length ? 'Collapse All' : 'Expand All'}
                        </button>
                    </div>
                    <div className="relative">
                        {/* Vertical connector line */}
                        <div className="absolute left-[17px] top-6 bottom-6 w-px bg-stone-200" />

                        <div className="space-y-3">
                            {pkg.itinerary.map((day, i) => (
                                <motion.div
                                    key={day.day}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: Math.min(i * 0.03, 0.25) }}
                                    className="relative pl-10"
                                >
                                    {/* Day circle on timeline */}
                                    <div className={`absolute left-0 top-3.5 w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                                        expandedDays.has(i)
                                            ? 'bg-gold border-gold text-white shadow-md shadow-gold/20'
                                            : 'bg-white border-stone-200 text-stone-400'
                                    }`}>
                                        {day.day}
                                    </div>

                                    {/* Card */}
                                    <button
                                        onClick={() => toggleDay(i)}
                                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                                            expandedDays.has(i)
                                                ? 'bg-white border-gold/20 shadow-sm'
                                                : 'bg-white border-stone-100 hover:border-stone-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-0.5">Day {day.day}</p>
                                                <h4 className={`font-medium text-sm transition-colors duration-200 ${
                                                    expandedDays.has(i) ? 'text-stone-900' : 'text-stone-700'
                                                }`}>{day.title}</h4>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                                                expandedDays.has(i) ? 'rotate-180 text-gold' : 'text-stone-300'
                                            }`} />
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {expandedDays.has(i) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-3 mt-3 border-t border-stone-50">
                                                        <p className="text-stone-500 text-sm leading-relaxed mb-3">
                                                            {day.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {day.highlights.map((hl) => (
                                                                <span key={hl} className="px-3 py-1 rounded-full bg-gold/6 border border-gold/15 text-stone-500 text-xs">
                                                                    {hl}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               8. ACCOMMODATION
            ═══════════════════════════════════════ */}
            {pkg.accommodation && (
                <section className="bg-white py-14 md:py-20">
                    <div className="max-w-4xl mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} className="flex gap-5 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center mt-1">
                                <Hotel className="w-6 h-6 text-gold" strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-2 block">Accommodation</span>
                                <h2 className="font-heading text-xl md:text-2xl font-semibold text-stone-900 mb-3">Handpicked Stays</h2>
                                <p className="text-stone-500 text-sm leading-relaxed">{pkg.accommodation}</p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
               9. INCLUDED / NOT INCLUDED
            ═══════════════════════════════════════ */}
            {(pkg.included || pkg.notIncluded) && (
                <section className="bg-[#F7F5F2] py-14 md:py-20">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} className="text-center mb-10">
                            <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Details</span>
                            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-stone-900 mb-3">
                                What&apos;s Included
                            </h2>
                            <div className="w-12 h-[2px] bg-gold mx-auto" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Included */}
                            {pkg.included && (
                                <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 md:p-8 border border-stone-100">
                                    <h3 className="font-heading text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-600" />
                                        Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {pkg.included.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-stone-600 text-sm">
                                                <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Not Included */}
                            {pkg.notIncluded && (
                                <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 md:p-8 border border-stone-100">
                                    <h3 className="font-heading text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                        <XIcon className="w-5 h-5 text-stone-400" />
                                        Not Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {pkg.notIncluded.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-stone-500 text-sm">
                                                <XIcon className="w-3.5 h-3.5 text-stone-300 flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
               9.5. IMPORTANT INFORMATION
            ═══════════════════════════════════════ */}
            <section className="bg-white py-14 md:py-20 border-t border-stone-100">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <motion.div {...fadeUp} className="text-center mb-10">
                        <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Good to Know</span>
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-stone-900 mb-3">
                            Important Information
                        </h2>
                        <div className="w-12 h-[2px] bg-gold mx-auto" />
                    </motion.div>
                    <motion.div {...fadeUp} className="bg-[#F7F5F2] rounded-2xl p-6 md:p-8 border border-stone-100">
                        <ul className="space-y-4">
                            {[
                                'All journeys are privately curated and tailored to your preferences',
                                'Hotels are subject to availability and may be substituted with similar options',
                                'Pricing may vary depending on travel dates and availability',
                                'Scenic train journeys are subject to ticket availability',
                                'Travel times may vary due to road and traffic conditions',
                                'Standard hotel check-in/out times apply',
                                'Travel insurance is strongly recommended',
                            ].map((info, i) => (
                                <li key={i} className="flex items-start gap-3 text-stone-600 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-2 flex-shrink-0" />
                                    <span className="leading-relaxed">{info}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               10. BOOKING & PAYMENTS
            ═══════════════════════════════════════ */}
            <section className="bg-white py-14 md:py-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <motion.div {...fadeUp} className="text-center mb-8">
                        <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Booking & Payment</span>
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-stone-900 mb-3">
                            Reserve with Confidence
                        </h2>
                        <div className="w-12 h-[2px] bg-gold mx-auto mb-5" />
                    </motion.div>

                    <motion.div {...fadeUp} className="bg-[#F7F5F2] rounded-2xl p-6 md:p-8 border border-stone-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="w-4 h-4 text-gold" />
                                </div>
                                <div>
                                    <p className="text-stone-800 text-sm font-medium mb-1">20% Deposit</p>
                                    <p className="text-stone-500 text-xs leading-relaxed">Confirms your journey and secures accommodation, transport, and experiences.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-4 h-4 text-gold" />
                                </div>
                                <div>
                                    <p className="text-stone-800 text-sm font-medium mb-1">Balance Due</p>
                                    <p className="text-stone-500 text-xs leading-relaxed">Remaining balance payable 14 days prior to arrival in Sri Lanka.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-4 h-4 text-gold" />
                                </div>
                                <div>
                                    <p className="text-stone-800 text-sm font-medium mb-1">Secure & Transparent</p>
                                    <p className="text-stone-500 text-xs leading-relaxed">Full payment instructions provided with your booking confirmation.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               10.5. RELATED JOURNEYS
            ═══════════════════════════════════════ */}
            {relatedPackages.length > 0 && (
                <section className="bg-[#F7F5F2] py-16 md:py-24 border-t border-stone-100">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} className="text-center mb-12">
                            <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">Discover More</span>
                            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-900 mb-4">
                                You May Also Love
                            </h2>
                            <div className="w-12 h-[2px] bg-gold mx-auto" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                            {relatedPackages.map((relatedPkg, i) => (
                                <Link
                                    key={relatedPkg.id}
                                    href={`/journeys/${relatedPkg.category}/${relatedPkg.slug}`}
                                    className="group block relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-stone-900 aspect-[4/3] md:aspect-[3/2] shadow-md hover:shadow-xl transition-all duration-500"
                                >
                                    <Image
                                        src={relatedPkg.image_url}
                                        alt={relatedPkg.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-gold/90 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md">
                                                {relatedPkg.days} Days
                                            </span>
                                            {relatedPkg.travelStyle && (
                                                <span className="text-white/80 text-[10px] font-medium tracking-wider uppercase">
                                                    • {relatedPkg.travelStyle.split('•')[0].trim()}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-heading text-2xl md:text-3xl font-medium text-white mb-2 leading-tight">
                                            {relatedPkg.title}
                                        </h3>
                                        <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                                            View Journey
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
               11. CALL TO ACTION
            ═══════════════════════════════════════ */}
            <section className="bg-stone-900 py-16 md:py-24">
                <motion.div
                    {...fadeUp}
                    className="max-w-3xl mx-auto px-6 text-center"
                >
                    <span className="text-gold/70 text-xs font-medium uppercase tracking-[0.3em] mb-4 block">
                        Ready?
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-normal text-white mb-4 tracking-tight">
                        Start Planning Your Journey
                    </h2>
                    <div className="w-12 h-[2px] bg-gold mx-auto mb-5" />
                    <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
                        Every Velora journey is privately designed and tailored to your travel style and preferred travel dates.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/plan-your-trip">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 bg-white text-stone-900 hover:bg-gold hover:text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-500"
                            >
                                Start Planning
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/20 hover:border-white/40 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                            >
                                Send Enquiry
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
