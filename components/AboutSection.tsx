'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Globe2, Award } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Trusted Expertise',
        description: 'Over 15 years crafting luxury journeys across South Asia with unmatched local knowledge.',
    },
    {
        icon: Heart,
        title: 'Tailored Experiences',
        description: 'Every itinerary is personally designed to match your unique travel style and desires.',
    },
    {
        icon: Globe2,
        title: 'Sustainable Travel',
        description: 'We partner with eco-conscious properties and support local communities at every destination.',
    },
    {
        icon: Award,
        title: 'Award-Winning Service',
        description: 'Recognized by leading travel publications for exceptional service and attention to detail.',
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="relative py-32 bg-deep overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Why Velora
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                            Journeys Crafted With{' '}
                            <span className="text-gradient-gold">Purpose</span>
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed mb-8">
                            At Velora Journeys, we believe luxury travel should transform and
                            inspire. Our team of passionate travel designers combines deep
                            local expertise with world-class service to create journeys that
                            linger in your memory long after you return home.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { value: '500+', label: 'Journeys' },
                                { value: '98%', label: 'Satisfaction' },
                                { value: '15+', label: 'Years' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <p className="font-heading text-3xl font-bold text-gradient-gold">
                                        {stat.value}
                                    </p>
                                    <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 hover:bg-white/[0.07] group"
                            >
                                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                                    <feature.icon className="w-5 h-5 text-gold" />
                                </div>
                                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
