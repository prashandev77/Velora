'use client';

import { motion } from 'framer-motion';
import { Shield, Compass, Headphones, Sparkles } from 'lucide-react';

const values = [
    {
        icon: Shield,
        title: 'Trusted Expertise',
        description:
            'With strong on-ground partnerships and carefully selected boutique stays, we ensure quality, authenticity, and attention to detail at every stage of your journey.',
    },
    {
        icon: Compass,
        title: 'Tailored Experiences',
        description:
            'No templates. Every itinerary is customised to your pace, interests, and preferred level of comfort.',
    },
    {
        icon: Sparkles,
        title: 'Seamless Coordination',
        description:
            'From private transfers to luxury accommodations, we handle every detail — allowing you to travel with complete confidence.',
    },
    {
        icon: Headphones,
        title: 'Personalised Support',
        description:
            'Discreet assistance and 24/7 local support throughout your stay, ensuring a smooth and enriching experience.',
    },
];

export default function WhyVelora() {
    return (
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-[#faf7f2]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        The Velora Difference
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Private. Personalised. Seamless.
                    </h2>
                    <p className="text-stone-500 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                        At Velora Journeys, we specialise in custom-designed private travel. We do not operate
                        fixed-date group tours. Every itinerary is crafted around your pace, preferences, and
                        purpose for travel. Luxury is not about excess. It is about thoughtful detail, trusted
                        partnerships, and experiences that feel effortless.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group bg-white border border-stone-100 rounded-2xl p-6 md:p-8 hover:border-gold/30 hover:shadow-md transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                                <v.icon className="w-5 h-5 text-gold" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-stone-900 mb-3">
                                {v.title}
                            </h3>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {v.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
