'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { howItWorksContent } from '@/lib/content';

const steps = howItWorksContent.steps;

export default function HowItWorks() {
    return (
        <section className="py-20 md:py-28 bg-[#F7F5F2]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        {howItWorksContent.tag}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        {howItWorksContent.heading}
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        {howItWorksContent.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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
