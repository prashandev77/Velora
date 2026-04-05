/**
 * Edge-compatible HMAC signing for admin session cookies (Web Crypto API).
 */

const COOKIE_SIG_PREFIX = 'v1';

function getSecret(): string | undefined {
    return process.env.ADMIN_SESSION_SECRET?.trim();
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqualHex(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let out = 0;
    for (let i = 0; i < a.length; i++) {
        out |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return out === 0;
}

export async function signCookieTimestamp(ts: number): Promise<string> {
    const secret = getSecret();
    if (!secret) {
        return String(ts);
    }
    const payload = `${COOKIE_SIG_PREFIX}.${ts}`;
    const sig = await hmacSha256Hex(secret, payload);
    return `${payload}.${sig}`;
}

export async function parseCookieTimestamp(value: string | undefined): Promise<number | null> {
    if (!value) return null;
    const secret = getSecret();

    if (!secret) {
        const parsed = Number(value);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    }

    const parts = value.split('.');
    if (parts.length !== 3 || parts[0] !== COOKIE_SIG_PREFIX) {
        return null;
    }
    const ts = Number(parts[1]);
    const sig = parts[2];
    if (!Number.isFinite(ts) || ts <= 0 || !sig) return null;

    const payload = `${parts[0]}.${parts[1]}`;
    const expected = await hmacSha256Hex(secret, payload);
    if (!timingSafeEqualHex(sig, expected)) return null;
    return ts;
}
