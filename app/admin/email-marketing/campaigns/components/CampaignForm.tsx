'use client';

import { useActionState, useState } from 'react';
import { saveCampaign, type ActionState } from '../actions';
import RichTextEditor from '@/app/admin/guide-hub/components/RichTextEditor';
import { Upload, Loader2 } from 'lucide-react';

interface CampaignData {
    id?: string;
    subject: string;
    title: string;
    content: string;
    status?: 'draft' | 'sent';
}

interface CampaignFormProps {
    initialData?: CampaignData;
}

export default function CampaignForm({ initialData }: CampaignFormProps) {
    const [subject, setSubject] = useState(initialData?.subject ?? '');
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [content, setContent] = useState(initialData?.content ?? '');

    const isSent = initialData?.status === 'sent';

    const [state, formAction, isPending] = useActionState<ActionState, FormData>(saveCampaign, null);

    const handleSubmit = (formData: FormData) => {
        formData.set('payload', JSON.stringify({ subject, title, content }));
        if (initialData?.id) {
            formData.set('id', initialData.id);
        }
        formAction(formData);
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            {state?.errors?._form && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm font-medium">{state.errors._form[0]}</p>
                </div>
            )}

            {isSent && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-emerald-700 text-sm font-medium">This campaign has been sent and cannot be edited.</p>
                </div>
            )}

            {/* Subject */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject Line</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Discover the Hidden Gems of Sri Lanka"
                    disabled={isSent}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all disabled:opacity-50 disabled:bg-gray-50"
                />
                {state?.errors?.subject && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.subject[0]}</p>
                )}
            </div>

            {/* Title */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title displayed inside the email body"
                    disabled={isSent}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all disabled:opacity-50 disabled:bg-gray-50"
                />
                {state?.errors?.title && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>
                )}
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Content</label>
                {isSent ? (
                    <div className="border border-gray-200 rounded-xl bg-gray-50 p-6">
                        <div className="guide-content" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                ) : (
                    <RichTextEditor content={content} onChange={setContent} placeholder="Compose your email..." />
                )}
                {state?.errors?.content && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.content[0]}</p>
                )}
            </div>

            {/* Submit */}
            {!isSent && (
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving…
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" />
                            {initialData?.id ? 'Update Campaign' : 'Save as Draft'}
                        </>
                    )}
                </button>
            )}
        </form>
    );
}
