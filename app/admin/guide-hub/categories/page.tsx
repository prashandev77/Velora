import { createClient } from '@/utils/supabase/server';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
    const supabase = await createClient();
    const { data: categories } = await supabase
        .from('guide_categories')
        .select('id, name, slug')
        .order('name');

    return (
        <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading tracking-tight">Categories</h1>
                    <p className="text-gray-400 text-sm mt-1">Organize your travel guides</p>
                </div>
            </div>

            <CategoriesClient initialCategories={categories ?? []} />
        </div>
    );
}
