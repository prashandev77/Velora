import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import {
    isMaintenanceAllowAdmin,
    isMaintenanceMode,
    isLikelyPublicAssetPath,
} from '@/lib/maintenance';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (isMaintenanceMode()) {
        if (pathname === '/maintenance') {
            return NextResponse.next();
        }
        if (isLikelyPublicAssetPath(pathname)) {
            return NextResponse.next();
        }
        if (isMaintenanceAllowAdmin() && (pathname.startsWith('/admin') || pathname.startsWith('/api/admin'))) {
            if (pathname.startsWith('/admin')) {
                return await updateSession(request);
            }
            return NextResponse.next();
        }
        const url = request.nextUrl.clone();
        url.pathname = '/maintenance';
        return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/admin')) {
        return await updateSession(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Run for all app routes except Next.js internals and typical static files
         * (maintenance handler still allows /_next and file-like paths through).
         */
        '/((?!_next/static|_next/image|_next/webpack-hmr).*)',
    ],
};
