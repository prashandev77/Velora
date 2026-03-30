import { createClient } from '@/utils/supabase/server';
import AdminSidebar from './components/AdminSidebar';
import { ToastProvider } from './components/ToastProvider';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Not logged in — render children directly (login page needs this)
    if (!user) {
        return <>{children}</>;
    }

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[#f8f9fb] flex">
                <AdminSidebar userEmail={user.email ?? ''} />
                <main className="flex-1 pt-[72px] pb-28 px-4 sm:px-6 lg:ml-64 lg:pt-8 lg:pb-10 lg:px-8 overflow-y-auto min-h-screen">
                    <div className="w-full max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </ToastProvider>
    );
}
