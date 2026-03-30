import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { savePackage } from '../actions';
import PackageForm from '../components/PackageForm';

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: pkg } = await supabase.from('packages').select('*').eq('id', id).single();
    if (!pkg) notFound();

    return (
        <div className="max-w-3xl">
            <Link href="/admin/packages" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Packages
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 font-heading mb-8">Edit Journey</h1>
            <PackageForm action={savePackage} pkg={pkg} />
        </div>
    );
}
