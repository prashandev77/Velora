'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateInquiryStatus(formData: FormData) {
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;

    if (!id || !status) throw new Error('Missing id or status');

    const supabase = await createClient();
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (error) throw new Error(error.message);

    revalidatePath('/admin/inquiries');
}

export async function deleteInquiry(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) throw new Error('Missing id');

    const supabase = await createClient();
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) throw new Error(error.message);

    revalidatePath('/admin/inquiries');
}
