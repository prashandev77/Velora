import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Plus, Pencil, Send, CheckCircle2, Clock } from 'lucide-react';
import DeleteCampaignButton from './components/DeleteCampaignButton';

export default async function CampaignsPage() {
    const supabase = await createClient();
    const { data: campaigns } = await supabase
        .from('email_campaigns')
        .select('id, subject, title, status, sent_at, recipient_count, created_at')
        .order('created_at', { ascending: false });

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading tracking-tight">Campaigns</h1>
                    <p className="text-gray-400 text-sm mt-1">{campaigns?.length ?? 0} campaigns</p>
                </div>
                <Link
                    href="/admin/email-marketing/campaigns/new"
                    className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Campaign</span>
                    <span className="sm:hidden">New</span>
                </Link>
            </div>

            {/* Empty state */}
            {(!campaigns || campaigns.length === 0) ? (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                        <Send className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-gray-900 text-lg font-semibold mb-2">No campaigns yet</p>
                    <p className="text-gray-400 text-sm mb-6">Create your first email campaign</p>
                    <Link href="/admin/email-marketing/campaigns/new" className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all">
                        Create first campaign →
                    </Link>
                </div>
            ) : (
                <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden">
                    {/* Desktop */}
                    <div className="hidden lg:block">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Campaign</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Recipients</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {campaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="text-gray-900 text-sm font-medium truncate max-w-xs">{campaign.subject}</p>
                                            {campaign.title && (
                                                <p className="text-gray-400 text-xs truncate max-w-xs">{campaign.title}</p>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            {campaign.status === 'sent' ? (
                                                <div className="flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-xs font-medium text-emerald-700">Sent</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                                                    <span className="text-xs font-medium text-amber-700">Draft</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 text-sm">
                                            {campaign.status === 'sent' ? campaign.recipient_count : '—'}
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-xs">
                                            {campaign.status === 'sent' && campaign.sent_at
                                                ? new Date(campaign.sent_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                                : new Date(campaign.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                            }
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link
                                                    href={`/admin/email-marketing/campaigns/${campaign.id}`}
                                                    className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all"
                                                    title={campaign.status === 'sent' ? 'View' : 'Edit'}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                {campaign.status === 'draft' && (
                                                    <DeleteCampaignButton id={campaign.id} subject={campaign.subject} />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile */}
                    <div className="lg:hidden divide-y divide-gray-100">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="flex items-center gap-3 px-5 py-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {campaign.status === 'sent' ? (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">Sent</span>
                                        ) : (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">Draft</span>
                                        )}
                                        {campaign.status === 'sent' && (
                                            <span className="text-gray-400 text-[10px]">{campaign.recipient_count} recipients</span>
                                        )}
                                    </div>
                                    <p className="text-gray-900 font-medium text-sm truncate">{campaign.subject}</p>
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <Link
                                        href={`/admin/email-marketing/campaigns/${campaign.id}`}
                                        className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    {campaign.status === 'draft' && (
                                        <DeleteCampaignButton id={campaign.id} subject={campaign.subject} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
