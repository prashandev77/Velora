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

function isMaintenanceMode(): boolean {
    const val = (
        process.env['NEXT_PUBLIC_MAINTENANCE_MODE'] ??
        process.env['MAINTENANCE_MODE'] ??
        ''
    ).trim().toLowerCase();
    return val === 'true' || val === '1' || val === 'yes';
}

function isMaintenanceBypassPath(pathname: string): boolean {
    if (pathname === '/maintenance') return true;
    if (pathname.startsWith('/admin')) return true;
    if (pathname.startsWith('/api/admin')) return true;
    return false;
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const nonce = randomNonceBase64();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('x-pathname', pathname);

    // --- Maintenance mode: redirect public traffic to /maintenance ---
    if (isMaintenanceMode() && !isMaintenanceBypassPath(pathname)) {
        const maintenanceUrl = new URL('/maintenance', request.url);
        const response = NextResponse.redirect(maintenanceUrl);
        response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce));
        return response;
    }

    // If maintenance mode is OFF but someone hits /maintenance, send them home
    if (!isMaintenanceMode() && pathname === '/maintenance') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const modifiedRequest = new NextRequest(request.url, {
        headers: requestHeaders,
        method: request.method,
    });

    const response = pathname.startsWith('/admin')
        ? await updateSession(modifiedRequest)
        : NextResponse.next({ request: modifiedRequest });

    response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce));
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all paths except static assets and Next internals.
         */
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
    ],
};
