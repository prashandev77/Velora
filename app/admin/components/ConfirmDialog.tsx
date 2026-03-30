'use client';

import { Trash2, LogOut, X } from 'lucide-react';

type ConfirmVariant = 'danger' | 'warning';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmVariant;
    onConfirm: () => void;
    onCancel: () => void;
}

const variantConfig: Record<ConfirmVariant, {
    icon: typeof Trash2;
    iconBg: string;
    iconColor: string;
    confirmBtn: string;
}> = {
    danger: {
        icon: Trash2,
        iconBg: 'bg-red-50 border-red-200',
        iconColor: 'text-red-500',
        confirmBtn: 'bg-red-500 hover:bg-red-600 text-white',
    },
    warning: {
        icon: LogOut,
        iconBg: 'bg-amber-50 border-amber-200',
        iconColor: 'text-amber-500',
        confirmBtn: 'bg-amber-500 hover:bg-amber-600 text-white',
    },
};

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    const { icon: Icon, iconBg, iconColor, confirmBtn } = variantConfig[variant];

    return (
        <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl
                    animate-[slideUp_0.22s_ease-out] sm:animate-[fadeScale_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>

                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <h3 className="text-gray-900 font-bold text-lg leading-snug mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{message}</p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold transition-all active:scale-95"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 ${confirmBtn}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
