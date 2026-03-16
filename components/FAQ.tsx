'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'Do you operate group tours or fixed departure dates?',
        a: 'No. Velora Journeys specialises exclusively in privately curated travel. We do not operate fixed-date group tours. Every journey is customised around your preferred travel dates, pace, and interests.',
    },
    {
        q: 'What is included in a typical Velora journey?',
        a: 'Each itinerary is personalised, but most journeys include: accommodation in carefully selected 4–5 star hotels, boutique villas, or luxury safari lodges; meals on half-board basis where applicable; private airport transfers; private English-speaking chauffeur-guide; air-conditioned vehicle; entrance fees to included cultural sites; curated experiences such as safaris, heritage visits, or cultural performances; and discreet local support during travel.',
    },
    {
        q: 'What type of accommodation do you provide?',
        a: 'We work with handpicked 4–5 star properties, boutique heritage hotels, tea estate bungalows, luxury safari lodges, and premium Maldives resorts.',
    },
    {
        q: 'Is transport private?',
        a: 'Yes. All tours and transfers are arranged privately with an experienced English-speaking chauffeur-guide. You will not share transport with other travellers.',
    },
    {
        q: 'Are entrance fees included?',
        a: 'Where specified in your personalised itinerary, entrance fees are included, Dambulla Cave Temple, Temple of the Sacred Tooth Relic, Kandyan dance performance, Peradeniya Botanical Gardens, elephant safari, and Polonnaruwa Ancient City.',
    },
    {
        q: 'Do I need a visa to visit Sri Lanka?',
        a: 'Most travellers require an Electronic Travel Authorisation (ETA) prior to arrival in Sri Lanka. We provide guidance once your journey is confirmed.',
    },
    {
        q: 'What is the best time to visit Sri Lanka?',
        a: 'Sri Lanka is a year-round destination. The west and south coasts are ideal from December to April, while the east coast is best between May and September. We recommend regions based on your travel dates.',
    },
    {
        q: 'How far in advance should I book?',
        a: 'For peak season (December–April), we recommend 4–6 months in advance. For other periods, 2–4 months is generally sufficient.',
    },
    {
        q: 'What is the typical investment for a Velora journey?',
        a: 'As every journey is privately curated, pricing varies by duration, accommodation level, and experiences. Most private journeys range from mid to high four figures per person and above. We provide transparent proposals tailored to your preferences.',
    },
    {
        q: 'Do you offer honeymoon or special occasion planning?',
        a: 'Yes. We design bespoke honeymoons, anniversaries, and milestone journeys with private dining, curated experiences, and romantic settings.',
    },
    {
        q: 'Can you accommodate dietary or special travel requirements?',
        a: 'Certainly. We tailor every journey to your preferences including dietary, accessibility, and wellness needs.',
    },
    {
        q: 'How do payments work?',
        a: 'A 20% deposit is required to confirm your journey. The remaining balance is payable 14 days prior to arrival in Sri Lanka. Full payment instructions will be provided in your booking confirmation.',
    },
    {
        q: 'Do you arrange international flights?',
        a: 'Yes. While most travellers prefer to book their own flights, Velora Journeys can assist with international airline tickets through our trusted airline and travel partners if required. If you would like us to include flights as part of your journey planning, our team will be happy to provide suitable options based on your travel dates, preferred airlines, and departure city.',
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-[#F7F5F2]">
            <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        FAQ
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Frequently Asked Questions
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
