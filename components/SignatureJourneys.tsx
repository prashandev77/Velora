'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const journeys = [
    {
        duration: '20 Days',
        title: 'Grand Explorer',
        description:
            'An immersive east-to-south Sri Lankan adventure combining ancient kingdoms, surf coast charm, wildlife safaris, hill country landscapes, and serene beaches.',
        image: '/Photos/Other sections/Our Journeys_Classic Discovery.jpeg',
        href: '/package/11',
    },
    {
        duration: '8 Days',
        title: 'Serendipity of Sri Lanka',
        description:
            'A beautifully paced introduction to Sri Lanka\'s iconic highlights. Climb Sigiriya at sunrise, explore Kandy, journey through tea country, and enjoy a Yala safari.',
        image: '/Photos/Other sections/Hill Country.jpg',
        href: '/package/10',
    },
    {
        duration: '11 Days',
        title: 'Velora Luxe',
        description:
            'Elevated travel through Sri Lanka\'s most refined experiences. Stay at architecturally iconic properties, enjoy private safaris, and unwind at exclusive retreats.',
        image: '/images/velora_luxe_journey.png',
        href: '/package/5',
    },
    {
        duration: '15 Days',
        title: 'Velora Serene',
        description:
            'A restorative journey balancing authentic Ayurveda with light cultural discovery. Enjoy personalised treatments, peaceful settings, and mindful travel.',
        image: '/images/velora_serene_journey.png',
        href: '/package/8',
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
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Every Velora journey is privately tailored, combining boutique stays, trusted local experts, and seamless coordination from arrival to departure.
                    </p>
                </div>

                {/* Journeys Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                                <div className="bg-white border-t border-stone-100 p-6 flex flex-col justify-between" style={{ minHeight: '180px' }}>
                                    <div>
                                        <h3 className="font-heading text-lg md:text-xl font-bold text-stone-900 mb-2 group-hover:text-gold transition-colors duration-300">
                                            {j.title}
                                        </h3>
                                        <p className="text-stone-500 text-sm leading-relaxed mb-5 line-clamp-3">
                                            {j.description}
                                        </p>
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
