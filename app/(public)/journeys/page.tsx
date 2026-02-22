import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Journeys | Velora Journeys',
    description: 'Explore our curated collection of luxury journeys — from honeymoon escapes and wellness retreats to cultural adventures across Sri Lanka and the Maldives.',
};

const categories = [
    {
        slug: 'luxury',
        title: 'Luxury Journeys',
        tagline: 'Exquisite Experiences',
        description: 'Overwater villas, private transfers, and world-class dining. Experience the finest that Sri Lanka and the Maldives have to offer.',
        image: '/images/luxury-hero.jpg',
    },
    {
        slug: 'honeymoon',
        title: 'Honeymoon Collection',
        tagline: 'Romance Redefined',
        description: 'Celebrate your love with intimate island retreats, candlelit dinners on private sandbanks, and stunning sunset moments.',
        image: '/images/honeymoon-hero.jpg',
    },
    {
        slug: 'wellness',
        title: 'Wellness Retreats',
        tagline: 'Restore & Rejuvenate',
        description: 'Ancient Ayurvedic traditions meet modern luxury spa experiences. Reconnect with yourself amongst nature.',
        image: '/images/wellness-hero.jpg',
    },
    {
        slug: 'adventure',
        title: 'Adventure & Culture',
        tagline: 'Discover the Extraordinary',
        description: 'Climb ancient rock fortresses, trek misty highlands, safari through wild parks, and dive pristine coral reefs.',
        image: '/images/sigiriya.jpg',
    },
];

export default function JourneysPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-deep overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Our Collection
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
                        Choose Your <span className="text-gradient-gold">Path</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto">
                        Every journey is different, and so is every traveller. Explore our
                        four curated collections to find the experience that speaks to you.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section className="bg-sand">
                {categories.map((cat, i) => (
                    <div
                        key={cat.slug}
                        className={`${i % 2 === 0 ? 'bg-sand' : 'bg-white'}`}
                    >
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
                                {/* Image */}
                                <div className={`${i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}`}>
                                    <div
                                        className="aspect-[4/3] rounded-3xl bg-cover bg-center shadow-xl"
                                        style={{ backgroundImage: `url(${cat.image})` }}
                                    />
                                </div>

                                {/* Text */}
                                <div className={`${i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}`}>
                                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                                        {cat.tagline}
                                    </span>
                                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-deep mt-3 mb-5">
                                        {cat.title}
                                    </h2>
                                    <p className="text-deep/60 text-lg leading-relaxed mb-8">
                                        {cat.description}
                                    </p>
                                    <Link href={`/journeys/${cat.slug}`}>
                                        <Button className="bg-gold hover:bg-gold-dark text-deep font-semibold px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25">
                                            Explore {cat.title.split(' ')[0]}
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
