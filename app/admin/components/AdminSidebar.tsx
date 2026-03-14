'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import {
    LayoutDashboard,
    MessageSquare,
    Package,
    LogOut,
    ExternalLink,
    User,
    Loader2,
    ChevronRight,
} from 'lucide-react';
import { signOut } from '../actions';
import ConfirmDialog from './ConfirmDialog';

const nav = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & stats' },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare, description: 'Customer messages' },
    { href: '/admin/packages', label: 'Packages', icon: Package, description: 'Manage journeys' },
];

const tabs = [
    { href: '/admin', label: 'Home', icon: LayoutDashboard },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    { href: '/admin/packages', label: 'Packages', icon: Package },
    { href: '/admin/profile', label: 'Sign out', icon: User },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
    const pathname = usePathname();
    const [signingOut, setSigningOut] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const isActive = (href: string) =>
        href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

    const requestSignOut = () => setShowConfirm(true);
    const confirmSignOut = async () => {
        setShowConfirm(false);
        setSigningOut(true);
        await signOut();
    };

    const initial = userEmail.charAt(0).toUpperCase();

    return (
        <>
            <ConfirmDialog
                open={showConfirm}
                variant="warning"
                title="Sign out?"
                message="You'll be returned to the login page. Any unsaved changes will be lost."
                confirmLabel="Yes, sign out"
                cancelLabel="Stay"
                onConfirm={confirmSignOut}
                onCancel={() => setShowConfirm(false)}
            />

            {/* ════════════════════════════════════════
                DESKTOP SIDEBAR
            ════════════════════════════════════════ */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 flex-col z-40
                bg-gradient-to-b from-[#13151f] via-[#0f1117] to-[#0d0f17]
                border-r border-white/[0.06]">

                {/* Top gradient glow */}
                <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gold/[0.04] to-transparent pointer-events-none" />

                {/* ── Branding ── */}
                <div className="relative flex items-center gap-3 px-6 py-6 border-b border-white/[0.06]">
                    {/* Logo mark */}
                    <div className="flex-shrink-0">
                        <Image
                            src="/velora_logo.svg"
                            alt="Velora Journeys"
                            width={140}
                            height={42}
                            className="h-9 w-auto object-contain"
                            style={{ width: 'auto' }}
                            priority
                        />
                    </div>
                    <p className="text-[10px] text-gold/60 font-medium uppercase tracking-[0.2em]">Admin</p>
                </div>

                {/* ── Nav ── */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <p className="text-white/20 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
                        Navigation
                    </p>
                    {nav.map(({ href, label, icon: Icon, description }) => {
                        const active = isActive(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`group relative flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 ${active
                                    ? 'bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/20 shadow-md shadow-gold/5'
                                    : 'hover:bg-white/[0.04] border border-transparent'
                                    }`}
                            >
                                {/* Active left bar */}
                                {active && (
                                    <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-gold to-gold/40 rounded-r-full" />
                                )}

                                {/* Icon */}
                                <div className={`p-2 rounded-xl transition-all duration-200 ${active
                                    ? 'bg-gold/20 shadow-sm shadow-gold/10'
                                    : 'bg-white/[0.04] group-hover:bg-white/[0.07]'
                                    }`}>
                                    <Icon className={`w-4 h-4 ${active ? 'text-gold' : 'text-white/40 group-hover:text-white/70'}`} />
                                </div>

                                {/* Label */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold ${active ? 'text-gold' : 'text-white/70 group-hover:text-white'}`}>
                                        {label}
                                    </p>
                                    <p className={`text-[11px] mt-0.5 ${active ? 'text-gold/50' : 'text-white/25 group-hover:text-white/40'}`}>
                                        {description}
                                    </p>
                                </div>

                                <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${active ? 'text-gold/50' : 'text-white/10 group-hover:text-white/30'
                                    }`} />
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Footer ── */}
                <div className="px-3 pb-4 pt-3 border-t border-white/[0.06] space-y-1">
                    {/* View website */}
                    <Link
                        href="/"
                        target="_blank"
                        className="group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all"
                    >
                        <div className="p-1.5 rounded-lg bg-white/[0.04] group-hover:bg-white/[0.07] transition-all">
                            <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm">View Website</span>
                    </Link>

                    {/* User card */}
                    <div className="mt-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold/30 to-ocean/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">{initial}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white/70 text-xs font-medium">Signed in as</p>
                                <p className="text-white/40 text-[11px] truncate">{userEmail}</p>
                            </div>
                        </div>
                        <button
                            onClick={requestSignOut}
                            disabled={signingOut}
                            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 text-red-400/60 hover:text-red-400 transition-all text-xs font-medium disabled:opacity-50"
                        >
                            {signingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                            {signingOut ? 'Signing out…' : 'Sign Out'}
                        </button>
                    </div>
                </div>
            </aside>

            {/* ════════════════════════════════════════
                MOBILE TOP BAR
            ════════════════════════════════════════ */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0f1117]/95 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between px-5 h-14">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/velora_logo.svg"
                            alt="Velora Journeys"
                            width={110}
                            height={33}
                            className="h-7 w-auto object-contain"
                            style={{ width: 'auto' }}
                        />
                        <span className="text-gold/60 text-[9px] font-medium uppercase tracking-widest">Admin</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 border border-gold/20 flex items-center justify-center">
                        <span className="text-gold text-xs font-bold">{initial}</span>
                    </div>
                </div>
            </header>

            {/* ════════════════════════════════════════
                MOBILE BOTTOM TAB BAR
            ════════════════════════════════════════ */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161820]/95 backdrop-blur-xl border-t border-white/5">
                <div className="flex items-center">
                    {tabs.map(({ href, label, icon: Icon }) => {
                        const active = isActive(href);
                        const isSignOut = href === '/admin/profile';

                        if (isSignOut) {
                            return (
                                <button
                                    key="signout"
                                    onClick={requestSignOut}
                                    disabled={signingOut}
                                    className="flex-1 flex flex-col items-center gap-1 py-3 px-2 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
                                >
                                    {signingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : <User className="w-5 h-5" />}
                                    <span className="text-[10px] font-medium">{signingOut ? '…' : 'Sign out'}</span>
                                </button>
                            );
                        }

                        return (
                            <Link key={href} href={href} className="flex-1 flex flex-col items-center gap-1 py-3 px-2 relative">
                                <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-gold/15' : ''}`}>
                                    <Icon className={`w-5 h-5 ${active ? 'text-gold' : 'text-white/30'}`} />
                                </div>
                                <span className={`text-[10px] font-medium ${active ? 'text-gold' : 'text-white/30'}`}>{label}</span>
                                {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold rounded-full" />}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
