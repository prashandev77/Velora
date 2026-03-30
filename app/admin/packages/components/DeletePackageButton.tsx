'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';
import { useToast } from '@/app/admin/components/ToastProvider';
import { deletePackage } from '../actions';

export default function DeletePackageButton({ id, title }: { id: string; title: string }) {
    const [open, setOpen] = useState(false);
    const { success, error } = useToast();

    const handleDelete = async () => {
        setOpen(false);
        const formData = new FormData();
        formData.append('id', id);
        try {
            await deletePackage(formData);
            success('Journey deleted', `"${title}" has been removed.`);
        } catch {
            error('Delete failed', 'Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <ConfirmDialog
                open={open}
                variant="danger"
                title="Delete journey?"
                message={`"${title}" will be permanently removed. This cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Keep it"
                onConfirm={handleDelete}
                onCancel={() => setOpen(false)}
            />
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-300 hover:text-red-500 transition-all"
                title="Delete"
            >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
        </>
    );
}
