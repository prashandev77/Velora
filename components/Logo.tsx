'use client';

import Image from 'next/image';
import { AVELORA_LOGO_PATH } from '@/lib/brand';

interface LogoProps {
    /** Kept for API compatibility with Navbar/Footer; logo is shown in full color. */
    isDark?: boolean;
    className?: string;
}

const Logo = ({ className = '' }: LogoProps) => (
    <div className={`relative h-12 md:h-14 w-[160px] md:w-[205px] shrink-0 ${className}`}>
        <Image
            src={AVELORA_LOGO_PATH}
            alt="Avelora Travel"
            fill
            className="object-contain object-left"
            sizes="205px"
            unoptimized
        />
    </div>
);

export default Logo;
