'use server';

import { createClient } from '@supabase/supabase-js';
import { getPackageById } from '@/lib/data';
import { sendBookingEmails } from '@/lib/email';

function generateBookingRef(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = '';
    for (let i = 0; i < 6; i++) {
        ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `VJ-${ref}`;
}

// Use service-role client so public (non-authenticated) visitors can insert bookings.
// The normal SSR client uses anon key + cookie-based auth, which means public visitors
// have no auth session — the insert gets silently rejected by competing RLS policies.
function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
}

export async function createBooking(formData: {
    packageId: string;
    travelDate: string;
    guestCount: number;
    guestNames: string[];
    specialRequests: string;
}) {
    // Look up the package title from dynamic data
    const pkg = await getPackageById(formData.packageId);
    const packageTitle = pkg?.title ?? 'Unknown Package';

    const bookingRef = generateBookingRef();

    const supabase = getAdminClient();

    const { error } = await supabase.from('bookings').insert({
        booking_ref: bookingRef,
        package_id: formData.packageId,
        package_title: packageTitle,
        travel_date: formData.travelDate,
        guest_count: formData.guestCount,
        guest_names: formData.guestNames.filter((n) => n.trim()),
        special_requests: formData.specialRequests || null,
        status: 'pending',
    });

    if (error) {
        console.error('Booking insert error:', error);
        return { success: false, error: error.message };
    }

    // Send confirmation emails (non-blocking — won't fail the booking)
    const leadGuestName = formData.guestNames.find((n) => n.trim()) || 'Guest';
    // The /book/[id] flow doesn't collect email, so we skip emails if there's none.
    // If you later add an email field to this flow, it will work automatically.

    // For now, send only the owner notification for package bookings
    await sendBookingEmails({
        customerEmail: '', // No email collected in this flow
        customerName: leadGuestName,
        bookingRef,
        packageTitle,
        travelDate: formData.travelDate,
        guestCount: formData.guestCount,
        specialRequests: formData.specialRequests || undefined,
    });

    return {
        success: true,
        bookingId: bookingRef,
        message: 'Booking confirmed! Our travel designer will contact you within 24 hours.',
    };
}
