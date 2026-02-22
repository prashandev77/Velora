'use server';

import { createClient } from '@/utils/supabase/server';

export async function submitInquiry(formData: FormData) {
    const supabase = await createClient();

    const { error } = await supabase.from('inquiries').insert([{
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || null,
        travel_month: formData.get('travel_month') as string || null,
        travel_style: formData.get('travel_style') as string || null,
        num_travelers: formData.get('num_travelers') as string || null,
        message: formData.get('message') as string || null,
        status: 'new',
    }]);

    if (error) {
        console.error('Inquiry insert error:', error.message);
        return { success: false };
    }

    return { success: true };
}
