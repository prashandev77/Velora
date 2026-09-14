import { Leaf, Heart, Shield, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';const features = [
    {
        icon: Globe,
        title: 'Local First',
        description: 'Where possible, we favour quality local businesses, independent hotels and genuine community experiences.'
    },
    {
        icon: Shield,
        title: 'Respectful Encounters',
        description: 'We carefully consider the wildlife experiences we recommend, prioritising conservation and animal welfare.'
    },
    {
        icon: Heart,
        title: 'Meaningful Itineraries',
        description: 'We avoid filling itineraries with unnecessary tourist stops included primarily to generate commissions.'
    }
];

export default function ResponsibleTravel() {
    return (
        <section className="py-20 md:py-28 bg-white border-t border-stone-100">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div>
                        <span className="text-gold font-medium uppercase tracking-[0.25em] mb-4 block text-sm">
                            TRAVEL WITH PURPOSE
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
                            Travel Beautifully. Travel Responsibly.
                        </h2>
                        <p className="text-stone-600 text-lg leading-relaxed mb-8">
                            We believe the best journeys respect the places that make them possible. Where possible, we favour locally owned stays and experiences, thoughtful wildlife encounters and genuine connections with local communities, while keeping your journey focused on experiences worth having, not unnecessary commission-driven tourist stops.
                        </p>
                        <div className="mb-10">
                            <Link 
                                href="/about#responsible-travel"
                                className="inline-flex items-center text-sm font-semibold tracking-wide uppercase text-gold hover:text-stone-900 transition-colors"
                            >
                                OUR APPROACH TO RESPONSIBLE TRAVEL
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                        <div className="space-y-6">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-stone-900 mb-1">{feature.title}</h3>
                                        <p className="text-stone-600 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                        <Image 
                            src="https://images.unsplash.com/photo-1550937000-0230f878f28e?q=80&w=2787&auto=format&fit=crop"
                            alt="Tea plucker in Sri Lanka"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
