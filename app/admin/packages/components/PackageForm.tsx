'use client';

import { useActionState, useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, AlertCircle, X } from 'lucide-react';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';
import DynamicList from './DynamicList';
import ImageUploader from './ImageUploader';
import ItineraryBuilder from './ItineraryBuilder';
import RouteEditor from './RouteEditor';
import type { ItineraryDay, RouteCoord } from '@/lib/validations/journey-schema';
import type { ActionState } from '../actions';

const categories = ['luxury', 'honeymoon', 'wellness', 'adventure'] as const;

interface PackageData {
    id?: string;
    slug?: string;
    category?: string;
    title?: string;
    location?: string;
    days?: number;
    image_url?: string;
    tag?: string;
    subtitle?: string;
    travel_style?: string;
    description?: string;
    accommodation?: string;
    highlights?: string[];
    why_special?: string[];
    perfect_for?: string[];
    route?: string[];
    route_coords?: RouteCoord[];
    included?: string[];
    not_included?: string[];
    itinerary?: ItineraryDay[];
    gallery_images?: string[];
    is_active?: boolean;
}

export default function PackageForm({
    action,
    pkg,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (prev: ActionState, fd: FormData) => Promise<any>;
    pkg?: PackageData;
}) {
    const [state, formAction, isPending] = useActionState(action, null);
    const router = useRouter();
    const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
    const [saveAwaitingComplete, setSaveAwaitingComplete] = useState(false);
    const saveHadPendingRef = useRef(false);

    useEffect(() => {
        if (isPending && saveAwaitingComplete) saveHadPendingRef.current = true;
    }, [isPending, saveAwaitingComplete]);

    useEffect(() => {
        if (!isPending && saveAwaitingComplete && saveHadPendingRef.current) {
            saveHadPendingRef.current = false;
            setSaveAwaitingComplete(false);
            setSaveDialogOpen(false);
        }
    }, [isPending, saveAwaitingComplete]);

    // ── Form state ──
    const [title, setTitle] = useState(pkg?.title ?? '');
    const [slug, setSlug] = useState(pkg?.slug ?? '');
    const [slugManual, setSlugManual] = useState(!!pkg?.slug);
    const [category, setCategory] = useState(pkg?.category ?? '');
    const [location, setLocation] = useState(pkg?.location ?? 'Sri Lanka');
    const [days, setDays] = useState(pkg?.days ?? 0);
    const [tag, setTag] = useState(pkg?.tag ?? '');
    const [subtitle, setSubtitle] = useState(pkg?.subtitle ?? '');
    const [travelStyle, setTravelStyle] = useState(pkg?.travel_style ?? '');
    const [description, setDescription] = useState(pkg?.description ?? '');
    const [accommodation, setAccommodation] = useState(pkg?.accommodation ?? '');
    const [isActive, setIsActive] = useState(pkg?.is_active !== false);

    const [highlights, setHighlights] = useState<string[]>(pkg?.highlights ?? []);
    const [whySpecial, setWhySpecial] = useState<string[]>(pkg?.why_special ?? []);
    const [perfectFor, setPerfectFor] = useState<string[]>(pkg?.perfect_for ?? []);
    const [route, setRoute] = useState<string[]>(pkg?.route ?? []);
    const [routeCoords, setRouteCoords] = useState<RouteCoord[]>(pkg?.route_coords ?? []);
    const [included, setIncluded] = useState<string[]>(pkg?.included ?? []);
    const [notIncluded, setNotIncluded] = useState<string[]>(pkg?.not_included ?? []);
    const [itinerary, setItinerary] = useState<ItineraryDay[]>(pkg?.itinerary ?? []);

    const [mainImage, setMainImage] = useState<string[]>(pkg?.image_url ? [pkg.image_url] : []);
    const [galleryImages, setGalleryImages] = useState<string[]>(pkg?.gallery_images ?? []);

    const slugify = useCallback((value: string) => (
        value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    ), []);

    const getError = useCallback((field: string): string | undefined => {
        // Client-side errors take priority
        if (clientErrors[field]) return clientErrors[field];
        if (!state?.errors) return undefined;
        return state.errors[field]?.[0];
    }, [state, clientErrors]);

    const hasFieldError = useCallback((field: string): boolean => {
        return !!(clientErrors[field] || state?.errors?.[field]?.[0]);
    }, [clientErrors, state]);

    const handleSubmit = (formData: FormData) => {
        const errors: Record<string, string> = {};
        if (!title.trim()) errors.title = 'Title is required';
        if (!slug.trim()) errors.slug = 'Slug is required';
        if (!category) errors.category = 'Category is required';
        if (!location.trim()) errors.location = 'Location is required';
        if (!days || days < 1) errors.days = 'Duration must be at least 1 day';
        if (!tag.trim()) errors.tag = 'Badge tag is required';
        if (!subtitle.trim()) errors.subtitle = 'Subtitle is required';
        if (!travelStyle.trim()) errors.travelStyle = 'Travel style is required';
        if (!description.trim()) errors.description = 'Description is required';
        if (!accommodation.trim()) errors.accommodation = 'Accommodation is required';
        if (mainImage.length === 0) errors.imageUrl = 'Main image is required';
        if (highlights.filter(Boolean).length === 0) errors.highlights = 'At least one highlight is required';
        if (whySpecial.filter(Boolean).length === 0) errors.whySpecial = 'At least one "Why Special" item is required';
        if (perfectFor.filter(Boolean).length === 0) errors.perfectFor = 'At least one "Perfect For" item is required';
        if (route.filter(Boolean).length === 0) errors.route = 'At least one route stop is required';
        if (included.filter(Boolean).length === 0) errors.included = 'At least one "Included" item is required';
        if (notIncluded.filter(Boolean).length === 0) errors.notIncluded = 'At least one "Not Included" item is required';
        if (itinerary.length === 0) errors.itinerary = 'At least one itinerary day is required';

        setClientErrors(errors);

        if (Object.keys(errors).length > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setSaveDialogOpen(true);
    };

    const executeSave = () => {
        const payload = {
            title,
            slug,
            category,
            location,
            days,
            tag,
            subtitle,
            travelStyle,
            description,
            accommodation,
            highlights: highlights.filter(Boolean),
            whySpecial: whySpecial.filter(Boolean),
            perfectFor: perfectFor.filter(Boolean),
            route: route.filter(Boolean),
            routeCoords,
            included: included.filter(Boolean),
            notIncluded: notIncluded.filter(Boolean),
            itinerary: itinerary.map((d) => ({
                ...d,
                highlights: d.highlights.filter(Boolean),
            })),
            imageUrl: mainImage[0] ?? '',
            galleryImages,
            isActive: isActive,
        };

        const fd = new FormData();
        fd.set('payload', JSON.stringify(payload));
        if (pkg?.id) fd.set('id', pkg.id);

        setSaveAwaitingComplete(true);
        formAction(fd);
    };

    const inputCls = 'w-full bg-white border border-gray-200 rounded-xl text-gray-900 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all placeholder:text-gray-300';
    const labelCls = 'text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5 block';
    const errorCls = 'text-red-500 text-xs mt-1';

    return (
        <>
            <ConfirmDialog
                open={saveDialogOpen}
                variant="neutral"
                title={pkg?.id ? 'Update this journey?' : 'Create this journey?'}
                message={
                    pkg?.id
                        ? 'Your changes will be saved and visible on the site (if the journey is active).'
                        : 'A new journey will be added to your catalogue.'
                }
                confirmLabel={pkg?.id ? 'Save changes' : 'Create journey'}
                cancelLabel="Keep editing"
                confirmLoading={isPending && saveAwaitingComplete}
                onConfirm={executeSave}
                onCancel={() => {
                    if (!isPending && !saveAwaitingComplete) setSaveDialogOpen(false);
                }}
            />
            <ConfirmDialog
                open={discardDialogOpen}
                variant="warning"
                title="Discard unsaved changes?"
                message="You will lose any edits that have not been saved."
                confirmLabel="Discard"
                cancelLabel="Keep editing"
                onConfirm={() => {
                    setDiscardDialogOpen(false);
                    router.push('/admin/packages');
                }}
                onCancel={() => setDiscardDialogOpen(false)}
            />
        <form action={handleSubmit} className="space-y-6 pb-24">
            {state?.errors?._form && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-sm">{state.errors._form[0]}</p>
                </div>
            )}

            {Object.keys(clientErrors).length > 0 && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 animate-pulse">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-sm font-medium">Please fill out the highlighted fields before saving.</p>
                </div>
            )}

            {/* ═══ SECTION 1: Basic Information ═══ */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-5">
                <h3 className="text-gray-900 font-semibold text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center">1</span>
                    Basic Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>Title *</label>
                        <input value={title} onChange={(e) => { const value = e.target.value; setTitle(value); if (!slugManual) setSlug(slugify(value)); setClientErrors((prev) => { const n = {...prev}; delete n.title; return n; }); }} placeholder="e.g. Velora Luxe" className={`${inputCls} ${hasFieldError('title') ? 'border-red-300 ring-2 ring-red-100 focus:ring-red-200' : ''}`} />
                        {getError('title') && <p className={errorCls}>{getError('title')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>
                            Slug *
                            {!slugManual && (
                                <button type="button" onClick={() => setSlugManual(true)} className="ml-2 text-blue-500 hover:text-blue-600 text-[10px] normal-case">
                                    Edit manually
                                </button>
                            )}
                        </label>
                        <input value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManual(true); setClientErrors((prev) => { const n = {...prev}; delete n.slug; return n; }); }} placeholder="e.g. velora-luxe" className={`${inputCls} ${!slugManual ? 'bg-gray-50 text-gray-400' : ''} ${hasFieldError('slug') ? 'border-red-300 ring-2 ring-red-100' : ''}`} readOnly={!slugManual} />
                        {getError('slug') && <p className={errorCls}>{getError('slug')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Category *</label>
                        <select value={category} onChange={(e) => { setCategory(e.target.value); setClientErrors((prev) => { const n = {...prev}; delete n.category; return n; }); }} className={`${inputCls} cursor-pointer ${hasFieldError('category') ? 'border-red-300 ring-2 ring-red-100' : ''}`}>
                            <option value="">Select category</option>
                            {categories.map((c) => (<option key={c} value={c} className="capitalize">{c}</option>))}
                        </select>
                        {getError('category') && <p className={errorCls}>{getError('category')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Location *</label>
                        <input value={location} onChange={(e) => { setLocation(e.target.value); setClientErrors((prev) => { const n = {...prev}; delete n.location; return n; }); }} placeholder="Sri Lanka" className={`${inputCls} ${hasFieldError('location') ? 'border-red-300 ring-2 ring-red-100' : ''}`} />
                        {getError('location') && <p className={errorCls}>{getError('location')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Duration (days) *</label>
                        <input type="number" value={days || ''} onChange={(e) => { setDays(parseInt(e.target.value) || 0); setClientErrors((prev) => { const n = {...prev}; delete n.days; return n; }); }} min={1} max={60} placeholder="10" className={`${inputCls} ${hasFieldError('days') ? 'border-red-300 ring-2 ring-red-100' : ''}`} />
                        {getError('days') && <p className={errorCls}>{getError('days')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Badge Tag *</label>
                        <input value={tag} onChange={(e) => { setTag(e.target.value); setClientErrors((prev) => { const n = {...prev}; delete n.tag; return n; }); }} placeholder="e.g. Luxury" className={`${inputCls} ${hasFieldError('tag') ? 'border-red-300 ring-2 ring-red-100' : ''}`} />
                        {getError('tag') && <p className={errorCls}>{getError('tag')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Subtitle *</label>
                        <input value={subtitle} onChange={(e) => { setSubtitle(e.target.value); setClientErrors((prev) => { const n = {...prev}; delete n.subtitle; return n; }); }} placeholder="e.g. Luxury, Thoughtfully Curated" className={`${inputCls} ${hasFieldError('subtitle') ? 'border-red-300 ring-2 ring-red-100' : ''}`} />
                        {getError('subtitle') && <p className={errorCls}>{getError('subtitle')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Travel Style *</label>
                        <input value={travelStyle} onChange={(e) => { setTravelStyle(e.target.value); setClientErrors((prev) => { const n = {...prev}; delete n.travelStyle; return n; }); }} placeholder="e.g. Luxury • Culture • Nature" className={`${inputCls} ${hasFieldError('travelStyle') ? 'border-red-300 ring-2 ring-red-100' : ''}`} />
                        {getError('travelStyle') && <p className={errorCls}>{getError('travelStyle')}</p>}
                    </div>
                </div>

                <div>
                    <label className={labelCls}>Active</label>
                    <select value={isActive ? 'true' : 'false'} onChange={(e) => setIsActive(e.target.value === 'true')} className={`${inputCls} cursor-pointer`}>
                        <option value="true">Yes — visible on site</option>
                        <option value="false">No — hidden</option>
                    </select>
                </div>
            </div>

            {/* ═══ SECTION 2: Images ═══ */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-6">
                <h3 className="text-gray-900 font-semibold text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center">2</span>
                    Images
                </h3>

                <ImageUploader images={mainImage} onChange={(imgs) => { setMainImage(imgs); setClientErrors((prev) => { const n = {...prev}; delete n.imageUrl; return n; }); }} folder="main" single label="Main Image *" error={getError('imageUrl')} />
                <ImageUploader images={galleryImages} onChange={setGalleryImages} folder="gallery" maxImages={8} label="Gallery Images (max 8)" error={getError('galleryImages')} />
            </div>

            {/* ═══ SECTION 3: Description & Content ═══ */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-6">
                <h3 className="text-gray-900 font-semibold text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center">3</span>
                    Description &amp; Content
                </h3>

                <div>
                    <label className={labelCls}>Description *</label>
                    <textarea value={description} onChange={(e) => { setDescription(e.target.value); setClientErrors((prev) => { const n = {...prev}; delete n.description; return n; }); }} rows={4} placeholder="A compelling description of this journey…" className={`${inputCls} resize-none ${hasFieldError('description') ? 'border-red-300 ring-2 ring-red-100' : ''}`} />
                    {getError('description') && <p className={errorCls}>{getError('description')}</p>}
                </div>

                <div>
                    <label className={labelCls}>Accommodation *</label>
                    <textarea value={accommodation} onChange={(e) => { setAccommodation(e.target.value); setClientErrors((prev) => { const n = {...prev}; delete n.accommodation; return n; }); }} rows={3} placeholder="Describe the accommodation style…" className={`${inputCls} resize-none ${hasFieldError('accommodation') ? 'border-red-300 ring-2 ring-red-100' : ''}`} />
                    {getError('accommodation') && <p className={errorCls}>{getError('accommodation')}</p>}
                </div>

                <DynamicList items={highlights} onChange={(v) => { setHighlights(v); setClientErrors((prev) => { const n = {...prev}; delete n.highlights; return n; }); }} label="Highlights *" placeholder="Add a highlight…" error={getError('highlights')} />
                <DynamicList items={whySpecial} onChange={(v) => { setWhySpecial(v); setClientErrors((prev) => { const n = {...prev}; delete n.whySpecial; return n; }); }} label="Why Special *" placeholder="What makes this journey special…" error={getError('whySpecial')} />
                <DynamicList items={perfectFor} onChange={(v) => { setPerfectFor(v); setClientErrors((prev) => { const n = {...prev}; delete n.perfectFor; return n; }); }} label="Perfect For *" placeholder="e.g. Luxury travellers" error={getError('perfectFor')} />
                <DynamicList items={included} onChange={(v) => { setIncluded(v); setClientErrors((prev) => { const n = {...prev}; delete n.included; return n; }); }} label="Included *" placeholder="e.g. Private chauffeur-guide" error={getError('included')} />
                <DynamicList items={notIncluded} onChange={(v) => { setNotIncluded(v); setClientErrors((prev) => { const n = {...prev}; delete n.notIncluded; return n; }); }} label="Not Included *" placeholder="e.g. International flights" error={getError('notIncluded')} />
            </div>

            {/* ═══ SECTION 4: Route & Map ═══ */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold text-sm border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center">4</span>
                    Route &amp; Map
                </h3>
                <RouteEditor route={route} routeCoords={routeCoords} onRouteChange={(v) => { setRoute(v); setClientErrors((prev) => { const n = {...prev}; delete n.route; return n; }); }} onCoordsChange={setRouteCoords} />
                {getError('route') && <p className={errorCls}>{getError('route')}</p>}
            </div>

            {/* ═══ SECTION 5: Itinerary ═══ */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold text-sm border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center">5</span>
                    Itinerary *
                </h3>
                <ItineraryBuilder days={itinerary} onChange={(v) => { setItinerary(v); setClientErrors((prev) => { const n = {...prev}; delete n.itinerary; return n; }); }} error={getError('itinerary')} />
            </div>

            {/* ═══ STICKY SAVE BUTTON ═══ */}
            <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-30 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-6 py-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="text-gray-400 text-xs">
                        {state?.errors && Object.keys(state.errors).length > 0 && (
                            <span className="flex items-center gap-1.5 text-red-500">
                                <AlertCircle className="w-3.5 h-3.5" />
                                Please fix the errors above
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setDiscardDialogOpen(true)}
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-sm px-6 py-3 rounded-xl transition-all active:scale-95"
                        >
                            <X className="w-4 h-4" /> Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm px-8 py-3 rounded-xl transition-all disabled:opacity-60 active:scale-95"
                        >
                            {isPending ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                            ) : (
                                <><Save className="w-4 h-4" /> {pkg?.id ? 'Update Journey' : 'Create Journey'}</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}
