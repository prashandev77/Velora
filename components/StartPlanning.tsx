'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Send } from 'lucide-react';

const travelStyles = [
    'Luxury Hotels',
    'Wildlife & Safari',
    'Culture & Heritage',
    'Beach & Relaxation',
    'Honeymoon',
    'Wellness & Ayurveda',
    'Adventure & Nature',
];

const tripLengths = ['5–7 days', '8–10 days', '10–14 days', '15+ days'];
const travellerCounts = ['1', '2', '3', '4', '5+'];

export default function StartPlanning() {
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [month, setMonth] = useState('');
    const [tripLength, setTripLength] = useState('');
    const [travellers, setTravellers] = useState('2');
    const [departingCity, setDepartingCity] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleStyle = (style: string) => {
        setSelectedStyles((prev) =>
            prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
        );
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, submit to API
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <section className="relative py-20 md:py-28 bg-white overflow-hidden">
                <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-stone-900 mb-3">Thank You!</h3>
                        <p className="text-stone-500 mb-6">
                            Your journey request has been received. A Velora specialist will be in touch within 24 hours.
                        </p>
                        <Link
                            href="/journeys"
                            className="inline-flex items-center gap-2 text-gold hover:text-stone-900 text-sm font-medium transition-colors"
                        >
                            Browse Journeys While You Wait <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-20 md:py-28 bg-white overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                        Your Journey Begins Here
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mb-5 leading-tight">
                        Start Planning Your{' '}
                        <span className="text-gold">Private Journey</span>
                    </h2>
                    <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Tell us a little about your travel plans and our Velora specialists will design a personalised Sri Lanka journey just for you.
                    </p>
                </motion.div>

                {/* Quick Planner Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-[#F7F5F2] border border-stone-200 rounded-3xl p-8 md:p-10 max-w-4xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* When are you travelling? */}
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                When are you travelling?
                            </label>
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm focus:outline-none focus:border-gold/60"
                            >
                                <option value="">Select month</option>
                                {months.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        {/* Trip length */}
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Trip Length
                            </label>
                            <select
                                value={tripLength}
                                onChange={(e) => setTripLength(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm focus:outline-none focus:border-gold/60"
                            >
                                <option value="">Select duration</option>
                                {tripLengths.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* Number of travellers */}
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Number of Travellers
                            </label>
                            <select
                                value={travellers}
                                onChange={(e) => setTravellers(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm focus:outline-none focus:border-gold/60"
                            >
                                {travellerCounts.map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        {/* Departing City */}
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Departing City
                            </label>
                            <input
                                type="text"
                                value={departingCity}
                                onChange={(e) => setDepartingCity(e.target.value)}
                                placeholder="e.g. Sydney, Melbourne"
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60"
                            />
                        </div>
                    </div>

                    {/* Travel Style — Checkboxes */}
                    <div className="mb-8">
                        <label className="text-stone-700 text-sm font-medium mb-3 block">
                            Travel Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {travelStyles.map((style) => {
                                const isSelected = selectedStyles.includes(style);
                                return (
                                    <button
                                        key={style}
                                        type="button"
                                        onClick={() => toggleStyle(style)}
                                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                                            isSelected
                                                ? 'bg-gold/20 border-gold/50 text-gold font-medium'
                                                : 'bg-white border-stone-200 text-stone-500 hover:border-gold/30 hover:text-stone-700'
                                        }`}
                                    >
                                        {isSelected && <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                                        {style}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Email + Message */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Email *
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60"
                            />
                        </div>
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Message (Optional)
                            </label>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us anything else..."
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:scale-[1.02] group"
                        >
                            <Send className="w-4 h-4" />
                            Plan Your Journey
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        <p className="text-stone-500 text-xs mt-5 tracking-wide">
                            No commitment required · Response within 24 hours · 100% bespoke
                        </p>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
