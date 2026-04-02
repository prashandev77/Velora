'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/app/admin/components/ToastProvider';

/**
 * Reads ?saved=created|updated after savePackage redirect, shows one success toast,
 * then strips the query. sessionStorage dedupes React Strict Mode remounts.
 */
export default function PackageSaveSuccessToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { success } = useToast();

    useEffect(() => {
        const saved = searchParams.get('saved');
        if (saved !== 'created' && saved !== 'updated') return;

        const storageKey = `velora_pkg_save_toast:${searchParams.toString()}`;
        if (typeof window !== 'undefined' && sessionStorage.getItem(storageKey)) return;
        if (typeof window !== 'undefined') sessionStorage.setItem(storageKey, '1');

        router.replace(pathname, { scroll: false });

        if (saved === 'created') {
            success('Journey created', 'Your new package has been added to the catalogue.');
        } else {
            success('Changes saved', 'The journey was updated successfully.');
        }
    }, [pathname, router, searchParams, success]);

    return null;
}
