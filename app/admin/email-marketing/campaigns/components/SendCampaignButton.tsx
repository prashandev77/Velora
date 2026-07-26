'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { sendCampaign } from '../actions';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';
import { useToast } from '@/app/admin/components/ToastProvider';

export default function SendCampaignButton({ campaignId, subscriberCount }: { campaignId: string; subscriberCount: number }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [sending, setSending] = useState(false);
    const toast = useToast();

    const handleSend = async () => {
        setShowConfirm(false);
        setSending(true);
        const result = await sendCampaign(campaignId);
        setSending(false);

        if (result.success) {
            toast.success('Campaign sent!', result.message);
        } else {
            toast.error('Send failed', result.message);
        }
    };

    return (
        <>
            <ConfirmDialog
                open={showConfirm}
                variant="neutral"
                title="Send campaign?"
                message={`This will send the email to ${subscriberCount} subscriber${subscriberCount !== 1 ? 's' : ''}. This action cannot be undone.`}
                confirmLabel="Send Now"
                cancelLabel="Cancel"
                confirmLoading={sending}
                onConfirm={handleSend}
                onCancel={() => setShowConfirm(false)}
            />
            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                disabled={sending || subscriberCount === 0}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
            >
                {sending ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Send to {subscriberCount} subscriber{subscriberCount !== 1 ? 's' : ''}
                    </>
                )}
            </button>
        </>
    );
}
