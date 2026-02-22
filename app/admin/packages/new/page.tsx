import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { savePackage } from '../actions';
import PackageForm from '../components/PackageForm';

export default function NewPackagePage() {
    return (
        <div className="max-w-3xl">
            <Link href="/admin/packages" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Packages
            </Link>
            <h1 className="text-2xl font-bold text-white font-heading mb-8">New Package</h1>
            <PackageForm action={savePackage} />
        </div>
    );
}
