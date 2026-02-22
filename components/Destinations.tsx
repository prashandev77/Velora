'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Thermometer, Clock } from 'lucide-react';

const destinations = [
    {
        name: 'Sigiriya',
        country: 'Sri Lanka',
        image: '/images/sigiriya.jpg',
        description: 'The ancient rock fortress rising 200m above the jungle. Marvel at 5th-century frescoes, water gardens, and panoramic views from the summit.',
        bestTime: 'Jan - Apr',
        avgTemp: '28°C',

        tags: ['UNESCO Heritage', 'History', 'Hiking'],
    },
    {
        name: 'Kandy',
        country: 'Sri Lanka',
        image: '/images/safari-wildlife.jpg',
        description: 'The sacred hill capital, home to the Temple of the Tooth and surrounded by lush tea plantations. A cultural heartbeat of the island.',
        bestTime: 'Dec - Apr',
        avgTemp: '24°C',

        tags: ['Cultural', 'Temples', 'Tea Country'],
    },
    {
        name: 'Ella',
        country: 'Sri Lanka',
        image: '/images/tea-plantation.jpg',
        description: 'A charming mountain village nestled among misty peaks. Home to the iconic Nine Arches Bridge and some of the world\'s most scenic train rides.',
        bestTime: 'Jan - Mar',
        avgTemp: '22°C',

        tags: ['Mountains', 'Trains', 'Trekking'],
    },
    {
        name: 'Malé Atoll',
        country: 'Maldives',
        image: '/images/honeymoon-hero.jpg',
        description: 'Crystal-clear lagoons and pristine coral reefs surround luxury overwater villas. The quintessential Maldivian island paradise experience.',
        bestTime: 'Nov - Apr',
        avgTemp: '30°C',

        tags: ['Luxury', 'Diving', 'Overwater'],
    },
    {
        name: 'Baa Atoll',
        country: 'Maldives',
        image: '/images/wellness-hero.jpg',
        description: 'A UNESCO Biosphere Reserve home to the famous Hanifaru Bay, where manta rays and whale sharks gather in breathtaking numbers.',
        bestTime: 'Jun - Nov',
        avgTemp: '29°C',

        tags: ['Marine Life', 'Diving', 'UNESCO'],
    },
    {
        name: 'Galle',
        country: 'Sri Lanka',
        image: '/images/luxury-hero.jpg',
        description: 'A charming colonial fort city where Dutch architecture meets Indian Ocean sunsets. Boutique hotels, art galleries, and whale watching.',
        bestTime: 'Dec - Mar',
        avgTemp: '27°C',

        tags: ['Colonial', 'Beach', 'Whales'],
    },
    {
        name: 'Jaipur',
        country: 'India',
        image: '/images/india-jaipur.jpg',
        description: 'The Pink City dazzles with its rose-hued palaces, Amber Fort, and vibrant bazaars. A living tableau of Rajasthani royalty and colour.',
        bestTime: 'Oct - Mar',
        avgTemp: '25°C',
        tags: ['Palaces', 'Heritage', 'Desert'],
    },
    {
        name: 'Kerala Backwaters',
        country: 'India',
        image: '/images/india-kerala.jpg',
        description: 'A tranquil labyrinth of lakes and canals lined with swaying palms. Glide through on a private houseboat and discover Ayurveda\'s true home.',
        bestTime: 'Nov - Feb',
        avgTemp: '27°C',
        tags: ['Backwaters', 'Ayurveda', 'Nature'],
    },
    {
        name: 'Agra',
        country: 'India',
        image: '/images/india-taj.jpg',
        description: 'Home to the Taj Mahal — one of the world\'s greatest monuments. Witness the ivory-white marble glow gold at sunrise, an image that stays with you forever.',
        bestTime: 'Oct - Mar',
        avgTemp: '25°C',
        tags: ['Taj Mahal', 'UNESCO', 'Mughal'],
    },
];

export default function Destinations() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = destinations[activeIndex];

    return (
        <section id="destinations" className="relative py-32 bg-sand overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <span className="text-ocean text-sm font-medium tracking-[0.3em] uppercase">
                        Where We Go
                    </span>
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-deep mt-3 mb-4">
                        Our <span className="text-gradient-ocean">Destinations</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Each destination has been personally vetted by our team to ensure it
                        meets the Velora standard of excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Active Destination Display */}
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative rounded-3xl overflow-hidden h-[500px] group"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${active.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-gold" />
                                <span className="text-gold text-sm font-medium">
                                    {active.country}
                                </span>
                            </div>
                            <h3 className="font-heading text-4xl font-bold text-white mb-3">
                                {active.name}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-md">
                                {active.description}
                            </p>

                            {/* Quick Info */}
                            <div className="flex flex-wrap gap-4 mb-5">
                                <div className="flex items-center gap-1.5 text-white/50 text-xs">
                                    <Clock className="w-3.5 h-3.5 text-ocean-light" />
                                    <span>Best: {active.bestTime}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-white/50 text-xs">
                                    <Thermometer className="w-3.5 h-3.5 text-coral" />
                                    <span>Avg {active.avgTemp}</span>
                                </div>

                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {active.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Destination List */}
                    <div className="flex flex-col gap-3">
                        {destinations.map((dest, index) => (
                            <motion.button
                                key={dest.name}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                onClick={() => setActiveIndex(index)}
                                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 group/item ${activeIndex === index
                                    ? 'bg-ocean/10 border border-ocean/20'
                                    : 'bg-white border border-border/50 hover:border-ocean/20 hover:shadow-md'
                                    }`}
                            >
                                <div
                                    className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                                    style={{ backgroundImage: `url(${dest.image})` }}
                                />
                                <div className="flex-1 min-w-0">
                                    <h4
                                        className={`font-heading font-semibold text-base ${activeIndex === index ? 'text-ocean' : 'text-deep'
                                            }`}
                                    >
                                        {dest.name}
                                    </h4>
                                    <p className="text-muted-foreground text-xs flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {dest.country}
                                    </p>
                                </div>
                                <ArrowRight
                                    className={`w-4 h-4 flex-shrink-0 transition-all ${activeIndex === index
                                        ? 'text-ocean translate-x-0'
                                        : 'text-muted-foreground -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100'
                                        }`}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
