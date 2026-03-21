'use client';

import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import type { ItineraryDay } from '@/lib/types';

interface TimelineProps {
    itinerary: ItineraryDay[];
}

export default function Timeline({ itinerary }: TimelineProps) {
    return (
        <div className="relative">
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ocean via-gold to-ocean/20" />

            {itinerary.map((day, index) => {
                const isLeft = index % 2 === 0;
                return (
                    <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className={`relative flex items-start gap-8 mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                    >
                        {/* Day Badge */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                            <div className="w-8 h-8 rounded-full bg-ocean flex items-center justify-center text-white text-xs font-bold border-4 border-sand shadow-lg shadow-ocean/20">
                                {day.day}
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                            <div className="p-6 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-lg hover:border-gold/20 transition-all duration-300 group">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-ocean" />
                                    <span className="text-xs text-ocean font-medium uppercase tracking-wider">
                                        Day {day.day}
                                    </span>
                                </div>
                                <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-ocean transition-colors mb-2">
                                    {day.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                    {day.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {day.highlights.map((highlight) => (
                                        <span
                                            key={highlight}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ocean/5 text-ocean text-xs font-medium"
                                        >
                                            <Star className="w-3 h-3 text-gold" />
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
