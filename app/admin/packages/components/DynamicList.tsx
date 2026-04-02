'use client';

import { useRef, useState } from 'react';
import { Plus, X, ChevronUp, ChevronDown } from 'lucide-react';

interface DynamicListProps {
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    maxItems?: number;
}

export default function DynamicList({
    items,
    onChange,
    placeholder = 'Add an item…',
    label,
    error,
    maxItems = 20,
}: DynamicListProps) {
    const [draft, setDraft] = useState('');
    const addingRef = useRef(false);

    const add = () => {
        if (addingRef.current) return;
        const value = draft.trim();
        if (!value || items.length >= maxItems) return;
        addingRef.current = true;
        setDraft('');
        onChange([...items, value]);
        requestAnimationFrame(() => { addingRef.current = false; });
    };

    const remove = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const move = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
    };

    const update = (index: number, value: string) => {
        const next = [...items];
        next[index] = value;
        onChange(next);
    };

    const inputCls = 'w-full bg-white border border-gray-200 rounded-xl text-gray-900 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all placeholder:text-gray-300';

    return (
        <div>
            {label && (
                <label className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                    {label}
                </label>
            )}

            <div className="space-y-2 mb-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                        <input value={item} onChange={(e) => update(i, e.target.value)} className={`${inputCls} flex-1`} />
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="p-1 rounded-lg text-gray-300 hover:text-gray-500 disabled:opacity-30 transition-colors" title="Move up">
                                <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1 rounded-lg text-gray-300 hover:text-gray-500 disabled:opacity-30 transition-colors" title="Move down">
                                <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <button type="button" onClick={() => remove(i)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all" title="Remove">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>

            {items.length < maxItems && (
                <div className="flex items-center gap-2">
                    <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
                        placeholder={placeholder}
                        className={`${inputCls} flex-1`}
                    />
                    <button type="button" onClick={add} disabled={!draft.trim()} className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-30 transition-all" title="Add">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            )}

            {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
            {items.length >= maxItems && <p className="text-gray-400 text-xs mt-1">Maximum {maxItems} items reached</p>}
        </div>
    );
}
