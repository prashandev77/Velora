import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import CampaignForm from '../components/CampaignForm';
import SendCampaignButton from '../components/SendCampaignButton';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const [{ data: campaign }, { count: subscriberCount }] = await Promise.all([
        supabase.from('email_campaigns').select('*').eq('id', id).single(),
        supabase.from('subscribers').select('id', { count: 'exact', head: true }),
    ]);

    if (!campaign) notFound();

    const initialData = {
        id: campaign.id,
        subject: campaign.subject,
        title: campaign.title,
        content: campaign.content,
        status: campaign.status as 'draft' | 'sent',
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link
                    href="/admin/email-marketing/campaigns"
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">
                        {campaign.status === 'sent' ? 'View Campaign' : 'Edit Campaign'}
                    </h1>
                    <p className="text-gray-400 text-sm mt-0.5">{campaign.subject}</p>
                </div>
            </div>

            {/* Sent status banner */}
            {campaign.status === 'sent' && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <div>
                        <p className="text-emerald-700 text-sm font-medium">Campaign sent successfully</p>
                        <p className="text-emerald-600 text-xs">
                            Sent to {campaign.recipient_count} subscriber{campaign.recipient_count !== 1 ? 's' : ''} on{' '}
                            {campaign.sent_at && new Date(campaign.sent_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            )}

            <CampaignForm initialData={initialData} />

            {/* Send button for draft campaigns */}
            {campaign.status === 'draft' && (
                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-gray-900 text-sm font-semibold">Ready to send?</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                            {(subscriberCount ?? 0) === 0
                                ? 'Add subscribers before sending'
                                : `This will send to all ${subscriberCount} subscribers`
                            }
                        </p>
                    </div>
                    <SendCampaignButton campaignId={campaign.id} subscriberCount={subscriberCount ?? 0} />
                </div>
            )}
        </div>
    );
}
