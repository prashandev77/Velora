import Image from 'next/image';

/** Shared full-screen maintenance UI (used by /maintenance and optional layout). */
export default function MaintenanceScreen() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0f172a] text-white">
            <div className="max-w-lg w-full text-center">
                <div className="relative h-14 w-[180px] mx-auto mb-10 opacity-95">
                    <Image
                        src="/avelora-logo.png"
                        alt="Avelora Travel"
                        fill
                        className="object-contain object-center brightness-0 invert"
                        priority
                    />
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber-200/80 mb-4">
                    Designed Around You
                </p>
                <h1 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-4">
                    We&apos;re making things even better
                </h1>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                    Our site is temporarily unavailable while we complete scheduled maintenance.
                    Please check back shortly — we appreciate your patience.
                </p>
                <p className="text-slate-500 text-xs">
                    Need urgent help?{' '}
                    <a
                        href="mailto:hello@aveloratravel.com"
                        className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2"
                    >
                        hello@aveloratravel.com
                    </a>
                </p>
            </div>
            <footer className="mt-16 text-slate-600 text-[11px]">
                © {new Date().getFullYear()} Avelora Travel
            </footer>
        </div>
    );
}
