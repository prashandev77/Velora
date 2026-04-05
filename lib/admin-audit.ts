/**
 * Structured audit log for admin mutations (Vercel log drain / APM).
 */
export function adminAudit(
    action: string,
    detail: Record<string, unknown>,
    userEmail?: string | null,
): void {
    console.log(
        JSON.stringify({
            event: 'admin_audit',
            action,
            ...detail,
            adminEmail: userEmail ?? null,
            ts: new Date().toISOString(),
        }),
    );
}
