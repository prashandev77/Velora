'use client';

import { useRouter } from 'next/navigation';
import { updateBookingStatus, deleteBooking } from '../actions';

export default function BookingActions({ id, currentStatus }: { id: string; currentStatus: string }) {
    const router = useRouter();

    const handleStatusUpdate = async (formData: FormData) => {
        const newStatus = formData.get('status') as string;
        if (!window.confirm(`Change status to "${newStatus}"?`)) return;
        await updateBookingStatus(formData);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this booking? This cannot be undone.')) return;
        const fd = new FormData();
        fd.append('id', id);
        await deleteBooking(fd);
        router.push('/admin/bookings');
    };

    return (
        <div className="flex gap-3 flex-wrap">
            <form action={handleStatusUpdate}>
                <input type="hidden" name="id" value={id} />
                <div className="flex items-center gap-2">
                    <select
                        name="status"
                        defaultValue={currentStatus}
                        className="bg-white border border-gray-200 rounded-xl text-gray-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow"
                    >
                        {['pending', 'confirmed', 'cancelled'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
                        Update Status
                    </button>
                </div>
            </form>

            <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-sm font-medium px-4 py-2 rounded-xl transition-all"
            >
                Delete
            </button>
        </div>
    );
}
