'use client';

import { useState } from 'react';
import { Plus, X, MapPin } from 'lucide-react';
import type { RouteCoord } from '@/lib/validations/journey-schema';

interface RouteEditorProps {
    route: string[];
    routeCoords: RouteCoord[];
    onRouteChange: (route: string[]) => void;
    onCoordsChange: (coords: RouteCoord[]) => void;
    routeError?: string;
    coordsError?: string;
}

const inputCls = 'w-full bg-white border border-gray-200 rounded-xl text-gray-900 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all placeholder:text-gray-300';

export default function RouteEditor({
    route,
    routeCoords,
    onRouteChange,
    onCoordsChange,
    routeError,
    coordsError,
}: RouteEditorProps) {
    const [routeDraft, setRouteDraft] = useState('');

    const addRouteStop = () => {
        const value = routeDraft.trim();
        if (!value) return;
        onRouteChange([...route, value]);
        setRouteDraft('');
    };

    const removeRouteStop = (index: number) => onRouteChange(route.filter((_, i) => i !== index));

    const addCoord = () => onCoordsChange([...routeCoords, { name: '', lat: 0, lng: 0, description: '' }]);

    const updateCoord = (index: number, field: keyof RouteCoord, value: string | number) => {
        const updated = [...routeCoords];
        updated[index] = { ...updated[index], [field]: value };
        onCoordsChange(updated);
    };

    const removeCoord = (index: number) => onCoordsChange(routeCoords.filter((_, i) => i !== index));

    return (
        <div className="space-y-6">
            {/* Route stops */}
            <div>
                <label className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5 block">Route Stops</label>
                <p className="text-gray-400 text-xs mb-3">The sequential stops on the journey (e.g. Airport → Sigiriya → Kandy → …)</p>

                {route.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {route.map((stop, i) => (
                            <div key={i} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 group">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-700 text-xs font-medium">{stop}</span>
                                {i < route.length - 1 && <span className="text-gray-300 text-xs ml-1">→</span>}
                                <button type="button" onClick={() => removeRouteStop(i)} className="p-0.5 rounded-full text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <input value={routeDraft} onChange={(e) => setRouteDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRouteStop(); } }} placeholder="Add a stop…" className={`${inputCls} flex-1`} />
                    <button type="button" onClick={addRouteStop} disabled={!routeDraft.trim()} className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-30 transition-all">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                {routeError && <p className="text-red-500 text-xs mt-1">{routeError}</p>}
            </div>

            {/* Route coordinates */}
            <div>
                <label className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5 block">Map Coordinates (optional)</label>
                <p className="text-gray-400 text-xs mb-3">GPS coordinates for the route map display</p>

                <div className="space-y-3">
                    {routeCoords.map((coord, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">Point {i + 1}</span>
                                <button type="button" onClick={() => removeCoord(i)} className="p-1 rounded text-gray-300 hover:text-red-500 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-gray-400 text-[10px] mb-0.5 block">Name</label>
                                    <input value={coord.name} onChange={(e) => updateCoord(i, 'name', e.target.value)} placeholder="Sigiriya" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-[10px] mb-0.5 block">Latitude</label>
                                    <input type="number" step="0.01" value={coord.lat || ''} onChange={(e) => updateCoord(i, 'lat', parseFloat(e.target.value) || 0)} placeholder="7.96" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-[10px] mb-0.5 block">Longitude</label>
                                    <input type="number" step="0.01" value={coord.lng || ''} onChange={(e) => updateCoord(i, 'lng', parseFloat(e.target.value) || 0)} placeholder="80.76" className={inputCls} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-gray-400 text-[10px] mb-0.5 block">Description</label>
                                    <input value={coord.description || ''} onChange={(e) => updateCoord(i, 'description', e.target.value)} placeholder="Rock fortress" className={inputCls} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button type="button" onClick={addCoord} className="mt-3 flex items-center gap-2 text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" />
                    Add coordinate point
                </button>

                {coordsError && <p className="text-red-500 text-xs mt-1">{coordsError}</p>}
            </div>
        </div>
    );
}
