'use server';

import { revalidatePath } from 'next/cache';
import { AdminAuthError, requireAdminAccess } from '@/utils/supabase/admin-auth';

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
    const { supabase } = auth;
    await supabase.from('bookings').update({ status }).eq('id', id);
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
    const { supabase } = auth;
    await supabase.from('bookings').delete().eq('id', id);
    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
}
