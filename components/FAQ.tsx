'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'How far in advance should I book my trip?',
        answer:
            'We recommend booking at least 3-6 months in advance, especially for peak season travel (December–April). This ensures availability at our partner luxury properties and allows our designers adequate time to craft your perfect itinerary. Last-minute bookings are sometimes possible, but with limited options.',
    },
    {
        question: 'Are your packages customizable?',
        answer:
            'Absolutely. Every journey is fully customizable. Our listed packages serve as starting templates — your personal travel designer will work with you to adjust the itinerary, accommodation level, activities, and duration to perfectly match your preferences and budget.',
    },
    {
        question: 'What is included in each journey?',
        answer:
            'Our journeys typically include luxury accommodation, private ground transportation, domestic flights/seaplanes, guided excursions, select meals, and 24/7 concierge support. International flights are usually excluded but can be arranged upon request. Each journey page details the full day-by-day itinerary.',
    },
    {
        question: 'Do I need a visa for Sri Lanka or the Maldives?',
        answer:
            'Most nationalities can obtain an ETA (Electronic Travel Authorization) for Sri Lanka online. The Maldives offers visa-free entry for 30 days for most passport holders. Our travel designers will advise on specific visa requirements based on your nationality and handle all necessary documentation.',
    },
    {
        question: 'What is your cancellation policy?',
        answer:
            'Full refund up to 60 days before departure. 50% refund for cancellations 30-60 days prior. Within 30 days, we offer credit toward a future journey valid for 18 months. We strongly recommend travel insurance, which we can arrange for you.',
    },
    {
        question: 'What happens if there is an emergency during my trip?',
        answer:
            'Every Velora guest has access to our 24/7 concierge hotline. Our on-ground team in both Sri Lanka and the Maldives can respond within minutes. We also partner with international medical assistance providers and arrange comprehensive travel insurance for all our guests.',
    },
    {
        question: 'Can you accommodate dietary restrictions or accessibility needs?',
        answer:
            'Yes, we pride ourselves on accommodating all dietary requirements and accessibility needs. Simply let your travel designer know during the planning phase, and we\'ll ensure every restaurant, hotel, and activity is prepared for your specific requirements.',
    },
    {
        question: 'When is the best time to visit?',
        answer:
            'Sri Lanka\'s west and south coasts are best from December to April. The east coast shines from May to September. The Maldives is ideal from November to April (dry season). Our Dual Paradise package is timed to give you the best of both worlds.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-32 bg-sand overflow-hidden">
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ocean/5 rounded-full blur-[120px]" />

            <div className="relative max-w-3xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <HelpCircle className="w-5 h-5 text-ocean" />
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-deep mb-4">
                        Frequently Asked{' '}
                        <span className="text-gradient-ocean">Questions</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Everything you need to know before your journey begins.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${openIndex === index
                                    ? 'bg-white border-ocean/20 shadow-lg shadow-ocean/5'
                                    : 'bg-white border-border/50 hover:border-ocean/10 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h3
                                        className={`font-heading font-semibold text-base transition-colors ${openIndex === index ? 'text-ocean' : 'text-deep'
                                            }`}
                                    >
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openIndex === index
                                            ? 'rotate-180 text-ocean'
                                            : 'text-muted-foreground'
                                            }`}
                                    />
                                </div>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-muted-foreground text-sm leading-relaxed mt-4 pt-4 border-t border-border/50">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
