'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import type { Package } from '@/lib/types';

interface PackageCardProps {
    pkg: Package;
    index: number;
}

export default function PackageCard({ pkg, index }: PackageCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            <Link href={`/package/${pkg.id}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-ocean/10 hover:-translate-y-2 hover:border-gold/30">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url('${pkg.image_url}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Tag */}
                        {pkg.tag && (
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/90 text-deep text-xs font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3" />
                                    {pkg.tag}
                                </span>
                            </div>
                        )}


                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="font-heading text-xl font-bold text-card-foreground group-hover:text-ocean transition-colors mb-2">
                            {pkg.title}
                        </h3>

                        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-ocean" />
                                <span>{pkg.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-ocean" />
                                <span>{pkg.days} Days</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                            {pkg.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-ocean text-sm font-semibold group-hover:text-gold transition-colors">
                            <span>View Itinerary</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
