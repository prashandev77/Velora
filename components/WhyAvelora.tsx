'use client';

import { motion } from 'framer-motion';
import { Shield, Compass, Headphones, Sparkles } from 'lucide-react';
import { whyAveloraContent } from '@/lib/content';

const icons = [Shield, Compass, Sparkles, Headphones];

export default function WhyAvelora() {
    const values = whyAveloraContent.values.map((v, i) => ({
        ...v,
        icon: icons[i] ?? Shield,
    }));

    return (
        <section className="relative items-center py-20 md:py-32 bg-[#F7F5F2] overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-4 block">
                        {whyAveloraContent.tag}
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
                        {whyAveloraContent.heading}
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-500 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                        {whyAveloraContent.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                    {values.map((v, i) => {
                        const Icon = v.icon;
                        return (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 rounded-full bg-white border border-stone-200 flex items-center justify-center mb-6 group-hover:border-gold/40 group-hover:bg-gold/10 transition-colors duration-500">
                                <Icon className="w-6 h-6 text-gold/80 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
                            </div>

                            <h3 className="font-heading text-xl font-semibold text-stone-900 mb-3">
                                {v.title}
                            </h3>

                            <p className="text-stone-500 text-sm leading-relaxed max-w-[260px]">
                                {v.description}
                            </p>
                        </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
