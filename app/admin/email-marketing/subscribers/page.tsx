import { createClient } from '@/utils/supabase/server';
import SubscribersClient from './SubscribersClient';

export default async function SubscribersPage() {
    const supabase = await createClient();
    const { data: subscribers } = await supabase
        .from('subscribers')
        .select('id, name, email, created_at')
        .order('created_at', { ascending: false });

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading tracking-tight">Subscribers</h1>
                <p className="text-gray-400 text-sm mt-1">Manage your email subscribers</p>
            </div>

            <SubscribersClient initialSubscribers={subscribers ?? []} />
        </div>
    );
}
