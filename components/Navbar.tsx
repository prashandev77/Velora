'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, MapPin, Plane, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
    { href: '/journeys', label: 'Journeys', icon: Plane },
    { href: '/destinations', label: 'Destinations', icon: MapPin },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Phone },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change (when a link is tapped)
    const closeMenu = () => setIsMobileOpen(false);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 rounded-2xl ${isScrolled
                    ? 'bg-deep/85 backdrop-blur-xl shadow-2xl shadow-black/20 border border-white/10'
                    : 'bg-white/5 backdrop-blur-md border border-white/10'
                    }`}
            >
                <nav className="flex items-center justify-between px-4 md:px-6 py-3">
                    {/* Logo */}
                    <Link href="/" onClick={closeMenu} className="flex items-center group">
                        <Image
                            src="/images/Velora_Logo.png"
                            alt="Velora Journeys"
                            width={160}
                            height={48}
                            className="h-10 md:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
                            >
                                {link.label}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold group-hover:w-6 transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center">
                        <Link href="/plan-your-trip">
                            <Button className="bg-gold hover:bg-gold-dark text-deep font-semibold text-sm px-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/25">
                                Plan Your Journey
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-white border border-white/10 active:bg-white/20 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={isMobileOpen ? 'close' : 'open'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Full-Screen Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-deep flex flex-col"
                    >
                        {/* Top bar spacer */}
                        <div className="h-20" />

                        {/* Brand tagline */}
                        <div className="px-6 pt-4 pb-6 border-b border-white/10">
                            <p className="text-white/30 text-xs tracking-widest uppercase">Navigation</p>
                        </div>

                        {/* Nav links */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + i * 0.07, duration: 0.35 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={closeMenu}
                                            className="flex items-center gap-4 py-4 px-3 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                                                <link.icon className="w-5 h-5 text-gold" />
                                            </div>
                                            <span className="font-heading text-xl font-semibold text-white group-hover:text-gold transition-colors">
                                                {link.label}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-gold/50 transition-colors" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.4 }}
                            className="px-6 pb-10 pt-4 border-t border-white/10"
                        >
                            <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Ready to travel?</p>
                            <Link href="/plan-your-trip" onClick={closeMenu}>
                                <Button className="w-full bg-gold hover:bg-gold-dark text-deep font-bold text-base py-6 rounded-2xl hover:shadow-xl hover:shadow-gold/25 active:scale-[0.98] transition-all">
                                    Plan Your Journey
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/contact" onClick={closeMenu}>
                                <Button variant="ghost" className="w-full mt-2 text-white/50 hover:text-white text-sm py-4 rounded-2xl">
                                    Talk to an expert
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
