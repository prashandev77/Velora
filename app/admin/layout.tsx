import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import AdminSidebar from './components/AdminSidebar';
import { ToastProvider } from './components/ToastProvider';
import { isAdminUser } from '@/utils/supabase/admin-auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = (await headers()).get('x-pathname') ?? '';

    // Login page: no shell / redirect (middleware sets x-pathname)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdminUser(user)) {
        redirect('/admin/login');
    }

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[#f8f9fb] flex">
                <AdminSidebar userEmail={user.email ?? ''} />
                <main className="flex-1 pt-[72px] pb-28 px-4 sm:px-6 lg:ml-64 lg:pt-8 lg:pb-10 lg:px-8 overflow-y-auto min-h-screen">
                    <div className="w-full max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </ToastProvider>
    );
}
