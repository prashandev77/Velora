import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const BUSINESS_EMAIL = 'journeys@velorajourneys.com.au';
const FROM_EMAIL = 'Velora Journeys <journeys@velorajourneys.com.au>';

// ─── Customer confirmation email ────────────────────────────────────────────

interface BookingEmailData {
    customerEmail: string;
    customerName: string;
    bookingRef: string;
    packageTitle?: string;
    travelDate?: string;
    guestCount?: number;
    travelMonth?: string;
    tripLength?: string;
    travelStyles?: string[];
    message?: string;
    specialRequests?: string;
}

function buildCustomerHtml(data: BookingEmailData): string {
    const details: string[] = [];
    if (data.packageTitle) details.push(`<tr><td style="padding:8px 16px;color:#78716c;font-size:14px;">Journey</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#1c1917;">${data.packageTitle}</td></tr>`);
    if (data.travelDate) details.push(`<tr><td style="padding:8px 16px;color:#78716c;font-size:14px;">Travel Date</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#1c1917;">${new Date(data.travelDate).toLocaleDateString('en-GB', { dateStyle: 'long' })}</td></tr>`);
    if (data.travelMonth) details.push(`<tr><td style="padding:8px 16px;color:#78716c;font-size:14px;">Travel Month</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#1c1917;">${data.travelMonth}</td></tr>`);
    if (data.tripLength) details.push(`<tr><td style="padding:8px 16px;color:#78716c;font-size:14px;">Trip Length</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#1c1917;">${data.tripLength}</td></tr>`);
    if (data.guestCount) details.push(`<tr><td style="padding:8px 16px;color:#78716c;font-size:14px;">Travellers</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#1c1917;">${data.guestCount}</td></tr>`);
    if (data.travelStyles && data.travelStyles.length > 0) details.push(`<tr><td style="padding:8px 16px;color:#78716c;font-size:14px;">Interests</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#1c1917;">${data.travelStyles.join(', ')}</td></tr>`);

    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#faf7f2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    
    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:24px;color:#1c1917;margin:0;letter-spacing:0.05em;">VELORA JOURNEYS</h1>
      <div style="width:40px;height:2px;background:#c8a55a;margin:12px auto 0;"></div>
    </div>

    <!-- Main Card -->
    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;border:1px solid #e7e5e4;">
      <p style="color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 8px;">Booking Confirmed</p>
      <h2 style="font-size:22px;color:#1c1917;margin:0 0 8px;">Thank you, ${data.customerName.split(' ')[0]}!</h2>
      <p style="font-size:14px;color:#57534e;line-height:1.6;margin:0 0 24px;">
        Your enquiry has been received and a dedicated Velora travel designer will be in touch within 24 hours to begin crafting your perfect journey.
      </p>

      <!-- Booking Ref -->
      <div style="background:#faf7f2;border-radius:12px;padding:16px 20px;text-align:center;margin-bottom:24px;">
        <p style="color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 4px;">Your Reference</p>
        <p style="font-size:24px;font-weight:700;color:#1c1917;margin:0;letter-spacing:0.1em;">${data.bookingRef}</p>
      </div>

      <!-- Details Table -->
      ${details.length > 0 ? `
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${details.join('')}
      </table>
      ` : ''}

      ${data.specialRequests || data.message ? `
      <div style="border-top:1px solid #e7e5e4;padding-top:16px;margin-bottom:24px;">
        <p style="color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Message</p>
        <p style="font-size:14px;color:#57534e;line-height:1.6;margin:0;">${data.specialRequests || data.message}</p>
      </div>
      ` : ''}

      <!-- Gold Accent -->
      <div style="background:linear-gradient(135deg,#c8a55a 0%,#dab96a 100%);border-radius:12px;padding:20px 24px;color:#ffffff;">
        <p style="font-size:13px;margin:0;line-height:1.5;">
          ✨ A Velora specialist will personally reach out to discuss your itinerary, accommodation preferences, and any special touches to make your journey unforgettable.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;">
      <p style="font-size:12px;color:#a8a29e;margin:0 0 4px;">Velora Journeys — Sri Lanka & The Maldives</p>
      <p style="font-size:12px;color:#a8a29e;margin:0;">
        <a href="mailto:${BUSINESS_EMAIL}" style="color:#c8a55a;text-decoration:none;">${BUSINESS_EMAIL}</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Business owner notification email ──────────────────────────────────────

function buildOwnerHtml(data: BookingEmailData): string {
    const rows: string[] = [];
    rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Name</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;font-weight:600;">${data.customerName}</td></tr>`);
    rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Email</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;"><a href="mailto:${data.customerEmail}" style="color:#c8a55a;">${data.customerEmail}</a></td></tr>`);
    rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Reference</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;font-weight:700;">${data.bookingRef}</td></tr>`);
    if (data.packageTitle) rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Package</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;">${data.packageTitle}</td></tr>`);
    if (data.travelDate) rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Travel Date</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;">${new Date(data.travelDate).toLocaleDateString('en-GB', { dateStyle: 'long' })}</td></tr>`);
    if (data.travelMonth) rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Travel Month</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;">${data.travelMonth}</td></tr>`);
    if (data.tripLength) rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Trip Length</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;">${data.tripLength}</td></tr>`);
    if (data.guestCount) rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Travellers</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;">${data.guestCount}</td></tr>`);
    if (data.travelStyles && data.travelStyles.length > 0) rows.push(`<tr><td style="padding:6px 12px;color:#78716c;font-size:13px;">Interests</td><td style="padding:6px 12px;font-size:13px;color:#1c1917;">${data.travelStyles.join(', ')}</td></tr>`);

    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="background:#ffffff;border-radius:12px;padding:28px 24px;border:1px solid #e2e8f0;">
      <h2 style="font-size:18px;color:#0f172a;margin:0 0 4px;">🔔 New Booking Enquiry</h2>
      <p style="font-size:13px;color:#64748b;margin:0 0 20px;">A customer has submitted a new booking on velorajourneys.com.au</p>
      
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;">
        ${rows.join('')}
      </table>

      ${data.specialRequests || data.message ? `
      <div style="margin-top:16px;padding:12px 16px;background:#fffbeb;border-radius:8px;border:1px solid #fef3c7;">
        <p style="font-size:11px;color:#92400e;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;font-weight:600;">Customer Message</p>
        <p style="font-size:13px;color:#78350f;line-height:1.5;margin:0;">${data.specialRequests || data.message}</p>
      </div>
      ` : ''}

      <div style="margin-top:20px;text-align:center;">
        <a href="https://velorajourneys.com.au/admin/bookings" style="display:inline-block;background:#0f172a;color:#ffffff;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">View in Admin Dashboard →</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ─── Send emails ────────────────────────────────────────────────────────────

export async function sendBookingEmails(data: BookingEmailData): Promise<void> {
    try {
        const promises: Promise<unknown>[] = [];

        // 1. Customer confirmation — only if we have their email
        if (data.customerEmail && data.customerEmail.trim()) {
            promises.push(
                resend.emails.send({
                    from: FROM_EMAIL,
                    to: data.customerEmail,
                    subject: `Booking Confirmed — ${data.bookingRef} | Velora Journeys`,
                    html: buildCustomerHtml(data),
                })
            );
        }

        // 2. Business owner notification — always
        promises.push(
            resend.emails.send({
                from: FROM_EMAIL,
                to: BUSINESS_EMAIL,
                subject: `New Booking: ${data.customerName} — ${data.bookingRef}`,
                html: buildOwnerHtml(data),
            })
        );

        const results = await Promise.allSettled(promises);
        results.forEach((r, i) => {
            if (r.status === 'rejected') {
                console.error(`Email ${i + 1} failed:`, r.reason);
            }
        });
    } catch (error) {
        // Email failures should not block the booking flow
        console.error('Email send error:', error);
    }
}

export type { BookingEmailData };
