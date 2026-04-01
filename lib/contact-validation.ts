/**
 * Shared email / phone validation for forms. Use for real-time feedback while typing.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
    return EMAIL_RE.test(value.trim());
}

/** While typing: no message if empty; if user entered anything, require a valid email. */
export function getEmailErrorMessage(value: string): string | null {
    const t = value.trim();
    if (!t) return null;
    if (!isValidEmail(value)) return 'Enter a valid email address.';
    return null;
}

/** Optional phone: empty is fine. If anything is typed, require 8–15 digits (international). */
export function getPhoneErrorMessage(value: string): string | null {
    const t = value.trim();
    if (!t) return null;
    const digits = t.replace(/\D/g, '');
    if (digits.length < 8) return 'Enter a complete phone number (at least 8 digits).';
    if (digits.length > 15) return 'Phone number is too long.';
    return null;
}

export function isPhoneValidOrEmpty(value: string): boolean {
    return getPhoneErrorMessage(value) === null;
}
