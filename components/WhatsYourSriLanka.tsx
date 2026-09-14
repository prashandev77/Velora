import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WhatsYourSriLanka() {
    return (
        <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-stone-900">
                <Image
                    src="https://images.unsplash.com/photo-1546708973-195c8088001e?q=80&w=2940&auto=format&fit=crop"
                    alt="Sri Lanka landscape"
                    fill
                    className="object-cover opacity-60"
                    sizes="100vw"
                    priority
                />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white py-24">
                <span className="text-gold font-medium uppercase tracking-[0.25em] mb-4 block text-sm">
                    WHAT&apos;S YOUR SRI LANKA?
                </span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    There Isn&apos;t Just One Sri Lanka.<br />
                    There&apos;s Your Sri Lanka.
                </h2>
                <p className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Wildlife and wilderness. Ancient cultures and tea country. Adventure, wellness, romance and tropical shores. Discover the side of Sri Lanka that speaks to you, then we&apos;ll shape the journey around your dates, pace and style.
                </p>
                <Link 
                    href="/journeys"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold/90 text-stone-900 font-semibold rounded-full transition-colors"
                >
                    FIND YOUR SRI LANKA
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </div>
        </section>
    );
}
