import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Package, MessageSquare, TrendingUp, Clock, ArrowUpRight, Plus, Users, Calendar } from 'lucide-react';

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
    new: { label: 'New', dot: 'bg-blue-400', text: 'text-blue-400' },
    read: { label: 'Read', dot: 'bg-white/30', text: 'text-white/40' },
    replied: { label: 'Replied', dot: 'bg-emerald-400', text: 'text-emerald-400' },
    closed: { label: 'Closed', dot: 'bg-white/10', text: 'text-white/20' },
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
        { count: totalInquiries },
        { count: newInquiries },
        { count: repliedInquiries },
        { data: recentInquiries },
    ] = await Promise.all([
        supabase.from('packages').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'replied'),
        supabase.from('inquiries').select('id,name,travel_style,status,created_at,email')
            .order('created_at', { ascending: false }).limit(8),
    ]);

    const greeting = getGreeting();

    const stats = [
        {
            label: 'Total Packages',
            value: totalPackages ?? 0,
            icon: Package,
            sub: 'Active journeys',
            gradient: 'from-ocean/20 to-transparent',
            border: 'border-ocean/20 hover:border-ocean/40',
            iconBg: 'bg-ocean/15',
            iconColor: 'text-ocean',
            glow: 'shadow-ocean/10',
            href: '/admin/packages',
        },
        {
            label: 'Total Inquiries',
            value: totalInquiries ?? 0,
            icon: Users,
            sub: 'All time',
            gradient: 'from-gold/20 to-transparent',
            border: 'border-gold/20 hover:border-gold/40',
            iconBg: 'bg-gold/15',
            iconColor: 'text-gold',
            glow: 'shadow-gold/10',
            href: '/admin/inquiries',
        },
        {
            label: 'Unread',
            value: newInquiries ?? 0,
            icon: TrendingUp,
            sub: 'Needs attention',
            gradient: 'from-emerald-500/20 to-transparent',
            border: 'border-emerald-500/20 hover:border-emerald-500/40',
            iconBg: 'bg-emerald-500/15',
            iconColor: 'text-emerald-400',
            glow: 'shadow-emerald-500/10',
            href: '/admin/inquiries?status=new',
        },
        {
            label: 'Replied',
            value: repliedInquiries ?? 0,
            icon: MessageSquare,
            sub: 'Responded',
            gradient: 'from-purple-500/20 to-transparent',
            border: 'border-purple-500/20 hover:border-purple-500/40',
            iconBg: 'bg-purple-500/15',
            iconColor: 'text-purple-400',
            glow: 'shadow-purple-500/10',
            href: '/admin/inquiries?status=replied',
        },
    ];

    return (
        <div className="max-w-7xl">

            {/* ── Page header ── */}
            <div className="mb-8">
                {/* Desktop */}
                <div className="hidden lg:flex items-end justify-between">
                    <div>
                        <p className="text-white/30 text-sm mb-1">
                            {greeting.emoji} {greeting.text}
                        </p>
                        <h1 className="text-3xl font-bold text-white font-heading tracking-tight">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/8 rounded-xl text-white/40 text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                        <Link
                            href="/admin/packages/new"
                            className="flex items-center gap-2 bg-gold text-deep font-semibold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-gold/25 transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            New Package
                        </Link>
                    </div>
                </div>
                {/* Mobile */}
                <div className="lg:hidden">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5">{greeting.text}</p>
                    <h1 className="text-2xl font-bold text-white font-heading">Dashboard</h1>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
                {stats.map((s) => (
                    <Link
                        key={s.label}
                        href={s.href}
                        className={`group relative overflow-hidden bg-gradient-to-br ${s.gradient}
                            border ${s.border} rounded-2xl lg:rounded-3xl p-4 lg:p-5
                            hover:shadow-xl ${s.glow} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                    >
                        {/* Glow orb */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/[0.03] blur-2xl pointer-events-none" />

                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-2.5 rounded-2xl ${s.iconBg}`}>
                                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                        </div>

                        <p className={`text-3xl font-bold font-heading ${s.iconColor} mb-0.5 leading-none`}>
                            {s.value}
                        </p>
                        <p className="text-white/60 text-xs font-semibold mt-1">{s.label}</p>
                        <p className="text-white/25 text-[11px]">{s.sub}</p>
                    </Link>
                ))}
            </div>

            {/* ── Mobile CTA ── */}
            <Link
                href="/admin/packages/new"
                className="lg:hidden flex items-center gap-3 bg-gold text-deep font-semibold text-sm px-5 py-3.5 rounded-2xl mb-6 w-full justify-center shadow-lg shadow-gold/20"
            >
                <Plus className="w-4 h-4" />
                Create New Package
            </Link>

            {/* ── Desktop: Two-column, Mobile: single ── */}
            <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-6">

                {/* Left: Quick actions + Links */}
                <div className="hidden lg:flex flex-col gap-4">
                    {/* Quick action cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/packages" className="group relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 rounded-3xl p-6 transition-all hover:-translate-y-0.5">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-ocean/5 rounded-full -translate-y-8 translate-x-8 blur-xl" />
                            <Package className="w-8 h-8 text-ocean/60 mb-4" />
                            <p className="text-white font-semibold">Manage Packages</p>
                            <p className="text-white/30 text-xs mt-1">{totalPackages} active journeys</p>
                            <ArrowUpRight className="absolute bottom-4 right-4 w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                        </Link>
                        <Link href="/admin/inquiries?status=new" className="group relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 rounded-3xl p-6 transition-all hover:-translate-y-0.5">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-8 translate-x-8 blur-xl" />
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="w-8 h-8 text-emerald-400/60" />
                                {(newInquiries ?? 0) > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">
                                        {newInquiries}
                                    </span>
                                )}
                            </div>
                            <p className="text-white font-semibold">Unread Inquiries</p>
                            <p className="text-white/30 text-xs mt-1">{newInquiries} need reply</p>
                            <ArrowUpRight className="absolute bottom-4 right-4 w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                        </Link>
                    </div>

                    {/* Response time info card */}
                    <div className="flex-1 bg-gradient-to-br from-gold/[0.07] to-transparent border border-gold/15 rounded-3xl p-6 flex flex-col justify-between min-h-[160px]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-2xl bg-gold/10">
                                <Clock className="w-5 h-5 text-gold/60" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Target Response Time</p>
                                <p className="text-white/30 text-xs">Customer service goal</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-gold font-heading">~24h</p>
                            <p className="text-white/30 text-xs mt-1">Reply within one business day</p>
                        </div>
                    </div>
                </div>

                {/* Right: Activity feed */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                        <div>
                            <h2 className="text-white font-semibold text-sm">Recent Activity</h2>
                            <p className="text-white/30 text-xs">Latest inquiries</p>
                        </div>
                        <Link href="/admin/inquiries" className="text-gold text-xs font-medium hover:underline flex items-center gap-1">
                            See all <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-white/[0.04]">
                        {(!recentInquiries || recentInquiries.length === 0) ? (
                            <p className="px-6 py-8 text-center text-white/20 text-sm">No inquiries yet</p>
                        ) : (
                            recentInquiries.map((inq) => {
                                const sc = statusConfig[inq.status] ?? statusConfig.read;
                                return (
                                    <Link
                                        key={inq.id}
                                        href={`/admin/inquiries/${inq.id}`}
                                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.04] active:bg-white/[0.07] transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white/60 text-xs font-bold">
                                                {inq.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate group-hover:text-gold transition-colors">
                                                {inq.name}
                                            </p>
                                            <p className="text-white/30 text-[11px] truncate">
                                                {inq.travel_style ?? 'No preference'}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                                <span className={`text-[10px] font-medium ${sc.text}`}>{sc.label}</span>
                                            </div>
                                            <span className="text-white/20 text-[10px]">{timeAgo(inq.created_at)}</span>
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
