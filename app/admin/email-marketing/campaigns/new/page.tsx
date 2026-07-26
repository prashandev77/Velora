import CampaignForm from '../components/CampaignForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCampaignPage() {
    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link
                    href="/admin/email-marketing/campaigns"
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">New Campaign</h1>
                    <p className="text-gray-400 text-sm mt-0.5">Create a new email campaign</p>
                </div>
            </div>

            <CampaignForm />
        </div>
    );
}
