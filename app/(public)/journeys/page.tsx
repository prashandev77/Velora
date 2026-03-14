'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const featuredJourneys = [
    {
        title: 'Serendipity of Sri Lanka',
        days: 8,
        style: 'Culture • Nature • Heritage',
        description: 'Discover Sri Lanka\'s ancient cities, hill country landscapes, and golden beaches in one beautifully balanced journey.',
        image: '/Photos/Other sections/Hill Country.jpg',
        href: '/journeys/adventure/serendipity-of-sri-lanka',
        collection: 'Signature Collection',
    },
    {
        title: 'Velora Luxe',
        days: 11,
        style: 'Luxury • Culture • Scenic Beauty',
        description: 'Sri Lanka\'s signature experiences combined with handpicked luxury hotels and seamless private travel.',
        image: '/images/velora_luxe_journey.png',
        href: '/journeys/luxury/velora-luxe',
        collection: 'Luxury Collection',
    },
    {
        title: 'Velora Honeymoon Journey',
        days: 12,
        style: 'Romance • Tea Country • Safari • Beach',
        description: 'A romantic journey through Sri Lanka\'s most beautiful landscapes, ending with ocean sunsets and luxury coastal retreats.',
        image: '/images/honeymoon-hero.jpg',
        href: '/journeys/honeymoon/velora-honeymoon',
        collection: 'Romance Collection',
    },
    {
        title: 'Velora Serene',
        days: 15,
        style: 'Wellness • Ayurveda • Slow Travel',
        description: 'A restorative journey combining authentic Ayurvedic healing with gentle cultural discovery across Sri Lanka.',
        image: '/images/velora_serene_journey.png',
        href: '/journeys/wellness/velora-serene',
        collection: 'Wellness Collection',
    },
    {
        title: 'Velora Wild',
        days: 17,
        style: 'Wildlife • Birding • Safaris',
        description: 'Sri Lanka\'s most complete wildlife journey exploring wetlands, national parks, rainforests, and mountain ecosystems.',
        image: '/images/journey_wild_safari.png',
        href: '/journeys/adventure/velora-wild',
        collection: 'Wildlife Collection',
    },
    {
        title: 'Velora Explorer',
        days: 20,
        style: 'Adventure • Culture • Beaches',
        description: 'The ultimate Sri Lanka journey exploring the island\'s most diverse landscapes and experiences.',
        image: '/Photos/Other sections/Our Journeys_Classic Discovery.jpeg',
        href: '/journeys/adventure/grand-explorer',
        collection: 'Explorer Collection',
    },
];

export default function JourneysPage() {
    return (
        <main className="min-h-screen bg-white pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-14 md:mb-18">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gold/80 text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-3 block"
                    >
                        Our Curated Collection
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-stone-900 mb-3 tracking-tight"
                    >
                        Choose Your Path
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="h-[2px] bg-gold mx-auto mb-5"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-stone-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
                    >
                        Every journey is thoughtfully curated and fully customisable. Choose your ideal itinerary and we&apos;ll tailor every detail.
                    </motion.p>
                </div>

                {/* Journey Cards */}
                <div className="space-y-6 md:space-y-8">
                    {featuredJourneys.map((j, i) => (
                        <motion.div
                            key={j.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                        >
                            <Link
                                href={j.href}
                                className="group flex flex-col md:flex-row bg-[#F7F5F2] rounded-2xl overflow-hidden border border-stone-100 hover:border-gold/20 transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative w-full md:w-2/5 lg:w-1/3 aspect-[4/3] md:aspect-auto md:min-h-[310px]">
                                    <Image
                                        src={j.image}
                                        alt={j.title}
                                        fill
                                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-md text-stone-600 text-[10px] font-medium px-3 py-1.5 rounded-full">
                                            {j.collection}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-stone-400 text-xs mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-gold/70" />
                                            {j.days} Days
                                        </span>
                                        <span className="text-gold/60">•</span>
                                        <span>{j.style}</span>
                                    </div>

                                    <h2 className="font-heading text-xl md:text-2xl lg:text-[1.65rem] font-medium text-stone-900 mb-3 group-hover:text-gold transition-colors duration-300 tracking-tight">
                                        {j.title}
                                    </h2>

                                    <p className="text-stone-500 text-sm leading-relaxed mb-5 max-w-lg">
                                        {j.description}
                                    </p>

                                    <div className="inline-flex items-center gap-2 text-gold text-xs font-medium group-hover:gap-3 transition-all duration-300">
                                        View Itinerary
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
