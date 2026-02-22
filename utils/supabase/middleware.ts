import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url') {
        // No Supabase configured — still block admin in production mode
        const { pathname } = request.nextUrl;
        if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() { return request.cookies.getAll(); },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                supabaseResponse = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options)
                );
            },
        },
    });

    const { data: { user } } = await supabase.auth.getUser();
    const { pathname } = request.nextUrl;

    // Protect /admin/* — redirect to login if not authenticated
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // If already logged in, redirect away from login page
    if (pathname === '/admin/login' && user) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return supabaseResponse;
}
