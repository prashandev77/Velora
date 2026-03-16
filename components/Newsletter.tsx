'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Newsletter() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-[#faf7f2]">
            <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        Monthly Bulletin
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
                        Stay Inspired by Sri Lanka
                    </h2>
                    <p className="text-stone-500 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
                        Join our monthly bulletin for travel inspiration, seasonal highlights, curated journeys, and exclusive Velora updates.
                    </p>

                    {submitted ? (
                        <div className="bg-white border border-gold/20 rounded-2xl p-8 shadow-sm">
                            <p className="text-gold font-semibold text-lg mb-1">Thank you!</p>
                            <p className="text-stone-500 text-sm">
                                You&apos;ll receive thoughtfully curated travel inspiration in your inbox.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="flex-1 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors shadow-sm"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors shadow-sm"
                            />
                            <button
                                type="submit"
                                className="bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Subscribe
                            </button>
                        </form>
                    )}

                    <p className="text-stone-400 text-xs mt-5">
                        No spam, just thoughtfully curated travel inspiration.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
