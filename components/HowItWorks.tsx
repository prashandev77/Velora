'use client';

import { motion } from 'framer-motion';
import { Plane, Search, CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
    {
        step: '01',
        icon: Search,
        title: 'Discover',
        description:
            'Browse curated journeys or share your dream destination. Every adventure begins with inspiration.',
        color: 'bg-ocean/10 text-ocean border-ocean/20',
        accent: 'text-ocean',
    },
    {
        step: '02',
        icon: Sparkles,
        title: 'Design',
        description:
            'Your personal travel designer crafts a bespoke itinerary tailored to your preferences and passions.',
        color: 'bg-gold/10 text-gold border-gold/20',
        accent: 'text-gold',
    },
    {
        step: '03',
        icon: CalendarCheck,
        title: 'Confirm',
        description:
            'Confirm your journey with ease. We handle flights, transfers, hotels, and every detail in between.',
        color: 'bg-emerald-500/10 text-emerald-400 border-emerald-400/20',
        accent: 'text-emerald-400',
    },
    {
        step: '04',
        icon: Plane,
        title: 'Experience',
        description:
            'Set off on your extraordinary adventure with 24/7 concierge support. Create memories that last.',
        color: 'bg-rose-500/10 text-rose-400 border-rose-400/20',
        accent: 'text-rose-400',
    },
];

export default function HowItWorks() {
    return (
        <section className="relative py-20 md:py-32 bg-deep overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ocean/5 rounded-full blur-[150px]" />

            <div className="relative max-w-7xl mx-auto px-5 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14 md:mb-20"
                >
                    <span className="text-gold text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                        Simple Process
                    </span>
                    <h2 className="font-heading text-3xl md:text-6xl font-bold text-white mt-3 mb-3">
                        How It <span className="text-gradient-gold">Works</span>
                    </h2>
                    <p className="text-white/50 text-sm md:text-lg max-w-xl mx-auto">
                        From dream to destination in four effortless steps.
                    </p>
                </motion.div>

                {/* ── MOBILE: vertical numbered timeline ── */}
                <div className="md:hidden relative">
                    {/* Vertical line */}
                    <div className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

                    <div className="flex flex-col gap-0">
                        {steps.map((s, index) => (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                                className="relative flex gap-5 pb-10 last:pb-0"
                            >
                                {/* Step bubble */}
                                <div className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-full border ${s.color} flex items-center justify-center font-heading font-bold text-sm bg-deep`}>
                                    {s.step}
                                </div>

                                {/* Content card */}
                                <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-5 -mt-0.5">
                                    <div className="flex items-start gap-3 mb-2">
                                        <s.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${s.accent}`} />
                                        <h3 className="font-heading text-lg font-bold text-white">
                                            {s.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        {s.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-10"
                    >
                        <Link href="/plan-your-trip" className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gold text-deep font-bold text-base hover:bg-gold-dark active:scale-[0.98] transition-all">
                            Start Planning
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>

                {/* ── DESKTOP: 4-column grid ── */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((s, index) => (
                        <motion.div
                            key={s.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative group"
                        >
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-gradient-to-r from-white/10 to-transparent" />
                            )}
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <span className="absolute -top-2 -right-2 text-[3rem] font-heading font-bold text-white/[0.03] leading-none">
                                        {s.step}
                                    </span>
                                    <div className={`w-20 h-20 rounded-2xl border ${s.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                        <s.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="font-heading text-xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">{s.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
