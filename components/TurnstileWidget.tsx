'use client';

import { Turnstile } from '@marsidev/react-turnstile';

type Props = {
    onToken: (token: string) => void;
    onExpire?: () => void;
};

/**
 * Renders Cloudflare Turnstile when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 */
export default function TurnstileWidget({ onToken, onExpire }: Props) {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
        return null;
    }
    return (
        <div className="flex justify-center min-h-[65px]">
            <Turnstile siteKey={siteKey} onSuccess={onToken} onExpire={onExpire} />
        </div>
    );
}
