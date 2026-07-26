'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/app/admin/components/ToastProvider';

export default function GuideSaveSuccessToast() {
    const searchParams = useSearchParams();
    const toast = useToast();
    const saved = searchParams.get('saved');

    useEffect(() => {
        if (saved === 'created') {
            toast.success('Guide created', 'Your new guide has been saved.');
        } else if (saved === 'updated') {
            toast.success('Guide updated', 'Changes have been saved.');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saved]);

    return null;
}
