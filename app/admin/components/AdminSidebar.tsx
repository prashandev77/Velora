'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import {
    LayoutDashboard,
    Package,
    CalendarCheck,
    LogOut,
    ExternalLink,
    User,
    Loader2,
} from 'lucide-react';
import { signOut } from '../actions';
import ConfirmDialog from './ConfirmDialog';

const nav = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
    { href: '/admin/packages', label: 'Packages', icon: Package },
];

const tabs = [
    { href: '/admin', label: 'Home', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
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
                DESKTOP SIDEBAR — Clean white
            ════════════════════════════════════════ */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col z-40
                bg-white border-r border-gray-200/80">

                {/* ── Branding ── */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                    <Image
                        src="/avelora-logo.png"
                        alt="Avelora Travel"
                        width={130}
                        height={40}
                        className="h-8 w-auto object-contain"
                        style={{ width: 'auto' }}
                        priority
                    />
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.15em] bg-gray-100 px-2 py-0.5 rounded-md">Admin</span>
                </div>

                {/* ── Nav ── */}
                <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                    {nav.map(({ href, label, icon: Icon }) => {
                        const active = isActive(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${active
                                    ? 'bg-gray-900 text-white shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`w-[18px] h-[18px] ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                <span className="text-[13px] font-medium">{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Footer ── */}
                <div className="px-3 pb-4 pt-3 border-t border-gray-100 space-y-2">
                    {/* View website */}
                    <Link
                        href="/"
                        target="_blank"
                        className="group flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-[13px] font-medium">View Website</span>
                    </Link>

                    {/* User card */}
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-xs">{initial}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-500 text-[11px] font-medium">Signed in as</p>
                                <p className="text-gray-700 text-[11px] font-medium truncate">{userEmail}</p>
                            </div>
                        </div>
                        <button
                            onClick={requestSignOut}
                            disabled={signingOut}
                            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 transition-all text-xs font-medium disabled:opacity-50"
                        >
                            {signingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                            {signingOut ? 'Signing out…' : 'Sign Out'}
                        </button>
                    </div>
                </div>
            </aside>

            {/* ════════════════════════════════════════
                MOBILE TOP BAR — Clean white
            ════════════════════════════════════════ */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200">
                <div className="flex items-center justify-between px-5 h-14">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/avelora-logo.png"
                            alt="Avelora Travel"
                            width={110}
                            height={33}
                            className="h-7 w-auto object-contain"
                            style={{ width: 'auto' }}
                        />
                        <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest bg-gray-100 px-1.5 py-0.5 rounded">Admin</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{initial}</span>
                    </div>
                </div>
            </header>

            {/* ════════════════════════════════════════
                MOBILE BOTTOM TAB BAR — Clean white
            ════════════════════════════════════════ */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200">
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
                                    className="flex-1 flex flex-col items-center gap-1 py-3 px-2 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
                                >
                                    {signingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : <User className="w-5 h-5" />}
                                    <span className="text-[10px] font-medium">{signingOut ? '…' : 'Sign out'}</span>
                                </button>
                            );
                        }

                        return (
                            <Link key={href} href={href} className="flex-1 flex flex-col items-center gap-1 py-3 px-2 relative">
                                <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-gray-900' : ''}`}>
                                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-300'}`} />
                                </div>
                                <span className={`text-[10px] font-medium ${active ? 'text-gray-900' : 'text-gray-300'}`}>{label}</span>
                                {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gray-900 rounded-full" />}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
