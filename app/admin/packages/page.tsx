import { Suspense } from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Plus, Pencil, Eye } from 'lucide-react';
import DeletePackageButton from './components/DeletePackageButton';
import PackageSaveSuccessToast from './components/PackageSaveSuccessToast';

const categoryConfig: Record<string, { pill: string }> = {
    luxury: { pill: 'bg-amber-50 text-amber-700 border-amber-200' },
    honeymoon: { pill: 'bg-pink-50 text-pink-700 border-pink-200' },
    wellness: { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    adventure: { pill: 'bg-orange-50 text-orange-700 border-orange-200' },
};

export default async function PackagesAdminPage() {
    const supabase = await createClient();
    const { data: packages } = await supabase
        .from('packages')
        .select('id,slug,title,category,location,days,image_url,is_active,subtitle,tag')
        .order('created_at', { ascending: false });

    return (
        <div className="max-w-6xl">
            <Suspense fallback={null}>
                <PackageSaveSuccessToast />
            </Suspense>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading tracking-tight">Journeys</h1>
                    <p className="text-gray-400 text-sm mt-1">{packages?.length ?? 0} packages</p>
                </div>
                <Link
                    href="/admin/packages/new"
                    className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Journey</span>
                    <span className="sm:hidden">New</span>
                </Link>
            </div>

            {/* Empty state */}
            {(!packages || packages.length === 0) ? (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-gray-900 text-lg font-semibold mb-2">No journeys yet</p>
                    <p className="text-gray-400 text-sm mb-6">Create your first travel journey to get started</p>
                    <Link href="/admin/packages/new" className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all">
                        Create first journey →
                    </Link>
                </div>
            ) : (
                <>
                    {/* Desktop grid */}
                    <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-4">
                        {packages.map((pkg) => {
                            const cc = categoryConfig[pkg.category] ?? { pill: 'bg-gray-50 text-gray-500 border-gray-200' };
                            return (
                                <div key={pkg.id} className="group bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-200/60 hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5">
                                    {/* Image */}
                                    <div className="relative h-44 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${pkg.image_url}")` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                        {/* Category pill */}
                                        <div className="absolute top-3 left-3">
                                            <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium capitalize backdrop-blur-sm bg-white/90 ${cc.pill}`}>
                                                {pkg.category}
                                            </span>
                                        </div>
                                        {!pkg.is_active && (
                                            <div className="absolute top-3 right-3">
                                                <span className="text-[10px] px-2 py-1 rounded-full bg-black/50 text-white/80 backdrop-blur-sm font-medium">
                                                    inactive
                                                </span>
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                                            <Link
                                                href={`/journeys/${pkg.category}/${pkg.slug}`}
                                                target="_blank"
                                                className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-gray-700 transition-all hover:scale-110 shadow-sm"
                                                title="View on site"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/packages/${pkg.id}`}
                                                className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-gray-700 transition-all hover:scale-110 shadow-sm"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="text-gray-900 font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-gray-400 text-[12px]">{pkg.location} · {pkg.days} days</p>

                                        {/* Action row */}
                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                            <Link
                                                href={`/admin/packages/${pkg.id}`}
                                                className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs font-medium transition-colors"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                                Edit journey
                                            </Link>
                                            <DeletePackageButton id={pkg.id} title={pkg.title} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile list */}
                    <div className="lg:hidden grid grid-cols-1 gap-3">
                        {packages.map((pkg) => {
                            const cc = categoryConfig[pkg.category] ?? { pill: 'bg-gray-50 text-gray-500 border-gray-200' };
                            return (
                                <div key={pkg.id} className="bg-white border border-gray-200/80 rounded-2xl p-4 flex items-center gap-3 hover:shadow-sm transition-all">
                                    <div
                                        className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0"
                                        style={{ backgroundImage: `url("${pkg.image_url}")` }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${cc.pill}`}>
                                                {pkg.category}
                                            </span>
                                            {!pkg.is_active && (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-gray-50 text-gray-400 border-gray-200">inactive</span>
                                            )}
                                        </div>
                                        <p className="text-gray-900 font-medium text-sm truncate">{pkg.title}</p>
                                        <p className="text-gray-400 text-xs">{pkg.location} · {pkg.days}d</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <Link href={`/journeys/${pkg.category}/${pkg.slug}`} target="_blank"
                                            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link href={`/admin/packages/${pkg.id}`}
                                            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all">
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <DeletePackageButton id={pkg.id} title={pkg.title} />
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
