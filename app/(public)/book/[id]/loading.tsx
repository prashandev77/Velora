import { Loader2 } from 'lucide-react';

export default function BookPageLoading() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#faf7f2] px-6">
            <Loader2 className="w-10 h-10 text-gold animate-spin" aria-hidden />
            <p className="text-stone-500 text-sm font-medium tracking-wide">Loading booking…</p>
        </div>
    );
}
