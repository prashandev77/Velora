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
        iconBg: 'bg-red-500/15 border-red-500/20',
        iconColor: 'text-red-400',
        confirmBtn: 'bg-red-500/90 hover:bg-red-500 text-white shadow-lg shadow-red-500/20',
    },
    warning: {
        icon: LogOut,
        iconBg: 'bg-amber-500/15 border-amber-500/20',
        iconColor: 'text-amber-400',
        confirmBtn: 'bg-amber-500/90 hover:bg-amber-500 text-deep shadow-lg shadow-amber-500/20',
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
        /* Backdrop */
        <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
        >
            {/* Panel — slides up on mobile, fades in centered on desktop */}
            <div
                className="w-full max-w-sm bg-[#1a1c24] border border-white/10 rounded-3xl p-6 shadow-2xl
                    animate-[slideUp_0.22s_ease-out] sm:animate-[fadeScale_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>

                {/* Dismiss X (top-right) */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-1.5 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/5 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Text */}
                <h3 className="text-white font-bold text-lg leading-snug mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{message}</p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm font-semibold transition-all active:scale-95"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95 ${confirmBtn}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
