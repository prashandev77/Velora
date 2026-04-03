import { z } from 'zod';

// ── Itinerary day schema ──
const itineraryDaySchema = z.object({
    day: z.number().int().min(1),
    title: z.string().min(2, 'Title is required').max(200),
    description: z.string().min(5, 'Description is required').max(2000),
    highlights: z.array(z.string().min(1)).min(1, 'At least 1 highlight required'),
});

// ── Route coordinate schema ──
const routeCoordSchema = z.object({
    name: z.string().min(1, 'Name required'),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    description: z.string().optional(),
});

// ── Main journey schema ──
export const journeySchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be 100 characters or less'),
    slug: z
        .string()
        .min(3, 'Slug must be at least 3 characters')
        .max(80, 'Slug must be 80 characters or less')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
    category: z.enum({
        luxury: 'luxury',
        honeymoon: 'honeymoon',
        wellness: 'wellness',
        adventure: 'adventure',
    }, {
        error: 'Category is required',
    }),
    location: z
        .string()
        .min(2, 'Location is required')
        .max(100),
    days: z
        .number({ error: 'Duration is required' })
        .int('Must be a whole number')
        .min(1, 'Minimum 1 day')
        .max(60, 'Maximum 60 days'),
    tag: z
        .string()
        .min(2, 'Tag is required')
        .max(50),
    subtitle: z.string().max(200).optional().or(z.literal('')),
    travelStyle: z.string().max(200).optional().or(z.literal('')),
    description: z
        .string()
        .min(20, 'Description must be at least 20 characters')
        .max(2000),
    accommodation: z.string().max(2000).optional().or(z.literal('')),
    highlights: z
        .array(z.string().min(2, 'Each highlight must be at least 2 characters').max(200))
        .min(2, 'Add at least 2 highlights'),
    whySpecial: z.array(z.string().min(2).max(500)).min(2, 'Add at least 2 "Why Special" items'),
    perfectFor: z.array(z.string().min(2).max(200)).min(2, 'Add at least 2 "Perfect For" items'),
    route: z.array(z.string().min(1)).min(2, 'Add at least 2 route stops'),
    routeCoords: z.array(routeCoordSchema).optional().default([]),
    included: z.array(z.string().min(2).max(500)).min(2, 'Add at least 2 "Included" items'),
    notIncluded: z.array(z.string().min(2).max(500)).min(2, 'Add at least 2 "Not Included" items'),
    itinerary: z
        .array(itineraryDaySchema)
        .min(1, 'Add at least 1 itinerary day'),
    imageUrl: z.string().min(1, 'Main image is required'),
    galleryImages: z.array(z.string()).max(8, 'Maximum 8 gallery images').optional().default([]),
    isActive: z.boolean().default(true),
});

export type JourneyFormData = z.infer<typeof journeySchema>;
export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type RouteCoord = z.infer<typeof routeCoordSchema>;
