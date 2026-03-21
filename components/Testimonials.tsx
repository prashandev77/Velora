'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsContent } from '@/lib/content';

const testimonials = testimonialsContent.reviews;

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (index: number, dir: number) => {
        setDirection(dir);
        setCurrent((index + testimonials.length) % testimonials.length);
    };

    const goNext = () => goTo(current + 1, 1);
    const goPrev = () => goTo(current - 1, -1);

    useEffect(() => {
        if (!paused) {
            intervalRef.current = setInterval(goNext, 5000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, paused]);

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
        center: { opacity: 1, x: 0 },
        exit: (d: number) => ({ opacity: 0, x: d < 0 ? 60 : -60 }),
    };

    const t = testimonials[current];

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        {testimonialsContent.tag}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        {testimonialsContent.heading}
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        {testimonialsContent.subtitle}
                    </p>
                </div>

                {/* Rotating testimonial */}
                <div
                    className="relative"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Main card */}
                    <div className="max-w-3xl mx-auto overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white border border-stone-100 rounded-3xl p-8 md:p-12 shadow-sm text-center"
                            >
                                <Quote className="w-9 h-9 text-gold/25 mx-auto mb-6" />

                                {/* Stars */}
                                <div className="flex justify-center gap-1 mb-5">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-stone-700 text-base md:text-lg leading-relaxed mb-8 italic">
                                    &ldquo;{t.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                                        {t.avatar}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                                        <p className="text-stone-400 text-xs">{t.location} · {t.package}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Nav arrows */}
                    <button
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-stone-500 hover:text-gold hover:border-gold/30 transition-all duration-300 -translate-x-2 lg:-translate-x-6"
                        aria-label="Previous review"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-stone-500 hover:text-gold hover:border-gold/30 transition-all duration-300 translate-x-2 lg:translate-x-6"
                        aria-label="Next review"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-12 md:mt-16">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i, i > current ? 1 : -1)}
                            className={`transition-all duration-300 rounded-full ${i === current
                                ? 'w-6 h-2 bg-gold'
                                : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                                }`}
                            aria-label={`Go to review ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
