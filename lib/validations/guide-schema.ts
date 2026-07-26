import { z } from 'zod';

export const guideSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
    slug: z
        .string()
        .min(1, 'Slug is required')
        .max(200, 'Slug is too long')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens'),
    shortDescription: z.string().min(1, 'Short description is required').max(500, 'Short description is too long'),
    content: z.string().min(1, 'Content is required'),
    featuredImage: z.string().min(1, 'Featured image is required'),
    categoryId: z.string().uuid('Invalid category').nullable(),
    status: z.enum(['draft', 'published']),
});

export type GuideFormData = z.infer<typeof guideSchema>;

export const guideCategorySchema = z.object({
    name: z.string().min(1, 'Category name is required').max(100, 'Name is too long'),
    slug: z
        .string()
        .min(1, 'Slug is required')
        .max(100, 'Slug is too long')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens'),
});

export type GuideCategoryFormData = z.infer<typeof guideCategorySchema>;
