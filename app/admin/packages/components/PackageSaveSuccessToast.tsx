'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/app/admin/components/ToastProvider';

/**
 * Reads ?saved=created|updated after savePackage redirect and shows one success toast,
 * then strips the query param.
 *
 * Uses a ref (not sessionStorage) so the toast fires on every new page mount,
 * while still preventing the React Strict-Mode double-fire in development.
 */
export default function PackageSaveSuccessToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { success } = useToast();
    const shownRef = useRef(false);

    useEffect(() => {
        if (shownRef.current) return;

        const saved = searchParams.get('saved');
        if (saved !== 'created' && saved !== 'updated') return;

        shownRef.current = true;

        // Clean the URL immediately so a hard-refresh doesn't re-trigger.
        router.replace(pathname, { scroll: false });

        if (saved === 'created') {
            success('Journey created!', 'Your new package has been added to the catalogue.');
        } else {
            success('Changes saved!', 'The journey was updated successfully.');
        }
    }, [pathname, router, searchParams, success]);

    return null;
}
