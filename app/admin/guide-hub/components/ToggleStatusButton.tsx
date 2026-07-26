'use client';

import { useState } from 'react';
import { toggleGuideStatus } from '../actions';

export default function ToggleStatusButton({ id, currentStatus }: { id: string; currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus);
    const [toggling, setToggling] = useState(false);

    const handleToggle = async () => {
        const newStatus = status === 'published' ? 'draft' : 'published';
        setToggling(true);
        setStatus(newStatus);
        await toggleGuideStatus(id, newStatus);
        setToggling(false);
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={toggling}
            className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all disabled:opacity-50 ${
                status === 'published'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
        >
            {status === 'published' ? 'Published' : 'Draft'}
        </button>
    );
}
