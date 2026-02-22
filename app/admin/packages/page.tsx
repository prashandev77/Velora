import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Plus, Pencil, Eye } from 'lucide-react';
import DeletePackageButton from './components/DeletePackageButton';

const categoryConfig: Record<string, { pill: string; bg: string }> = {
    luxury: { pill: 'bg-gold/15 text-gold border-gold/25', bg: 'from-gold/30' },
    honeymoon: { pill: 'bg-pink-500/15 text-pink-400 border-pink-500/25', bg: 'from-pink-500/30' },
    wellness: { pill: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', bg: 'from-emerald-500/30' },
    adventure: { pill: 'bg-orange-500/15 text-orange-400 border-orange-500/25', bg: 'from-orange-500/30' },
};

export default async function PackagesAdminPage() {
    const supabase = await createClient();
    const { data: packages } = await supabase
        .from('packages')
        .select('id,slug,title,category,location,days,image_url,is_active')
        .order('created_at', { ascending: false });

    return (
        <div className="max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white font-heading tracking-tight">Packages</h1>
                    <p className="text-white/30 text-sm mt-1">{packages?.length ?? 0} journeys</p>
                </div>
                <Link
                    href="/admin/packages/new"
                    className="flex items-center gap-2 bg-gold text-deep font-semibold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-gold/25 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Package</span>
                    <span className="sm:hidden">New</span>
                </Link>
            </div>

            {/* Empty state */}
            {(!packages || packages.length === 0) ? (
                <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-7 h-7 text-white/20" />
                    </div>
                    <p className="text-white text-lg font-semibold mb-2">No packages yet</p>
                    <p className="text-white/30 text-sm mb-6">Create your first travel package to get started</p>
                    <Link href="/admin/packages/new" className="inline-flex items-center gap-2 bg-gold text-deep text-sm font-semibold px-5 py-2.5 rounded-xl">
                        Create first package →
                    </Link>
                </div>
            ) : (
                /* ── Desktop: image-card grid · Mobile: list ── */
                <>
                    {/* Desktop grid (lg+) */}
                    <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-5">
                        {packages.map((pkg) => {
                            const cc = categoryConfig[pkg.category] ?? { pill: 'bg-white/10 text-white/50 border-white/10', bg: 'from-white/20' };
                            return (
                                <div key={pkg.id} className="group relative bg-[#13151f] border border-white/8 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40">
                                    {/* Image */}
                                    <div className="relative h-44 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${pkg.image_url})` }}
                                        />
                                        {/* Image overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-transparent to-transparent" />
                                        {/* Category pill */}
                                        <div className="absolute top-3 left-3">
                                            <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium capitalize backdrop-blur-sm ${cc.pill}`}>
                                                {pkg.category}
                                            </span>
                                        </div>
                                        {!pkg.is_active && (
                                            <div className="absolute top-3 right-3">
                                                <span className="text-[10px] px-2 py-1 rounded-full border bg-black/40 text-white/40 border-white/10 backdrop-blur-sm">
                                                    inactive
                                                </span>
                                            </div>
                                        )}
                                        {/* Hover action overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                                            <Link
                                                href={`/journeys/${pkg.category}/${pkg.slug}`}
                                                target="_blank"
                                                className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
                                                title="View on site"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/packages/${pkg.id}`}
                                                className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
                                                title="Edit"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-gold transition-colors">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-white/35 text-[12px]">{pkg.location} · {pkg.days} days</p>

                                        {/* Action row */}
                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
                                            <Link
                                                href={`/admin/packages/${pkg.id}`}
                                                className="flex items-center gap-1.5 text-white/40 hover:text-gold text-xs font-medium transition-colors"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                                Edit package
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
                            const cc = categoryConfig[pkg.category] ?? { pill: 'bg-white/10 text-white/50 border-white/10', bg: '' };
                            return (
                                <div key={pkg.id} className="bg-white/[0.03] border border-white/8 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/[0.06] transition-colors">
                                    <div
                                        className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0"
                                        style={{ backgroundImage: `url(${pkg.image_url})` }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${cc.pill}`}>
                                                {pkg.category}
                                            </span>
                                            {!pkg.is_active && (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-white/5 text-white/30 border-white/10">inactive</span>
                                            )}
                                        </div>
                                        <p className="text-white font-medium text-sm truncate">{pkg.title}</p>
                                        <p className="text-white/35 text-xs">{pkg.location} · {pkg.days}d</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <Link href={`/journeys/${pkg.category}/${pkg.slug}`} target="_blank"
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white transition-all">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link href={`/admin/packages/${pkg.id}`}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white transition-all">
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
