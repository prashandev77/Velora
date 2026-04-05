'use server';

import { createClient } from '@supabase/supabase-js';
import { sendBookingEmails } from '@/lib/email';
import { generateBookingRef } from '@/lib/booking-ref';
import { verifyTurnstileToken } from '@/lib/verify-turnstile';

const GENERIC_ERROR = 'Unable to submit your enquiry. Please try again or contact us.';

// Service-role client — bypasses RLS so public visitors can insert
function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function submitInquiry(formData: FormData) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
        console.error('submitInquiry: SUPABASE_SERVICE_ROLE_KEY is not set');
        return { success: false, error: 'Service not configured.' };
    }

    const honeypot = (formData.get('website') as string | null) ?? '';
    if (honeypot.trim() !== '') {
        console.warn('[security] Honeypot triggered on submitInquiry');
        return { success: true };
    }

    const turnstileToken = formData.get('cf-turnstile-response') as string | null;
    const turnstile = await verifyTurnstileToken(turnstileToken);
    if (!turnstile.ok) {
        return { success: false, error: 'Security check failed. Please refresh and try again.' };
    }

    const supabase = getAdminClient();
    if (!supabase) {
        console.error('submitInquiry: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is invalid');
        return { success: false, error: 'Service not configured.' };
    }

    const name = (formData.get('name') as string | null) ?? '';
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || null;
    const departingCity = (formData.get('departing_city') as string) || null;
    const travelMonth = (formData.get('travel_dates') as string) || null;
    const tripLength = (formData.get('duration') as string) || null;
    const experiencesRaw = (formData.get('experiences') as string) || '';
    const travelStyles = experiencesRaw ? experiencesRaw.split(', ').filter(Boolean) : [];
    const numTravelers = (formData.get('num_travelers') as string) || null;
    const message = (formData.get('message') as string) || null;

    const bookingRef = generateBookingRef('AT');

    const parsedGuests = numTravelers ? parseInt(numTravelers, 10) : NaN;
    const guestCount =
        Number.isFinite(parsedGuests) && parsedGuests > 0 ? parsedGuests : 1;

    try {
        const { error } = await supabase.from('bookings').insert({
            booking_ref: bookingRef,
            name: name || null,
            email,
            phone,
            departing_city: departingCity,
            travel_month: travelMonth,
            trip_length: tripLength,
            travel_styles: travelStyles,
            guest_count: guestCount,
            guest_names: name ? [name] : [''],
            message,
            status: 'pending',
        });

        if (error) {
            console.error('Booking insert error:', error.message);
            return { success: false, error: GENERIC_ERROR };
        }

        void sendBookingEmails({
            customerEmail: email,
            customerName: name,
            bookingRef,
            travelMonth: travelMonth || undefined,
            tripLength: tripLength || undefined,
            guestCount,
            travelStyles: travelStyles.length > 0 ? travelStyles : undefined,
            message: message || undefined,
        }).catch((err) => console.error('Background inquiry email error:', err));

        return { success: true, bookingRef };
    } catch (err) {
        console.error('submitInquiry:', err);
        return {
            success: false,
            error: GENERIC_ERROR,
        };
    }
}
