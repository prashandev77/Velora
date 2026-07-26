import { z } from 'zod';

export const subscriberSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
    email: z.string().email('Invalid email address'),
});

export type SubscriberFormData = z.infer<typeof subscriberSchema>;
