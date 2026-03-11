'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const collections = [
    {
        title: 'Grand Explorer',
        meta: '20 Days | Culture • Wildlife • East Coast • Southern Coast',
        description:
            'An immersive east-to-south Sri Lankan adventure combining ancient kingdoms, surf coast charm, wildlife safaris, hill country landscapes, and serene beaches. From Sigiriya\'s ancient citadel and Trincomalee\'s turquoise shores to Arugam Bay\'s laid-back coast and Yala\'s leopard territory — this extended journey reveals the island in depth.',
        idealFor: 'Active travellers, returning guests, multi-region explorers',
        category: 'Explorer Collection',
        image: '/Photos/Other sections/Our Journeys_Classic Discovery.jpeg',
        href: '/package/11',
    },
    {
        title: 'Serendipity of Sri Lanka',
        meta: '8 Days | Heritage • Highlands • Wildlife • Coast',
        description:
            'A beautifully paced introduction to Sri Lanka\'s iconic highlights. Climb Sigiriya at sunrise, explore sacred Kandy, journey through tea country, enjoy a Yala safari, and unwind along the southern coast. Perfectly balanced for first-time visitors seeking culture, scenery, and relaxation in one seamless journey.',
        idealFor: 'First-time visitors, couples, families',
        category: 'Signature Collection',
        image: '/Photos/Other sections/Hill Country.jpg',
        href: '/package/10',
    },
    {
        title: 'Velora Luxe',
        meta: '11 Days | Cultural Icons • Tea Country • Private Safari • Southern Coast',
        description:
            'Elevated travel through Sri Lanka\'s most refined experiences. Stay at architecturally iconic properties, journey by scenic train through tea estates, enjoy a private Yala safari, and unwind at exclusive coastal retreats. Designed for travellers seeking comfort, privacy, and curated cultural depth.',
        idealFor: 'Luxury travellers, special occasions, boutique stays',
        category: 'Luxury Collection',
        image: '/Photos/Other sections/Sec 2-Luxe-Wellness-Club.jpg',
        href: '/package/5',
    },
    {
        title: 'Velora Serene',
        meta: '15 Days | Wellness • Gentle Exploration • Slow Travel',
        description:
            'A restorative journey balancing authentic Ayurveda with light cultural discovery. Enjoy personalised treatments under medical supervision, peaceful countryside settings, early temple visits, and unhurried experiences designed for comfort and calm. Perfect for travellers prioritising wellbeing, slower pacing, and mindful travel.',
        idealFor: 'Senior travellers, wellness seekers, slow travellers',
        category: 'Wellness Collection',
        image: '/Photos/Other sections/Destination Tea.jpeg',
        href: '/package/8',
    },
];

export default function JourneysPage() {
    return (
        <main className="min-h-screen bg-[#faf7f2] pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        Our Collection
                    </span>
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Choose Your Path
                    </h1>
                    <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Every journey is thoughtfully curated — and fully customisable. All journeys are privately curated and fully customisable.
                    </p>
                </div>

                {/* Journey Cards */}
                <div className="space-y-8">
                    {collections.map((c, i) => (
                        <motion.div
                            key={c.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-gold/20 hover:shadow-md transition-all duration-500"
                        >
                            <Link href={c.href} className="flex flex-col md:flex-row w-full h-full">
                                {/* Image */}
                                <div className="relative w-full md:w-2/5 lg:w-1/3 aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                                    <Image
                                        src={c.image}
                                        alt={c.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-md border border-stone-200 text-stone-700 text-[11px] font-medium px-3 py-1.5 rounded-full">
                                            {c.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                    <div className="text-gold text-xs font-medium uppercase tracking-wider mb-2">
                                        {c.meta}
                                    </div>
                                    <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-stone-900 mb-4 group-hover:text-gold transition-colors duration-300">
                                        {c.title}
                                    </h2>
                                    <p className="text-stone-500 text-sm leading-relaxed mb-5">
                                        {c.description}
                                    </p>
                                    <p className="text-stone-400 text-xs mb-0">
                                        <span className="text-stone-600 font-medium">Ideal for:</span> {c.idealFor}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
