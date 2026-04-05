/**
 * Verifies Cloudflare Turnstile token server-side.
 * When TURNSTILE_SECRET_KEY is unset, verification is skipped (local dev).
 */
export async function verifyTurnstileToken(
    token: string | null | undefined,
): Promise<{ ok: boolean }> {
    const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
    if (!secret) {
        if (process.env.NODE_ENV === 'production') {
            console.warn(
                '[security] TURNSTILE_SECRET_KEY is not set — bot protection is disabled for public forms',
            );
        }
        return { ok: true };
    }

    if (!token || typeof token !== 'string' || token.length < 10) {
        return { ok: false };
    }

    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);

    try {
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body,
        });
        const data = (await res.json()) as { success?: boolean };
        return { ok: data.success === true };
    } catch (e) {
        console.error('[security] Turnstile verify failed:', e);
        return { ok: false };
    }
}
