import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import GuideForm from '../components/GuideForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const [{ data: guide }, { data: categories }] = await Promise.all([
        supabase.from('guides').select('*').eq('id', id).single(),
        supabase.from('guide_categories').select('id, name, slug').order('name'),
    ]);

    if (!guide) notFound();

    const initialData = {
        id: guide.id,
        title: guide.title,
        slug: guide.slug,
        shortDescription: guide.short_description,
        content: guide.content,
        featuredImage: guide.featured_image,
        categoryId: guide.category_id,
        status: guide.status as 'draft' | 'published',
    };

    return (
        <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
                <Link
                    href="/admin/guide-hub"
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">Edit Guide</h1>
                    <p className="text-gray-400 text-sm mt-0.5">{guide.title}</p>
                </div>
            </div>

            <GuideForm initialData={initialData} categories={categories ?? []} />
        </div>
    );
}
