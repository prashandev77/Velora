'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqContent } from '@/lib/content';

const faqs = faqContent.items;

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-[#F7F5F2]">
            <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        {faqContent.tag}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        {faqContent.heading}
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-8" />
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={i}
                                className={`border rounded-2xl transition-colors duration-300 ${isOpen ? 'border-gold/30 bg-gold/[0.03]' : 'border-stone-100 bg-stone-50/50'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="flex items-center justify-between w-full text-left px-6 py-5 gap-4"
                                >
                                    <span className={`text-sm md:text-base font-semibold transition-colors ${isOpen ? 'text-stone-900' : 'text-stone-700'}`}>
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-stone-500 text-sm leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
