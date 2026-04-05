import { z } from 'zod';

export const createBookingInputSchema = z.object({
    packageId: z.string().uuid(),
    travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    guestCount: z.number().int().min(1).max(20),
    guestNames: z.array(z.string().max(120)).max(20),
    specialRequests: z.string().max(2000),
    turnstileToken: z.string().optional(),
});
