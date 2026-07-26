'use client';

import { useState } from 'react';
import { Plus, Search, Users, Mail as MailIcon } from 'lucide-react';
import DeleteSubscriberButton from './components/DeleteSubscriberButton';
import AddSubscriberDialog from './components/AddSubscriberDialog';
import { useRouter } from 'next/navigation';

interface Subscriber {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

export default function SubscribersClient({ initialSubscribers }: { initialSubscribers: Subscriber[] }) {
    const [subscribers] = useState(initialSubscribers);
    const [search, setSearch] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const router = useRouter();

    const filtered = search.trim()
        ? subscribers.filter(
            (s) =>
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.email.toLowerCase().includes(search.toLowerCase())
        )
        : subscribers;

    return (
        <>
            <AddSubscriberDialog
                open={showAdd}
                onClose={() => setShowAdd(false)}
                onSuccess={() => {
                    setShowAdd(false);
                    router.refresh();
                }}
            />

            {/* Actions bar */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search subscribers..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    />
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-gray-900 text-lg font-semibold mb-2">
                        {search ? 'No subscribers found' : 'No subscribers yet'}
                    </p>
                    <p className="text-gray-400 text-sm mb-6">
                        {search ? 'Try a different search.' : 'Add your first subscriber to get started.'}
                    </p>
                    {!search && (
                        <button
                            onClick={() => setShowAdd(true)}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all"
                        >
                            Add first subscriber →
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden">
                    {/* Desktop table */}
                    <div className="hidden lg:block">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date Added</th>
                                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-gray-500 text-xs font-bold">{sub.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <span className="text-gray-900 text-sm font-medium">{sub.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                <MailIcon className="w-3.5 h-3.5 text-gray-400" />
                                                {sub.email}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-xs">
                                            {new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end">
                                                <DeleteSubscriberButton id={sub.id} email={sub.email} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile list */}
                    <div className="lg:hidden divide-y divide-gray-100">
                        {filtered.map((sub) => (
                            <div key={sub.id} className="flex items-center gap-3 px-5 py-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-gray-500 text-sm font-bold">{sub.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-900 text-sm font-medium truncate">{sub.name}</p>
                                    <p className="text-gray-400 text-xs truncate">{sub.email}</p>
                                </div>
                                <DeleteSubscriberButton id={sub.id} email={sub.email} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Count */}
            <p className="text-gray-400 text-xs mt-3 text-center">
                {filtered.length} subscriber{filtered.length !== 1 ? 's' : ''}
                {search && ` matching "${search}"`}
            </p>
        </>
    );
}
