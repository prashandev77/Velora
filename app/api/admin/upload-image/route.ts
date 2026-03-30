import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import sharp from 'sharp';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check auth
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const folder = (formData.get('folder') as string) || 'general';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
                { status: 400 }
            );
        }

        // Read file buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Optimize with sharp: resize + convert to WebP
        const optimized = await sharp(buffer)
            .resize(MAX_WIDTH, undefined, {
                withoutEnlargement: true,
                fit: 'inside',
            })
            .webp({ quality: WEBP_QUALITY })
            .toBuffer();

        // Generate unique filename
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const filename = `${folder}/${timestamp}-${randomSuffix}.webp`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('journey-images')
            .upload(filename, optimized, {
                contentType: 'image/webp',
                cacheControl: '31536000', // 1 year cache
                upsert: false,
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return NextResponse.json(
                { error: 'Failed to upload image' },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('journey-images')
            .getPublicUrl(filename);

        return NextResponse.json({
            url: publicUrl,
            path: filename,
            originalSize: file.size,
            optimizedSize: optimized.length,
            savedPercent: Math.round((1 - optimized.length / file.size) * 100),
        });
    } catch (error) {
        console.error('Image upload error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { path } = await request.json();
        if (!path) {
            return NextResponse.json({ error: 'No path provided' }, { status: 400 });
        }

        const { error } = await supabase.storage
            .from('journey-images')
            .remove([path]);

        if (error) {
            console.error('Delete error:', error);
            return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Image delete error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
