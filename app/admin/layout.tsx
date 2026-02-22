import { createClient } from '@/utils/supabase/server';
import AdminSidebar from './components/AdminSidebar';
import { ToastProvider } from './components/ToastProvider';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Not logged in — render children directly (login page needs this)
    // Middleware already blocks all protected routes and redirects to /admin/login
    if (!user) {
        return <>{children}</>;
    }

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[#0f1117] flex">
                <AdminSidebar userEmail={user.email ?? ''} />
                {/* pt gives space below top bar + gap; pb gives space above bottom tab + gap */}
                <main className="flex-1 pt-[72px] pb-28 px-4 sm:px-6 lg:ml-72 lg:p-10 overflow-y-auto min-h-screen">
                    {children}
                </main>
            </div>
        </ToastProvider>
    );
}
