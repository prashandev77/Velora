'use client';

import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';

const categories = ['luxury', 'honeymoon', 'wellness', 'adventure'];

interface Package {
    id?: string;
    slug?: string;
    category?: string;
    title?: string;
    location?: string;
    days?: number;
    image_url?: string;
    tag?: string;
    highlights?: string[];
    description?: string;
    itinerary?: object[];
    is_active?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PackageForm({ action, pkg }: { action: (fd: FormData) => Promise<any>; pkg?: Package }) {
    const [, formAction, isPending] = useActionState(action, null);

    const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm px-4 py-3 focus:outline-none focus:border-gold/40 transition-colors placeholder:text-white/20';
    const labelCls = 'text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5 block';

    return (
        <form action={formAction} className="space-y-6">
            {pkg?.id && <input type="hidden" name="id" value={pkg.id} />}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                <h3 className="text-white font-medium text-sm border-b border-white/10 pb-3">Basic Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>Title *</label>
                        <input name="title" required defaultValue={pkg?.title} placeholder="e.g. Royal Rajasthan Escape" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Slug *</label>
                        <input name="slug" required defaultValue={pkg?.slug} placeholder="e.g. royal-rajasthan-escape" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Category *</label>
                        <select name="category" required defaultValue={pkg?.category} className={`${inputCls} cursor-pointer`}>
                            <option value="" className="bg-[#161820]">Select category</option>
                            {categories.map((c) => <option key={c} value={c} className="bg-[#161820] capitalize">{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>Location *</label>
                        <input name="location" required defaultValue={pkg?.location} placeholder="e.g. Rajasthan, India" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Duration (days) *</label>
                        <input name="days" type="number" required min={1} defaultValue={pkg?.days} placeholder="10" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Badge Tag *</label>
                        <input name="tag" required defaultValue={pkg?.tag} placeholder="e.g. Luxury · 10 Days" className={inputCls} />
                    </div>
                </div>

                <div>
                    <label className={labelCls}>Image URL *</label>
                    <input name="image_url" required defaultValue={pkg?.image_url} placeholder="/images/india-jaipur.jpg or https://..." className={inputCls} />
                </div>

                <div>
                    <label className={labelCls}>Short Description *</label>
                    <textarea name="description" required rows={3} defaultValue={pkg?.description} placeholder="A brief, compelling description of this package..." className={`${inputCls} resize-none`} />
                </div>

                <div>
                    <label className={labelCls}>Highlights (one per line)</label>
                    <textarea
                        name="highlights"
                        rows={4}
                        defaultValue={pkg?.highlights?.join('\n')}
                        placeholder={'Amber Fort private tour\nCamel trek at sunset\nHeritage palace dinner'}
                        className={`${inputCls} resize-none`}
                    />
                </div>

                <div>
                    <label className={labelCls}>Active</label>
                    <select name="is_active" defaultValue={pkg?.is_active === false ? 'false' : 'true'} className={`${inputCls} cursor-pointer`}>
                        <option value="true" className="bg-[#161820]">Yes — visible on site</option>
                        <option value="false" className="bg-[#161820]">No — hidden</option>
                    </select>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-medium text-sm border-b border-white/10 pb-3 mb-5">Itinerary (JSON)</h3>
                <p className="text-white/30 text-xs mb-3">
                    Paste a JSON array. Example: <code className="text-gold/70">[{'{"day":1,"title":"Arrival","description":"..."}'} ]</code>
                </p>
                <textarea
                    name="itinerary"
                    rows={10}
                    defaultValue={pkg?.itinerary ? JSON.stringify(pkg.itinerary, null, 2) : '[]'}
                    className={`${inputCls} font-mono text-xs resize-y`}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gold hover:bg-gold/90 text-deep font-semibold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 disabled:opacity-60"
            >
                {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : (pkg?.id ? 'Update Package' : 'Create Package')}
            </button>
        </form>
    );
}
