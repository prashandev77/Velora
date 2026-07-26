'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminAudit } from '@/lib/admin-audit';
import { campaignSchema } from '@/lib/validations/campaign-schema';
import { sendCampaignEmails } from '@/lib/campaign-email';
import { AdminAuthError, requireAdminAccess } from '@/utils/supabase/admin-auth';

export type ActionState = {
    success?: boolean;
    errors?: Record<string, string[]>;
    message?: string;
} | null;

export async function saveCampaign(_prev: ActionState, formData: FormData): Promise<ActionState> {
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

    const result = campaignSchema.safeParse(raw);
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
        // Check if campaign is already sent
        const { data: existing } = await supabase
            .from('email_campaigns')
            .select('status')
            .eq('id', id)
            .single();

        if (existing?.status === 'sent') {
            return { errors: { _form: ['Cannot edit a sent campaign.'] } };
        }

        const { error } = await supabase
            .from('email_campaigns')
            .update({
                subject: data.subject,
                title: data.title,
                content: data.content,
            })
            .eq('id', id);

        if (error) {
            console.error('Update campaign error:', error);
            return { errors: { _form: ['Failed to update campaign.'] } };
        }
        adminAudit('campaign_update', { campaignId: id }, user.email);
    } else {
        const { error } = await supabase.from('email_campaigns').insert([{
            subject: data.subject,
            title: data.title,
            content: data.content,
            status: 'draft',
        }]);

        if (error) {
            console.error('Insert campaign error:', error);
            return { errors: { _form: ['Failed to create campaign.'] } };
        }
        adminAudit('campaign_create', { subject: data.subject }, user.email);
    }

    revalidatePath('/admin/email-marketing/campaigns', 'page');
    redirect(id ? '/admin/email-marketing/campaigns?saved=updated' : '/admin/email-marketing/campaigns?saved=created');
}

export async function deleteCampaign(formData: FormData) {
    const id = formData.get('id') as string;
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) return;
        throw error;
    }
    const { supabase, user } = auth;

    await supabase.from('email_campaigns').delete().eq('id', id);
    adminAudit('campaign_delete', { campaignId: id }, user.email);

    revalidatePath('/admin/email-marketing/campaigns', 'page');
}

export async function sendCampaign(campaignId: string): Promise<{ success: boolean; message: string }> {
    let auth;
    try {
        auth = await requireAdminAccess();
    } catch (error) {
        if (error instanceof AdminAuthError) {
            return { success: false, message: 'Unauthorized' };
        }
        throw error;
    }
    const { supabase, user } = auth;

    // Get campaign
    const { data: campaign } = await supabase
        .from('email_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

    if (!campaign) {
        return { success: false, message: 'Campaign not found' };
    }

    if (campaign.status === 'sent') {
        return { success: false, message: 'Campaign has already been sent' };
    }

    // Get all subscribers
    const { data: subscribers } = await supabase
        .from('subscribers')
        .select('name, email');

    if (!subscribers || subscribers.length === 0) {
        return { success: false, message: 'No subscribers to send to' };
    }

    // Send emails
    const result = await sendCampaignEmails(
        subscribers,
        campaign.subject,
        campaign.title,
        campaign.content,
    );

    if (result.sentCount > 0) {
        // Update campaign status only if emails were actually sent
        await supabase
            .from('email_campaigns')
            .update({
                status: 'sent',
                sent_at: new Date().toISOString(),
                recipient_count: result.sentCount,
            })
            .eq('id', campaignId);

        adminAudit('campaign_send', {
            campaignId,
            sentCount: result.sentCount,
            failedCount: result.failedCount,
        }, user.email);

        revalidatePath('/admin/email-marketing/campaigns', 'page');
    }

    if (result.success) {
        return { success: true, message: `Campaign sent to ${result.sentCount} subscriber${result.sentCount !== 1 ? 's' : ''}` };
    } else {
        const errorDetail = result.error ? `: ${result.error}` : '';
        return {
            success: false,
            message: result.sentCount > 0
                ? `Sent to ${result.sentCount}, failed for ${result.failedCount} subscriber(s)${errorDetail}`
                : `Failed to send emails${errorDetail}`,
        };
    }
}
