'use client';

import { useActionState, useState, useEffect, useCallback } from 'react';
import { Loader2, Save, AlertCircle } from 'lucide-react';
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

    useEffect(() => {
        if (!slugManual && title) {
            setSlug(
                title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
            );
        }
    }, [title, slugManual]);

    const getError = useCallback((field: string): string | undefined => {
        if (!state?.errors) return undefined;
        return state.errors[field]?.[0];
    }, [state]);

    const handleSubmit = (formData: FormData) => {
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

        formData.set('payload', JSON.stringify(payload));
        if (pkg?.id) formData.set('id', pkg.id);

        formAction(formData);
    };

    const inputCls = 'w-full bg-white border border-gray-200 rounded-xl text-gray-900 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all placeholder:text-gray-300';
    const labelCls = 'text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5 block';
    const errorCls = 'text-red-500 text-xs mt-1';

    return (
        <form action={handleSubmit} className="space-y-6 pb-24">
            {state?.errors?._form && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-sm">{state.errors._form[0]}</p>
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
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Velora Luxe" className={`${inputCls} ${getError('title') ? 'border-red-300 focus:ring-red-100' : ''}`} />
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
                        <input value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }} placeholder="e.g. velora-luxe" className={`${inputCls} ${!slugManual ? 'bg-gray-50 text-gray-400' : ''} ${getError('slug') ? 'border-red-300' : ''}`} readOnly={!slugManual} />
                        {getError('slug') && <p className={errorCls}>{getError('slug')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Category *</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputCls} cursor-pointer ${getError('category') ? 'border-red-300' : ''}`}>
                            <option value="">Select category</option>
                            {categories.map((c) => (<option key={c} value={c} className="capitalize">{c}</option>))}
                        </select>
                        {getError('category') && <p className={errorCls}>{getError('category')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Location *</label>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Sri Lanka" className={`${inputCls} ${getError('location') ? 'border-red-300' : ''}`} />
                        {getError('location') && <p className={errorCls}>{getError('location')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Duration (days) *</label>
                        <input type="number" value={days || ''} onChange={(e) => setDays(parseInt(e.target.value) || 0)} min={1} max={60} placeholder="10" className={`${inputCls} ${getError('days') ? 'border-red-300' : ''}`} />
                        {getError('days') && <p className={errorCls}>{getError('days')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Badge Tag *</label>
                        <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. Luxury" className={`${inputCls} ${getError('tag') ? 'border-red-300' : ''}`} />
                        {getError('tag') && <p className={errorCls}>{getError('tag')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>Subtitle</label>
                        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="e.g. Luxury, Thoughtfully Curated" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Travel Style</label>
                        <input value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)} placeholder="e.g. Luxury • Culture • Nature" className={inputCls} />
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

                <ImageUploader images={mainImage} onChange={setMainImage} folder="main" single label="Main Image *" error={getError('imageUrl')} />
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
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="A compelling description of this journey…" className={`${inputCls} resize-none ${getError('description') ? 'border-red-300' : ''}`} />
                    {getError('description') && <p className={errorCls}>{getError('description')}</p>}
                </div>

                <div>
                    <label className={labelCls}>Accommodation</label>
                    <textarea value={accommodation} onChange={(e) => setAccommodation(e.target.value)} rows={3} placeholder="Describe the accommodation style…" className={`${inputCls} resize-none`} />
                </div>

                <DynamicList items={highlights} onChange={setHighlights} label="Highlights *" placeholder="Add a highlight…" error={getError('highlights')} />
                <DynamicList items={whySpecial} onChange={setWhySpecial} label="Why Special" placeholder="What makes this journey special…" />
                <DynamicList items={perfectFor} onChange={setPerfectFor} label="Perfect For" placeholder="e.g. Luxury travellers" />
                <DynamicList items={included} onChange={setIncluded} label="Included" placeholder="e.g. Private chauffeur-guide" />
                <DynamicList items={notIncluded} onChange={setNotIncluded} label="Not Included" placeholder="e.g. International flights" />
            </div>

            {/* ═══ SECTION 4: Route & Map ═══ */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold text-sm border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center">4</span>
                    Route &amp; Map
                </h3>
                <RouteEditor route={route} routeCoords={routeCoords} onRouteChange={setRoute} onCoordsChange={setRouteCoords} />
            </div>

            {/* ═══ SECTION 5: Itinerary ═══ */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold text-sm border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center">5</span>
                    Itinerary
                </h3>
                <ItineraryBuilder days={itinerary} onChange={setItinerary} error={getError('itinerary')} />
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
        </form>
    );
}
