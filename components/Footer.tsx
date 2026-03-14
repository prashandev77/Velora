'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

const footerLinks = {
    journeys: [
        { label: 'Our Collection', href: '/journeys' },
        { label: 'Classic Discovery', href: '/journeys' },
        { label: 'Wildlife & Nature', href: '/journeys' },
        { label: 'Romance & Honeymoon', href: '/journeys' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Destinations', href: '/destinations' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/#faq' },
    ],
    support: [
        { label: 'Plan Your Journey', href: '/contact' },
        { label: 'How It Works', href: '/#how-it-works' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center group mb-5">
                            <Image
                                src="/velora_logo.svg"
                                alt="Velora Journeys"
                                width={180}
                                height={54}
                                className="h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
                                style={{ width: 'auto' }}
                            />
                        </Link>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
                            Privately curated journeys across Sri Lanka and the Maldives.
                            Tailor-made travel experiences designed around you.
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-stone-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gold/70" />
                                <span>Sydney, Australia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gold/70" />
                                <span>hello@velorajourneys.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gold/70" />
                                <span>+61 2 1234 5678</span>
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

                    {/* Company Links */}
                    <div>
                        <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-gold/70 mb-5">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
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
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-stone-500">
                        © {new Date().getFullYear()} Velora Journeys. All rights reserved.
                    </p>
                    <p className="text-xs text-stone-500">
                        Crafted with passion for extraordinary travel
                    </p>
                </div>
            </div>
        </footer>
    );
}
