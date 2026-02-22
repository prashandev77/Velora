'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CalendarDays,
    Users,
    MessageSquare,
    ClipboardCheck,
    ArrowLeft,
    ArrowRight,
    Check,
    MapPin,
    Clock,
    Sparkles,
    Plus,
    Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { packages } from '@/lib/data';
import { createBooking } from '@/app/(public)/actions/booking';

const steps = [
    { id: 1, title: 'Travel Date', icon: CalendarDays },
    { id: 2, title: 'Guests', icon: Users },
    { id: 3, title: 'Requests', icon: MessageSquare },
    { id: 4, title: 'Summary', icon: ClipboardCheck },
];

export default function BookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [bookingId, setBookingId] = useState('');

    const [formData, setFormData] = useState({
        travelDate: '',
        guestCount: 2,
        guestNames: ['', ''],
        specialRequests: '',
    });

    // Resolve params
    if (!resolvedParams) {
        params.then(setResolvedParams);
        return (
            <div className="min-h-screen bg-deep flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
        );
    }

    const pkg = packages.find((p) => p.id === resolvedParams.id);

    if (!pkg) {
        return (
            <div className="min-h-screen bg-deep flex flex-col items-center justify-center text-white gap-4 px-6">
                <h1 className="font-heading text-3xl font-bold">Package Not Found</h1>
                <p className="text-white/50">The package you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/#packages">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        View All Packages
                    </Button>
                </Link>
            </div>
        );
    }

    const updateGuestCount = (delta: number) => {
        const newCount = Math.max(1, Math.min(10, formData.guestCount + delta));
        const newNames = [...formData.guestNames];
        while (newNames.length < newCount) newNames.push('');
        while (newNames.length > newCount) newNames.pop();
        setFormData({ ...formData, guestCount: newCount, guestNames: newNames });
    };

    const setGuestName = (index: number, name: string) => {
        const newNames = [...formData.guestNames];
        newNames[index] = name;
        setFormData({ ...formData, guestNames: newNames });
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.travelDate !== '';
            case 2:
                return formData.guestNames.every((n) => n.trim() !== '');
            case 3:
                return true;
            default:
                return false;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const result = await createBooking({
                packageId: pkg.id,
                travelDate: formData.travelDate,
                guestCount: formData.guestCount,
                guestNames: formData.guestNames,
                specialRequests: formData.specialRequests,
            });

            if (result.success) {
                setBookingId(result.bookingId || '');
                setIsComplete(true);
            }
        } catch {
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success State
    if (isComplete) {
        return (
            <div className="min-h-screen bg-deep flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald" />
                    </div>
                    <h1 className="font-heading text-3xl font-bold text-white mb-3">
                        Booking Confirmed!
                    </h1>
                    <p className="text-white/50 mb-2">
                        Your reference: <span className="text-gold font-mono font-bold">{bookingId}</span>
                    </p>
                    <p className="text-white/40 text-sm mb-8">
                        Our travel designer will contact you within 24 hours to personalize
                        every detail of your {pkg.title} journey.
                    </p>
                    <Button
                        onClick={() => router.push('/')}
                        className="bg-gold hover:bg-gold-dark text-deep font-semibold px-8 rounded-xl"
                    >
                        Return Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deep py-24 px-6">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -right-40 w-96 h-96 bg-ocean/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Back Link */}
                <Link
                    href={`/package/${pkg.id}`}
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {pkg.title}
                </Link>

                {/* Package Summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div
                        className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${pkg.image_url})` }}
                    />
                    <div className="flex-1">
                        <h2 className="font-heading text-xl font-bold text-white">
                            {pkg.title}
                        </h2>
                        <div className="flex items-center gap-4 text-white/50 text-sm mt-1">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {pkg.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {pkg.days} Days
                            </span>
                        </div>
                    </div>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-between mb-12 relative">
                    {/* Progress Line */}
                    <div className="absolute top-5 left-0 right-0 h-px bg-white/10" />
                    <div
                        className="absolute top-5 left-0 h-px bg-gold transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step) => (
                        <div key={step.id} className="relative flex flex-col items-center gap-2 z-10">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.id
                                    ? 'bg-gold text-deep'
                                    : 'bg-white/10 text-white/30'
                                    } ${currentStep === step.id ? 'ring-4 ring-gold/20' : ''}`}
                            >
                                {currentStep > step.id ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}
                            </div>
                            <span
                                className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? 'text-gold' : 'text-white/30'
                                    }`}
                            >
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Date Selection */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                                    When Would You Like to Travel?
                                </h3>
                                <p className="text-white/40 text-sm mb-8">
                                    Select your preferred departure date for this {pkg.days}-day journey.
                                </p>
                                <div className="space-y-2">
                                    <Label htmlFor="travel-date" className="text-white/70">
                                        Travel Date
                                    </Label>
                                    <Input
                                        id="travel-date"
                                        type="date"
                                        value={formData.travelDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, travelDate: e.target.value })
                                        }
                                        min={new Date().toISOString().split('T')[0]}
                                        className="bg-white/5 border-white/10 text-white focus:border-gold/50 focus:ring-gold/20 max-w-xs [color-scheme:dark]"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Guest Details */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                                    Who&apos;s Joining the Journey?
                                </h3>
                                <p className="text-white/40 text-sm mb-8">
                                    Tell us about your travel party.
                                </p>

                                {/* Guest Count */}
                                <div className="mb-8">
                                    <Label className="text-white/70 mb-3 block">
                                        Number of Guests
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateGuestCount(-1)}
                                            className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-30"
                                            disabled={formData.guestCount <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-2xl font-bold text-gold w-12 text-center font-heading">
                                            {formData.guestCount}
                                        </span>
                                        <button
                                            onClick={() => updateGuestCount(1)}
                                            className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-30"
                                            disabled={formData.guestCount >= 10}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Guest Names */}
                                <div className="space-y-4">
                                    <Label className="text-white/70">Guest Names</Label>
                                    {formData.guestNames.map((name, i) => (
                                        <Input
                                            key={i}
                                            placeholder={`Guest ${i + 1} full name`}
                                            value={name}
                                            onChange={(e) => setGuestName(i, e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Special Requests */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                                    Any Special Requests?
                                </h3>
                                <p className="text-white/40 text-sm mb-8">
                                    Let us know about dietary requirements, accessibility needs,
                                    celebrations, or anything that would make your journey perfect.
                                </p>
                                <Textarea
                                    placeholder="E.g., Anniversary celebration, vegetarian meals, wheelchair accessibility, connecting rooms..."
                                    value={formData.specialRequests}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            specialRequests: e.target.value,
                                        })
                                    }
                                    rows={6}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20 resize-none"
                                />
                            </motion.div>
                        )}

                        {/* Step 4: Summary */}
                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                                    Booking Summary
                                </h3>
                                <p className="text-white/40 text-sm mb-8">
                                    Review your details before confirming.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/50">Package</span>
                                        <span className="text-white font-medium">{pkg.title}</span>
                                    </div>
                                    <Separator className="bg-white/10" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/50">Location</span>
                                        <span className="text-white">{pkg.location}</span>
                                    </div>
                                    <Separator className="bg-white/10" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/50">Duration</span>
                                        <span className="text-white">{pkg.days} Days</span>
                                    </div>
                                    <Separator className="bg-white/10" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/50">Travel Date</span>
                                        <span className="text-white">
                                            {new Date(formData.travelDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <Separator className="bg-white/10" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/50">Guests</span>
                                        <span className="text-white">{formData.guestCount}</span>
                                    </div>
                                    {formData.guestNames.map((name, i) => (
                                        <div key={i} className="flex justify-between text-sm pl-4">
                                            <span className="text-white/30">Guest {i + 1}</span>
                                            <span className="text-white/70">{name}</span>
                                        </div>
                                    ))}
                                    {formData.specialRequests && (
                                        <>
                                            <Separator className="bg-white/10" />
                                            <div className="text-sm">
                                                <span className="text-white/50">Special Requests</span>
                                                <p className="text-white/70 mt-1">
                                                    {formData.specialRequests}
                                                </p>
                                            </div>
                                        </>
                                    )}

                                </div>

                                <div className="mt-6 p-4 rounded-xl bg-gold/5 border border-gold/20">
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <p className="text-white/50 text-xs leading-relaxed">
                                            A dedicated travel designer will be assigned to your journey.
                                            Payment will be arranged directly with your designer via
                                            secure bank transfer or card payment.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8">
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="text-white/50 hover:text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    {currentStep < 4 ? (
                        <Button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={!canProceed()}
                            className="bg-gold hover:bg-gold-dark text-deep font-semibold px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Next Step
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-gold hover:bg-gold-dark text-deep font-semibold px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-deep/20 border-t-deep rounded-full animate-spin" />
                            ) : (
                                <>
                                    Confirm Booking
                                    <Check className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
