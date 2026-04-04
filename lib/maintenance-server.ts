/**
 * Server-only maintenance checks (Node runtime).
 * On Vercel, `MAINTENANCE_MODE` without NEXT_PUBLIC_ is always available here — use as fallback when Edge middleware env fails.
 */

function normalizeFlag(raw: string | undefined): string {
    if (raw === undefined || raw === null) return '';
    if (typeof raw === 'string') return raw.trim().toLowerCase();
    return String(raw).trim().toLowerCase();
}

export function isMaintenanceModeServer(): boolean {
    const v = normalizeFlag(
        process.env.MAINTENANCE_MODE ?? process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
    );
    return v === 'true' || v === '1' || v === 'yes';
}

export function isMaintenanceAllowAdminServer(): boolean {
    const v = normalizeFlag(
        process.env.MAINTENANCE_ALLOW_ADMIN ?? process.env.NEXT_PUBLIC_MAINTENANCE_ALLOW_ADMIN,
    );
    if (v === 'false' || v === '0' || v === 'no') return false;
    return true;
}

/** Paths that should render normally during maintenance (matches Edge middleware rules). */
export function isMaintenanceBypassPath(pathname: string): boolean {
    const p = pathname || '';
    if (p === '/maintenance') return true;
    if (
        isMaintenanceAllowAdminServer() &&
        (p.startsWith('/admin') || p.startsWith('/api/admin'))
    ) {
        return true;
    }
    return false;
}
