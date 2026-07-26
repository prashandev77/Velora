'use client';

import { useActionState, useState } from 'react';
import { addSubscriber, type ActionState } from '../actions';
import { X, Loader2, UserPlus } from 'lucide-react';

export default function AddSubscriberDialog({
    open,
    onClose,
    onSuccess,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [state, formAction, isPending] = useActionState<ActionState, FormData>(
        async (prev: ActionState, formData: FormData) => {
            const result = await addSubscriber(prev, formData);
            if (result?.success) {
                setName('');
                setEmail('');
                onSuccess();
            }
            return result;
        },
        null
    );

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-6 pt-8 shadow-2xl animate-[slideUp_0.22s_ease-out] sm:animate-[fadeScale_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="w-12 h-12 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center mb-4">
                    <UserPlus className="w-5 h-5 text-blue-500" />
                </div>

                <h3 className="text-gray-900 font-bold text-lg leading-snug mb-1">Add Subscriber</h3>
                <p className="text-gray-500 text-sm mb-6">Add a new email subscriber manually.</p>

                <form action={formAction} className="space-y-4">
                    {state?.errors?._form && (
                        <p className="text-red-500 text-xs">{state.errors._form[0]}</p>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                        />
                        {state?.errors?.name && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                        />
                        {state?.errors?.email && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
