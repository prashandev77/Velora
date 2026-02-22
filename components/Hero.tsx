'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { heroSlides } from '@/lib/data';

export default function Hero() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroSlides[current].image})` }}
                    />
                    {/* Stronger gradient on mobile for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/40 to-deep/90 md:from-deep/60 md:via-deep/30 md:to-deep/80" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center">
                <AnimatePresence mode="wait">
                    <motion.div key={current} className="max-w-4xl w-full">

                        {/* Location Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="flex items-center justify-center gap-2 mb-5"
                        >
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/25 text-gold text-xs font-semibold tracking-widest uppercase">
                                <MapPin className="w-3 h-3" />
                                Sri Lanka, Maldives &amp; India
                            </span>
                        </motion.div>

                        {/* Title — tighter on mobile */}
                        <motion.h1
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="font-heading text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-3"
                        >
                            {heroSlides[current].title}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.6, delay: 0.38 }}
                            className="font-heading text-xl sm:text-3xl md:text-4xl text-gradient-gold font-semibold mb-5"
                        >
                            {heroSlides[current].subtitle}
                        </motion.p>

                        {/* Description — shorter on mobile */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-white/60 text-sm sm:text-base md:text-lg max-w-lg md:max-w-2xl mx-auto mb-8 leading-relaxed"
                        >
                            Handcrafted luxury journeys to Sri Lanka &amp; the Maldives.<br className="hidden sm:block" />
                            Ancient heritage meets island paradise.
                        </motion.p>

                        {/* CTA — stacked full-width on mobile, side-by-side on sm+ */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, delay: 0.62 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
                        >
                            <Link href="/plan-your-trip" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-deep font-bold text-base px-8 py-5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Plan Your Journey
                                    <ChevronRight className="w-5 h-5 ml-1" />
                                </Button>
                            </Link>

                            <Link href="/journeys" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto border-white/25 text-white hover:bg-white/10 text-base px-8 py-5 rounded-xl backdrop-blur-sm active:bg-white/15"
                                >
                                    Explore Journeys
                                </Button>
                            </Link>
                        </motion.div>

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-500 rounded-full ${i === current
                            ? 'w-8 h-2 bg-gold'
                            : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Hint — visible on mobile too */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-10 right-5 md:right-8 z-20 flex flex-col items-center gap-1"
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                >
                    <ChevronDown className="w-5 h-5 text-white/30" />
                </motion.div>
            </motion.div>
        </section>
    );
}
