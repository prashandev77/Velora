import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export const ADMIN_SESSION_CREATED_AT = 'admin_session_created_at';
export const ADMIN_LAST_ACTIVITY_AT = 'admin_last_activity_at';
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

export function getUserRole(user: { user_metadata?: Record<string, unknown>; app_metadata?: Record<string, unknown> } | null): string | null {
    if (!user) return null;
    const metadataRole = user.user_metadata?.role;
    const appRole = user.app_metadata?.role;
    const role = typeof metadataRole === 'string' ? metadataRole : typeof appRole === 'string' ? appRole : null;
    return role ? role.toLowerCase() : null;
}

export function isAdminUser(user: { user_metadata?: Record<string, unknown>; app_metadata?: Record<string, unknown> } | null): boolean {
    return getUserRole(user) === 'admin';
}

function parseCookieTimestamp(value: string | undefined): number | null {
    if (!value) return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    return parsed;
}

export function readAdminSessionTimestamps(getCookie: (name: string) => string | undefined) {
    return {
        createdAt: parseCookieTimestamp(getCookie(ADMIN_SESSION_CREATED_AT)),
        lastActivityAt: parseCookieTimestamp(getCookie(ADMIN_LAST_ACTIVITY_AT)),
    };
}

export function isSessionExpired(createdAt: number | null, lastActivityAt: number | null, now = Date.now()) {
    if (!createdAt || !lastActivityAt) {
        return { expired: true, reason: 'missing' as const };
    }

    if (now - createdAt > ADMIN_ABSOLUTE_TIMEOUT_MS) {
        return { expired: true, reason: 'absolute' as const };
    }

    if (now - lastActivityAt > ADMIN_IDLE_TIMEOUT_MS) {
        return { expired: true, reason: 'idle' as const };
    }

    return { expired: false as const, reason: null };
}

export function setAdminSessionCookies(
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

    setCookie(ADMIN_SESSION_CREATED_AT, String(createdAt), baseOptions);
    setCookie(ADMIN_LAST_ACTIVITY_AT, String(now), {
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
    clearCookie(ADMIN_LAST_ACTIVITY_AT, baseOptions);
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
    const { createdAt, lastActivityAt } = readAdminSessionTimestamps((name) => cookieStore.get(name)?.value);
    const timeout = isSessionExpired(createdAt, lastActivityAt);

    if (timeout.expired) {
        await supabase.auth.signOut();
        clearAdminSessionCookies((name, opts) => cookieStore.set(name, '', opts));
        throw new AdminAuthError('Session expired', 401);
    }

    if (touchActivity) {
        setAdminSessionCookies(
            (name, value, opts) => cookieStore.set(name, value, opts),
            Date.now(),
            createdAt,
        );
    }

    return { supabase, user };
}
