'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const promises = [
    'Privately curated — never fixed-date group tours',
    'Fully flexible to your preferred travel dates',
    'Designed around your pace and comfort',
    'Supported locally with discreet assistance',
];

export default function PrivateTravelPromise() {
    return (
        <section className="min-h-screen flex items-center py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border border-gold/20 rounded-3xl p-8 md:p-14 text-center shadow-sm"
                >
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        Our Promise
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
                        Our Private Travel Promise
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-500 text-sm md:text-base mb-8">
                        We believe exceptional journeys should never feel rushed or crowded.
                    </p>

                    <div className="flex flex-col items-center gap-3 mb-8">
                        {promises.map((p, i) => (
                            <motion.div
                                key={p}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="flex items-center gap-3 text-stone-700 text-sm md:text-base"
                            >
                                <Check className="w-4 h-4 text-gold shrink-0" />
                                <span>{p}</span>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-gold text-sm md:text-base italic font-medium">
                        Travel as you wish, with confidence and clarity.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
