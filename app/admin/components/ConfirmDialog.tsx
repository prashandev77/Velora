'use client';

import { Trash2, LogOut, X, AlertCircle, Loader2 } from 'lucide-react';

type ConfirmVariant = 'danger' | 'warning' | 'neutral';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmVariant;
    /** Shows spinner on primary button and disables both actions */
    confirmLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const variantConfig: Record<
    ConfirmVariant,
    {
        icon: typeof Trash2;
        iconBg: string;
        iconColor: string;
        confirmBtn: string;
    }
> = {
    danger: {
        icon: Trash2,
        iconBg: 'bg-red-50 border-red-200',
        iconColor: 'text-red-500',
        confirmBtn: 'bg-red-500 hover:bg-red-600 text-white disabled:opacity-60',
    },
    warning: {
        icon: LogOut,
        iconBg: 'bg-amber-50 border-amber-200',
        iconColor: 'text-amber-500',
        confirmBtn: 'bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-60',
    },
    neutral: {
        icon: AlertCircle,
        iconBg: 'bg-slate-50 border-slate-200',
        iconColor: 'text-slate-600',
        confirmBtn: 'bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-60',
    },
};

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
    confirmLoading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    const { icon: Icon, iconBg, iconColor, confirmBtn } = variantConfig[variant];

    return (
        <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={confirmLoading ? undefined : onCancel}
        >
            <div
                className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-6 pt-8 shadow-2xl
                    animate-[slideUp_0.22s_ease-out] sm:animate-[fadeScale_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={confirmLoading}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>

                <h3 className="text-gray-900 font-bold text-lg leading-snug mb-2 pr-8">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{message}</p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={confirmLoading}
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={confirmLoading}
                        className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 ${confirmBtn}`}
                    >
                        {confirmLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                                <span>Please wait…</span>
                            </>
                        ) : (
                            confirmLabel
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
