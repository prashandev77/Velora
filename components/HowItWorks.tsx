'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Share Your Vision',
        description:
            'Tell us how you wish to travel, the pace, experiences, level of comfort, and special occasions. Whether you begin with one of our signature journeys or a blank canvas, we start with you.',
        image: '/images/how_it_works_1.png',
    },
    {
        number: '02',
        title: 'Curate & Design',
        description:
            'Your dedicated Velora travel specialist crafts a personalised itinerary, selecting boutique stays, private guides, and meaningful experiences tailored to your style.',
        image: '/images/how_it_works_2.png',
    },
    {
        number: '03',
        title: 'Refine & Confirm',
        description:
            'We review every detail together and refine as needed. Once confirmed, we coordinate accommodations, private transfers, and on-ground logistics seamlessly.',
        image: '/images/how_it_works_3.png',
    },
    {
        number: '04',
        title: 'Travel Seamlessly',
        description:
            'Arrive with confidence knowing everything is prepared. Enjoy discreet local support and 24/7 assistance while you focus on the experience.',
        image: '/images/how_it_works_4.png',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 md:py-28 bg-[#F7F5F2]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        How It Works
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Effortless, From Start to Finish
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Your journey, thoughtfully curated in four simple steps. From the first conversation to your return home, every detail is handled with care and precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.55, delay: i * 0.12 }}
                            className="group relative"
                        >
                            {/* Step image */}
                            <div className="relative h-48 md:h-44 rounded-2xl overflow-hidden mb-5">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                                {/* Step number badge */}
                                <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-gold flex items-center justify-center shadow-lg">
                                    <span className="text-white text-xs font-bold">{step.number}</span>
                                </div>
                            </div>

                            {/* Connector line (desktop only) */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[5.5rem] left-[calc(100%-8px)] w-[calc(100%-48px)] h-px bg-gradient-to-r from-gold/40 to-transparent z-10" />
                            )}

                            <h3 className="font-heading text-lg font-bold text-stone-900 mb-2 group-hover:text-gold transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
