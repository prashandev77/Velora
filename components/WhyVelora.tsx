'use client';

import { motion } from 'framer-motion';
import { Shield, Compass, Headphones, Sparkles } from 'lucide-react';
import { whyVeloraContent } from '@/lib/content';
import Image from 'next/image';

const values = [
    {
        icon: Shield,
        title: 'Trusted Expertise',
        description:
            'Trusted local partnerships and carefully selected boutique stays ensure authenticity, comfort, and attention to detail.',
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
            'From private chauffeur journeys to curated experiences, every detail is seamlessly arranged.',
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
        <section className="relative items-center py-20 md:py-32 bg-[#F7F5F2] overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-4 block">
                        {whyVeloraContent.tag}
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
                        {whyVeloraContent.heading}
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-500 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                        {whyVeloraContent.description}
                    </p>
                </div>

                {/* Lighter Content Blocks */}
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
                            <div className="w-14 h-14 rounded-full bg-white border border-stone-200 flex items-center justify-center mb-6 group-hover:border-gold/40 group-hover:bg-gold/10 transition-colors duration-500">
                                <v.icon className="w-6 h-6 text-gold/80 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
                            </div>
                            
                            <h3 className="font-heading text-xl font-semibold text-stone-900 mb-3">
                                {v.title}
                            </h3>
                            
                            <p className="text-stone-500 text-sm leading-relaxed max-w-[260px]">
                                {v.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
