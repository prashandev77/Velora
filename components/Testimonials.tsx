'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah & James Mitchell',
        location: 'London, UK',
        avatar: 'S',
        rating: 5,
        package: 'The Dual Paradise',
        text: 'Absolutely life-changing. The seamless transition from Sri Lanka\'s cultural wonders to the Maldives\' turquoise waters was pure magic. Every need was anticipated before we even thought of it.',
    },
    {
        name: 'Akira Tanaka',
        location: 'Tokyo, Japan',
        avatar: 'A',
        rating: 5,
        package: 'Royal Ceylon Odyssey',
        text: 'I\'ve traveled extensively, but this Sri Lankan journey was on another level. The private sunrise climb of Sigiriya and the train through tea country — every moment felt curated just for me.',
    },
    {
        name: 'Elena & Marco Rossi',
        location: 'Milan, Italy',
        avatar: 'E',
        rating: 5,
        package: 'Azure Atoll Escape',
        text: 'Our honeymoon exceeded every dream. The bioluminescent beach walk and underwater dining were moments we\'ll treasure forever. Velora made it all effortless.',
    },
    {
        name: 'David Okonkwo',
        location: 'New York, USA',
        avatar: 'D',
        rating: 5,
        package: 'Royal Ceylon Odyssey',
        text: 'From the elephants at Minneriya to the ancient ruins of Polonnaruwa, each day revealed a new wonder. The local guides were incredibly knowledgeable and passionate.',
    },
    {
        name: 'Charlotte Dubois',
        location: 'Paris, France',
        avatar: 'C',
        rating: 5,
        package: 'The Dual Paradise',
        text: 'Two weeks of pure paradise. The combination of ancient temples and pristine beaches was the perfect balance. We\'re already planning our return trip with Velora.',
    },
    {
        name: 'Raj & Priya Sharma',
        location: 'Dubai, UAE',
        avatar: 'R',
        rating: 5,
        package: 'Azure Atoll Escape',
        text: 'The seaplane arrival alone was worth the trip. But it was the little touches — the floating breakfast, the private sandbank dinner — that showed true attention to detail.',
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-20 md:py-32 bg-sand overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ocean/20 to-transparent" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-ocean/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 md:mb-16 px-5 md:px-6"
                >
                    <span className="text-ocean text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                        Traveler Stories
                    </span>
                    <h2 className="font-heading text-3xl md:text-6xl font-bold text-deep mt-3 mb-3">
                        Words That <span className="text-gradient-ocean">Inspire</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto">
                        Real experiences from real travelers. Every journey creates stories worth sharing.
                    </p>
                </motion.div>

                {/* ── MOBILE: horizontal snap-scroll ── */}
                <div className="md:hidden">
                    <div
                        className="flex gap-4 px-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {testimonials.map((t, index) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center"
                            >
                                <div className="h-full p-5 rounded-2xl bg-white border border-border/50 shadow-sm">
                                    <Quote className="w-7 h-7 text-ocean/15 mb-3" />
                                    <div className="flex gap-0.5 mb-3">
                                        {Array.from({ length: t.rating }).map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-5">
                                        &ldquo;{t.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                        <div className="w-9 h-9 rounded-full bg-ocean/10 flex items-center justify-center text-ocean font-bold text-sm flex-shrink-0">
                                            {t.avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-deep truncate">{t.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{t.location} · {t.package}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-1.5 mt-4">
                        {testimonials.map((t) => (
                            <div key={t.name} className="w-1.5 h-1.5 rounded-full bg-ocean/20" />
                        ))}
                    </div>
                </div>

                {/* ── DESKTOP: 3-column grid ── */}
                <div className="hidden md:grid px-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-6 rounded-2xl bg-white border border-border/50 hover:border-ocean/20 hover:shadow-xl hover:shadow-ocean/5 transition-all duration-300">
                                <Quote className="w-8 h-8 text-ocean/15 mb-4" />
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                    <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center text-ocean font-semibold text-sm">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-deep">{t.name}</p>
                                        <p className="text-xs text-muted-foreground">{t.location} · {t.package}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
