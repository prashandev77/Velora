'use client';

import { useRef, useState } from 'react';
import { Plus, X, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import type { ItineraryDay } from '@/lib/validations/journey-schema';

interface ItineraryBuilderProps {
    days: ItineraryDay[];
    onChange: (days: ItineraryDay[]) => void;
    error?: string;
}

const inputCls = 'w-full bg-white border border-gray-200 rounded-xl text-gray-900 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all placeholder:text-gray-300';

export default function ItineraryBuilder({ days, onChange, error }: ItineraryBuilderProps) {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});
    const addingRef = useRef(false);

    const toggle = (index: number) => setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

    const addDay = () => {
        if (addingRef.current) return;
        addingRef.current = true;
        const dayNum = days.length + 1;
        onChange([...days, { day: dayNum, title: '', description: '', highlights: [''] }]);
        setExpanded((prev) => ({ ...prev, [days.length]: true }));
        requestAnimationFrame(() => { addingRef.current = false; });
    };

    const removeDay = (index: number) => {
        const updated = days.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 }));
        onChange(updated);
    };

    const updateDay = (index: number, field: keyof ItineraryDay, value: string | number | string[]) => {
        const updated = [...days];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const moveDay = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= days.length) return;
        const updated = [...days];
        [updated[index], updated[target]] = [updated[target], updated[index]];
        onChange(updated.map((d, i) => ({ ...d, day: i + 1 })));
    };

    const addHighlight = (dayIndex: number) => {
        if (addingRef.current) return;
        addingRef.current = true;
        const updated = [...days];
        updated[dayIndex] = { ...updated[dayIndex], highlights: [...updated[dayIndex].highlights, ''] };
        onChange(updated);
        requestAnimationFrame(() => { addingRef.current = false; });
    };

    const updateHighlight = (dayIndex: number, hiIndex: number, value: string) => {
        const updated = [...days];
        const highlights = [...updated[dayIndex].highlights];
        highlights[hiIndex] = value;
        updated[dayIndex] = { ...updated[dayIndex], highlights };
        onChange(updated);
    };

    const removeHighlight = (dayIndex: number, hiIndex: number) => {
        const updated = [...days];
        updated[dayIndex] = {
            ...updated[dayIndex],
            highlights: updated[dayIndex].highlights.filter((_, i) => i !== hiIndex),
        };
        onChange(updated);
    };

    return (
        <div>
            <label className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3 block">
                Itinerary
            </label>

            <div className="space-y-3">
                {days.map((day, i) => {
                    const isOpen = expanded[i] ?? false;
                    return (
                        <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                            <div
                                onClick={() => toggle(i)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100/50 transition-colors cursor-pointer"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && toggle(i)}
                            >
                                <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                <span className="w-8 h-8 rounded-lg bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {day.day}
                                </span>
                                <span className="text-gray-800 text-sm font-medium flex-1 text-left truncate">
                                    {day.title || `Day ${day.day}`}
                                </span>
                                <div className="flex items-center gap-1 mr-2">
                                    <button type="button" onClick={(e) => { e.stopPropagation(); moveDay(i, -1); }} disabled={i === 0} className="p-1 rounded text-gray-300 hover:text-gray-500 disabled:opacity-20 cursor-pointer">
                                        <ChevronUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); moveDay(i, 1); }} disabled={i === days.length - 1} className="p-1 rounded text-gray-300 hover:text-gray-500 disabled:opacity-20 cursor-pointer">
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <button type="button" onClick={(e) => { e.stopPropagation(); removeDay(i); }} className="p-1 rounded text-gray-300 hover:text-red-500 transition-colors cursor-pointer">
                                    <X className="w-4 h-4" />
                                </button>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {isOpen && (
                                <div className="px-4 pb-4 pt-2 border-t border-gray-200 space-y-4 bg-white">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">Title</label>
                                            <input value={day.title} onChange={(e) => updateDay(i, 'title', e.target.value)} placeholder="e.g. Arrival in Colombo" className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1 block">Day Number</label>
                                            <input value={day.day} readOnly className={`${inputCls} bg-gray-50 text-gray-400 cursor-not-allowed`} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-gray-400 text-xs mb-1 block">Description</label>
                                        <textarea value={day.description} onChange={(e) => updateDay(i, 'description', e.target.value)} placeholder="Describe what happens on this day…" rows={3} className={`${inputCls} resize-none`} />
                                    </div>

                                    <div>
                                        <label className="text-gray-400 text-xs mb-1 block">Highlights</label>
                                        <div className="space-y-2">
                                            {day.highlights.map((h, hi) => (
                                                <div key={hi} className="flex items-center gap-2">
                                                    <input value={h} onChange={(e) => updateHighlight(i, hi, e.target.value)} placeholder="e.g. Temple visit" className={`${inputCls} flex-1`} />
                                                    <button type="button" onClick={() => removeHighlight(i, hi)} disabled={day.highlights.length <= 1} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 disabled:opacity-20 transition-colors">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addHighlight(i)} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors">
                                                <Plus className="w-3.5 h-3.5" />
                                                Add highlight
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button type="button" onClick={addDay} className="mt-3 flex items-center gap-2 text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Add Day {days.length + 1}
            </button>

            {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
        </div>
    );
}
