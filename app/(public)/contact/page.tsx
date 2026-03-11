import Image from 'next/image';
import { Mail, Phone, MapPin, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#faf7f2] pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Left: Contact Info */}
                    <div className="flex-1 lg:max-w-xl">
                        {/* Header */}
                        <div className="mb-10 lg:mb-16">
                            <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                                Get in Touch
                            </span>
                            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                                Contact Us
                            </h1>
                            <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                                Whether you have a question about our journeys, need assistance with an existing booking, or want to discuss a completely bespoke itinerary, our team of travel specialists is here to help.
                            </p>
                        </div>

                        {/* Direct Contact Methods */}
                        <div className="space-y-8 mb-12">
                            {/* Phone */}
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm shrink-0">
                                    <Phone className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-stone-900 font-semibold mb-1">Call or WhatsApp</h3>
                                    <p className="text-stone-500 text-sm mb-2">We are available 24/7 for urgent inquiries.</p>
                                    <a href="tel:+61212345678" className="text-stone-800 font-medium hover:text-gold transition-colors block">
                                        +61 2 1234 5678
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm shrink-0">
                                    <Mail className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-stone-900 font-semibold mb-1">Email Us</h3>
                                    <p className="text-stone-500 text-sm mb-2">Our team typically replies within 24 hours.</p>
                                    <a href="mailto:hello@velorajourneys.com" className="text-stone-800 font-medium hover:text-gold transition-colors block">
                                        hello@velorajourneys.com
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm shrink-0">
                                    <MapPin className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-stone-900 font-semibold mb-1">Office Location</h3>
                                    <p className="text-stone-500 text-sm mb-2">Visits by appointment only.</p>
                                    <p className="text-stone-800 font-medium">
                                        123 Serenity Drive,<br />
                                        Sydney, NSW,<br />
                                        Australia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Design Journey CTA */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                            <h3 className="font-heading text-xl font-bold text-stone-900 mb-2">
                                Ready to design your journey?
                            </h3>
                            <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                                If you want to start planning your bespoke trip, use our detailed inquiry form to tell us exactly what you're looking for.
                            </p>
                            <Link href="/plan-your-trip">
                                <Button className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-6 rounded-xl text-base shadow-sm hover:shadow-md hover:shadow-gold/20 transition-all group">
                                    Plan Your Trip
                                    <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="hidden lg:block w-80 xl:w-96 sticky top-28 self-start">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
                            <Image
                                src="/Photos/Other sections/Contact us.jpeg"
                                alt="Contact Velora Journeys"
                                fill
                                className="object-cover"
                                sizes="400px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-2 text-white/90 mb-2">
                                    <Globe className="w-4 h-4 text-gold" />
                                    <span className="text-sm font-medium tracking-wide uppercase">Based in Australia</span>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Australian trust, global luxury standards.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

