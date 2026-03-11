import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Thermometer, Waves, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Maldives | Velora Journeys',
    description: 'Experience the pristine paradise of the Maldives — overwater villas, crystal lagoons, world-class diving, and unparalleled luxury.',
};

const highlights = [
    {
        title: 'Overwater Living',
        description: 'Wake above turquoise lagoons in private overwater villas with glass floors, infinity pools, and direct ocean access.',
        image: '/Photos/Other sections/Sec 2  Maldives.jpeg',
    },
    {
        title: 'Underwater Wonders',
        description: 'Pristine coral gardens, manta ray encounters, underwater restaurants, and some of the world\'s best dive sites.',
        image: '/Photos/Hero Slide 4 Maldives.jpg',
    },
    {
        title: 'Island Wellness',
        description: 'Overwater spas, sunrise yoga, ancient healing rituals, and wellness programmes designed for total rejuvenation.',
        image: '/Photos/Other sections/Sec 2-Luxe-Wellness-Club.jpg',
    },
    {
        title: 'Private Experiences',
        description: 'Sandbank picnics, sunset dolphin cruises, private island dinners, and bioluminescent beach walks under the stars.',
        image: '/Photos/Other sections/Section 2 Honeymoon.jpg',
    },
];

export default function MaldivesPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-24 bg-[#faf7f2] overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/8 rounded-full blur-[140px]" />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Paradise Perfected
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-stone-900 mt-4 mb-6">
                        The <span className="text-gold">Maldives</span>
                    </h1>
                    <p className="text-stone-500 text-lg max-w-3xl mx-auto leading-relaxed">
                        A constellation of 1,200 islands scattered across the Indian Ocean, the Maldives
                        is the ultimate expression of tropical luxury. Crystal lagoons, pristine reefs,
                        and overwater elegance — this is paradise, perfected.
                    </p>

                    {/* Quick Facts */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-stone-500 text-sm">
                        <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4 text-gold" />
                            <span>Best: Nov — Apr</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-gold" />
                            <span>Avg: 30°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Waves className="w-4 h-4 text-gold" />
                            <span>1,200 Islands</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20 bg-[#faf7f2]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Experience
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mt-3 mb-4">
                            Highlights of the <span className="text-gold">Maldives</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {highlights.map((h) => (
                            <div
                                key={h.title}
                                className="rounded-3xl overflow-hidden bg-white border border-stone-100 hover:shadow-lg hover:border-gold/15 transition-all duration-500 group"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={h.image}
                                        alt={h.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                                        {h.title}
                                    </h3>
                                    <p className="text-stone-500 text-sm leading-relaxed">
                                        {h.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-stone-900">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        Plan Your Maldives Escape
                    </h2>
                    <p className="text-white/60 text-lg mb-8">
                        Tell us your dream and we&apos;ll match you with the perfect island resort.
                    </p>
                    <Link href="/plan-your-trip">
                        <Button className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-6 text-base rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25">
                            Start Planning
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
