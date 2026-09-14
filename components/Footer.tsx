'use client';

import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';
import Logo from '@/components/Logo';
import { footerContent } from '@/lib/content';

const footerLinks = {
    journeys: [
        { label: 'Our Journeys', href: '/journeys' },
        { label: 'Sri Lanka', href: '/destinations/sri-lanka' },
        { label: 'Maldives', href: '/destinations/maldives' },
    ],
    explore: [
        { label: 'Destinations', href: '/destinations' },
        { label: 'Travel Guides', href: '/travel-guides' },
        { label: 'About Avelora', href: '/about' },
        { label: 'Responsible Travel', href: '/about#responsible-travel' },
    ],
    support: [
        { label: 'Start Planning', href: '/plan-your-trip' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Booking & Payment', href: '/booking' },
    ],
    legal: [
        { label: 'Booking Terms & Conditions', href: '/booking-terms-and-conditions' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Website Terms & Conditions', href: '/terms' },
        { label: 'Complaints & Feedback', href: '/complaints-procedure' },
    ],
};


export default function Footer() {
    return (
        <footer className="relative bg-stone-900 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-ocean/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center group mb-5">
                            <Logo isDark={false} className="h-14 md:h-16 w-auto object-contain transition-all duration-300 group-hover:opacity-80" />
                        </Link>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
                            {footerContent.description.split('\n')[0]}
                            <br />
                            {footerContent.description.split('\n')[1]}
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-stone-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gold/70" />
                                <span>{footerContent.contact.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gold/70" />
                                <span>{footerContent.contact.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gold/70" />
                                <span>{footerContent.contact.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Journeys Links */}
                    <div>
                        <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-gold/70 mb-5">
                            Journeys
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.journeys.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-stone-400 hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-gold/70 mb-5">
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.explore.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-stone-400 hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-gold/70 mb-5">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-stone-400 hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-gold/70 mb-5">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-stone-400 hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-stone-500">
                        © {new Date().getFullYear()} {footerContent.copyright}
                    </p>
                    <p className="text-xs text-stone-500">
                        {footerContent.tagline}
                    </p>
                </div>
            </div>
        </footer>
    );
}
