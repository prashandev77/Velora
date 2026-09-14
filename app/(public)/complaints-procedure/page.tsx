'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Info, MessageSquare, ShieldAlert, FileText, Search } from 'lucide-react';
import { complaintsContent } from '@/lib/content';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const sectionIcons = [Mail, FileText, Search, MessageSquare, ShieldAlert, Info];
const complaintsSections = complaintsContent.sections.map((s, i) => ({ icon: sectionIcons[i % sectionIcons.length], ...s }));

export default function ComplaintsProcedurePage() {
    return (
        <div className="min-h-screen bg-[#faf7f2]">
            {/* ── Hero Banner ── */}
            <section className="relative bg-stone-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />

                <div className="relative max-w-5xl mx-auto px-6 md:px-12 pt-36 pb-20 md:pt-44 md:pb-28">
                    <motion.div {...fadeUp} className="text-center">
                        <span className="text-gold/80 text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                            {complaintsContent.hero.tag}
                        </span>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {complaintsContent.hero.heading}
                        </h1>
                        {/* Gold divider */}
                        <div className="w-14 h-[2px] bg-gold mx-auto mb-8" />
                        <p className="text-stone-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            {complaintsContent.hero.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Content Section ── */}
            <section className="relative py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <div className="space-y-8 md:space-y-12">
                        {complaintsSections.map((section, idx) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-8 md:p-10 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 rounded-full bg-[#fcfaf8] border border-stone-200 flex items-center justify-center">
                                            <section.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4">
                                            {section.title}
                                        </h3>
                                        <div className="space-y-4">
                                            {section.body.split('\n\n').map((paragraph, i) => (
                                                <p key={i} className="text-stone-600 leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex flex-col sm:flex-row gap-6 sm:gap-12 bg-white px-10 py-8 rounded-2xl border border-stone-100 shadow-sm">
                            <div className="flex items-center gap-4 text-stone-700">
                                <Mail className="w-5 h-5 text-gold" />
                                <a href={`mailto:${complaintsContent.contact.email}`} className="font-medium hover:text-gold transition-colors">
                                    {complaintsContent.contact.email}
                                </a>
                            </div>
                            <div className="hidden sm:block w-px bg-stone-200" />
                            <div className="flex items-center gap-4 text-stone-700">
                                <Phone className="w-5 h-5 text-gold" />
                                <a href={`tel:${complaintsContent.contact.phone.replace(/\s+/g, '')}`} className="font-medium hover:text-gold transition-colors">
                                    {complaintsContent.contact.phone}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
