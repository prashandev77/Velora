import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Heart, Globe2, Award, Compass, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'About Us | Velora Journeys',
    description: 'Discover the Velora Journeys philosophy — handcrafted luxury travel experiences across Sri Lanka and the Maldives. Learn why discerning travellers trust us.',
};

const values = [
    {
        icon: Shield,
        title: 'Trusted Expertise',
        description: 'Over 15 years crafting luxury journeys across South Asia with unmatched local knowledge and personal connections.',
    },
    {
        icon: Heart,
        title: 'Bespoke Design',
        description: 'Every itinerary is personally designed by a dedicated travel designer to match your unique style, pace, and passions.',
    },
    {
        icon: Globe2,
        title: 'Sustainable Travel',
        description: 'We partner with eco-conscious properties and support local communities, ensuring your journey matters.',
    },
    {
        icon: Award,
        title: 'Award-Winning Service',
        description: 'Recognised by leading travel publications for exceptional service, attention to detail, and guest satisfaction.',
    },
];

const stats = [
    { value: '500+', label: 'Journeys Curated' },
    { value: '98%', label: 'Guest Satisfaction' },
    { value: '15+', label: 'Years of Expertise' },
    { value: '50+', label: 'Luxury Partners' },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-24 bg-deep overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{
                            backgroundImage:
                                'url(/images/coastline.jpg)',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/90 to-deep" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Our Story
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
                        Journeys Crafted With{' '}
                        <span className="text-gradient-gold">Purpose</span>
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        At Velora Journeys, we believe luxury travel should transform and inspire.
                        We don&apos;t sell holidays — we craft experiences that linger in your memory
                        long after you return home.
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 bg-sand">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                                Our Philosophy
                            </span>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold text-deep mt-3 mb-6">
                                Where Heritage Meets <span className="text-gradient-gold">Paradise</span>
                            </h2>
                            <div className="space-y-5 text-deep/70 text-base leading-relaxed">
                                <p>
                                    Founded with a passion for Sri Lanka&apos;s rich cultural tapestry and
                                    the Maldives&apos; pristine beauty, Velora Journeys was born from a simple
                                    belief: that travel, at its best, is deeply personal.
                                </p>
                                <p>
                                    Every journey we design begins with a conversation — understanding
                                    your dreams, your pace, and what makes you feel truly alive. From there,
                                    our team of dedicated travel designers draws upon deep local knowledge
                                    and exclusive partnerships to create something extraordinary.
                                </p>
                                <p>
                                    Whether it&apos;s a honeymoon overlooking turquoise atolls, a wellness
                                    retreat in the misty highlands, or a cultural odyssey through ancient
                                    kingdoms — we ensure every detail is considered, every moment curated.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className="aspect-[4/5] rounded-3xl bg-cover bg-center shadow-2xl"
                                style={{
                                    backgroundImage:
                                        'url(/images/tea-plantation.jpg)',
                                }}
                            />
                            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl bg-gold/10 -z-10" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl bg-gold/5 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-deep">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <p className="font-heading text-4xl font-bold text-gradient-gold">
                                {stat.value}
                            </p>
                            <p className="text-white/40 text-sm mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Velora */}
            <section className="py-24 bg-sand">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                            Why Velora
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-deep mt-3 mb-4">
                            What Sets Us <span className="text-gradient-gold">Apart</span>
                        </h2>
                        <p className="text-deep/50 text-lg max-w-2xl mx-auto">
                            We combine deep local expertise with world-class service to create
                            journeys that are truly one of a kind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="p-7 rounded-2xl bg-white border border-deep/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                                    <value.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-heading text-lg font-bold text-deep mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-deep/50 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-24 bg-deep">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Our Approach
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 mb-12">
                        A Journey in <span className="text-gradient-gold">Four Steps</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', icon: Compass, title: 'Discover', desc: 'Share your vision with us. Every journey begins with understanding your dreams.' },
                            { step: '02', icon: Users, title: 'Design', desc: 'Your dedicated travel designer crafts a bespoke itinerary just for you.' },
                            { step: '03', icon: MapPin, title: 'Refine', desc: 'We fine-tune every detail until it\'s exactly as you imagined — or better.' },
                            { step: '04', icon: Heart, title: 'Experience', desc: 'Set off with 24/7 concierge support. We\'re with you every step of the way.' },
                        ].map((s) => (
                            <div key={s.step} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 mb-4">
                                    <s.icon className="w-7 h-7 text-gold" />
                                </div>
                                <p className="text-gold/50 text-xs tracking-widest mb-2">{s.step}</p>
                                <h3 className="font-heading text-xl font-bold text-white mb-2">{s.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-sand">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep mb-4">
                        Ready to Begin Your Journey?
                    </h2>
                    <p className="text-deep/50 text-lg mb-8">
                        Tell us about your dream trip, and we&apos;ll craft something extraordinary.
                    </p>
                    <Link href="/plan-your-trip">
                        <Button className="bg-gold hover:bg-gold-dark text-deep font-semibold px-8 py-6 text-base rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25">
                            Plan Your Journey
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
