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
        subtext: 'Privately curated journeys across Sri Lanka.',
        tag: 'DISCOVER SRI LANKA',
        buttons: [
            { label: 'Plan Your Journey', href: '/plan-your-trip', primary: true },
        ],
        image: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg',
    },
    {
        id: 2,
        headline: 'Where Untamed Beauty Meets Refined Comfort',
        subtext: 'Private safaris and boutique wilderness lodges.',
        tag: 'WILDLIFE & NATURE',
        buttons: [
            { label: 'Discover Wildlife Journeys', href: '/journeys', primary: true },
        ],
        image: '/Photos/Hero Slide Photo 2 .jpeg',
    },
    {
        id: 3,
        headline: 'Luxury, Thoughtfully Curated',
        subtext: 'Privately designed journeys with handpicked stays and trusted local expertise.',
        tag: 'THE VELORA PROMISE',
        buttons: [
            { label: 'Start Planning', href: '/plan-your-trip', primary: true },
        ],
        image: '/Photos/Hero Slide Photo 3 tea.jpeg',
    },
    {
        id: 4,
        headline: 'Endless Shores. Timeless Escapes.',
        subtext: 'Boutique luxury beach retreats along Sri Lanka’s southern coast.',
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

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? '8%' : '-8%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? '-8%' : '8%', opacity: 0 }),
    };

    return (
        <section
            className="relative h-screen w-full overflow-hidden z-0"
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
                    className="absolute inset-0 z-0"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent md:from-black/35 md:via-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent md:from-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* ── Content ── */}
            <div className="relative z-10 flex h-full items-end pb-28 md:items-center md:pb-0">
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
                            <span className="inline-block text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 md:mb-5 block">
                                {slide.tag}
                            </span>

                            {/* Headline */}
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-6 leading-[1.18] md:leading-[1.1] drop-shadow-lg">
                                {slide.headline}
                            </h1>

                            {/* Subtext */}
                            <p className="text-stone-200 text-sm md:text-xl max-w-xs md:max-w-xl leading-snug md:leading-relaxed drop-shadow-md mb-0">
                                {slide.subtext}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-10 max-w-fit w-full sm:w-auto">
                                {slide.buttons.map((btn, i) => (
                                    <Link key={i} href={btn.href} className="w-full sm:w-auto">
                                        <button
                                            className={`w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg shadow-black/30 hover:shadow-black/40 hover:scale-[1.02] ${
                                                btn.primary
                                                    ? 'bg-gold/90 hover:bg-gold text-white border border-gold/50'
                                                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                                            }`}
                                        >
                                            {btn.label}
                                        </button>
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
