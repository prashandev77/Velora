'use client';

import { useActionState, useState, useCallback } from 'react';
import { saveGuide, type ActionState } from '../actions';
import RichTextEditor from './RichTextEditor';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface GuideCategory {
    id: string;
    name: string;
    slug: string;
}

interface GuideData {
    id?: string;
    title: string;
    slug: string;
    shortDescription: string;
    content: string;
    featuredImage: string;
    categoryId: string | null;
    status: 'draft' | 'published';
}

interface GuideFormProps {
    initialData?: GuideData;
    categories: GuideCategory[];
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export default function GuideForm({ initialData, categories }: GuideFormProps) {
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [slug, setSlug] = useState(initialData?.slug ?? '');
    const [slugManual, setSlugManual] = useState(!!initialData?.slug);
    const [shortDescription, setShortDescription] = useState(initialData?.shortDescription ?? '');
    const [content, setContent] = useState(initialData?.content ?? '');
    const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage ?? '');
    const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '');
    const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status ?? 'draft');
    const [uploading, setUploading] = useState(false);

    const [state, formAction, isPending] = useActionState<ActionState, FormData>(saveGuide, null);

    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!slugManual) {
            setSlug(slugify(val));
        }
    };

    const handleSlugChange = (val: string) => {
        setSlugManual(true);
        setSlug(slugify(val));
    };

    const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('folder', 'guides');

            const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
            const data = await res.json();

            if (res.ok && data.url) {
                setFeaturedImage(data.url);
            } else {
                alert(data.error || 'Failed to upload image');
            }
        } catch {
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    }, []);

    const handleSubmit = (formData: FormData) => {
        formData.set('payload', JSON.stringify({
            title,
            slug,
            shortDescription,
            content,
            featuredImage,
            categoryId: categoryId || null,
            status,
        }));
        if (initialData?.id) {
            formData.set('id', initialData.id);
        }
        formAction(formData);
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Form errors */}
            {state?.errors?._form && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm font-medium">{state.errors._form[0]}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                {/* Left Column — Main content */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Enter guide title"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                        />
                        {state?.errors?.title && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>
                        )}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => handleSlugChange(e.target.value)}
                            placeholder="auto-generated-slug"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-mono placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                        />
                        {state?.errors?.slug && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.slug[0]}</p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                        <textarea
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            placeholder="Brief summary shown on guide cards"
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all resize-none"
                        />
                        {state?.errors?.shortDescription && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.shortDescription[0]}</p>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                        <RichTextEditor content={content} onChange={setContent} placeholder="Write your guide content..." />
                        {state?.errors?.content && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.content[0]}</p>
                        )}
                    </div>
                </div>

                {/* Right Column — Sidebar */}
                <div className="space-y-6">
                    {/* Featured Image */}
                    <div className="bg-white border border-gray-200/80 rounded-2xl p-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Featured Image</label>
                        {featuredImage ? (
                            <div className="relative group">
                                <div
                                    className="w-full h-44 rounded-xl bg-cover bg-center border border-gray-100"
                                    style={{ backgroundImage: `url("${featuredImage}")` }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setFeaturedImage('')}
                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-44 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all">
                                {uploading ? (
                                    <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
                                ) : (
                                    <>
                                        <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                                        <span className="text-gray-400 text-xs font-medium">Click to upload</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        )}
                        {state?.errors?.featuredImage && (
                            <p className="text-red-500 text-xs mt-2">{state.errors.featuredImage[0]}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="bg-white border border-gray-200/80 rounded-2xl p-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                        >
                            <option value="">No category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div className="bg-white border border-gray-200/80 rounded-2xl p-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStatus('draft')}
                                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                                    status === 'draft'
                                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                Draft
                            </button>
                            <button
                                type="button"
                                onClick={() => setStatus('published')}
                                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                                    status === 'published'
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                Published
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-3.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving…
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                {initialData?.id ? 'Update Guide' : 'Create Guide'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
