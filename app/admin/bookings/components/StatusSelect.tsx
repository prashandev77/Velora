'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';
import { useToast } from '@/app/admin/components/ToastProvider';
import { updateBookingStatus } from '../actions';

export default function StatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
    const router = useRouter();
    const { success, error } = useToast();
    const [value, setValue] = useState(currentStatus);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!dialogOpen) setValue(currentStatus);
    }, [currentStatus, dialogOpen]);

    const handleConfirm = async () => {
        if (!pendingStatus) return;
        setLoading(true);
        try {
            const fd = new FormData();
            fd.set('id', id);
            fd.set('status', pendingStatus);
            await updateBookingStatus(fd);
            setValue(pendingStatus);
            success('Status updated', `Booking is now ${pendingStatus}.`);
            setDialogOpen(false);
            setPendingStatus(null);
            router.refresh();
        } catch {
            error('Update failed', 'Could not change status. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ConfirmDialog
                open={dialogOpen}
                variant="neutral"
                title="Change booking status?"
                message={
                    pendingStatus
                        ? `Set status to "${pendingStatus}".`
                        : ''
                }
                confirmLabel="Update status"
                cancelLabel="Cancel"
                confirmLoading={loading}
                onConfirm={handleConfirm}
                onCancel={() => {
                    if (!loading) {
                        setDialogOpen(false);
                        setPendingStatus(null);
                    }
                }}
            />
            <div className="inline-flex items-center gap-1.5">
                <select
                    value={value}
                    disabled={loading}
                    onChange={(e) => {
                        const next = e.target.value;
                        if (next === value) return;
                        setPendingStatus(next);
                        setDialogOpen(true);
                    }}
                    className="text-[11px] bg-white border border-gray-200 rounded-lg text-gray-600 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer hover:border-gray-300 transition-colors disabled:opacity-60"
                >
                    {['pending', 'confirmed', 'cancelled'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 shrink-0" aria-hidden />}
            </div>
        </>
    );
}
