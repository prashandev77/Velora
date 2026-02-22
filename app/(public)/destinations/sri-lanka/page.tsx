import { Metadata } from 'next';
import Link from 'next/link';
import { Sun, Thermometer, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Sri Lanka | Velora Journeys',
    description: 'Discover the Pearl of the Indian Ocean — ancient temples, misty tea plantations, wildlife safaris, and golden beaches. Handcrafted luxury journeys through Sri Lanka.',
};

const highlights = [
    {
        title: 'Cultural Triangle',
        description: 'Sigiriya Rock Fortress, Dambulla Cave Temple, and the ancient city of Polonnaruwa — UNESCO World Heritage wonders that tell centuries of royal history.',
        image: '/images/sigiriya.jpg',
    },
    {
        title: 'Sacred Kandy',
        description: 'The hill capital, home to the Temple of the Sacred Tooth Relic, surrounded by lush tea plantations and steeped in cultural tradition.',
        image: '/images/safari-wildlife.jpg',
    },
    {
        title: 'Hill Country & Tea',
        description: 'Journey through emerald tea plantations, ride the iconic blue train, and discover charming Ella with its Nine Arches Bridge and misty peaks.',
        image: '/images/tea-plantation.jpg',
    },
    {
        title: 'Southern Coast',
        description: 'The historic Galle Fort, pristine beaches of Mirissa, whale watching excursions, and coastal luxury resorts along the palm-fringed shoreline.',
        image: '/images/wellness-hero.jpg',
    },
];

export default function SriLankaPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-24 bg-deep overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-25"
                        style={{
                            backgroundImage:
                                'url(/images/sigiriya.jpg)',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/90 to-deep" />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        The Pearl of the Indian Ocean
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
                        Sri <span className="text-gradient-gold">Lanka</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
                        An island of extraordinary beauty and deep heritage. From ancient rock fortresses
                        to misty tea plantations, golden beaches to safari-rich jungles — Sri Lanka
                        offers the adventure of a lifetime in a compact, enchanting paradise.
                    </p>

                    {/* Quick Facts */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-white/50 text-sm">
                        <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4 text-gold" />
                            <span>Best: Dec — Apr</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-gold" />
                            <span>Avg: 27°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gold" />
                            <span>8 UNESCO Sites</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20 bg-sand">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Discover
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-deep mt-3 mb-4">
                            Highlights of <span className="text-gradient-gold">Sri Lanka</span>
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
                        Plan Your Sri Lanka Journey
                    </h2>
                    <p className="text-white/50 text-lg mb-8">
                        Share your travel vision with our designer and receive a bespoke Sri Lankan itinerary.
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
