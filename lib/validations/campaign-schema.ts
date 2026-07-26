import { z } from 'zod';

export const campaignSchema = z.object({
    subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
    title: z.string().min(1, 'Email title is required').max(200, 'Title is too long'),
    content: z.string().min(1, 'Email content is required'),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;
