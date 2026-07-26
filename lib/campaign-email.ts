import { Resend } from 'resend';
import { AVELORA_LOGO_PATH } from '@/lib/brand';

/** Lazy init — same pattern as lib/email.ts */
let resendClient: Resend | null = null;

function getResend(): Resend | null {
    const key = process.env.RESEND_API_KEY?.trim();
    if (!key) return null;
    if (!resendClient) resendClient = new Resend(key);
    return resendClient;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL?.trim() || 'Avelora Travel <info@aveloratravel.com.au>';
const BUSINESS_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL?.trim() || 'info@aveloratravel.com.au';

function siteBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
}

function emailLogoHeaderHtml(): string {
    const base = siteBaseUrl();
    if (base) {
        const src = `${base}${AVELORA_LOGO_PATH}`;
        return `
    <div style="text-align:center;margin-bottom:32px;">
      <img src="${src}" alt="Avelora Travel" width="220" style="max-width:220px;height:auto;display:inline-block;" />
    </div>`;
    }
    return `
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:24px;color:#1c1917;margin:0;letter-spacing:0.05em;">AVELORA TRAVEL</h1>
      <div style="width:40px;height:2px;background:#c8a55a;margin:12px auto 0;"></div>
    </div>`;
}

export function buildCampaignHtml(title: string, content: string): string {
    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#faf7f2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    
    ${emailLogoHeaderHtml()}

    <!-- Main Card -->
    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;border:1px solid #e7e5e4;">
      <h2 style="font-size:22px;color:#1c1917;margin:0 0 24px;font-family:'Georgia',serif;">${title}</h2>
      
      <div style="font-size:15px;color:#44403c;line-height:1.7;">
        ${content}
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;">
      <p style="font-size:12px;color:#a8a29e;margin:0 0 4px;">Avelora Travel — Sri Lanka, Maldives & Beyond</p>
      <p style="font-size:12px;color:#a8a29e;margin:0;">
        <a href="mailto:${BUSINESS_EMAIL}" style="color:#c8a55a;text-decoration:none;">${BUSINESS_EMAIL}</a>
      </p>
      <p style="font-size:11px;color:#d6d3d1;margin:16px 0 0;">
        You are receiving this email because you subscribed to Avelora Travel updates.
      </p>
    </div>
  </div>
</body>
</html>`;
}

export interface SendCampaignResult {
    success: boolean;
    sentCount: number;
    failedCount: number;
    error?: string;
}

/**
 * Send a campaign email to all subscribers using Resend batch API.
 * Resend batch supports up to 100 emails per call.
 */
export async function sendCampaignEmails(
    subscribers: { name: string; email: string }[],
    subject: string,
    title: string,
    content: string,
): Promise<SendCampaignResult> {
    const resend = getResend();
    if (!resend) {
        return { success: false, sentCount: 0, failedCount: 0, error: 'RESEND_API_KEY environment variable is missing or empty' };
    }

    if (subscribers.length === 0) {
        return { success: false, sentCount: 0, failedCount: 0, error: 'No subscribers found' };
    }

    const html = buildCampaignHtml(title, content);
    let sentCount = 0;
    let failedCount = 0;
    let lastError: string | undefined;

    // Batch in chunks of 100 (Resend limit)
    const BATCH_SIZE = 100;
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
        const batch = subscribers.slice(i, i + BATCH_SIZE);
        const emails = batch.map((sub) => ({
            from: FROM_EMAIL,
            to: sub.email,
            subject,
            html,
        }));

        try {
            const result = await resend.batch.send(emails);
            if (result.error) {
                console.error('Batch send error:', result.error);
                failedCount += batch.length;
                lastError = result.error.message || JSON.stringify(result.error);
            } else {
                sentCount += batch.length;
            }
        } catch (error: unknown) {
            console.error('Batch send exception:', error);
            failedCount += batch.length;
            lastError = error instanceof Error ? error.message : 'Failed to send batch';
        }
    }

    return {
        success: sentCount > 0 && failedCount === 0,
        sentCount,
        failedCount,
        error: lastError,
    };
}
