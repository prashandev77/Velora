import { Suspense } from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Plus, Pencil, Eye } from 'lucide-react';
import DeleteGuideButton from './components/DeleteGuideButton';
import GuideSaveSuccessToast from './components/GuideSaveSuccessToast';
import ToggleStatusButton from './components/ToggleStatusButton';

export default async function GuidesAdminPage() {
    const supabase = await createClient();
    const { data: guides } = await supabase
        .from('guides')
        .select('id, title, slug, short_description, featured_image, status, published_at, created_at, category_id, guide_categories(name)')
        .order('created_at', { ascending: false });

    return (
        <div className="max-w-6xl">
            <Suspense fallback={null}>
                <GuideSaveSuccessToast />
            </Suspense>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading tracking-tight">Guides</h1>
                    <p className="text-gray-400 text-sm mt-1">{guides?.length ?? 0} guides</p>
                </div>
                <Link
                    href="/admin/guide-hub/new"
                    className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Guide</span>
                    <span className="sm:hidden">New</span>
                </Link>
            </div>

            {/* Empty state */}
            {(!guides || guides.length === 0) ? (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-gray-900 text-lg font-semibold mb-2">No guides yet</p>
                    <p className="text-gray-400 text-sm mb-6">Create your first travel guide to get started</p>
                    <Link href="/admin/guide-hub/new" className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all">
                        Create first guide →
                    </Link>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden lg:block bg-white border border-gray-200/80 rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Guide</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {guides.map((guide) => {
                                    const category = guide.guide_categories as unknown as { name: string } | null;
                                    return (
                                        <tr key={guide.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {guide.featured_image ? (
                                                        <div
                                                            className="w-12 h-12 rounded-xl bg-cover bg-center flex-shrink-0 border border-gray-100"
                                                            style={{ backgroundImage: `url("${guide.featured_image}")` }}
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <Eye className="w-5 h-5 text-gray-300" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="text-gray-900 text-sm font-medium truncate max-w-xs">{guide.title}</p>
                                                        <p className="text-gray-400 text-xs truncate max-w-xs">{guide.short_description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                {category ? (
                                                    <span className="text-xs px-2.5 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200 font-medium">
                                                        {category.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300 text-xs">—</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <ToggleStatusButton id={guide.id} currentStatus={guide.status} />
                                            </td>
                                            <td className="px-5 py-4 text-gray-400 text-xs">
                                                {new Date(guide.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {guide.status === 'published' && (
                                                        <Link
                                                            href={`/guides/${guide.slug}`}
                                                            target="_blank"
                                                            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all"
                                                            title="View on site"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={`/admin/guide-hub/${guide.id}`}
                                                        className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <DeleteGuideButton id={guide.id} title={guide.title} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile list */}
                    <div className="lg:hidden grid grid-cols-1 gap-3">
                        {guides.map((guide) => {
                            const category = guide.guide_categories as unknown as { name: string } | null;
                            return (
                                <div key={guide.id} className="bg-white border border-gray-200/80 rounded-2xl p-4 flex items-center gap-3">
                                    {guide.featured_image ? (
                                        <div
                                            className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0"
                                            style={{ backgroundImage: `url("${guide.featured_image}")` }}
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <Eye className="w-5 h-5 text-gray-300" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {category && (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200 font-medium">
                                                    {category.name}
                                                </span>
                                            )}
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                                                guide.status === 'published'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                            }`}>
                                                {guide.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-900 font-medium text-sm truncate">{guide.title}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <Link href={`/admin/guide-hub/${guide.id}`}
                                            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all">
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <DeleteGuideButton id={guide.id} title={guide.title} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
