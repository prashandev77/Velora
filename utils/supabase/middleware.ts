import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import {
    clearAdminSessionCookies,
    isAdminUser,
    isSessionExpired,
    readAdminSessionTimestamps,
    setAdminSessionCookies,
} from '@/utils/supabase/admin-auth';

/** Forwards pathname to Server Components (read via headers() in layout). */
export function requestWithPathname(request: NextRequest): { headers: Headers } {
    const headers = new Headers(request.headers);
    if (!headers.has('x-pathname')) {
        headers.set('x-pathname', request.nextUrl.pathname);
    }
    return { headers };
}

export async function updateSession(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url') {
        // No Supabase configured — still block admin in production mode
        const { pathname } = request.nextUrl;
        if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return NextResponse.next({ request: requestWithPathname(request) });
    }

    let supabaseResponse = NextResponse.next({ request: requestWithPathname(request) });

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() { return request.cookies.getAll(); },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                supabaseResponse = NextResponse.next({ request: requestWithPathname(request) });
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options)
                );
            },
        },
    });

    const { data: { user } } = await supabase.auth.getUser();
    const { pathname } = request.nextUrl;
    const now = Date.now();

    // Protect /admin/* — redirect to login if not authenticated
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        if (!isAdminUser(user)) {
            await supabase.auth.signOut();
            clearAdminSessionCookies((name, opts) => supabaseResponse.cookies.set(name, '', opts));
            return NextResponse.redirect(new URL('/admin/login?error=forbidden', request.url));
        }

        const { createdAt, lastActivityAt } = readAdminSessionTimestamps(
            (name) => request.cookies.get(name)?.value
        );
        const timeout = isSessionExpired(createdAt, lastActivityAt, now);
        if (timeout.expired) {
            await supabase.auth.signOut();
            clearAdminSessionCookies((name, opts) => supabaseResponse.cookies.set(name, '', opts));
            return NextResponse.redirect(new URL('/admin/login?error=session_expired', request.url));
        }

        setAdminSessionCookies(
            (name, value, opts) => supabaseResponse.cookies.set(name, value, opts),
            now,
            createdAt
        );
    }

    // If already logged in, redirect away from login page
    if (pathname === '/admin/login' && user) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return supabaseResponse;
}
