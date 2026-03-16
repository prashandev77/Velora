'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SpecialOffers() {
    return (
        <section className="relative py-32 bg-deep overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Limited Time
                    </span>
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
                        Special <span className="text-gradient-gold">Offers</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Exclusive deals on our most popular journeys. Book now and enjoy
                        complimentary upgrades.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Offer 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-3xl overflow-hidden group"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage:
                                    'url(/images/luxury-hero.jpg)',
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent" />
                        <div className="relative p-8 md:p-10 min-h-[320px] flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-coral/20 text-coral text-xs font-bold uppercase">
                                    <Sparkles className="w-3 h-3" />
                                    Early Bird Offer
                                </span>
                            </div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                                The Dual Paradise, Early Bird
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                                Book the 14-day Dual Paradise journey before March 31 and enjoy
                                a complimentary spa package upgrade at your Maldives resort plus
                                a private sunset cruise.
                            </p>
                            <Link href="/package/3">
                                <Button className="bg-gold hover:bg-gold-dark text-deep font-semibold px-6 rounded-xl w-fit transition-all hover:shadow-lg hover:shadow-gold/25">
                                    View Offer
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Offer 2 + 3 */}
                    <div className="grid grid-rows-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative rounded-3xl overflow-hidden group"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url(https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80)',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent" />
                            <div className="relative p-6 md:p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald/20 text-emerald text-xs font-bold uppercase">
                                        Honeymoon Special
                                    </span>
                                </div>
                                <h3 className="font-heading text-xl font-bold text-white mb-1">
                                    Azure Atoll, Honeymoon Upgrade
                                </h3>
                                <p className="text-white/50 text-xs mb-3 max-w-sm">
                                    Complimentary room upgrade to Sunset Water Villa + private
                                    candlelit dinner on the beach.
                                </p>
                                <Link
                                    href="/package/2"
                                    className="flex items-center gap-1 text-gold text-sm font-medium hover:underline"
                                >
                                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative rounded-3xl overflow-hidden group"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url(/images/sigiriya.jpg)',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent" />
                            <div className="relative p-6 md:p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ocean/20 text-ocean-light text-xs font-bold uppercase">
                                        Group Bonus
                                    </span>
                                </div>
                                <h3 className="font-heading text-xl font-bold text-white mb-1">
                                    Royal Ceylon, Group of 4+
                                </h3>
                                <p className="text-white/50 text-xs mb-3 max-w-sm">
                                    Travel with friends or family and enjoy complimentary activity
                                    upgrades. Private guide included for your group.
                                </p>
                                <Link
                                    href="/package/1"
                                    className="flex items-center gap-1 text-gold text-sm font-medium hover:underline"
                                >
                                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
