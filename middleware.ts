import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Only run Supabase auth middleware on admin routes.
         * Public pages do not require authentication and
         * should not be delayed by Supabase session refresh.
         */
        '/admin/:path*',
    ],
};
