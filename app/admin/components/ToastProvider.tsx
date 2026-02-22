'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

/* ─── Types ───────────────────────────────────────────── */
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
}

interface ToastContextValue {
    toast: (type: ToastType, title: string, message?: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
}

/* ─── Context ─────────────────────────────────────────── */
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
    return ctx;
}

/* ─── Config ──────────────────────────────────────────── */
const config: Record<ToastType, { icon: typeof CheckCircle2; classes: string; iconColor: string }> = {
    success: { icon: CheckCircle2, classes: 'border-emerald-500/30 bg-emerald-500/10', iconColor: 'text-emerald-400' },
    error: { icon: XCircle, classes: 'border-red-500/30 bg-red-500/10', iconColor: 'text-red-400' },
    warning: { icon: AlertTriangle, classes: 'border-amber-500/30 bg-amber-500/10', iconColor: 'text-amber-400' },
    info: { icon: Info, classes: 'border-blue-500/30 bg-blue-500/10', iconColor: 'text-blue-400' },
};

/* ─── Single Toast ────────────────────────────────────── */
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
    const { icon: Icon, classes, iconColor } = config[toast.type];

    return (
        <div
            className={`flex items-start gap-3 w-full max-w-sm px-4 py-3.5 rounded-2xl border backdrop-blur-xl shadow-xl
                ${classes}
                animate-[slideIn_0.25s_ease-out]`}
        >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-snug">{toast.title}</p>
                {toast.message && (
                    <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{toast.message}</p>
                )}
            </div>
            <button
                onClick={onDismiss}
                className="flex-shrink-0 text-white/30 hover:text-white/60 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

/* ─── Provider ────────────────────────────────────────── */
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts((t) => t.filter((item) => item.id !== id));
    }, []);

    const toast = useCallback((type: ToastType, title: string, message?: string) => {
        const id = Math.random().toString(36).slice(2);
        setToasts((t) => [...t, { id, type, title, message }]);
        setTimeout(() => dismiss(id), 4000);
    }, [dismiss]);

    const ctx: ToastContextValue = {
        toast,
        success: (title, msg) => toast('success', title, msg),
        error: (title, msg) => toast('error', title, msg),
        warning: (title, msg) => toast('warning', title, msg),
        info: (title, msg) => toast('info', title, msg),
    };

    return (
        <ToastContext.Provider value={ctx}>
            {children}
            {/* Toast container — bottom-center on mobile, top-right on desktop */}
            <div className="fixed bottom-24 lg:bottom-auto lg:top-5 left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:right-5 z-[100] flex flex-col gap-2 items-center lg:items-end w-[calc(100vw-2rem)] lg:w-auto pointer-events-none">
                {toasts.map((t) => (
                    <div key={t.id} className="pointer-events-auto w-full lg:w-auto">
                        <ToastItem toast={t} onDismiss={() => dismiss(t.id)} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
