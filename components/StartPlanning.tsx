'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Send, Loader2 } from 'lucide-react';
import { startPlanningContent } from '@/lib/content';
import { submitInquiry } from '@/app/(public)/plan-your-trip/actions';
import {
    getEmailErrorMessage,
    getPhoneErrorMessage,
    isValidEmail,
    isPhoneValidOrEmpty,
} from '@/lib/contact-validation';

const travelStyles = startPlanningContent.travelStyles;
const tripLengths = startPlanningContent.tripLengths;
const travellerCounts = startPlanningContent.travellerCounts;

export default function StartPlanning() {
    const [fullName, setFullName] = useState('');
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [month, setMonth] = useState('');
    const [tripLength, setTripLength] = useState('');
    const [travellers, setTravellers] = useState('2');
    const [departingCity, setDepartingCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [nameError, setNameError] = useState('');

    const emailError = useMemo(() => getEmailErrorMessage(email), [email]);
    const phoneError = useMemo(() => getPhoneErrorMessage(phone), [phone]);

    const toggleStyle = (style: string) => {
        setSelectedStyles((prev) =>
            prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
        );
    };

    const months = startPlanningContent.months;

    const isFormValid =
        fullName.trim() !== '' &&
        email.trim() !== '' &&
        isValidEmail(email) &&
        isPhoneValidOrEmpty(phone);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        setNameError('');

        if (!fullName.trim()) {
            setNameError('Full name is required.');
            return;
        }
        if (!isFormValid) return;

        setIsSubmitting(true);

        const fd = new FormData();
        fd.set('name', fullName.trim());
        fd.set('email', email.trim());
        fd.set('phone', phone);
        fd.set('departing_city', departingCity);
        fd.set('travel_dates', month || 'Flexible');
        fd.set('duration', tripLength);
        fd.set('experiences', selectedStyles.join(', '));
        fd.set('num_travelers', travellers);
        fd.set('message', message);

        try {
            const result = await submitInquiry(fd);
            if (result && typeof result === 'object' && 'success' in result && result.success === false) {
                setSubmitError(result.error || 'Something went wrong. Please try again.');
                setIsSubmitting(false);
                return;
            }
            setIsSubmitted(true);
        } catch {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <section className="relative py-20 md:py-28 bg-white overflow-hidden">
                <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-stone-900 mb-3">{startPlanningContent.successTitle}</h3>
                        <p className="text-stone-500 mb-6">
                            {startPlanningContent.successMessage}
                        </p>
                        <Link
                            href="/journeys"
                            className="inline-flex items-center gap-2 text-gold hover:text-stone-900 text-sm font-medium transition-colors"
                        >
                            {startPlanningContent.successLink} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-20 md:py-28 bg-white overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                        {startPlanningContent.tag}
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mb-5 leading-tight">
                        {startPlanningContent.heading}{' '}
                        <span className="text-gold">{startPlanningContent.headingHighlight}</span>
                    </h2>
                    <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        {startPlanningContent.subtitle}
                    </p>
                </motion.div>

                {/* Quick Planner Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-[#F7F5F2] border border-stone-200 rounded-3xl p-8 md:p-10 max-w-4xl mx-auto"
                >
                    {submitError && (
                        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            {submitError}
                        </div>
                    )}

                    {/* Full Name + Email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block" htmlFor="start-name">
                                Full Name *
                            </label>
                            <input
                                id="start-name"
                                type="text"
                                required
                                autoComplete="name"
                                value={fullName}
                                onChange={(e) => { setFullName(e.target.value); setNameError(''); }}
                                placeholder="Your full name"
                                aria-invalid={!!nameError}
                                className={`w-full h-11 rounded-xl bg-white text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60 ${
                                    nameError
                                        ? 'border-2 border-red-300 ring-2 ring-red-50'
                                        : 'border border-stone-200'
                                }`}
                            />
                            {nameError && (
                                <p className="text-sm text-red-600 mt-1.5">{nameError}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block" htmlFor="start-email">
                                Email *
                            </label>
                            <input
                                id="start-email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                aria-invalid={!!emailError}
                                className={`w-full h-11 rounded-xl bg-white text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60 ${
                                    emailError
                                        ? 'border-2 border-red-300 ring-2 ring-red-50'
                                        : 'border border-stone-200'
                                }`}
                            />
                            {emailError && (
                                <p className="text-sm text-red-600 mt-1.5">{emailError}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone + Departing City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block" htmlFor="start-phone">
                                Phone (Optional)
                            </label>
                            <input
                                id="start-phone"
                                type="tel"
                                autoComplete="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+61 412 345 678"
                                aria-invalid={!!phoneError}
                                className={`w-full h-11 rounded-xl bg-white text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60 ${
                                    phoneError
                                        ? 'border-2 border-red-300 ring-2 ring-red-50'
                                        : 'border border-stone-200'
                                }`}
                            />
                            {phoneError && (
                                <p className="text-sm text-red-600 mt-1.5">{phoneError}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Departing City
                            </label>
                            <input
                                type="text"
                                value={departingCity}
                                onChange={(e) => setDepartingCity(e.target.value)}
                                placeholder="e.g. Sydney, Melbourne"
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60"
                            />
                        </div>
                    </div>

                    {/* When + Trip Length + Travellers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                When are you travelling?
                            </label>
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm focus:outline-none focus:border-gold/60"
                            >
                                <option value="">{startPlanningContent.formLabels.whenPlaceholder}</option>
                                {months.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Trip Length
                            </label>
                            <select
                                value={tripLength}
                                onChange={(e) => setTripLength(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm focus:outline-none focus:border-gold/60"
                            >
                                <option value="">{startPlanningContent.formLabels.tripLengthPlaceholder}</option>
                                {tripLengths.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-stone-700 text-sm font-medium mb-2 block">
                                Number of Travellers
                            </label>
                            <select
                                value={travellers}
                                onChange={(e) => setTravellers(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm focus:outline-none focus:border-gold/60"
                            >
                                {travellerCounts.map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Travel Style */}
                    <div className="mb-8">
                        <label className="text-stone-700 text-sm font-medium mb-3 block">
                            Travel Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {travelStyles.map((style) => {
                                const isSelected = selectedStyles.includes(style);
                                return (
                                    <button
                                        key={style}
                                        type="button"
                                        onClick={() => toggleStyle(style)}
                                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                                            isSelected
                                                ? 'bg-gold/20 border-gold/50 text-gold font-medium'
                                                : 'bg-white border-stone-200 text-stone-500 hover:border-gold/30 hover:text-stone-700'
                                        }`}
                                    >
                                        {isSelected && <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                                        {style}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                        <label className="text-stone-700 text-sm font-medium mb-2 block" htmlFor="start-message">
                            Message (Optional)
                        </label>
                        <input
                            id="start-message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us anything else..."
                            className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-900 px-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold/60"
                        />
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:scale-[1.02] group disabled:opacity-40 disabled:pointer-events-none disabled:hover:scale-100"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting…
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    {startPlanningContent.submitButton}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                        <p className="text-stone-500 text-xs mt-5 tracking-wide">
                            {startPlanningContent.submitFooter}
                        </p>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
