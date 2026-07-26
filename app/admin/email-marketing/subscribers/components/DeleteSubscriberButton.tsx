'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteSubscriber } from '../actions';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';

export default function DeleteSubscriberButton({ id, email }: { id: string; email: string }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setShowConfirm(false);
        setDeleting(true);
        const formData = new FormData();
        formData.set('id', id);
        await deleteSubscriber(formData);
        setDeleting(false);
    };

    return (
        <>
            <ConfirmDialog
                open={showConfirm}
                variant="danger"
                title="Remove subscriber?"
                message={`"${email}" will be removed from the mailing list.`}
                confirmLabel="Remove"
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
                title="Remove subscriber"
            >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            </button>
        </>
    );
}
