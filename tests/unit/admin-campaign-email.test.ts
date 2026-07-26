import { describe, expect, it } from 'vitest';
import { sendCampaignEmails } from '@/lib/campaign-email';

describe('sendCampaignEmails', () => {
    it('returns error when RESEND_API_KEY is not set', async () => {
        const originalKey = process.env.RESEND_API_KEY;
        delete process.env.RESEND_API_KEY;

        const result = await sendCampaignEmails(
            [{ name: 'Test', email: 'test@example.com' }],
            'Subject',
            'Title',
            'Content'
        );

        expect(result.success).toBe(false);
        expect(result.sentCount).toBe(0);
        expect(result.error).toContain('RESEND_API_KEY');

        process.env.RESEND_API_KEY = originalKey;
    });

    it('returns error when subscriber list is empty', async () => {
        const result = await sendCampaignEmails([], 'Subject', 'Title', 'Content');
        expect(result.success).toBe(false);
        expect(result.error).toContain('No subscribers');
    });
});
