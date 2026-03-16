'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        headline: 'From Sacred Temples to Turquoise Shores',
        subtext: 'Privately curated journeys across Sri Lanka.',
        tag: 'DISCOVER SRI LANKA',
        buttons: [
            { label: 'Plan Your Journey', href: '/plan-your-trip', primary: true },
        ],
        image: '/Photos/Hero Slide Photo 1 Sigiriya bright up.jpg',
    },
    {
        id: 2,
        headline: 'Where Untamed Beauty Meets Refined Comfort',
        subtext: 'Private safaris and boutique wilderness lodges.',
        tag: 'WILDLIFE & NATURE',
        buttons: [
            { label: 'Discover Wildlife Journeys', href: '/journeys', primary: true },
        ],
        image: '/Photos/Hero 2 Wildlife new red brightness.png',
    },
    {
        id: 3,
        headline: 'Luxury, Thoughtfully Curated',
        subtext: 'Privately designed journeys with handpicked stays and trusted local expertise.',
        tag: 'THE VELORA PROMISE',
        buttons: [
            { label: 'Start Planning', href: '/plan-your-trip', primary: true },
        ],
        image: '/Photos/Hero 3 - Tea new.jpeg',
    },
    {
        id: 4,
        headline: 'Endless Shores. Timeless Escapes.',
        subtext: 'Boutique luxury beach retreats along Sri Lanka\'s southern coast.',
        tag: 'COAST & ISLAND',
        buttons: [
            { label: 'Explore Coastal Journeys', href: '/journeys', primary: true },
        ],
        image: '/Photos/Hero Slide 2 Cape Weligama.jpg',
    },
    {
        id: 5,
        headline: 'Island Serenity, Perfected',
        subtext: 'Overwater villas and crystal lagoons in the Maldives.',
        tag: 'THE MALDIVES ESCAPE',
        buttons: [
            { label: 'View Maldives Collection', href: '/journeys', primary: true },
        ],
        image: '/Photos/Hero Slide 4 Maldives.jpg',
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

    return (
        <section
            className="relative h-screen w-full overflow-hidden z-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ── Background images with Ken Burns effect ── */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={slide.id}
                    custom={direction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <motion.div
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 7, ease: 'linear' }}
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
                    </motion.div>

                    {/* Deepened gradient for premium feel and text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* ── Content ── */}
            <div className="relative z-10 flex h-full items-end pb-28 md:items-end md:pb-32 lg:pb-36">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                            className="max-w-2xl"
                        >
                            {/* Tag — thin, spaced, understated */}
                            <motion.span
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center gap-2 text-white/60 text-[10px] md:text-xs font-light uppercase tracking-[0.35em] mb-4 md:mb-5"
                            >
                                <span className="w-6 h-px bg-gold/70" />
                                {slide.tag}
                            </motion.span>

                            {/* Headline — elegant, lightweight, no heavy shadows */}
                            <h1 className="font-heading text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4 md:mb-5 leading-[1.2] md:leading-[1.15] tracking-tight">
                                {slide.headline}
                            </h1>

                            {/* Subtext — airy, subdued */}
                            <p className="text-white/70 text-sm md:text-base max-w-sm md:max-w-lg leading-relaxed font-light">
                                {slide.subtext}
                            </p>

                            {/* Buttons — clean, borderless luxury feel */}
                            <div className="flex flex-wrap items-center gap-4 mt-7 md:mt-8">
                                {slide.buttons.map((btn, i) => (
                                    <Link key={i} href={btn.href}>
                                        <motion.button
                                            whileHover={{ x: 3 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-500 ${
                                                btn.primary
                                                    ? 'bg-white text-stone-900 hover:bg-gold hover:text-white'
                                                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                                            }`}
                                        >
                                            {btn.label}
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </motion.button>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Slide indicators — minimal vertical line style (right side) ── */}
            <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="group relative flex items-center justify-center"
                    >
                        <div
                            className={`w-px transition-all duration-500 ${
                                i === current ? 'h-8 bg-white' : 'h-4 bg-white/30 group-hover:bg-white/60'
                            }`}
                        />
                        {i === current && !isPaused && (
                            <motion.div
                                className="absolute top-0 left-0 w-px bg-gold"
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                                key={`progress-${current}`}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* ── Slide counter — bottom right, editorial style ── */}
            <div className="absolute bottom-8 right-6 md:right-10 z-20 flex items-baseline gap-1 text-white/50 font-light">
                <span className="text-white text-lg md:text-xl tabular-nums">
                    {String(current + 1).padStart(2, '0')}
                </span>
                <span className="text-xs mx-1">/</span>
                <span className="text-xs tabular-nums">
                    {String(slides.length).padStart(2, '0')}
                </span>
            </div>

            {/* ── Scroll hint — subtle, centered ── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-8 bg-gradient-to-b from-white/0 via-white/60 to-white/0"
                />
            </div>
        </section>
    );
}
