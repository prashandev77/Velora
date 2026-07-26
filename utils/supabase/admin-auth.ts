import { cookies } from 'next/headers';
import { parseCookieTimestamp, signCookieTimestamp } from '@/lib/admin-session-crypto';
import { createClient } from '@/utils/supabase/server';

export const ADMIN_SESSION_CREATED_AT = 'admin_session_created_at';
export const ADMIN_SESSION_LAST_ACTIVITY_AT = 'admin_last_activity_at';
export const ADMIN_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
export const ADMIN_ABSOLUTE_TIMEOUT_MS = 8 * 60 * 60 * 1000;

type CookieSetOptions = {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    path?: string;
    maxAge?: number;
};

export class AdminAuthError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

/**
 * SECURITY: Only trust app_metadata.role — it is server-controlled and cannot
 * be modified by the end user. user_metadata is user-editable and must NEVER
 * be used in a security/auth context.
 */
export function getUserRole(user: {
    app_metadata?: Record<string, unknown>;
} | null): string | null {
    if (!user) return null;
    const appRole = user.app_metadata?.role;
    return typeof appRole === 'string' ? appRole.toLowerCase() : null;
}

export function isAdminUser(user: {
    app_metadata?: Record<string, unknown>;
} | null): boolean {
    return getUserRole(user) === 'admin';
}

function getSessionSecret(): string | undefined {
    return process.env.ADMIN_SESSION_SECRET?.trim();
}

export async function readAdminSessionTimestamps(getCookie: (name: string) => string | undefined) {
    return {
        createdAt: await parseCookieTimestamp(getCookie(ADMIN_SESSION_CREATED_AT)),
        lastActivityAt: await parseCookieTimestamp(getCookie(ADMIN_SESSION_LAST_ACTIVITY_AT)),
    };
}

export function isSessionExpired(createdAt: number | null, lastActivityAt: number | null, now = Date.now()) {
    const secret = getSessionSecret();

    if (!createdAt || !lastActivityAt) {
        if (!secret) {
            return { expired: false as const, reason: null };
        }
        if (!createdAt && !lastActivityAt) {
            return { expired: false as const, reason: null };
        }
        return { expired: true as const, reason: 'invalid_cookie' as const };
    }

    if (now - createdAt > ADMIN_ABSOLUTE_TIMEOUT_MS) {
        return { expired: true, reason: 'absolute' as const };
    }

    if (now - lastActivityAt > ADMIN_IDLE_TIMEOUT_MS) {
        return { expired: true, reason: 'idle' as const };
    }

    return { expired: false as const, reason: null };
}

export async function setAdminSessionCookies(
    setCookie: (name: string, value: string, options: CookieSetOptions) => void,
    now = Date.now(),
    existingCreatedAt?: number | null,
) {
    const createdAt = existingCreatedAt ?? now;
    const baseOptions: CookieSetOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: Math.ceil(ADMIN_ABSOLUTE_TIMEOUT_MS / 1000),
    };

    const createdSigned = await signCookieTimestamp(createdAt);
    const activitySigned = await signCookieTimestamp(now);

    setCookie(ADMIN_SESSION_CREATED_AT, createdSigned, baseOptions);
    setCookie(ADMIN_SESSION_LAST_ACTIVITY_AT, activitySigned, {
        ...baseOptions,
        maxAge: Math.ceil(ADMIN_IDLE_TIMEOUT_MS / 1000),
    });
}

export function clearAdminSessionCookies(clearCookie: (name: string, options: CookieSetOptions) => void) {
    const baseOptions: CookieSetOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    };

    clearCookie(ADMIN_SESSION_CREATED_AT, baseOptions);
    clearCookie(ADMIN_SESSION_LAST_ACTIVITY_AT, baseOptions);
}

export async function requireAdminAccess(options?: { touchActivity?: boolean }) {
    const touchActivity = options?.touchActivity ?? true;
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new AdminAuthError('Unauthorized', 401);
    }

    if (!isAdminUser(user)) {
        throw new AdminAuthError('Forbidden', 403);
    }

    const cookieStore = await cookies();
    const { createdAt, lastActivityAt } = await readAdminSessionTimestamps((name) => cookieStore.get(name)?.value);
    const timeout = isSessionExpired(createdAt, lastActivityAt);

    if (timeout.expired) {
        await supabase.auth.signOut();
        clearAdminSessionCookies((name, opts) => cookieStore.set(name, '', opts));
        throw new AdminAuthError('Session expired', 401);
    }

    if (touchActivity) {
        await setAdminSessionCookies(
            (name, value, opts) => cookieStore.set(name, value, opts),
            Date.now(),
            createdAt,
        );
    }

    return { supabase, user };
}
