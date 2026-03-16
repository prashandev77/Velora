'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const journeys = [
    {
        title: 'Velora Serendipity',
        duration: '8 Days',
        tags: 'Culture • Highlands • Wildlife • Coast',
        description:
            'A beautifully balanced introduction to Sri Lanka, blending ancient heritage, misty tea country and the island\'s golden southern coast.',
        route: 'Sigiriya → Kandy → Tea Country → South Coast',
        image: '/Photos/Hero Slide Photo 1 Sigiriya bright up.jpg',
        href: '/package/10',
    },
    {
        title: 'Velora Luxe',
        duration: '11 Days',
        tags: 'Culture • Tea Country • Safari • Coast',
        description:
            'Sri Lanka\'s most iconic landscapes are experienced in refined comfort, from cultural landmarks and tea estates to wildlife safaris and coastal retreats.',
        route: 'Sigiriya → Kandy → Tea Country → Yala → South Coast',
        image: '/images/velora_luxe_journey.png',
        href: '/package/5',
    },
    {
        title: 'Velora Luxury Honeymoon',
        duration: '12 Days',
        tags: 'Romance • Tea Country • Safari • Ocean',
        description:
            'A romantic journey through Sri Lanka\'s most beautiful settings, combining scenic train rides, wildlife safaris and luxury oceanfront stays.',
        route: 'Negombo → Sigiriya → Hatton → Ella → Yala → Cape Weligama',
        image: '/Photos/Other sections/Velora Luxury Honeymoon new.webp',
        href: '/package/4',
    },
    {
        title: 'Velora Serene',
        duration: '14 Days',
        tags: 'Wellness • Ayurveda • Nature • Culture',
        description:
            'A restorative journey designed for wellbeing, combining authentic Ayurveda treatments with gentle cultural discovery and peaceful landscapes.',
        route: 'Negombo → Cultural Triangle → Ayurveda Retreat → South Coast',
        image: '/Photos/Other sections/Velora Serene new.avif',
        href: '/package/8',
    },
    {
        title: 'Velora Wild',
        duration: '17 Days',
        tags: 'National Parks • Rainforests • Bird Sanctuaries',
        description:
            'An immersive wildlife expedition exploring Sri Lanka\'s national parks, wetlands and rainforests in search of extraordinary biodiversity.',
        route: 'Wilpattu → Trincomalee → Kumana → Gal Oya → Sinharaja → Kitulgala',
        image: '/Photos/Other sections/Journey_Velora Wild new.jpg',
        href: '/package/12',
    },
];

export default function SignatureJourneys() {
    return (
        <section className="min-h-screen flex items-center py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                {/* Header */}
                <div className="text-center mb-14 md:mb-20">
                    <span className="text-gold/90 text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        Signature Journeys
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Curated Experiences, Thoughtfully Designed
                    </h2>
                    <div className="w-14 h-[2px] bg-gold mx-auto mb-6" />
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Every Velora journey is privately tailored, combining boutique stays, trusted local experts, and seamless coordination from arrival to departure.
                    </p>
                </div>

                {/* Journeys Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
                    {journeys.map((j, i) => (
                        <motion.div
                            key={j.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className="group relative overflow-hidden rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-500"
                        >
                            <Link href={j.href} className="block w-full h-full">
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={j.image}
                                        alt={j.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block bg-white/90 backdrop-blur-md text-stone-700 text-[11px] font-medium px-3 py-1.5 rounded-full border border-stone-200">
                                            {j.duration}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-white border-t border-stone-100 p-6 flex flex-col justify-between" style={{ minHeight: '220px' }}>
                                    <div>
                                        <h3 className="font-heading text-lg md:text-xl font-bold text-stone-900 mb-1.5 group-hover:text-gold transition-colors duration-300">
                                            {j.title}
                                        </h3>
                                        <span className="text-gold/70 text-xs font-medium tracking-wide mb-3 block">
                                            {j.tags}
                                        </span>
                                        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {j.description}
                                        </p>
                                        <div className="flex items-start gap-1.5 text-stone-400 text-xs leading-relaxed">
                                            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold/60" />
                                            <span>{j.route}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-stone-100">
                                        <span className="text-gold text-sm font-semibold group-hover:tracking-wider transition-all duration-300">
                                            View Journey →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/journeys"
                        className="inline-flex items-center gap-2 bg-stone-900 hover:bg-gold text-white font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        View All Journeys →
                    </Link>
                </div>
            </div>
        </section>
    );
}
