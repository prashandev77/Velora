'use server';

import { revalidatePath } from 'next/cache';
import { adminAudit } from '@/lib/admin-audit';
import { AdminAuthError, requireAdminAccess } from '@/utils/supabase/admin-auth';

const VALID_STATUSES = ['pending', 'confirmed', 'cancelled'] as const;
type BookingStatus = (typeof VALID_STATUSES)[number];

export async function updateBookingStatus(formData: FormData) {
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;

    if (!id || !status) return;

    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;

    if (!VALID_STATUSES.includes(status as BookingStatus)) {
        console.error('updateBookingStatus: invalid status', status);
        return;
    }

    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) {
        console.error('updateBookingStatus error:', error);
        return;
    }

    adminAudit(
        'booking_status_update',
        { bookingId: id, status },
        user.email,
    );

    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
}

export async function deleteBooking(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;
    await supabase.from('bookings').delete().eq('id', id);

    adminAudit('booking_delete', { bookingId: id }, user.email);

    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
}
