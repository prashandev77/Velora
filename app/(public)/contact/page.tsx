'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const countries = ['Australia', 'New Zealand', 'England', 'Other'];
const durations = ['7–9 Days', '10–14 Days', '15–20 Days', '20+ Days', 'Not sure yet'];
const experiences = [
    'Culture & Heritage',
    'Wildlife Safaris',
    'Beaches & Relaxation',
    'Tea Country & Scenic Train',
    'Wellness & Ayurveda',
    'Honeymoon / Romance',
    'Sri Lanka & Maldives',
    'Not sure — please recommend',
];

const inputCls =
    'w-full bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-300 text-sm px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors';

const selectCls =
    'w-full bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors appearance-none';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
    const [datePreference, setDatePreference] = useState<'exact' | 'month' | 'flexible'>('flexible');

    const toggleExperience = (exp: string) => {
        setSelectedExperiences((prev) =>
            prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp],
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitted(true);
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#faf7f2] pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Left: Form */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="mb-10">
                            <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                                Get in Touch
                            </span>
                            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                                Start Planning Your Journey
                            </h1>
                            <p className="text-stone-500 text-sm md:text-base">
                                Let us design a journey tailored to you.
                            </p>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gold/8 border border-gold/20 rounded-2xl p-8 md:p-12 text-center"
                            >
                                <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                                    Thank You
                                </h2>
                                <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto">
                                    We have received your enquiry and are delighted to begin curating your private journey. One of our travel specialists will review your request and prepare a personalised proposal within 24–48 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-stone-500 text-xs font-medium mb-1.5 block uppercase tracking-wider">Full Name *</label>
                                        <input required type="text" placeholder="Your full name" className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="text-stone-500 text-xs font-medium mb-1.5 block uppercase tracking-wider">Email Address *</label>
                                        <input required type="email" placeholder="you@example.com" className={inputCls} />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-stone-500 text-xs font-medium mb-1.5 block uppercase tracking-wider">Mobile / WhatsApp</label>
                                        <input type="tel" placeholder="+94 77 123 4567" className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="text-stone-500 text-xs font-medium mb-1.5 block uppercase tracking-wider">Country</label>
                                        <select className={selectCls}>
                                            <option value="">Select country</option>
                                            {countries.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-stone-500 text-xs font-medium mb-1.5 block uppercase tracking-wider">Departing City</label>
                                        <input type="text" placeholder="e.g. Sydney" className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="text-stone-500 text-xs font-medium mb-1.5 block uppercase tracking-wider">Estimated Duration</label>
                                        <select className={selectCls}>
                                            <option value="">Select duration</option>
                                            {durations.map((d) => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Date preference */}
                                <div>
                                    <label className="text-stone-500 text-xs font-medium mb-3 block uppercase tracking-wider">Preferred Travel Dates</label>
                                    <div className="flex flex-wrap gap-2">
                                        {(['exact', 'month', 'flexible'] as const).map((pref) => (
                                            <button
                                                key={pref}
                                                type="button"
                                                onClick={() => setDatePreference(pref)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                                    datePreference === pref
                                                        ? 'bg-gold/15 border-gold/40 text-gold'
                                                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300'
                                                }`}
                                            >
                                                {pref === 'exact' ? 'Exact Dates' : pref === 'month' ? 'Month & Year' : 'Flexible'}
                                            </button>
                                        ))}
                                    </div>
                                    {datePreference === 'exact' && (
                                        <input type="date" className={`mt-3 ${inputCls}`} />
                                    )}
                                    {datePreference === 'month' && (
                                        <input type="month" className={`mt-3 ${inputCls}`} />
                                    )}
                                </div>

                                {/* Experiences */}
                                <div>
                                    <label className="text-stone-500 text-xs font-medium mb-3 block uppercase tracking-wider">What Would You Like to Experience?</label>
                                    <div className="flex flex-wrap gap-2">
                                        {experiences.map((exp) => (
                                            <button
                                                key={exp}
                                                type="button"
                                                onClick={() => toggleExperience(exp)}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                                                    selectedExperiences.includes(exp)
                                                        ? 'bg-gold/15 border-gold/40 text-gold'
                                                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300'
                                                }`}
                                            >
                                                {exp}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="text-stone-500 text-xs font-medium mb-1.5 block uppercase tracking-wider">Tell Us About Your Trip</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Celebrating an anniversary, travelling with family, prefer boutique stays…"
                                        className={`${inputCls} resize-none`}
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-gold/20 disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                                    ) : (
                                        <><Send className="w-4 h-4" /> Design My Journey</>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right: Image */}
                    <div className="hidden lg:block w-80 xl:w-96 sticky top-28 self-start">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
                            <Image
                                src="/Photos/Other sections/Contact us.jpeg"
                                alt="Contact Velora Journeys"
                                fill
                                className="object-cover"
                                sizes="400px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
