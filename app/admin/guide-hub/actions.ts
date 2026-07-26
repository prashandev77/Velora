'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminAudit } from '@/lib/admin-audit';
import { guideSchema } from '@/lib/validations/guide-schema';
import { guideCategorySchema } from '@/lib/validations/guide-schema';
import { AdminAuthError, requireAdminAccess } from '@/utils/supabase/admin-auth';

export type ActionState = {
    success?: boolean;
    errors?: Record<string, string[]>;
    message?: string;
} | null;

// ─── Guide Actions ──────────────────────────────────────────

export async function saveGuide(_prev: ActionState, formData: FormData): Promise<ActionState> {
    const id = formData.get('id') as string | null;
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

    let raw: Record<string, unknown>;
    try {
        raw = JSON.parse(formData.get('payload') as string);
    } catch {
        return { errors: { _form: ['Invalid form data'] } };
    }

    const result = guideSchema.safeParse(raw);
    if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of result.error.issues) {
            const key = issue.path.join('.');
            if (!fieldErrors[key]) fieldErrors[key] = [];
            fieldErrors[key].push(issue.message);
        }
        return { errors: fieldErrors };
    }

    const data = result.data;

    const payload = {
        title: data.title,
        slug: data.slug,
        short_description: data.shortDescription,
        content: data.content,
        featured_image: data.featuredImage,
        category_id: data.categoryId || null,
        status: data.status,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
    };

    if (id) {
        // On update, only set published_at if transitioning to published
        const { data: existing } = await supabase
            .from('guides')
            .select('status, published_at')
            .eq('id', id)
            .single();

        const updatePayload = {
            ...payload,
            published_at: data.status === 'published'
                ? (existing?.status === 'published' && existing?.published_at ? existing.published_at : new Date().toISOString())
                : null,
        };

        const { error } = await supabase.from('guides').update(updatePayload).eq('id', id);
        if (error) {
            console.error('Update guide error:', error);
            return { errors: { _form: ['Failed to update guide. Please try again.'] } };
        }
        adminAudit('guide_update', { guideId: id, slug: payload.slug }, user.email);
    } else {
        const { error } = await supabase.from('guides').insert([payload]);
        if (error) {
            console.error('Insert guide error:', error);
            if (error.code === '23505') {
                return { errors: { slug: ['This slug is already in use. Choose a different one.'] } };
            }
            return { errors: { _form: ['Failed to create guide. Please try again.'] } };
        }
        adminAudit('guide_create', { slug: payload.slug }, user.email);
    }

    revalidatePath('/', 'layout');
    redirect(id ? '/admin/guide-hub?saved=updated' : '/admin/guide-hub?saved=created');
}

export async function deleteGuide(formData: FormData) {
    const id = formData.get('id') as string;
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;

    await supabase.from('guides').delete().eq('id', id);
    adminAudit('guide_delete', { guideId: id }, user.email);

    revalidatePath('/', 'layout');
}

export async function toggleGuideStatus(id: string, newStatus: 'draft' | 'published') {
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;

    const updateData: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
    } else {
        updateData.published_at = null;
    }

    await supabase.from('guides').update(updateData).eq('id', id);
    adminAudit('guide_toggle_status', { guideId: id, newStatus }, user.email);

    revalidatePath('/', 'layout');
}

// ─── Category Actions ───────────────────────────────────────

export async function saveCategory(_prev: ActionState, formData: FormData): Promise<ActionState> {
    const id = formData.get('id') as string | null;
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
        slug: formData.get('slug') as string,
    };

    const result = guideCategorySchema.safeParse(raw);
    if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of result.error.issues) {
            const key = issue.path.join('.');
            if (!fieldErrors[key]) fieldErrors[key] = [];
            fieldErrors[key].push(issue.message);
        }
        return { errors: fieldErrors };
    }

    const data = result.data;

    if (id) {
        const { error } = await supabase.from('guide_categories').update(data).eq('id', id);
        if (error) {
            console.error('Update category error:', error);
            if (error.code === '23505') {
                return { errors: { slug: ['This slug is already in use.'] } };
            }
            return { errors: { _form: ['Failed to update category.'] } };
        }
        adminAudit('guide_category_update', { categoryId: id, slug: data.slug }, user.email);
    } else {
        const { error } = await supabase.from('guide_categories').insert([data]);
        if (error) {
            console.error('Insert category error:', error);
            if (error.code === '23505') {
                return { errors: { slug: ['This slug is already in use.'] } };
            }
            return { errors: { _form: ['Failed to create category.'] } };
        }
        adminAudit('guide_category_create', { slug: data.slug }, user.email);
    }

    revalidatePath('/admin/guide-hub/categories', 'page');
    return { success: true, message: id ? 'Category updated' : 'Category created' };
}

export async function deleteCategory(formData: FormData) {
    const id = formData.get('id') as string;
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;

    await supabase.from('guide_categories').delete().eq('id', id);
    adminAudit('guide_category_delete', { categoryId: id }, user.email);

    revalidatePath('/admin/guide-hub/categories', 'page');
}
