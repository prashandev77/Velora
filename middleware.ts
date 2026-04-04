import { type NextRequest, NextResponse } from 'next/server';
import { updateSession, requestWithPathname } from '@/utils/supabase/middleware';

/**
 * Edge often inlines env at build time. Use bracket access + both names.
 * Server layout also checks MAINTENANCE_MODE (Node) and redirects — works when Edge misses env.
 */
function isMaintenanceEdge(): boolean {
    const e = process.env as Record<string, string | undefined>;
    const raw = e['MAINTENANCE_MODE'] ?? e['NEXT_PUBLIC_MAINTENANCE_MODE'];
    const s = typeof raw === 'string' ? raw.trim().toLowerCase() : String(raw ?? '').toLowerCase();
    return s === 'true' || s === '1' || s === 'yes';
}

function isAllowAdminEdge(): boolean {
    const e = process.env as Record<string, string | undefined>;
    const raw = e['MAINTENANCE_ALLOW_ADMIN'] ?? e['NEXT_PUBLIC_MAINTENANCE_ALLOW_ADMIN'];
    const s = typeof raw === 'string' ? raw.trim().toLowerCase() : String(raw ?? '').toLowerCase();
    if (s === 'false' || s === '0' || s === 'no') return false;
    return true;
}

function isLikelyPublicAssetPath(pathname: string): boolean {
    if (pathname.startsWith('/_next')) return true;
    const last = pathname.split('/').pop() ?? '';
    return /\.[a-zA-Z0-9]{2,8}$/.test(last);
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (isLikelyPublicAssetPath(pathname)) {
        return NextResponse.next({ request: requestWithPathname(request) });
    }

    if (isMaintenanceEdge()) {
        if (pathname === '/maintenance') {
            return NextResponse.next({ request: requestWithPathname(request) });
        }
        if (isAllowAdminEdge() && (pathname.startsWith('/admin') || pathname.startsWith('/api/admin'))) {
            if (pathname.startsWith('/admin')) {
                return await updateSession(request);
            }
            return NextResponse.next({ request: requestWithPathname(request) });
        }
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    if (pathname.startsWith('/admin')) {
        return await updateSession(request);
    }

    return NextResponse.next({ request: requestWithPathname(request) });
}

export const config = {
    matcher: [
        '/',
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
