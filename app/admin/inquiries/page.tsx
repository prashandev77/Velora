import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { updateInquiryStatus } from './actions';
import { ChevronRight } from 'lucide-react';

const statusConfig: Record<string, { pill: string; dot: string; bar: string }> = {
    new: { pill: 'bg-blue-500/15 text-blue-400 border-blue-500/20', dot: 'bg-blue-400', bar: 'bg-blue-500' },
    read: { pill: 'bg-white/8  text-white/40  border-white/10', dot: 'bg-white/30', bar: 'bg-white/20' },
    replied: { pill: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400', bar: 'bg-emerald-500' },
    closed: { pill: 'bg-white/5  text-white/20  border-white/5', dot: 'bg-white/10', bar: 'bg-white/10' },
};

const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'read', label: 'Read' },
    { key: 'replied', label: 'Replied' },
    { key: 'closed', label: 'Closed' },
];

export default async function InquiriesPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const { status } = await searchParams;
    const supabase = await createClient();

    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (status && status !== 'all') query = query.eq('status', status);

    const { data: inquiries } = await query;

    return (
        <div className="max-w-2xl lg:max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">Inquiries</h1>
                    <p className="text-white/40 text-xs mt-0.5">{inquiries?.length ?? 0} results</p>
                </div>
            </div>

            {/* Filter chips — horizontal scroll */}
            <div className="flex gap-2 mb-5 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto pb-0.5 scrollbar-none">
                {filterTabs.map(({ key, label }) => {
                    const active = (!status && key === 'all') || status === key;
                    return (
                        <Link
                            key={key}
                            href={`/admin/inquiries${key === 'all' ? '' : `?status=${key}`}`}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${active
                                    ? 'bg-gold/20 border-gold/30 text-gold shadow-sm shadow-gold/10'
                                    : 'bg-white/[0.04] border-white/8 text-white/40 hover:text-white/70 active:scale-95'
                                }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>

            {/* Card list */}
            <div className="space-y-2.5">
                {(!inquiries || inquiries.length === 0) ? (
                    <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-12 text-center">
                        <p className="text-white/30 text-sm">No inquiries in this category</p>
                    </div>
                ) : (
                    inquiries.map((inq) => {
                        const sc = statusConfig[inq.status] ?? statusConfig.read;
                        const timeAgo = (() => {
                            const diff = Date.now() - new Date(inq.created_at).getTime();
                            const h = Math.floor(diff / 3600000);
                            const d = Math.floor(diff / 86400000);
                            if (d > 0) return `${d}d ago`;
                            if (h > 0) return `${h}h ago`;
                            return 'Just now';
                        })();

                        return (
                            <div key={inq.id} className="relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] active:bg-white/[0.08] border border-white/[0.06] rounded-2xl transition-all group">
                                {/* Left status bar */}
                                <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${sc.bar}`} />

                                <div className="px-4 pl-5 py-4">
                                    {/* Top row */}
                                    <div className="flex items-start gap-3">
                                        {/* Avatar */}
                                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-white/70 text-xs font-bold">
                                                {inq.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className="text-white text-sm font-semibold truncate">{inq.name}</p>
                                                <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full border font-medium ${sc.pill}`}>
                                                    {inq.status}
                                                </span>
                                            </div>
                                            <p className="text-white/35 text-xs truncate">{inq.email}</p>
                                        </div>

                                        <span className="text-white/20 text-[11px] flex-shrink-0">{timeAgo}</span>
                                    </div>

                                    {/* Meta chips */}
                                    {(inq.travel_style || inq.num_travelers || inq.travel_month) && (
                                        <div className="flex flex-wrap gap-1.5 mt-3 ml-12">
                                            {inq.travel_style && (
                                                <span className="bg-white/5 border border-white/8 text-white/40 text-[11px] px-2 py-0.5 rounded-lg">
                                                    {inq.travel_style}
                                                </span>
                                            )}
                                            {inq.num_travelers && (
                                                <span className="bg-white/5 border border-white/8 text-white/40 text-[11px] px-2 py-0.5 rounded-lg">
                                                    {inq.num_travelers} pax
                                                </span>
                                            )}
                                            {inq.travel_month && (
                                                <span className="bg-white/5 border border-white/8 text-white/40 text-[11px] px-2 py-0.5 rounded-lg">
                                                    {inq.travel_month}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Action bar */}
                                    <div className="flex items-center gap-2 mt-3.5 ml-12">
                                        <Link
                                            href={`/admin/inquiries/${inq.id}`}
                                            className="flex items-center gap-1 text-xs font-medium text-white/50 hover:text-gold transition-colors group"
                                        >
                                            View details
                                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>

                                        <div className="ml-auto">
                                            <form action={updateInquiryStatus}>
                                                <input type="hidden" name="id" value={inq.id} />
                                                <select
                                                    name="status"
                                                    defaultValue={inq.status}
                                                    onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                                                    className="text-[11px] bg-white/5 border border-white/10 rounded-lg text-white/50 px-2.5 py-1.5 focus:outline-none cursor-pointer hover:border-white/20 transition-colors"
                                                >
                                                    {['new', 'read', 'replied', 'closed'].map((s) => (
                                                        <option key={s} value={s} className="bg-[#161820]">{s}</option>
                                                    ))}
                                                </select>
                                            </form>
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
