'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Sparkles,
    Check,
    ChevronRight,
    ChevronLeft,
    User,
    MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { submitInquiry } from './actions';

const TOTAL_STEPS = 3;

const travelStyles = [
    'Luxury',
    'Honeymoon',
    'Wellness & Spa',
    'Adventure & Culture',
    'Family',
    'Not sure yet',
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
    'Flexible',
];

const stepInfo = [
    { icon: User, label: 'Your Details' },
    { icon: Sparkles, label: 'Travel Style' },
    { icon: MessageSquare, label: 'Your Vision' },
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

export default function PlanYourTripPage() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        travelMonth: '',
        travelStyle: '',
        travellers: '2',
        message: '',
    });

    const goNext = () => {
        if (step < TOTAL_STEPS - 1) {
            setDirection(1);
            setStep((s) => s + 1);
        }
    };

    const goBack = () => {
        if (step > 0) {
            setDirection(-1);
            setStep((s) => s - 1);
        }
    };

    const canProceed = () => {
        if (step === 0) return formData.fullName.trim() !== '' && formData.email.trim() !== '';
        if (step === 1) return formData.travelMonth !== '' && formData.travelStyle !== '';
        return true;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const fd = new FormData();
        fd.set('name', formData.fullName);
        fd.set('email', formData.email);
        fd.set('phone', formData.phone);
        fd.set('travel_month', formData.travelMonth);
        fd.set('travel_style', formData.travelStyle);
        fd.set('num_travelers', formData.travellers);
        fd.set('message', formData.message);
        await submitInquiry(fd);
        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    /* ── Success Screen ── */
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
                    >
                        <Check className="w-10 h-10 text-emerald-600" />
                    </motion.div>
                    <h1 className="font-heading text-3xl font-bold text-stone-900 mb-3">
                        Enquiry Received!
                    </h1>
                    <p className="text-stone-500 mb-8">
                        Thank you, {formData.fullName.split(' ')[0]}. One of our travel designers
                        will be in touch within 24 hours to start crafting your perfect journey.
                    </p>
                    <Link href="/">
                        <Button className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 rounded-xl">
                            Return Home
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-10 bg-[#faf7f2] overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/8 rounded-full blur-[140px]" />
                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                        Start Here
                    </span>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-stone-900 mt-4 mb-4">
                        Plan Your <span className="text-gold">Journey</span>
                    </h1>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto">
                        Tell us your travel vision in three simple steps —
                        your dedicated designer will handle the rest.
                    </p>
                </div>
            </section>

            {/* Progress Bar & Steps */}
            <section className="bg-[#faf7f2] pb-6">
                <div className="max-w-xl mx-auto px-6">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-between mb-4">
                        {stepInfo.map((s, i) => (
                            <div key={s.label} className="flex flex-col items-center gap-2 flex-1">
                                <motion.div
                                    animate={{
                                        scale: i === step ? 1.1 : 1,
                                        backgroundColor:
                                            i < step
                                                ? '#c9a96e'
                                                : i === step
                                                    ? 'rgba(201,169,110,0.15)'
                                                    : 'rgba(201,169,110,0.06)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-stone-200"
                                >
                                    {i < step ? (
                                        <Check className="w-5 h-5 text-white" />
                                    ) : (
                                        <s.icon
                                            className={`w-5 h-5 ${i === step ? 'text-gold' : 'text-stone-300'}`}
                                        />
                                    )}
                                </motion.div>
                                <span
                                    className={`text-[11px] font-medium tracking-wider uppercase ${i <= step ? 'text-gold' : 'text-stone-300'
                                        }`}
                                >
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative h-1.5 rounded-full bg-stone-200 overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-gold-light"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        />
                    </div>
                </div>
            </section>

            {/* Multi-Step Form */}
            <section className="py-10 bg-[#faf7f2] min-h-[420px]">
                <div className="max-w-xl mx-auto px-6">
                    <AnimatePresence mode="wait" custom={direction}>
                        {/* ── Step 1: Personal Details ── */}
                        {step === 0 && (
                            <motion.div
                                key="step-0"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                className="p-8 rounded-3xl bg-white border border-stone-100 shadow-sm"
                            >
                                <h3 className="font-heading text-xl font-bold text-stone-900 mb-1 flex items-center gap-2">
                                    <User className="w-5 h-5 text-gold" />
                                    About You
                                </h3>
                                <p className="text-stone-400 text-sm mb-6">
                                    So we know who we&apos;re crafting this journey for.
                                </p>

                                <div className="space-y-5">
                                    <div>
                                        <Label htmlFor="fullName" className="text-stone-600 mb-2 block">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, fullName: e.target.value })
                                            }
                                            placeholder="Your full name"
                                            className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-gold/60"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-stone-600 mb-2 block">
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            placeholder="you@example.com"
                                            className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-gold/60"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="text-stone-600 mb-2 block">
                                            Phone (Optional)
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            placeholder="+94 77 123 4567"
                                            className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-gold/60"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── Step 2: Travel Preferences ── */}
                        {step === 1 && (
                            <motion.div
                                key="step-1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                className="p-8 rounded-3xl bg-white border border-stone-100 shadow-sm"
                            >
                                <h3 className="font-heading text-xl font-bold text-stone-900 mb-1 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-gold" />
                                    Travel Preferences
                                </h3>
                                <p className="text-stone-400 text-sm mb-6">
                                    Help us understand the kind of journey you&apos;re dreaming of.
                                </p>

                                <div className="space-y-6">
                                    {/* Month */}
                                    <div>
                                        <Label htmlFor="travelMonth" className="text-stone-600 mb-2 block">
                                            Preferred Travel Month *
                                        </Label>
                                        <select
                                            id="travelMonth"
                                            required
                                            value={formData.travelMonth}
                                            onChange={(e) =>
                                                setFormData({ ...formData, travelMonth: e.target.value })
                                            }
                                            className="w-full h-10 rounded-md bg-stone-50 border border-stone-200 text-stone-900 px-3 text-sm focus:outline-none focus:border-gold/60 [&>option]:bg-white [&>option]:text-stone-900"
                                        >
                                            <option value="">Select a month</option>
                                            {months.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Style */}
                                    <div>
                                        <Label className="text-stone-600 mb-3 block">Travel Style *</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {travelStyles.map((style) => (
                                                <button
                                                    key={style}
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData({ ...formData, travelStyle: style })
                                                    }
                                                    className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${formData.travelStyle === style
                                                        ? 'bg-gold/15 border-gold/40 text-gold'
                                                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700'
                                                        }`}
                                                >
                                                    {style}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Travellers */}
                                    <div>
                                        <Label htmlFor="travellers" className="text-stone-600 mb-2 block">
                                            Number of Travellers
                                        </Label>
                                        <select
                                            id="travellers"
                                            value={formData.travellers}
                                            onChange={(e) =>
                                                setFormData({ ...formData, travellers: e.target.value })
                                            }
                                            className="w-full h-10 rounded-md bg-stone-50 border border-stone-200 text-stone-900 px-3 text-sm focus:outline-none focus:border-gold/60 [&>option]:bg-white [&>option]:text-stone-900"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((n) => (
                                                <option key={n} value={String(n)}>
                                                    {n}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── Step 3: Message ── */}
                        {step === 2 && (
                            <motion.div
                                key="step-2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                className="p-8 rounded-3xl bg-white border border-stone-100 shadow-sm"
                            >
                                <h3 className="font-heading text-xl font-bold text-stone-900 mb-1 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-gold" />
                                    Share Your Vision
                                </h3>
                                <p className="text-stone-400 text-sm mb-6">
                                    The more you tell us, the better we can design your dream trip.
                                </p>

                                <Textarea
                                    placeholder="Describe your dream journey... special occasions, must-see places, dietary needs, anything that matters to you."
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    rows={6}
                                    className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-gold/60 resize-none"
                                />

                                {/* Summary Preview */}
                                <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-100">
                                    <p className="text-stone-400 text-xs uppercase tracking-widest mb-3">
                                        Summary
                                    </p>
                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                        <span className="text-stone-400">Name</span>
                                        <span className="text-stone-700">{formData.fullName || '—'}</span>
                                        <span className="text-stone-400">Email</span>
                                        <span className="text-stone-700">{formData.email || '—'}</span>
                                        <span className="text-stone-400">Travel Month</span>
                                        <span className="text-stone-700">{formData.travelMonth || '—'}</span>
                                        <span className="text-stone-400">Style</span>
                                        <span className="text-gold font-medium">{formData.travelStyle || '—'}</span>
                                        <span className="text-stone-400">Travellers</span>
                                        <span className="text-stone-700">{formData.travellers}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8">
                        {step > 0 ? (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={goBack}
                                className="text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back
                            </Button>
                        ) : (
                            <div />
                        )}

                        {step < TOTAL_STEPS - 1 ? (
                            <Button
                                type="button"
                                onClick={goNext}
                                disabled={!canProceed()}
                                className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25 disabled:opacity-40"
                            >
                                Continue
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25 disabled:opacity-40"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Enquiry
                                    </>
                                )}
                            </Button>
                        )}
                    </div>

                    <p className="text-stone-400 text-xs text-center mt-6">
                        No commitment required. Your travel designer will respond within 24 hours.
                    </p>
                </div>
            </section>
        </>
    );
}
