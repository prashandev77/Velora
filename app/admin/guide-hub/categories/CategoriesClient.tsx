'use client';

import { useActionState, useState } from 'react';
import { saveCategory, deleteCategory, type ActionState } from '../actions';
import { Plus, Pencil, Trash2, X, Loader2, Check } from 'lucide-react';
import ConfirmDialog from '@/app/admin/components/ConfirmDialog';

interface Category {
    id: string;
    name: string;
    slug: string;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
    const [categories, setCategories] = useState(initialCategories);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [state, formAction, isPending] = useActionState<ActionState, FormData>(
        async (prev: ActionState, formData: FormData) => {
            const result = await saveCategory(prev, formData);
            if (result?.success) {
                // Refresh categories from the form action result
                setShowForm(false);
                setEditingId(null);
                setName('');
                setSlug('');
                // Optimistic: update local state
                const newCat = {
                    id: editingId || crypto.randomUUID(),
                    name: formData.get('name') as string,
                    slug: formData.get('slug') as string,
                };
                if (editingId) {
                    setCategories(cats => cats.map(c => c.id === editingId ? { ...c, ...newCat } : c));
                } else {
                    setCategories(cats => [...cats, newCat]);
                }
            }
            return result;
        },
        null
    );

    const startEdit = (cat: Category) => {
        setEditingId(cat.id);
        setName(cat.name);
        setSlug(cat.slug);
        setShowForm(true);
    };

    const startCreate = () => {
        setEditingId(null);
        setName('');
        setSlug('');
        setShowForm(true);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingId(null);
        setName('');
        setSlug('');
    };

    const handleNameChange = (val: string) => {
        setName(val);
        if (!editingId) {
            setSlug(slugify(val));
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        const fd = new FormData();
        fd.set('id', deleteTarget.id);
        await deleteCategory(fd);
        setCategories(cats => cats.filter(c => c.id !== deleteTarget.id));
        setDeleteTarget(null);
        setDeleting(false);
    };

    return (
        <>
            <ConfirmDialog
                open={!!deleteTarget}
                variant="danger"
                title="Delete category?"
                message={`"${deleteTarget?.name}" will be permanently removed. Guides using this category will lose their category assignment.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                confirmLoading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />

            {/* Add / Edit Form */}
            {showForm && (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-5 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-900 font-semibold text-sm">
                            {editingId ? 'Edit Category' : 'New Category'}
                        </h3>
                        <button onClick={cancelForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <form action={formAction} className="space-y-4">
                        {editingId && <input type="hidden" name="id" value={editingId} />}

                        {state?.errors?._form && (
                            <p className="text-red-500 text-xs">{state.errors._form[0]}</p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="e.g. Travel Tips"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                                />
                                {state?.errors?.name && (
                                    <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(slugify(e.target.value))}
                                    placeholder="travel-tips"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-mono placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                                />
                                {state?.errors?.slug && (
                                    <p className="text-red-500 text-xs mt-1">{state.errors.slug[0]}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Check className="w-4 h-4" />
                            )}
                            {editingId ? 'Update' : 'Create'}
                        </button>
                    </form>
                </div>
            )}

            {/* Categories list */}
            {categories.length === 0 && !showForm ? (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-gray-900 text-lg font-semibold mb-2">No categories yet</p>
                    <p className="text-gray-400 text-sm mb-6">Create categories to organize your guides</p>
                    <button
                        onClick={startCreate}
                        className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all"
                    >
                        Create first category →
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
                                <div>
                                    <p className="text-gray-900 text-sm font-medium">{cat.name}</p>
                                    <p className="text-gray-400 text-xs font-mono">{cat.slug}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => startEdit(cat)}
                                        className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 transition-all"
                                        title="Edit"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(cat)}
                                        className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
