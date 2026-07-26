'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteGuide } from '../actions';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';

export default function DeleteGuideButton({ id, title }: { id: string; title: string }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setShowConfirm(false);
        setDeleting(true);
        const formData = new FormData();
        formData.set('id', id);
        await deleteGuide(formData);
        setDeleting(false);
    };

    return (
        <>
            <ConfirmDialog
                open={showConfirm}
                variant="danger"
                title="Delete guide?"
                message={`"${title}" will be permanently removed. This cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                confirmLoading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
            />
            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                disabled={deleting}
                className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 transition-all disabled:opacity-50"
                title="Delete guide"
            >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
        </>
    );
}
