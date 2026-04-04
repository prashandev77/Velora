/**
 * Maintenance mode — set in Vercel → Environment Variables, then redeploy.
 *
 * Edge Middleware on Vercel often does not receive non-NEXT_PUBLIC env vars at runtime.
 * Use NEXT_PUBLIC_MAINTENANCE_MODE for production (value is only used server-side in middleware).
 */

function readFlag(
    primary: string | undefined,
    fallback: string | undefined,
): string | undefined {
    const v = (primary ?? fallback)?.trim();
    return v || undefined;
}

export function isMaintenanceMode(): boolean {
    const v = readFlag(
        process.env.MAINTENANCE_MODE,
        process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
    )?.toLowerCase();
    return v === 'true' || v === '1' || v === 'yes';
}

/** When true (default), /admin/* still works during maintenance so you can manage the site. */
export function isMaintenanceAllowAdmin(): boolean {
    const v = readFlag(
        process.env.MAINTENANCE_ALLOW_ADMIN,
        process.env.NEXT_PUBLIC_MAINTENANCE_ALLOW_ADMIN,
    )?.toLowerCase();
    if (v === 'false' || v === '0' || v === 'no') return false;
    return true;
}

export function isLikelyPublicAssetPath(pathname: string): boolean {
    if (pathname.startsWith('/_next')) return true;
    const last = pathname.split('/').pop() ?? '';
    return /\.[a-zA-Z0-9]{2,8}$/.test(last);
}
