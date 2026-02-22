'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section id="newsletter" className="relative py-32 overflow-hidden">
            {/* Full background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage:
                        'url(/images/coastline.jpg)',
                }}
            />
            <div className="absolute inset-0 bg-deep/85 backdrop-blur-sm" />

            <div className="relative max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-gold" />
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Stay Inspired
                        </span>
                        <Sparkles className="w-5 h-5 text-gold" />
                    </div>

                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                        Get Exclusive Travel{' '}
                        <span className="text-gradient-gold">Inspiration</span>
                    </h2>
                    <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                        Join 10,000+ discerning travelers. Receive insider guides, early
                        access to new journeys, and exclusive offers.
                    </p>

                    {/* Email Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
                    >
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-white/10 border-white/15 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-gold/50 focus:ring-gold/20"
                            required
                        />
                        <Button
                            type="submit"
                            className="bg-gold hover:bg-gold-dark text-deep font-semibold h-12 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25 whitespace-nowrap"
                        >
                            {isSubmitted ? (
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Subscribed!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Subscribe
                                    <Send className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <p className="text-white/20 text-xs mt-4">
                        No spam. Unsubscribe anytime. Your privacy matters to us.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
