'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Leaf } from 'lucide-react';
import Link from 'next/link';

const sections = [
    {
        title: 'Our Story',
        content:
            'Velora was born from a deep connection to Sri Lanka — its landscapes, heritage, wildlife, and warm hospitality — combined with an understanding of what modern travellers expect: clarity, quality, and seamless coordination. We saw the opportunity to create something different from traditional tour operators: not volume-based tourism, not rigid departure schedules — but curated private journeys designed with care and precision. Velora brings together local expertise and international service standards, ensuring every journey feels effortless from arrival to departure.',
    },
    {
        title: 'Our Vision',
        content:
            'To redefine how travellers experience Sri Lanka and the Maldives — through thoughtful design, personalised service, and meaningful cultural connection. We believe luxury is not defined by excess. It is defined by seamless coordination, attention to detail, authentic encounters, trusted partnerships, and space to travel at your own pace.',
    },
    {
        title: 'Our Approach',
        content:
            'Every Velora journey begins with listening. We take time to understand your travel style, comfort preferences, and purpose for travel — whether it\'s exploration, relaxation, celebration, or renewal. From there, we curate handpicked stays, private chauffeurs and guides, experiences chosen for depth (not volume), and balanced pacing. Logistics are managed discreetly so you can focus on the experience.',
    },
    {
        title: 'Why Velora',
        content:
            'Because travel should never feel crowded, rushed, or templated. We design journeys on your preferred dates, with private transport throughout, flexibility built into each day, and local support available when needed.',
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#faf7f2] pt-28 pb-20">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Hero */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        About Velora Journeys
                    </span>
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
                        Travel, Thoughtfully Curated
                    </h1>
                    <p className="text-stone-500 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                        Velora Journeys was founded with a simple belief — that truly memorable travel should feel personal, seamless, and deeply meaningful. We specialise in privately curated journeys across Sri Lanka and the Maldives, blending refined comfort with authentic local experiences.
                    </p>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-16 md:mb-24 shadow-sm"
                >
                    <Image
                        src="/Photos/Other sections/About Page.jpeg"
                        alt="About Velora Journeys"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                </motion.div>

                {/* Key intro */}
                <div className="mb-16 md:mb-24 max-w-3xl mx-auto text-center">
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                        Every itinerary we design is tailored around you — your pace, your interests, your preferred travel dates. We do not operate fixed group tours. We craft journeys exclusively for individuals, couples, families, and small private groups seeking a more considered way to travel.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-14 md:space-y-20 mb-16 md:mb-24">
                    {sections.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="border-l-2 border-gold/30 pl-6"
                        >
                            <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-900 mb-4">
                                {s.title}
                            </h2>
                            <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                                {s.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Founder's message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border border-gold/15 rounded-2xl p-8 md:p-12 mb-16 md:mb-24 shadow-sm"
                >
                    <Heart className="w-6 h-6 text-gold/50 mb-4" />
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed italic mb-6">
                        &ldquo;Velora Journeys was created from a deep appreciation for Sri Lanka and a desire to present it in a way that feels refined, seamless, and personal. I recognised a gap between traditional group tourism and the private, well-paced journeys many discerning travellers seek. Velora was founded to bridge that gap — with thoughtful design, trusted local partnerships, and clear communication. Travel should never feel rushed or impersonal. It should feel considered, immersive, and effortless.&rdquo;
                    </p>
                    <p className="text-gold text-sm font-semibold">
                        — Founder, Velora Journeys
                    </p>
                </motion.div>

                {/* Sustainability */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Leaf className="w-5 h-5 text-emerald-500" />
                        <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-900">
                            Sustainability &amp; Responsible Travel
                        </h2>
                    </div>
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-8">
                        We prioritise boutique and locally owned properties where possible, respectful cultural engagement, wildlife experiences aligned with conservation standards, and supporting local guides and communities. Luxury and responsibility can — and should — coexist.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-gold/20"
                    >
                        Start Planning Your Journey →
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
