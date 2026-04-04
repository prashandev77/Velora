/**
 * Maintenance mode — toggle via MAINTENANCE_MODE=true in Vercel / .env.local
 * No code deploy needed to turn on/off (only env change + redeploy if required by host).
 */

export function isMaintenanceMode(): boolean {
    const v = process.env.MAINTENANCE_MODE?.trim().toLowerCase();
    return v === 'true' || v === '1' || v === 'yes';
}

/** When true (default), /admin/* still works during maintenance so you can manage the site. */
export function isMaintenanceAllowAdmin(): boolean {
    const v = process.env.MAINTENANCE_ALLOW_ADMIN?.trim().toLowerCase();
    if (v === 'false' || v === '0' || v === 'no') return false;
    return true;
}

export function isLikelyPublicAssetPath(pathname: string): boolean {
    if (pathname.startsWith('/_next')) return true;
    const last = pathname.split('/').pop() ?? '';
    return /\.[a-zA-Z0-9]{2,8}$/.test(last);
}
