'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { clearAdminSessionCookies } from '@/utils/supabase/admin-auth';

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    const cookieStore = await cookies();
    clearAdminSessionCookies((name, opts) => cookieStore.set(name, '', opts));
    redirect('/admin/login');
}
