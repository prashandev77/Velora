'use client';

import Link from 'next/link';
import { useLinkStatus } from 'next/link';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

function PendingOverlay({ children }: { children: ReactNode }) {
    const { pending } = useLinkStatus();
    return (
        <span className="relative inline-flex max-w-full">
            {children}
            {pending ? (
                <span
                    className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-stone-900/35 backdrop-blur-[2px] z-10"
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Loader2 className="w-6 h-6 text-white animate-spin drop-shadow-sm" aria-hidden />
                </span>
            ) : null}
        </span>
    );
}

/** Wraps booking CTAs so navigation to `/book/[id]` shows in-app loading (useLinkStatus). */
export default function BookPackageLink({
    packageId,
    className,
    children,
}: {
    packageId: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <Link href={`/book/${packageId}`} className={className}>
            <PendingOverlay>{children}</PendingOverlay>
        </Link>
    );
}
