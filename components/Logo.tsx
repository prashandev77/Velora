'use client';

import Image from 'next/image';

interface LogoProps {
    isDark?: boolean;
    className?: string;
}

/**
 * Brand mark — `isDark` = logo for light backgrounds (no filter). When false, nav sits on dark imagery (invert for contrast).
 */
const Logo = ({ isDark = false, className = '' }: LogoProps) => (
    <div className={`relative h-10 md:h-12 w-[140px] md:w-[180px] shrink-0 ${className}`}>
        <Image
            src="/avelora-logo.png"
            alt="Avelora Travel"
            fill
            className={`object-contain object-left ${!isDark ? 'brightness-0 invert' : ''}`}
            sizes="180px"
        />
    </div>
);

export default Logo;
