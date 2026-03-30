'use server';

import { createClient } from '@supabase/supabase-js';
import { sendBookingEmails } from '@/lib/email';

function generateBookingRef(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = '';
    for (let i = 0; i < 6; i++) {
        ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `VJ-${ref}`;
}

// Service-role client — bypasses RLS so public visitors can insert
function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
}

export async function submitInquiry(formData: FormData) {
    const supabase = getAdminClient();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || null;
    const departingCity = (formData.get('departing_city') as string) || null;
    const travelMonth = (formData.get('travel_dates') as string) || null;
    const tripLength = (formData.get('duration') as string) || null;
    const experiencesRaw = (formData.get('experiences') as string) || '';
    const travelStyles = experiencesRaw ? experiencesRaw.split(', ').filter(Boolean) : [];
    const numTravelers = (formData.get('num_travelers') as string) || null;
    const message = (formData.get('message') as string) || null;

    const bookingRef = generateBookingRef();

    const { error } = await supabase.from('bookings').insert({
        booking_ref: bookingRef,
        name,
        email,
        phone,
        departing_city: departingCity,
        travel_month: travelMonth,
        trip_length: tripLength,
        travel_styles: travelStyles,
        guest_count: numTravelers ? parseInt(numTravelers) || 1 : 1,
        guest_names: [name],
        message,
        status: 'pending',
    });

    if (error) {
        console.error('Booking insert error:', error.message);
        return { success: false };
    }

    // Send confirmation emails to customer + business owner
    await sendBookingEmails({
        customerEmail: email,
        customerName: name,
        bookingRef,
        travelMonth: travelMonth || undefined,
        tripLength: tripLength || undefined,
        guestCount: numTravelers ? parseInt(numTravelers) || 1 : 1,
        travelStyles: travelStyles.length > 0 ? travelStyles : undefined,
        message: message || undefined,
    });

    return { success: true, bookingRef };
}
