'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateBookingStatus(formData: FormData) {
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;

    if (!id || !status) return;

    const supabase = await createClient();
    await supabase.from('bookings').update({ status }).eq('id', id);
    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
}

export async function deleteBooking(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    const supabase = await createClient();
    await supabase.from('bookings').delete().eq('id', id);
    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
}
