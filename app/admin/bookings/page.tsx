import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import StatusSelect from './components/StatusSelect';

const statusConfig: Record<string, { pill: string; bar: string }> = {
    pending: { pill: 'bg-amber-50 text-amber-600 border-amber-200', bar: 'bg-amber-500' },
    confirmed: { pill: 'bg-emerald-50 text-emerald-600 border-emerald-200', bar: 'bg-emerald-500' },
    cancelled: { pill: 'bg-gray-100 text-gray-400 border-gray-200', bar: 'bg-gray-300' },
};

const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'cancelled', label: 'Cancelled' },
];

export default async function BookingsPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const { status } = await searchParams;
    const supabase = await createClient();

    let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (status && status !== 'all') query = query.eq('status', status);

    const { data: bookings } = await query;

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">Bookings</h1>
                    <p className="text-gray-500 text-xs mt-0.5">{bookings?.length ?? 0} results</p>
                </div>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 mb-5 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto pb-0.5 scrollbar-none">
                {filterTabs.map(({ key, label }) => {
                    const active = (!status && key === 'all') || status === key;
                    return (
                        <Link
                            key={key}
                            href={`/admin/bookings${key === 'all' ? '' : `?status=${key}`}`}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${active
                                ? 'bg-gray-900 border-gray-900 text-white shadow-sm'
                                : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 active:scale-95'
                                }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>

            {/* Card list */}
            <div className="space-y-2.5">
                {(!bookings || bookings.length === 0) ? (
                    <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center">
                        <p className="text-gray-400 text-sm">No bookings in this category</p>
                    </div>
                ) : (
                    bookings.map((bk) => {
                        const sc = statusConfig[bk.status] ?? statusConfig.pending;
                        const timeAgo = (() => {
                            const diff = Date.now() - new Date(bk.created_at).getTime();
                            const h = Math.floor(diff / 3600000);
                            const d = Math.floor(diff / 86400000);
                            if (d > 0) return `${d}d ago`;
                            if (h > 0) return `${h}h ago`;
                            return 'Just now';
                        })();

                        const displayName = bk.name || bk.package_title || 'Unnamed';

                        return (
                            <div key={bk.id} className="relative overflow-hidden bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-200/80 rounded-2xl transition-all shadow-sm group">
                                {/* Left status bar */}
                                <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${sc.bar}`} />

                                <div className="px-4 pl-5 py-4">
                                    {/* Top row */}
                                    <div className="flex items-start gap-3">
                                        {/* Avatar */}
                                        <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-gray-600 text-xs font-bold">
                                                {displayName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className="text-gray-900 text-sm font-semibold truncate">{displayName}</p>
                                                <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${sc.pill}`}>
                                                    {bk.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-xs truncate">
                                                <span className="font-mono font-medium">{bk.booking_ref}</span>
                                                {bk.email && <> · {bk.email}</>}
                                                {bk.guest_count > 0 && <> · {bk.guest_count} traveller{bk.guest_count > 1 ? 's' : ''}</>}
                                            </p>
                                        </div>

                                        <span className="text-gray-400 text-[11px] flex-shrink-0">{timeAgo}</span>
                                    </div>

                                    {/* Meta chips */}
                                    {(bk.travel_styles?.length > 0 || bk.travel_month || bk.trip_length) && (
                                        <div className="flex flex-wrap gap-1.5 mt-3 ml-12">
                                            {bk.travel_month && (
                                                <span className="bg-gray-50 border border-gray-200 text-gray-500 text-[11px] px-2 py-0.5 rounded-lg">
                                                    {bk.travel_month}
                                                </span>
                                            )}
                                            {bk.trip_length && (
                                                <span className="bg-gray-50 border border-gray-200 text-gray-500 text-[11px] px-2 py-0.5 rounded-lg">
                                                    {bk.trip_length}
                                                </span>
                                            )}
                                            {bk.travel_styles?.slice(0, 2).map((style: string, i: number) => (
                                                <span key={i} className="bg-gray-50 border border-gray-200 text-gray-500 text-[11px] px-2 py-0.5 rounded-lg">
                                                    {style}
                                                </span>
                                            ))}
                                            {bk.travel_styles?.length > 2 && (
                                                <span className="bg-gray-50 border border-gray-200 text-gray-400 text-[11px] px-2 py-0.5 rounded-lg">
                                                    +{bk.travel_styles.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Action bar */}
                                    <div className="flex items-center gap-2 mt-3.5 ml-12">
                                        <Link
                                            href={`/admin/bookings/${bk.id}`}
                                            className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors group"
                                        >
                                            View details
                                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>

                                        <div className="ml-auto">
                                            <StatusSelect id={bk.id} currentStatus={bk.status} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
