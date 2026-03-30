'use client';

import { updateBookingStatus } from '../actions';

export default function StatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
    return (
        <form action={updateBookingStatus}>
            <input type="hidden" name="id" value={id} />
            <select
                name="status"
                defaultValue={currentStatus}
                onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                className="text-[11px] bg-white border border-gray-200 rounded-lg text-gray-600 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer hover:border-gray-300 transition-colors"
            >
                {['pending', 'confirmed', 'cancelled'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </form>
    );
}
