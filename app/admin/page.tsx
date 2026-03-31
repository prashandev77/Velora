import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Package, TrendingUp, ArrowUpRight, Plus, CalendarCheck, Calendar, Clock } from 'lucide-react';

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
    pending: { label: 'Pending', dot: 'bg-amber-500', text: 'text-amber-600' },
    confirmed: { label: 'Confirmed', dot: 'bg-emerald-500', text: 'text-emerald-600' },
    cancelled: { label: 'Cancelled', dot: 'bg-gray-300', text: 'text-gray-400' },
};

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return { text: 'Good morning', emoji: '☀️' };
    if (h < 17) return { text: 'Good afternoon', emoji: '🌤️' };
    return { text: 'Good evening', emoji: '🌙' };
}

function timeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    return `${d}d ago`;
}

export default async function AdminDashboard() {
    const supabase = await createClient();

    const [
        { count: totalPackages },
        { count: totalBookings },
        { count: pendingBookings },
        { count: confirmedBookings },
        { data: recentBookings },
    ] = await Promise.all([
        supabase.from('packages').select('id', { count: 'planned', head: true }),
        supabase.from('bookings').select('id', { count: 'planned', head: true }),
        supabase.from('bookings').select('id', { count: 'planned', head: true }).eq('status', 'pending'),
        supabase.from('bookings').select('id', { count: 'planned', head: true }).eq('status', 'confirmed'),
        supabase.from('bookings').select('id,booking_ref,package_title,name,email,status,created_at,guest_count')
            .order('created_at', { ascending: false }).limit(8),
    ]);

    const greeting = getGreeting();

    const stats = [
        {
            label: 'Total Packages',
            value: totalPackages ?? 0,
            icon: Package,
            sub: 'Active journeys',
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            href: '/admin/packages',
        },
        {
            label: 'Total Bookings',
            value: totalBookings ?? 0,
            icon: CalendarCheck,
            sub: 'All time',
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            href: '/admin/bookings',
        },
        {
            label: 'Pending',
            value: pendingBookings ?? 0,
            icon: TrendingUp,
            sub: 'Awaiting review',
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            href: '/admin/bookings?status=pending',
        },
        {
            label: 'Confirmed',
            value: confirmedBookings ?? 0,
            icon: CalendarCheck,
            sub: 'Ready to go',
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            href: '/admin/bookings?status=confirmed',
        },
    ];

    return (
        <div className="max-w-6xl">

            {/* ── Page header ── */}
            <div className="mb-8">
                {/* Desktop */}
                <div className="hidden lg:flex items-end justify-between">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">
                            {greeting.emoji} {greeting.text}
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-gray-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                        <Link
                            href="/admin/packages/new"
                            className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            New Journey
                        </Link>
                    </div>
                </div>
                {/* Mobile */}
                <div className="lg:hidden">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-0.5">{greeting.text}</p>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Dashboard</h1>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
                {stats.map((s) => (
                    <Link
                        key={s.label}
                        href={s.href}
                        className="group bg-white border border-gray-200/80 rounded-2xl p-4 lg:p-5
                            hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${s.iconBg}`}>
                                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400 transition-colors" />
                        </div>

                        <p className="text-3xl font-bold font-heading text-gray-900 mb-0.5 leading-none">
                            {s.value}
                        </p>
                        <p className="text-gray-500 text-xs font-medium mt-1">{s.label}</p>
                        <p className="text-gray-300 text-[11px]">{s.sub}</p>
                    </Link>
                ))}
            </div>

            {/* ── Mobile CTA ── */}
            <Link
                href="/admin/packages/new"
                className="lg:hidden flex items-center gap-3 bg-gray-900 text-white font-semibold text-sm px-5 py-3.5 rounded-2xl mb-6 w-full justify-center"
            >
                <Plus className="w-4 h-4" />
                Create New Journey
            </Link>

            {/* ── Desktop: Two-column, Mobile: single ── */}
            <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-6">

                {/* Left: Quick actions */}
                <div className="hidden lg:flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/packages" className="group bg-white border border-gray-200/80 rounded-2xl p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <Package className="w-7 h-7 text-blue-500/70 mb-3" />
                            <p className="text-gray-900 font-semibold text-sm">Manage Journeys</p>
                            <p className="text-gray-400 text-xs mt-1">{totalPackages} active journeys</p>
                            <ArrowUpRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400 transition-colors mt-4" />
                        </Link>
                        <Link href="/admin/bookings?status=pending" className="group bg-white border border-gray-200/80 rounded-2xl p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <div className="flex items-center gap-2 mb-3">
                                <CalendarCheck className="w-7 h-7 text-purple-500/70" />
                                {(pendingBookings ?? 0) > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
                                        {pendingBookings}
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-900 font-semibold text-sm">Pending Bookings</p>
                            <p className="text-gray-400 text-xs mt-1">{pendingBookings} awaiting review</p>
                            <ArrowUpRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400 transition-colors mt-4" />
                        </Link>
                    </div>

                    {/* Response time card */}
                    <div className="flex-1 bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-amber-50">
                                <Clock className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-gray-900 font-semibold text-sm">Target Response Time</p>
                                <p className="text-gray-400 text-xs">Customer service goal</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-gray-900 font-heading">~24h</p>
                            <p className="text-gray-400 text-xs mt-1">Reply within one business day</p>
                        </div>
                    </div>
                </div>

                {/* Right: Recent Bookings feed */}
                <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div>
                            <h2 className="text-gray-900 font-semibold text-sm">Recent Bookings</h2>
                            <p className="text-gray-400 text-xs">Latest reservations</p>
                        </div>
                        <Link href="/admin/bookings" className="text-gray-900 text-xs font-medium hover:underline flex items-center gap-1">
                            See all <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {(!recentBookings || recentBookings.length === 0) ? (
                            <p className="px-6 py-8 text-center text-gray-300 text-sm">No bookings yet</p>
                        ) : (
                            recentBookings.map((bk) => {
                                const sc = statusConfig[bk.status] ?? statusConfig.pending;
                                return (
                                    <Link
                                        key={bk.id}
                                        href={`/admin/bookings/${bk.id}`}
                                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-gray-500 text-xs font-bold">
                                                {(bk.name || bk.package_title || 'B').charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-800 text-sm font-medium truncate group-hover:text-gray-900 transition-colors">
                                                {bk.name || bk.package_title}
                                            </p>
                                            <p className="text-gray-400 text-[11px] truncate">
                                                {bk.booking_ref}{bk.email ? ` · ${bk.email}` : ''}{bk.guest_count > 0 ? ` · ${bk.guest_count} traveller${bk.guest_count > 1 ? 's' : ''}` : ''}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                                <span className={`text-[10px] font-medium capitalize ${sc.text}`}>{sc.label}</span>
                                            </div>
                                            <span className="text-gray-300 text-[10px]">{timeAgo(bk.created_at)}</span>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
