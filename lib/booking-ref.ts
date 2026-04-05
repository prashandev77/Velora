import { randomInt } from 'crypto';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Cryptographically strong booking reference (6 chars from CHARS). */
export function generateBookingRef(prefix: 'AT' | 'VJ'): string {
    let ref = '';
    for (let i = 0; i < 6; i++) {
        ref += CHARS.charAt(randomInt(CHARS.length));
    }
    return `${prefix}-${ref}`;
}
