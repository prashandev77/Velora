'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';
import { useToast } from '@/app/admin/components/ToastProvider';
import { updateBookingStatus, deleteBooking } from '../actions';

export default function BookingActions({ id, currentStatus }: { id: string; currentStatus: string }) {
    const router = useRouter();
    const { success, error } = useToast();
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const openStatusDialog = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const next = fd.get('status') as string;
        if (!next || next === currentStatus) return;
        setPendingStatus(next);
        setStatusDialogOpen(true);
    };

    const confirmStatusUpdate = async () => {
        if (!pendingStatus) return;
        setStatusLoading(true);
        try {
            const fd = new FormData();
            fd.set('id', id);
            fd.set('status', pendingStatus);
            await updateBookingStatus(fd);
            success('Status updated', `Booking is now ${pendingStatus}.`);
            setStatusDialogOpen(false);
            setPendingStatus(null);
            router.refresh();
        } catch {
            error('Update failed', 'Could not change status. Try again.');
        } finally {
            setStatusLoading(false);
        }
    };

    const confirmDelete = async () => {
        setDeleteLoading(true);
        try {
            const fd = new FormData();
            fd.append('id', id);
            await deleteBooking(fd);
            success('Booking deleted', 'The record has been removed.');
            setDeleteDialogOpen(false);
            router.push('/admin/bookings');
        } catch {
            error('Delete failed', 'Something went wrong. Please try again.');
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <ConfirmDialog
                open={statusDialogOpen}
                variant="neutral"
                title="Change booking status?"
                message={
                    pendingStatus
                        ? `Set status to "${pendingStatus}".`
                        : ''
                }
                confirmLabel="Update status"
                cancelLabel="Cancel"
                confirmLoading={statusLoading}
                onConfirm={confirmStatusUpdate}
                onCancel={() => {
                    if (!statusLoading) {
                        setStatusDialogOpen(false);
                        setPendingStatus(null);
                    }
                }}
            />
            <ConfirmDialog
                open={deleteDialogOpen}
                variant="danger"
                title="Delete this booking?"
                message="This cannot be undone. The booking will be permanently removed."
                confirmLabel="Delete"
                cancelLabel="Keep"
                confirmLoading={deleteLoading}
                onConfirm={confirmDelete}
                onCancel={() => {
                    if (!deleteLoading) setDeleteDialogOpen(false);
                }}
            />

            <div className="flex gap-3 flex-wrap">
                <form onSubmit={openStatusDialog}>
                    <input type="hidden" name="id" value={id} />
                    <div className="flex items-center gap-2">
                        <select
                            key={currentStatus}
                            name="status"
                            defaultValue={currentStatus}
                            className="bg-white border border-gray-200 rounded-xl text-gray-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow"
                        >
                            {['pending', 'confirmed', 'cancelled'].map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            disabled={statusLoading}
                            className="inline-flex items-center justify-center gap-2 min-w-[8.5rem] bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm disabled:opacity-60"
                        >
                            {statusLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Updating…
                                </>
                            ) : (
                                'Update Status'
                            )}
                        </button>
                    </div>
                </form>

                <button
                    type="button"
                    onClick={() => setDeleteDialogOpen(true)}
                    disabled={deleteLoading}
                    className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-sm font-medium px-4 py-2 rounded-xl transition-all disabled:opacity-60"
                >
                    Delete
                </button>
            </div>
        </>
    );
}
