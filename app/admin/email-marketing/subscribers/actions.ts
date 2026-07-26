'use server';

import { revalidatePath } from 'next/cache';
import { adminAudit } from '@/lib/admin-audit';
import { subscriberSchema } from '@/lib/validations/subscriber-schema';
import { AdminAuthError, requireAdminAccess } from '@/utils/supabase/admin-auth';

export type ActionState = {
    success?: boolean;
    errors?: Record<string, string[]>;
    message?: string;
} | null;

export async function addSubscriber(_prev: ActionState, formData: FormData): Promise<ActionState> {
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) {
            return { errors: { _form: ['You are not authorized to perform this action.'] } };
        }
        throw error;
    }
    const { supabase, user } = auth;

    const raw = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
    };

    const result = subscriberSchema.safeParse(raw);
    if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of result.error.issues) {
            const key = issue.path.join('.');
            if (!fieldErrors[key]) fieldErrors[key] = [];
            fieldErrors[key].push(issue.message);
        }
        return { errors: fieldErrors };
    }

    const { error } = await supabase.from('subscribers').insert([result.data]);
    if (error) {
        console.error('Insert subscriber error:', error);
        if (error.code === '23505') {
            return { errors: { email: ['This email is already subscribed.'] } };
        }
        return { errors: { _form: ['Failed to add subscriber.'] } };
    }

    adminAudit('subscriber_add', { email: result.data.email }, user.email);
    revalidatePath('/admin/email-marketing/subscribers', 'page');
    return { success: true, message: 'Subscriber added' };
}

export async function deleteSubscriber(formData: FormData) {
    const id = formData.get('id') as string;
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;

    await supabase.from('subscribers').delete().eq('id', id);
    adminAudit('subscriber_delete', { subscriberId: id }, user.email);

    revalidatePath('/admin/email-marketing/subscribers', 'page');
}
