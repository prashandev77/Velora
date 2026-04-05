'use server';

import { createClient } from '@supabase/supabase-js';
import { getPackageById } from '@/lib/data';
import { sendBookingEmails } from '@/lib/email';
import { generateBookingRef } from '@/lib/booking-ref';
import { createBookingInputSchema } from '@/lib/validations/public-booking';
import { verifyTurnstileToken } from '@/lib/verify-turnstile';

const GENERIC_ERROR = 'Unable to complete your booking. Please try again or contact us.';

// Use service-role client so public (non-authenticated) visitors can insert bookings.
function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function createBooking(formData: {
    packageId: string;
    travelDate: string;
    guestCount: number;
    guestNames: string[];
    specialRequests: string;
    turnstileToken?: string;
}) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
        console.error('createBooking: SUPABASE_SERVICE_ROLE_KEY is not set');
        return {
            success: false,
            error: 'Booking service is not configured. Please contact support.',
        };
    }

    const parsed = createBookingInputSchema.safeParse(formData);
    if (!parsed.success) {
        console.error('createBooking validation:', parsed.error.flatten());
        return { success: false, error: GENERIC_ERROR };
    }

    const { turnstileToken, ...data } = parsed.data;
    const turnstile = await verifyTurnstileToken(turnstileToken);
    if (!turnstile.ok) {
        return { success: false, error: 'Security check failed. Please refresh and try again.' };
    }

    const pkg = await getPackageById(data.packageId);
    const packageTitle = pkg?.title ?? 'Unknown Package';

    const bookingRef = generateBookingRef('VJ');

    const supabase = getAdminClient();
    if (!supabase) {
        console.error('createBooking: Supabase admin client unavailable');
        return { success: false, error: 'Booking service is not configured. Please contact support.' };
    }

    const { error } = await supabase.from('bookings').insert({
        booking_ref: bookingRef,
        package_id: data.packageId,
        package_title: packageTitle,
        travel_date: data.travelDate,
        guest_count: data.guestCount,
        guest_names: data.guestNames.filter((n) => n.trim()),
        special_requests: data.specialRequests || null,
        status: 'pending',
    });

    if (error) {
        console.error('Booking insert error:', error);
        return { success: false, error: GENERIC_ERROR };
    }

    const leadGuestName = data.guestNames.find((n) => n.trim()) || 'Guest';
    void sendBookingEmails({
        customerEmail: '',
        customerName: leadGuestName,
        bookingRef,
        packageTitle,
        travelDate: data.travelDate,
        guestCount: data.guestCount,
        specialRequests: data.specialRequests || undefined,
    }).catch((err) => console.error('Background booking email error:', err));

    return {
        success: true,
        bookingId: bookingRef,
        message: 'Booking confirmed! Our travel designer will contact you within 24 hours.',
    };
}
