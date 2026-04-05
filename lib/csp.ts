/**
 * Enforced Content-Security-Policy (nonce for scripts; no unsafe-eval).
 * Keep in sync with middleware that sets the nonce request header.
 */
export function buildContentSecurityPolicy(nonce: string): string {
    const n = nonce.replace(/[^a-zA-Z0-9+/=_-]/g, '');
    return [
        "default-src 'self'",
        "base-uri 'self'",
        "frame-ancestors 'self'",
        "object-src 'none'",
        "img-src 'self' data: https:",
        `script-src 'self' 'nonce-${n}' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com`,
        "style-src 'self' 'unsafe-inline'",
        "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com",
        "font-src 'self' data: https:",
        'frame-src https://challenges.cloudflare.com',
    ].join('; ');
}
