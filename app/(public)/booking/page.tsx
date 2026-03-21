'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    ShieldCheck,
    CreditCard,
    CalendarCheck,
    ArrowRight,
    Check,
    AlertCircle,
    Banknote,
    RefreshCw,
    XCircle,
    Umbrella,
    Lock,
} from 'lucide-react';
import { bookingPageContent } from '@/lib/content';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: [0, 0, 0.58, 1] as [number, number, number, number] },
};

const confidencePoints = bookingPageContent.confidencePoints;

const sectionIcons = [CalendarCheck, CreditCard, RefreshCw, AlertCircle, XCircle, Umbrella, AlertCircle, ShieldCheck];
const sections = bookingPageContent.sections.map((s, i) => ({ icon: sectionIcons[i], ...s }));

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* ── Hero Banner ── */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden">
                <Image
                    src="/Photos/Other sections/Payment tab new.webp"
                    alt="Booking & Payment"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                <div className="relative w-full max-w-5xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
                    <motion.div {...fadeUp} className="text-center">
                        <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                            Booking & Payment Terms
                        </span>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {bookingPageContent.hero.heading}
                        </h1>
                        {/* Gold divider */}
                        <div className="w-14 h-[2px] bg-gold mx-auto mb-8" />
                        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Planning your journey with Velora is simple and transparent. A small deposit
                            secures your itinerary, with the balance payable closer to your travel date.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Confidence Pills ── */}
            <section className="bg-[#F7F5F2] py-10 border-b border-stone-100">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {confidencePoints.map((point, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-100 rounded-full text-stone-700 text-sm"
                            >
                                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                                {point}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Reserve Your Journey intro ── */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">
                            How It Works
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                            {bookingPageContent.reserveSection.heading}
                        </h2>
                        <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                        <p className="text-stone-500 text-base max-w-2xl mx-auto leading-relaxed">
                            {bookingPageContent.reserveSection.subtitle}
                        </p>
                    </motion.div>

                    {/* Policy Sections Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
                        {sections.map((s, i) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: i * 0.06 }}
                                className="flex gap-5"
                            >
                                <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center">
                                    <s.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2">
                                        {s.title}
                                    </h3>
                                    <p className="text-stone-500 text-sm leading-relaxed">{s.body}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Payment Methods ── */}
            <section className="py-16 md:py-20 bg-[#F7F5F2]">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                        {/* Payment Methods */}
                        <motion.div {...fadeUp}>
                            <span className="text-gold/80 text-xs font-medium uppercase tracking-[0.3em] mb-3 block">
                                Payment Methods
                            </span>
                            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                                {bookingPageContent.paymentMethods.heading}
                            </h2>
                            <div className="w-10 h-[2px] bg-gold mb-6" />
                            <p className="text-stone-500 text-sm leading-relaxed mb-8">
                                {bookingPageContent.paymentMethods.subtitle}
                            </p>
                            <div className="flex flex-col gap-4">
                                {[
                                    { icon: Banknote, label: 'International bank transfer' },
                                    { icon: CreditCard, label: 'Credit card payments' },
                                ].map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex items-center gap-4 bg-white border border-stone-100 rounded-2xl px-5 py-4">
                                        <div className="w-10 h-10 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-stone-700 text-sm font-medium">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Secure Guarantee Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-stone-900 rounded-3xl p-8 md:p-10 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/20 flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-7 h-7 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-white mb-3">
                                {bookingPageContent.securePayment.heading}
                            </h3>
                            <div className="w-10 h-[2px] bg-gold mx-auto mb-5" />
                            <p className="text-stone-400 text-sm leading-relaxed mb-6">
                                All payments are processed securely and confirmations will be issued
                                immediately upon receipt.
                            </p>
                            <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
                                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <p className="text-stone-400 text-xs leading-relaxed">
                                    Velora Journeys works with carefully selected boutique hotels and partners
                                    across Sri Lanka. Early deposits allow us to secure the best availability
                                    for your travel dates.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 md:py-20 bg-white border-t border-stone-50">
                <motion.div
                    {...fadeUp}
                    className="max-w-2xl mx-auto px-6 text-center"
                >
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                        {bookingPageContent.cta.heading}
                    </h2>
                    <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                        {bookingPageContent.cta.subtitle}
                    </p>
                    <Link href="/plan-your-trip">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-md shadow-gold/20 hover:shadow-gold/30"
                        >
                            {bookingPageContent.cta.buttonText}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
