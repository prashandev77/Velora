'use client';

import { cn } from '@/lib/utils';
import { AVELORA_LOGO_SVG_MARKUP } from '@/lib/avelora-logo-svg-markup';

type Props = {
    /**
     * When true, the word “Travel” in the SVG is forced white (fixed bar over dark hero).
     * When false, default logo colours (white bar after scroll or on light pages).
     */
    whiteTravelText: boolean;
    className?: string;
};

export default function NavbarAveloraLogo({ whiteTravelText, className }: Props) {
    return (
        <div
            className={cn(
                'avelora-logo-nav h-12 md:h-14 w-[168px] md:w-[218px] shrink-0 transition-none',
                whiteTravelText && 'avelora-logo-nav--hero',
                className,
            )}
            role="img"
            aria-label="Avelora Travel"
            dangerouslySetInnerHTML={{ __html: AVELORA_LOGO_SVG_MARKUP }}
        />
    );
}
