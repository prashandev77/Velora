import { NextRequest, NextResponse } from 'next/server';
import { buildContentSecurityPolicy } from '@/lib/csp';
import { updateSession } from '@/utils/supabase/middleware';

function randomNonceBase64(): string {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    let bin = '';
    for (let i = 0; i < buf.length; i++) {
        bin += String.fromCharCode(buf[i]);
    }
    return btoa(bin);
}

/**
 * Runtime check — uses MAINTENANCE_MODE (not NEXT_PUBLIC_*) so Vercel Edge
 * reads the actual env var at request time rather than the build-time snapshot.
 */
function isMaintenanceMode(): boolean {
    const val = (process.env.MAINTENANCE_MODE ?? '').trim().toLowerCase();
    return val === 'true' || val === '1' || val === 'yes';
}

function isMaintenanceBypassPath(pathname: string): boolean {
    if (pathname === '/maintenance') return true;
    if (pathname.startsWith('/admin')) return true;
    if (pathname.startsWith('/api/admin')) return true;
    return false;
}

/** Prevent Cloudflare (and any CDN) from caching maintenance redirects/pages. */
function setNoCacheHeaders(response: NextResponse): void {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('CDN-Cache-Control', 'no-store');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const nonce = randomNonceBase64();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('x-pathname', pathname);

    const maintenance = isMaintenanceMode();

    // --- Maintenance mode: redirect public traffic to /maintenance ---
    if (maintenance && !isMaintenanceBypassPath(pathname)) {
        const maintenanceUrl = new URL('/maintenance', request.url);
        const response = NextResponse.redirect(maintenanceUrl);
        response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce));
        setNoCacheHeaders(response);
        return response;
    }

    // If maintenance mode is OFF but someone hits /maintenance, send them home
    if (!maintenance && pathname === '/maintenance') {
        const response = NextResponse.redirect(new URL('/', request.url));
        setNoCacheHeaders(response);
        return response;
    }

    const modifiedRequest = new NextRequest(request.url, {
        headers: requestHeaders,
        method: request.method,
    });

    const response = pathname.startsWith('/admin')
        ? await updateSession(modifiedRequest)
        : NextResponse.next({ request: modifiedRequest });

    response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce));

    // When maintenance is active, prevent CDN from caching the maintenance page itself
    if (maintenance && pathname === '/maintenance') {
        setNoCacheHeaders(response);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
    ],
};
