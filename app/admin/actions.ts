'use server';

import { adminAudit } from '@/lib/admin-audit';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { clearAdminSessionCookies } from '@/utils/supabase/admin-auth';

export async function signOut() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    adminAudit('sign_out', {}, user?.email);
    await supabase.auth.signOut();
    const cookieStore = await cookies();
    clearAdminSessionCookies((name, opts) => cookieStore.set(name, '', opts));
    redirect('/admin/login');
}
