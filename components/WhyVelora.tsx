'use client';

import { motion } from 'framer-motion';
import { Shield, Compass, Headphones, Sparkles } from 'lucide-react';
import Image from 'next/image';

const values = [
    {
        icon: Shield,
        title: 'Trusted Expertise',
        description:
            'With strong on-ground partnerships and carefully selected boutique stays, we ensure authenticity, quality, and attention to detail.',
    },
    {
        icon: Compass,
        title: 'Tailored Experiences',
        description:
            'Every journey is customised to your pace, interests, and preferred level of comfort.',
    },
    {
        icon: Sparkles,
        title: 'Seamless Coordination',
        description:
            'From private transfers to curated experiences, every detail is carefully arranged.',
    },
    {
        icon: Headphones,
        title: 'Personalised Support',
        description:
            'Discreet local assistance and 24/7 support throughout your journey.',
    },
];

export default function WhyVelora() {
    return (
        <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden">
            {/* Background Image with Dark Overlay to ensure text readability */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/why_velora_bg.png"
                    alt="Luxury hotel lobby arrival"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-4 block">
                        The Velora Difference
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Private. Personalised. Seamless.
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-300 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
                        At Velora Journeys, we specialise in custom-designed private travel. We do not operate
                        fixed-date group tours. Every itinerary is crafted around your pace, preferences, and
                        purpose for travel. Luxury is not about excess. It is about thoughtful detail, trusted
                        partnerships, and experiences that feel effortless.
                    </p>
                </div>

                {/* Lighter Content Blocks (No heavy card backgrounds) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Minimal Icon */}
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-gold/40 group-hover:bg-gold/10 transition-colors duration-500">
                                <v.icon className="w-6 h-6 text-gold/80 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
                            </div>
                            
                            <h3 className="font-heading text-xl font-semibold text-white mb-3">
                                {v.title}
                            </h3>
                            
                            <p className="text-stone-400 text-sm leading-relaxed max-w-[260px]">
                                {v.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
