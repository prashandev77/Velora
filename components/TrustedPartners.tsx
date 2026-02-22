'use client';

import { motion } from 'framer-motion';

const partners = [
    'Sri Lankan Airlines',
    'Shangri-La Hotels',
    'Aman Resorts',
    'Emirates',
    'Anantara',
    'Four Seasons',
    'Cinnamon Hotels',
    'Soneva',
];

export default function TrustedPartners() {
    return (
        <section className="relative py-16 bg-sand border-y border-border/50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-center text-muted-foreground text-xs font-medium tracking-[0.3em] uppercase mb-8">
                        Trusted Partners & Affiliates
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {partners.map((partner, index) => (
                            <motion.span
                                key={partner}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="text-muted-foreground/40 hover:text-ocean font-heading text-lg font-semibold tracking-wide transition-colors duration-300 cursor-default"
                            >
                                {partner}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
