import { Metadata } from 'next';
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
        image: '/images/honeymoon-hero.jpg',
    },
    {
        title: 'Underwater Wonders',
        description: 'Pristine coral gardens, manta ray encounters, underwater restaurants, and some of the world\'s best dive sites.',
        image: '/images/temple.jpg',
    },
    {
        title: 'Island Wellness',
        description: 'Overwater spas, sunrise yoga, ancient healing rituals, and wellness programmes designed for total rejuvenation.',
        image: '/images/wellness-hero.jpg',
    },
    {
        title: 'Private Experiences',
        description: 'Sandbank picnics, sunset dolphin cruises, private island dinners, and bioluminescent beach walks under the stars.',
        image: '/images/luxury-hero.jpg',
    },
];

export default function MaldivesPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-24 bg-deep overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-25"
                        style={{
                            backgroundImage:
                                'url(/images/honeymoon-hero.jpg)',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/90 to-deep" />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Paradise Perfected
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
                        The <span className="text-gradient-gold">Maldives</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
                        A constellation of 1,200 islands scattered across the Indian Ocean, the Maldives
                        is the ultimate expression of tropical luxury. Crystal lagoons, pristine reefs,
                        and overwater elegance — this is paradise, perfected.
                    </p>

                    {/* Quick Facts */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-white/50 text-sm">
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
            <section className="py-20 bg-sand">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Experience
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-deep mt-3 mb-4">
                            Highlights of the <span className="text-gradient-gold">Maldives</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {highlights.map((h) => (
                            <div
                                key={h.title}
                                className="rounded-3xl overflow-hidden bg-white border border-deep/5 hover:shadow-xl transition-all group"
                            >
                                <div
                                    className="aspect-[16/9] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                    style={{ backgroundImage: `url(${h.image})` }}
                                />
                                <div className="p-8">
                                    <h3 className="font-heading text-2xl font-bold text-deep mb-3">
                                        {h.title}
                                    </h3>
                                    <p className="text-deep/50 text-sm leading-relaxed">
                                        {h.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-deep">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        Plan Your Maldives Escape
                    </h2>
                    <p className="text-white/50 text-lg mb-8">
                        Tell us your dream and we&apos;ll match you with the perfect island resort.
                    </p>
                    <Link href="/plan-your-trip">
                        <Button className="bg-gold hover:bg-gold-dark text-deep font-semibold px-8 py-6 text-base rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25">
                            Start Planning
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
