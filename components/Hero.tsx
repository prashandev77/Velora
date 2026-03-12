'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        headline: 'From Sacred Temples to Turquoise Shores',
        subtext:
            'Privately curated journeys across Sri Lanka and the Maldives. Tailor-made travel experiences designed around you. Not fixed departure dates. Not group tours. Just seamless, personal journeys crafted with care.',
        tag: 'Culture & Coast',
        buttons: [
            { label: 'Plan Your Journey', href: '/plan-your-trip', primary: true },
            { label: 'Explore Signature Experiences', href: '/journeys', primary: false },
        ],
        image: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg',
    },
    {
        id: 2,
        headline: 'Where Untamed Beauty Meets Refined Comfort',
        subtext:
            'Luxury safaris, private guides, and boutique lodges in Sri Lanka\'s most extraordinary wilderness.',
        tag: 'Wildlife & Nature',
        buttons: [
            { label: 'Discover Wildlife Journeys', href: '/journeys', primary: true },
            { label: 'Explore Destination Map', href: '/#destinations', primary: false },
        ],
        image: '/Photos/Hero Slide Photo 2 .jpeg',
    },
    {
        id: 3,
        headline: 'Island Serenity, Perfected',
        subtext:
            'Overwater villas, crystal lagoons, and world-class spa retreats. A private haven where the horizon never ends.',
        tag: 'The Maldives Escape',
        buttons: [
            { label: 'View Maldives Collection', href: '/journeys', primary: true },
            { label: 'Design Your Escape', href: '/plan-your-trip', primary: false },
        ],
        image: '/Photos/Hero Slide 4 Maldives.jpg',
    },
    {
        id: 4,
        headline: 'Luxury, Thoughtfully Curated',
        subtext:
            'At Velora, we don\'t just book trips — we choreograph experiences. Every detail of your journey is hand-selected and personally coordinated.',
        tag: 'The Velora Promise',
        buttons: [
            { label: 'Start Planning', href: '/plan-your-trip', primary: true },
            { label: 'Learn Our Story', href: '/about', primary: false },
        ],
        image: '/Photos/Hero Slide Photo 3 tea.jpeg',
    },
];

const INTERVAL = 6000;

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            setDirection(index > current ? 1 : -1);
            setCurrent(index);
        },
        [current],
    );

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(next, INTERVAL);
        return () => clearInterval(timer);
    }, [isPaused, next]);

    const slide = slides[current];

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? '8%' : '-8%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? '-8%' : '8%', opacity: 0 }),
    };

    return (
        <section
            className="relative h-screen w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ── Background images ── */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slide.image}
                        alt={slide.headline}
                        fill
                        className="object-cover"
                        priority={slide.id === 1}
                        sizes="100vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* ── Content ── */}
            <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="max-w-2xl"
                        >
                            {/* Tag */}
                            <span className="inline-block text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-4 md:mb-5">
                                {slide.tag}
                            </span>

                            {/* Headline */}
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 md:mb-6">
                                {slide.headline}
                            </h1>

                            {/* Subtext */}
                            <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl">
                                {slide.subtext}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {slide.buttons.map((btn) => (
                                    <Link
                                        key={btn.label}
                                        href={btn.href}
                                        className={`px-6 py-3 md:px-8 md:py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                            btn.primary
                                                ? 'bg-gold text-deep hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/20'
                                                : 'border border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                                        }`}
                                    >
                                        {btn.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Navigation arrows ── */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* ── Slide indicators ── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="group relative"
                    >
                        <div
                            className={`h-1 rounded-full transition-all duration-500 ${
                                i === current ? 'w-10 bg-gold' : 'w-6 bg-white/30 group-hover:bg-white/50'
                            }`}
                        />
                        {i === current && !isPaused && (
                            <motion.div
                                className="absolute top-0 left-0 h-1 rounded-full bg-gold/50"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                                key={`progress-${current}`}
                            />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}
