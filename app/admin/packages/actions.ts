'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminAudit } from '@/lib/admin-audit';
import { journeySchema } from '@/lib/validations/journey-schema';
import { AdminAuthError, requireAdminAccess } from '@/utils/supabase/admin-auth';

export type ActionState = {
    success?: boolean;
    errors?: Record<string, string[]>;
    message?: string;
} | null;

export async function savePackage(_prev: ActionState, formData: FormData): Promise<ActionState> {
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

    // Parse all fields from the raw JSON payload
    let raw: Record<string, unknown>;
    try {
        raw = JSON.parse(formData.get('payload') as string);
    } catch {
        return { errors: { _form: ['Invalid form data'] } };
    }

    // Validate with Zod
    const result = journeySchema.safeParse(raw);
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

    // Build database payload
    const payload = {
        slug: data.slug,
        category: data.category,
        title: data.title,
        location: data.location,
        days: data.days,
        image_url: data.imageUrl,
        tag: data.tag,
        subtitle: data.subtitle || null,
        travel_style: data.travelStyle || null,
        description: data.description,
        accommodation: data.accommodation || null,
        highlights: data.highlights,
        why_special: data.whySpecial,
        perfect_for: data.perfectFor,
        route: data.route,
        route_coords: data.routeCoords,
        included: data.included,
        not_included: data.notIncluded,
        itinerary: data.itinerary,
        gallery_images: data.galleryImages,
        is_active: data.isActive,
    };

    if (id) {
        const { error } = await supabase.from('packages').update(payload).eq('id', id);
        if (error) {
            console.error('Update error:', error);
            return { errors: { _form: ['Failed to update package. Please try again.'] } };
        }
        adminAudit('package_update', { packageId: id, slug: payload.slug }, user.email);
    } else {
        const { error } = await supabase.from('packages').insert([payload]);
        if (error) {
            console.error('Insert error:', error);
            if (error.code === '23505') {
                return { errors: { slug: ['This slug is already in use. Choose a different one.'] } };
            }
            return { errors: { _form: ['Failed to create package. Please try again.'] } };
        }
        adminAudit('package_create', { slug: payload.slug }, user.email);
    }

    revalidatePath('/', 'layout');
    redirect(id ? '/admin/packages?saved=updated' : '/admin/packages?saved=created');
}

export async function deletePackage(formData: FormData) {
    const id = formData.get('id') as string;
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;

    // Get the package first to find associated images
    const { data: pkg } = await supabase
        .from('packages')
        .select('image_url, gallery_images')
        .eq('id', id)
        .single();

    // Collect all storage paths to clean up
    const pathsToDelete: string[] = [];
    if (pkg) {
        const allUrls = [pkg.image_url, ...(pkg.gallery_images || [])];
        const marker = '/journey-images/';
        for (const url of allUrls) {
            if (!url || !url.includes('journey-images')) continue;
            try {
                const u = new URL(url);
                const idx = u.pathname.indexOf(marker);
                if (idx !== -1) {
                    pathsToDelete.push(u.pathname.slice(idx + marker.length));
                }
            } catch {
                /* invalid URL */
            }
        }
    }

    // Delete the package
    await supabase.from('packages').delete().eq('id', id);

    adminAudit('package_delete', { packageId: id }, user.email);

    // Clean up storage (fire and forget)
    if (pathsToDelete.length > 0) {
        await supabase.storage.from('journey-images').remove(pathsToDelete).catch(() => {});
    }

    revalidatePath('/', 'layout');
}
