'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, Loader2, ImageIcon, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const MAX_UPLOAD_SIZE = 3.5 * 1024 * 1024; // target after compression (stays under Next.js ~4.5MB multipart limit)
const CLIENT_MAX_WIDTH = 1920;
const CLIENT_QUALITY = 0.82;

/** Compress image on the client using Canvas before uploading */
function compressImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            resolve(file);
            return;
        }
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            let { width, height } = img;
            if (width > CLIENT_MAX_WIDTH) {
                height = Math.round(height * (CLIENT_MAX_WIDTH / width));
                width = CLIENT_MAX_WIDTH;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) { resolve(file); return; }
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
                (blob) => {
                    if (!blob || blob.size >= file.size) {
                        resolve(file);
                        return;
                    }
                    const ext = file.type === 'image/png' ? '.png' : '.jpg';
                    resolve(new File([blob], file.name.replace(/\.[^.]+$/, ext), { type: blob.type }));
                },
                file.type === 'image/png' ? 'image/png' : 'image/jpeg',
                CLIENT_QUALITY,
            );
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image')); };
        img.src = url;
    });
}

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    folder: string;
    maxImages?: number;
    label?: string;
    error?: string;
    single?: boolean;
}

interface UploadingFile {
    id: string;
    name: string;
}

export default function ImageUploader({
    images,
    onChange,
    folder,
    maxImages = 8,
    label,
    error,
    single = false,
}: ImageUploaderProps) {
    const [localError, setLocalError] = useState<string | null>(null);
    const [uploading, setUploading] = useState<UploadingFile[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const effectiveMax = single ? 1 : maxImages;

    const uploadFile = useCallback(async (file: File): Promise<string | null> => {
        const id = Math.random().toString(36).substring(2);
        setUploading((prev) => [...prev, { id, name: file.name }]);
        setLocalError(null);

        try {
            let processed = file;
            if (file.size > MAX_UPLOAD_SIZE) {
                processed = await compressImage(file);
            }
            if (processed.size > MAX_UPLOAD_SIZE) {
                throw new Error(`"${file.name}" is still ${(processed.size / 1024 / 1024).toFixed(1)}MB after compression. Try a smaller image.`);
            }

            const formData = new FormData();
            formData.append('file', processed);
            formData.append('folder', folder);

            const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData });
            if (!res.ok) {
                if (res.status === 413) {
                    throw new Error('Image too large for the server. Try a smaller file.');
                }
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await res.json();
                    throw new Error(data.error || 'Upload failed');
                }
                throw new Error(`Upload failed with status: ${res.status}`);
            }

            const data = await res.json();
            setUploading((prev) => prev.filter((u) => u.id !== id));
            return data.url;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Upload failed';
            console.error('Upload error:', err);
            setLocalError(message);
            setUploading((prev) => prev.filter((u) => u.id !== id));
            return null;
        }
    }, [folder]);

    const handleFiles = useCallback(async (files: FileList | File[]) => {
        setLocalError(null);
        const fileArray = Array.from(files);
        const remaining = effectiveMax - images.length;
        const toUpload = fileArray.slice(0, remaining);
        if (toUpload.length === 0) return;

        const results = await Promise.all(toUpload.map(uploadFile));
        const urls = results.filter((url): url is string => url !== null);

        if (urls.length > 0) {
            if (single) {
                onChange(urls.slice(0, 1));
            } else {
                onChange([...images, ...urls]);
            }
        }
    }, [images, effectiveMax, single, uploadFile, onChange]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const remove = (index: number) => {
        const url = images[index];
        onChange(images.filter((_, i) => i !== index));
        if (url.includes('journey-images')) {
            const path = url.split('journey-images/')[1];
            if (path) {
                fetch('/api/admin/upload-image', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path }),
                }).catch(() => {});
            }
        }
    };

    const isUploading = uploading.length > 0;
    const canUploadMore = images.length < effectiveMax && !isUploading;

    return (
        <div>
            {label && (
                <label className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                    {label}
                </label>
            )}

            {images.length > 0 && (
                <div className={`grid gap-3 mb-3 ${single ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                    {images.map((url, i) => (
                        <div key={i} className="group relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                            <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                            <button
                                type="button"
                                onClick={() => remove(i)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-gray-500 hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                                title="Remove"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {uploading.length > 0 && (
                <div className="space-y-2 mb-3">
                    {uploading.map((u) => (
                        <div key={u.id} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                            <Loader2 className="w-4 h-4 text-gray-900 animate-spin flex-shrink-0" />
                            <span className="text-gray-600 text-sm truncate flex-1">{u.name}</span>
                            <span className="text-gray-400 text-xs">Optimizing…</span>
                        </div>
                    ))}
                </div>
            )}

            {canUploadMore && (
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all
                        ${dragOver ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'}
                        ${localError ? 'border-red-200 bg-red-50/30' : ''}`}
                >
                    <div className={`pointer-events-none p-3 rounded-xl ${dragOver ? 'bg-gray-100' : localError ? 'bg-red-50' : 'bg-gray-50'} transition-colors`}>
                        {dragOver ? <Upload className="w-6 h-6 text-gray-600" /> : localError ? <AlertCircle className="w-6 h-6 text-red-400" /> : <ImageIcon className="w-6 h-6 text-gray-300" />}
                    </div>
                    <div className="pointer-events-none text-center">
                        <p className={`text-sm font-medium ${localError ? 'text-red-600' : 'text-gray-500'}`}>
                            {localError ? localError : dragOver ? 'Drop to upload' : 'Click or drag images here'}
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                            JPEG, PNG, WebP • Max 5MB • Auto-compressed &amp; optimized to WebP
                        </p>
                        {!single && <p className="text-gray-300 text-[11px] mt-0.5">{images.length}/{effectiveMax} images</p>}
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        multiple={!single}
                        onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
                        className="hidden"
                    />
                </div>
            )}

            {(error || localError) && <p className="text-red-500 text-xs mt-1.5">{localError || error}</p>}
        </div>
    );
}
