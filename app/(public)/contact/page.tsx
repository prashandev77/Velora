import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Contact Us | Velora Journeys',
    description: 'Get in touch with Velora Journeys. Reach our team via email, WhatsApp, or social media. We respond within 24 hours.',
};

const contacts = [
    {
        icon: Mail,
        title: 'Email Us',
        value: 'hello@velorajourneys.com',
        href: 'mailto:hello@velorajourneys.com',
        description: 'For detailed enquiries and itinerary requests.',
    },
    {
        icon: Phone,
        title: 'WhatsApp',
        value: '+94 77 123 4567',
        href: 'https://wa.me/94771234567?text=Hi%20Velora%20Journeys%2C%20I%20would%20like%20to%20plan%20a%20trip.',
        description: 'Chat with us instantly. We reply within minutes.',
    },
    {
        icon: MapPin,
        title: 'Location',
        value: 'Colombo, Sri Lanka',
        href: '#',
        description: 'Serving travellers from Australia, UK & Europe.',
    },
];

const socials = [
    { name: 'Instagram', href: 'https://instagram.com/velorajourneys', handle: '@velorajourneys' },
    { name: 'Facebook', href: 'https://facebook.com/velorajourneys', handle: 'Velora Journeys' },
];

export default function ContactPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 bg-deep overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Get In Touch
                    </span>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
                        We&apos;d Love to <span className="text-gradient-gold">Hear From You</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto">
                        Whether you&apos;re ready to plan or simply exploring ideas,
                        our team is here to help.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-20 bg-deep">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contacts.map((c) => (
                            <a
                                key={c.title}
                                href={c.href}
                                target={c.href.startsWith('http') ? '_blank' : undefined}
                                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                                    <c.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-heading text-lg font-bold text-white mb-1">
                                    {c.title}
                                </h3>
                                <p className="text-gold font-medium text-sm mb-2">{c.value}</p>
                                <p className="text-white/40 text-xs">{c.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social */}
            <section className="py-16 bg-deep border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-2xl font-bold text-white mb-6">
                        Follow Our Journey
                    </h2>
                    <div className="flex items-center justify-center gap-6">
                        {socials.map((s) => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all group"
                            >
                                <p className="text-white font-medium text-sm">{s.name}</p>
                                <p className="text-gold text-xs mt-0.5">{s.handle}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-sand">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep mb-4">
                        Prefer a Detailed Enquiry?
                    </h2>
                    <p className="text-deep/50 text-lg mb-8">
                        Use our trip planner and a dedicated designer will respond within 24 hours.
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
