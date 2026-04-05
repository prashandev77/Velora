import type { Metadata } from 'next';
import Image from 'next/image';
import { Clock, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Under Maintenance | Avelora Travel',
    description:
        'Avelora Travel is temporarily unavailable while we make improvements. We will be back shortly.',
    robots: { index: false, follow: false },
};

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center px-6 text-center">
            {/* Subtle background glow */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c9a96e]/8 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto">
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <div className="relative h-12 w-[180px]">
                        <Image
                            src="/avelora-logo.png"
                            alt="Avelora Travel"
                            fill
                            className="object-contain"
                            sizes="180px"
                            priority
                        />
                    </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center">
                        <Clock className="w-7 h-7 text-[#c9a96e]" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                    We&apos;ll Be Back Soon
                </h1>

                {/* Message */}
                <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto">
                    We&apos;re making some improvements to give you a better experience.
                    Our site will be back up shortly.
                </p>

                {/* Divider */}
                <div className="w-16 h-px bg-[#c9a96e]/30 mx-auto mb-8" />

                {/* Contact */}
                <div className="flex items-center justify-center gap-2 text-stone-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>
                        Questions? Email us at{' '}
                        <a
                            href="mailto:hello@aveloratravel.com"
                            className="text-[#c9a96e] hover:text-stone-700 transition-colors font-medium"
                        >
                            hello@aveloratravel.com
                        </a>
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-stone-300 text-xs tracking-wider">
                &copy; {new Date().getFullYear()} Avelora Travel
            </div>
        </div>
    );
}
