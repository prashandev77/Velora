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
import { createBooking } from '@/app/(public)/actions/booking';
import TurnstileWidget from '@/components/TurnstileWidget';

import { Package } from '@/lib/types';

const MAX_SPECIAL_REQUESTS_LENGTH = 2000;
const MIN_GUEST_NAME_LENGTH = 2;
const MAX_GUEST_NAME_LENGTH = 120;

function getTodayLocalISO(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function isValidTravelDate(iso: string): boolean {
    if (!iso) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
    const selected = new Date(iso + 'T12:00:00');
    if (Number.isNaN(selected.getTime())) return false;
    return iso >= getTodayLocalISO();
}

function validateGuestName(name: string): string | undefined {
    const t = name.trim();
    if (!t) return 'Name is required.';
    if (t.length < MIN_GUEST_NAME_LENGTH) return `Use at least ${MIN_GUEST_NAME_LENGTH} characters.`;
    if (t.length > MAX_GUEST_NAME_LENGTH) return `Keep names under ${MAX_GUEST_NAME_LENGTH} characters.`;
    if (/^\d+$/.test(t)) return 'Please enter a valid name.';
    return undefined;
}

type BookingFieldErrors = {
    travelDate?: string;
    guestNames?: (string | undefined)[];
    specialRequests?: string;
};

const steps = [
    { id: 1, title: 'Travel Date', icon: CalendarDays },
    { id: 2, title: 'Guests', icon: Users },
    { id: 3, title: 'Requests', icon: MessageSquare },
    { id: 4, title: 'Summary', icon: ClipboardCheck },
];

export default function BookClient({ packId: _packId, pkg }: { packId: string, pkg: Package }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [bookingId, setBookingId] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<BookingFieldErrors>({});
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

    const [formData, setFormData] = useState({
        travelDate: '',
        guestCount: 2,
        guestNames: ['', ''],
        specialRequests: '',
    });

    if (!pkg) {
        return (
            <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center text-stone-900 gap-4 px-6">
                <h1 className="font-heading text-3xl font-bold">Package Not Found</h1>
                <p className="text-stone-500">The package you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/#packages">
                    <Button variant="outline" className="border-stone-200 text-stone-900 hover:bg-stone-50">
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
        setFieldErrors((prev) => ({ ...prev, guestNames: undefined }));
    };

    const setGuestName = (index: number, name: string) => {
        const newNames = [...formData.guestNames];
        newNames[index] = name;
        setFormData({ ...formData, guestNames: newNames });
        setFieldErrors((prev) => {
            const next = { ...prev, guestNames: prev.guestNames ? [...prev.guestNames] : undefined };
            if (next.guestNames) next.guestNames[index] = undefined;
            return next;
        });
    };

    const validateStep1 = (): boolean => {
        if (!formData.travelDate) {
            setFieldErrors((prev) => ({ ...prev, travelDate: 'Please choose a travel date.' }));
            return false;
        }
        if (!isValidTravelDate(formData.travelDate)) {
            setFieldErrors((prev) => ({ ...prev, travelDate: 'Travel date must be today or in the future.' }));
            return false;
        }
        setFieldErrors((prev) => ({ ...prev, travelDate: undefined }));
        return true;
    };

    const validateStep2 = (): boolean => {
        const guestNames: (string | undefined)[] = formData.guestNames.map((n) => validateGuestName(n));
        const hasError = guestNames.some((e) => e !== undefined);
        if (hasError) {
            setFieldErrors((prev) => ({ ...prev, guestNames }));
            return false;
        }
        setFieldErrors((prev) => ({ ...prev, guestNames: undefined }));
        return true;
    };

    const validateStep3 = (): boolean => {
        if (formData.specialRequests.length > MAX_SPECIAL_REQUESTS_LENGTH) {
            setFieldErrors((prev) => ({
                ...prev,
                specialRequests: `Please keep special requests under ${MAX_SPECIAL_REQUESTS_LENGTH} characters.`,
            }));
            return false;
        }
        setFieldErrors((prev) => ({ ...prev, specialRequests: undefined }));
        return true;
    };

    const validateAllForSubmit = (): boolean => {
        const travelOk = isValidTravelDate(formData.travelDate);
        const guestNames = formData.guestNames.map((n) => validateGuestName(n));
        const guestsOk = !guestNames.some((e) => e !== undefined);
        const requestsOk = formData.specialRequests.length <= MAX_SPECIAL_REQUESTS_LENGTH;

        setFieldErrors({
            travelDate: travelOk ? undefined : !formData.travelDate
                ? 'Please choose a travel date.'
                : 'Travel date must be today or in the future.',
            guestNames: guestsOk ? undefined : guestNames,
            specialRequests: requestsOk
                ? undefined
                : `Please keep special requests under ${MAX_SPECIAL_REQUESTS_LENGTH} characters.`,
        });

        return travelOk && guestsOk && requestsOk;
    };

    const goNext = () => {
        if (currentStep === 1 && !validateStep1()) return;
        if (currentStep === 2 && !validateStep2()) return;
        if (currentStep === 3 && !validateStep3()) return;
        setCurrentStep((s) => Math.min(4, s + 1));
    };

    const goPrevious = () => {
        setCurrentStep((s) => Math.max(1, s - 1));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.travelDate !== '' && isValidTravelDate(formData.travelDate);
            case 2:
                return formData.guestNames.every((n) => validateGuestName(n) === undefined);
            case 3:
                return formData.specialRequests.length <= MAX_SPECIAL_REQUESTS_LENGTH;
            default:
                return false;
        }
    };

    const handleSubmit = async () => {
        setSubmitError('');
        if (!validateAllForSubmit()) {
            const firstInvalid =
                !isValidTravelDate(formData.travelDate) ? 1
                    : formData.guestNames.some((n) => validateGuestName(n) !== undefined) ? 2
                        : 3;
            setCurrentStep(firstInvalid);
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await createBooking({
                packageId: pkg.id,
                travelDate: formData.travelDate,
                guestCount: formData.guestCount,
                guestNames: formData.guestNames.map((n) => n.trim()),
                specialRequests: formData.specialRequests.trim(),
                turnstileToken: turnstileToken ?? undefined,
            });

            if (result.success) {
                setBookingId(result.bookingId || '');
                setIsComplete(true);
            } else {
                setSubmitError(result.error || 'Could not complete your booking. Please try again.');
            }
        } catch {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success State
    if (isComplete) {
        return (
            <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="font-heading text-3xl font-bold text-stone-900 mb-3">
                        Booking Confirmed!
                    </h1>
                    <p className="text-stone-500 mb-2">
                        Your reference: <span className="text-gold font-mono font-bold">{bookingId}</span>
                    </p>
                    <p className="text-stone-400 text-sm mb-8">
                        Our travel designer will contact you within 24 hours to personalize
                        every detail of your {pkg.title} journey.
                    </p>
                    <Button variant="gold" size="lg" onClick={() => router.push('/')}>
                        Return Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf7f2] py-24 px-6 relative">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -right-40 w-96 h-96 bg-stone-100 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Back Link */}
                <Link
                    href={`/package/${pkg.id}`}
                    className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {pkg.title}
                </Link>

                {/* Package Summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 p-5 rounded-2xl bg-white border border-stone-200">
                    <div
                        className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url('${pkg.image_url}')` }}
                    />
                    <div className="flex-1">
                        <h2 className="font-heading text-xl font-bold text-stone-900">
                            {pkg.title}
                        </h2>
                        <div className="flex items-center gap-4 text-stone-500 text-sm mt-1">
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
                    <div className="absolute top-5 left-0 right-0 h-px bg-stone-200" />
                    <div
                        className="absolute top-5 left-0 h-px bg-gold transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step) => (
                        <div key={step.id} className="relative flex flex-col items-center gap-2 z-10">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.id
                                    ? 'bg-gold text-white'
                                    : 'bg-white text-stone-400 border border-stone-200'
                                    } ${currentStep === step.id ? 'ring-4 ring-gold/20' : ''}`}
                            >
                                {currentStep > step.id ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}
                            </div>
                            <span
                                className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? 'text-gold' : 'text-stone-400'
                                    }`}
                            >
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
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
                                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">
                                    When Would You Like to Travel?
                                </h3>
                                <p className="text-stone-500 text-sm mb-8">
                                    Select your preferred departure date for this {pkg.days}-day journey.
                                </p>
                                <div className="space-y-2">
                                    <Label htmlFor="travel-date" className="text-stone-700">
                                        Travel Date
                                    </Label>
                                    <Input
                                        id="travel-date"
                                        type="date"
                                        value={formData.travelDate}
                                        onChange={(e) => {
                                            setFormData({ ...formData, travelDate: e.target.value });
                                            setFieldErrors((prev) => ({ ...prev, travelDate: undefined }));
                                        }}
                                        min={getTodayLocalISO()}
                                        aria-invalid={!!fieldErrors.travelDate}
                                        aria-describedby={fieldErrors.travelDate ? 'travel-date-error' : undefined}
                                        className={`bg-stone-50 text-stone-900 focus:border-gold/50 focus:ring-gold/20 max-w-xs ${
                                            fieldErrors.travelDate
                                                ? 'border-red-300 ring-2 ring-red-100'
                                                : 'border-stone-200'
                                        }`}
                                    />
                                    {fieldErrors.travelDate && (
                                        <p id="travel-date-error" className="text-sm text-red-600 mt-1.5">
                                            {fieldErrors.travelDate}
                                        </p>
                                    )}
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
                                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">
                                    Who&apos;s Joining the Journey?
                                </h3>
                                <p className="text-stone-500 text-sm mb-8">
                                    Tell us about your travel party.
                                </p>

                                {/* Guest Count */}
                                <div className="mb-8">
                                    <Label className="text-stone-700 mb-3 block">
                                        Number of Guests
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateGuestCount(-1)}
                                            className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center transition-colors disabled:opacity-30"
                                            disabled={formData.guestCount <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-2xl font-bold text-gold w-12 text-center font-heading">
                                            {formData.guestCount}
                                        </span>
                                        <button
                                            onClick={() => updateGuestCount(1)}
                                            className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center transition-colors disabled:opacity-30"
                                            disabled={formData.guestCount >= 10}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Guest Names */}
                                <div className="space-y-4">
                                    <Label className="text-stone-700">Guest Names</Label>
                                    {formData.guestNames.map((name, i) => {
                                        const guestErr = fieldErrors.guestNames?.[i];
                                        return (
                                            <div key={i}>
                                                <Input
                                                    placeholder={`Guest ${i + 1} full name`}
                                                    value={name}
                                                    onChange={(e) => setGuestName(i, e.target.value)}
                                                    aria-invalid={!!guestErr}
                                                    aria-describedby={guestErr ? `guest-${i}-error` : undefined}
                                                    className={`bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:border-gold/50 focus:ring-gold/20 ${
                                                        guestErr
                                                            ? 'border-red-300 ring-2 ring-red-100'
                                                            : 'border-stone-200'
                                                    }`}
                                                />
                                                {guestErr && (
                                                    <p id={`guest-${i}-error`} className="text-sm text-red-600 mt-1">
                                                        {guestErr}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
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
                                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">
                                    Any Special Requests?
                                </h3>
                                <p className="text-stone-500 text-sm mb-8">
                                    Let us know about dietary requirements, accessibility needs,
                                    celebrations, or anything that would make your journey perfect.
                                </p>
                                <Textarea
                                    placeholder="E.g., Anniversary celebration, vegetarian meals, wheelchair accessibility, connecting rooms..."
                                    value={formData.specialRequests}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            specialRequests: e.target.value,
                                        });
                                        setFieldErrors((prev) => ({ ...prev, specialRequests: undefined }));
                                    }}
                                    rows={6}
                                    maxLength={MAX_SPECIAL_REQUESTS_LENGTH}
                                    aria-invalid={!!fieldErrors.specialRequests}
                                    aria-describedby={fieldErrors.specialRequests ? 'requests-error' : 'requests-hint'}
                                    className={`bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:border-gold/50 focus:ring-gold/20 resize-none ${
                                        fieldErrors.specialRequests
                                            ? 'border-red-300 ring-2 ring-red-100'
                                            : 'border-stone-200'
                                    }`}
                                />
                                <div className="flex justify-between items-center mt-2">
                                    {fieldErrors.specialRequests ? (
                                        <p id="requests-error" className="text-sm text-red-600">
                                            {fieldErrors.specialRequests}
                                        </p>
                                    ) : (
                                        <span id="requests-hint" className="text-xs text-stone-400">
                                            {formData.specialRequests.length} / {MAX_SPECIAL_REQUESTS_LENGTH} characters
                                        </span>
                                    )}
                                </div>
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
                                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">
                                    Booking Summary
                                </h3>
                                <p className="text-stone-500 text-sm mb-8">
                                    Review your details before confirming.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Package</span>
                                        <span className="text-stone-900 font-medium">{pkg.title}</span>
                                    </div>
                                    <Separator className="bg-stone-100" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Location</span>
                                        <span className="text-stone-900">{pkg.location}</span>
                                    </div>
                                    <Separator className="bg-stone-100" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Duration</span>
                                        <span className="text-stone-900">{pkg.days} Days</span>
                                    </div>
                                    <Separator className="bg-stone-100" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Travel Date</span>
                                        <span className="text-stone-900">
                                            {new Date(formData.travelDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <Separator className="bg-stone-100" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Guests</span>
                                        <span className="text-stone-900">{formData.guestCount}</span>
                                    </div>
                                    {formData.guestNames.map((name, i) => (
                                        <div key={i} className="flex justify-between text-sm pl-4">
                                            <span className="text-stone-400">Guest {i + 1}</span>
                                            <span className="text-stone-600">{name}</span>
                                        </div>
                                    ))}
                                    {formData.specialRequests && (
                                        <>
                                            <Separator className="bg-stone-100" />
                                            <div className="text-sm">
                                                <span className="text-stone-500">Special Requests</span>
                                                <p className="text-stone-700 mt-1">
                                                    {formData.specialRequests}
                                                </p>
                                            </div>
                                        </>
                                    )}

                                </div>

                                <div className="mt-6 p-4 rounded-xl bg-gold/5 border border-gold/20">
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <p className="text-stone-600 text-xs leading-relaxed">
                                            A dedicated travel designer will be assigned to your journey.
                                            Payment will be arranged directly with your designer via
                                            secure bank transfer or card payment.
                                        </p>
                                    </div>
                                </div>

                                <TurnstileWidget
                                    onToken={(t) => setTurnstileToken(t)}
                                    onExpire={() => setTurnstileToken(null)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                {submitError && currentStep === 4 && (
                    <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {submitError}
                    </div>
                )}
                <div className="flex items-center justify-between mt-8">
                    <Button
                        variant="ghost"
                        onClick={goPrevious}
                        disabled={currentStep === 1}
                        className="text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    {currentStep < 4 ? (
                        <Button
                            variant="gold"
                            size="lg"
                            onClick={goNext}
                            disabled={!canProceed()}
                            className="disabled:opacity-35 disabled:cursor-not-allowed"
                        >
                            Next Step
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            variant="gold"
                            size="lg"
                            onClick={handleSubmit}
                            disabled={
                                isSubmitting || (turnstileEnabled && !turnstileToken)
                            }
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
