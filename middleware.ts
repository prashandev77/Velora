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

export async function middleware(request: NextRequest) {
    const nonce = randomNonceBase64();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

    const modifiedRequest = new NextRequest(request.url, {
        headers: requestHeaders,
        method: request.method,
    });

    const response = request.nextUrl.pathname.startsWith('/admin')
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
