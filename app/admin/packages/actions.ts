'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function savePackage(formData: FormData) {
    const id = formData.get('id') as string | null;
    const supabase = await createClient();

    const highlights = (formData.get('highlights') as string)
        .split('\n')
        .map((h) => h.trim())
        .filter(Boolean);

    // Parse itinerary JSON safely
    let itinerary: object[] = [];
    try {
        itinerary = JSON.parse(formData.get('itinerary') as string || '[]');
    } catch { /* ignore */ }

    const payload = {
        slug: formData.get('slug') as string,
        category: formData.get('category') as string,
        title: formData.get('title') as string,
        location: formData.get('location') as string,
        days: Number(formData.get('days')),
        image_url: formData.get('image_url') as string,
        tag: formData.get('tag') as string,
        highlights,
        description: formData.get('description') as string,
        itinerary,
        is_active: formData.get('is_active') === 'true',
    };

    if (id) {
        await supabase.from('packages').update(payload).eq('id', id);
    } else {
        await supabase.from('packages').insert([payload]);
    }

    revalidatePath('/admin/packages');
    revalidatePath('/journeys');
    redirect('/admin/packages');
}

export async function deletePackage(formData: FormData) {
    const id = formData.get('id') as string;
    const supabase = await createClient();
    await supabase.from('packages').delete().eq('id', id);
    revalidatePath('/admin/packages');
}
