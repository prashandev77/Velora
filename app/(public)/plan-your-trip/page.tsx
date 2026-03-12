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
    Globe,
    CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { submitInquiry } from './actions';

const TOTAL_STEPS = 3;

const countries = [
    'Australia', 'New Zealand', 'England', 'United States', 'Canada', 'Other'
];

const durations = [
    '7–9 Days', '10–14 Days', '15–20 Days', '20+ Days', 'Not sure yet'
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const experiences = [
    'Culture & Heritage',
    'Wildlife Safaris',
    'Beaches & Relaxation',
    'Tea Country & Scenic Train',
    'Wellness & Ayurveda',
    'Honeymoon / Romance',
    'Sri Lanka & Maldives',
    'Not sure — please recommend'
];

const stepInfo = [
    { icon: User, label: 'Your Details' },
    { icon: Sparkles, label: 'Your Journey' },
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
    
    // Date selection state
    const [dateOption, setDateOption] = useState<'exact' | 'month' | 'flexible'>('exact');

    const [formData, setFormData] = useState({
        // Step 1
        fullName: '',
        email: '',
        phone: '',
        country: '',
        departingCity: '',
        
        // Step 2
        exactDates: '',
        monthYear: '',
        duration: '',
        travellers: '2',
        selectedExperiences: [] as string[],
        
        // Step 3
        message: '',
    });

    const toggleExperience = (exp: string) => {
        setFormData(prev => {
            if (exp === 'Not sure — please recommend') {
                return { ...prev, selectedExperiences: [exp] };
            }
            
            let newExperiences = prev.selectedExperiences.filter(e => e !== 'Not sure — please recommend');
            
            if (newExperiences.includes(exp)) {
                newExperiences = newExperiences.filter(e => e !== exp);
            } else {
                newExperiences = [...newExperiences, exp];
            }
            return { ...prev, selectedExperiences: newExperiences };
        });
    };

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
        if (step === 0) return formData.fullName.trim() !== '' && formData.email.trim() !== '' && formData.country !== '';
        if (step === 1) {
            const hasDates = (dateOption === 'exact' && formData.exactDates !== '') ||
                             (dateOption === 'month' && formData.monthYear !== '') ||
                             dateOption === 'flexible';
            return hasDates && formData.duration !== '' && formData.selectedExperiences.length > 0;
        }
        return true;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const fd = new FormData();
        fd.set('name', formData.fullName);
        fd.set('email', formData.email);
        fd.set('phone', formData.phone);
        fd.set('country', formData.country);
        fd.set('departing_city', formData.departingCity);
        
        let travelDates = '';
        if (dateOption === 'exact') travelDates = formData.exactDates;
        else if (dateOption === 'month') travelDates = formData.monthYear;
        else travelDates = 'Flexible';
        
        fd.set('travel_dates', travelDates);
        fd.set('duration', formData.duration);
        fd.set('experiences', formData.selectedExperiences.join(', '));
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
                                            Mobile / WhatsApp (Optional)
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            placeholder="+61 412 345 678"
                                            className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-gold/60"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="country" className="text-stone-600 mb-2 block">
                                                Country *
                                            </Label>
                                            <select
                                                id="country"
                                                required
                                                value={formData.country}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, country: e.target.value })
                                                }
                                                className="w-full h-10 rounded-md bg-stone-50 border border-stone-200 text-stone-900 px-3 text-sm focus:outline-none focus:border-gold/60 [&>option]:bg-white [&>option]:text-stone-900"
                                            >
                                                <option value="">Select country</option>
                                                {countries.map((c) => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="departingCity" className="text-stone-600 mb-2 block">
                                                Departing City
                                            </Label>
                                            <Input
                                                id="departingCity"
                                                value={formData.departingCity}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, departingCity: e.target.value })
                                                }
                                                placeholder="e.g. Sydney"
                                                className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-gold/60"
                                            />
                                        </div>
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
                                    Journey Details
                                </h3>
                                <p className="text-stone-400 text-sm mb-6">
                                    Help us understand the kind of journey you&apos;re dreaming of.
                                </p>

                                <div className="space-y-6">
                                    {/* Dates */}
                                    <div>
                                        <Label className="text-stone-600 mb-3 block">Preferred Travel Dates *</Label>
                                        <div className="flex gap-3 mb-3">
                                            <button
                                                type="button"
                                                onClick={() => setDateOption('exact')}
                                                className={`flex-1 py-2 rounded-lg text-sm transition-colors border ${dateOption === 'exact' ? 'bg-gold/10 border-gold/40 text-gold font-medium' : 'bg-stone-50 border-stone-200 text-stone-500'}`}
                                            >
                                                Exact Dates
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDateOption('month')}
                                                className={`flex-1 py-2 rounded-lg text-sm transition-colors border ${dateOption === 'month' ? 'bg-gold/10 border-gold/40 text-gold font-medium' : 'bg-stone-50 border-stone-200 text-stone-500'}`}
                                            >
                                                Month & Year
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDateOption('flexible')}
                                                className={`flex-1 py-2 rounded-lg text-sm transition-colors border ${dateOption === 'flexible' ? 'bg-gold/10 border-gold/40 text-gold font-medium' : 'bg-stone-50 border-stone-200 text-stone-500'}`}
                                            >
                                                Flexible
                                            </button>
                                        </div>
                                        
                                        {/* Date inputs based on selection */}
                                        <AnimatePresence mode="wait">
                                            {dateOption === 'exact' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                    <Input
                                                        type="text"
                                                        placeholder="e.g. 12 Nov - 24 Nov 2026"
                                                        value={formData.exactDates}
                                                        onChange={(e) => setFormData({ ...formData, exactDates: e.target.value })}
                                                        className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-gold/60"
                                                    />
                                                </motion.div>
                                            )}
                                            {dateOption === 'month' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                    <select
                                                        value={formData.monthYear}
                                                        onChange={(e) => setFormData({ ...formData, monthYear: e.target.value })}
                                                        className="w-full h-10 rounded-md bg-stone-50 border border-stone-200 text-stone-900 px-3 text-sm focus:outline-none focus:border-gold/60"
                                                    >
                                                        <option value="">Select Month & Year</option>
                                                        {months.filter(m => m !== 'Flexible').map(m => (
                                                            <option key={m} value={`${m} 2026`}>{m} 2026</option>
                                                        ))}
                                                        {months.filter(m => m !== 'Flexible').map(m => (
                                                            <option key={`${m}-27`} value={`${m} 2027`}>{m} 2027</option>
                                                        ))}
                                                    </select>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Duration */}
                                        <div>
                                            <Label htmlFor="duration" className="text-stone-600 mb-2 block">
                                                Estimated Duration *
                                            </Label>
                                            <select
                                                id="duration"
                                                required
                                                value={formData.duration}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, duration: e.target.value })
                                                }
                                                className="w-full h-10 rounded-md bg-stone-50 border border-stone-200 text-stone-900 px-3 text-sm focus:outline-none focus:border-gold/60 [&>option]:bg-white [&>option]:text-stone-900"
                                            >
                                                <option value="">Select duration</option>
                                                {durations.map((d) => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Travellers */}
                                        <div>
                                            <Label htmlFor="travellers" className="text-stone-600 mb-2 block">
                                                Travellers
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
                                                        {n} {Number(n) === 1 ? 'Person' : 'People'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Experiences (Multi-Select) */}
                                    <div>
                                        <Label className="text-stone-600 mb-3 block">What Would You Like to Experience? *</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {experiences.map((exp) => {
                                                const isSelected = formData.selectedExperiences.includes(exp);
                                                return (
                                                    <button
                                                        key={exp}
                                                        type="button"
                                                        onClick={() => toggleExperience(exp)}
                                                        className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 border flex items-center justify-between ${
                                                            isSelected
                                                                ? 'bg-gold/10 border-gold/40 text-gold-dark font-medium shadow-sm'
                                                                : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-gold/30 hover:bg-gold/5'
                                                        }`}
                                                    >
                                                        {exp}
                                                        {isSelected && <Check className="w-4 h-4 text-gold shrink-0" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
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
                                    Tell Us About Your Trip
                                </h3>
                                <p className="text-stone-400 text-sm mb-6">
                                    The more you tell us, the better we can design your dream trip.
                                </p>

                                <Textarea
                                    placeholder="Celebrating an anniversary, travelling with family, prefer boutique stays..."
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    rows={5}
                                    className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-gold/60 resize-none"
                                />

                                {/* Summary Preview */}
                                <div className="mt-6 p-5 rounded-2xl bg-stone-50/80 border border-stone-100">
                                    <h4 className="text-stone-800 font-semibold text-sm mb-3">Journey Summary</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between border-b border-stone-100 pb-2">
                                            <span className="text-stone-500">Contact</span>
                                            <span className="text-stone-800 font-medium text-right">{formData.fullName}<br/><span className="text-stone-500 font-normal text-xs">{formData.email}</span></span>
                                        </div>
                                        <div className="flex justify-between border-b border-stone-100 py-2">
                                            <span className="text-stone-500">Origin</span>
                                            <span className="text-stone-800 font-medium text-right">{formData.departingCity ? `${formData.departingCity}, ` : ''}{formData.country}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-stone-100 py-2">
                                            <span className="text-stone-500">Timing</span>
                                            <span className="text-stone-800 font-medium text-right">
                                                {dateOption === 'exact' ? formData.exactDates : dateOption === 'month' ? formData.monthYear : 'Flexible Dates'}<br/>
                                                <span className="text-stone-500 font-normal text-xs">{formData.duration}</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-stone-500">Interests</span>
                                            <span className="text-gold-dark font-medium text-right max-w-[60%]">
                                                {formData.selectedExperiences.length} selected
                                            </span>
                                        </div>
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
                                disabled={isSubmitting || !canProceed()}
                                className="bg-stone-900 hover:bg-gold text-white font-semibold px-8 py-6 rounded-xl transition-all hover:shadow-lg disabled:opacity-40"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Design My Journey
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

