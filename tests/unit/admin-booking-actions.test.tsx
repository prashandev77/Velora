import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BookingActions from '@/app/admin/bookings/[id]/BookingActions';

const pushMock = vi.fn();
const refreshMock = vi.fn();
const updateBookingStatusMock = vi.fn();
const deleteBookingMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

vi.mock('@/app/admin/bookings/actions', () => ({
    updateBookingStatus: (...args: unknown[]) => updateBookingStatusMock(...args),
    deleteBooking: (...args: unknown[]) => deleteBookingMock(...args),
}));

vi.mock('@/app/admin/components/ToastProvider', () => ({
    useToast: () => ({
        success: vi.fn(),
        error: vi.fn(),
        toast: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
    }),
}));

vi.mock('@/app/admin/components/ConfirmDialog', () => ({
    default: ({
        open,
        onConfirm,
        onCancel,
        confirmLabel,
    }: {
        open: boolean;
        onConfirm: () => void;
        onCancel: () => void;
        confirmLabel?: string;
    }) =>
        open ? (
            <div data-testid="confirm-dialog">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" onClick={onConfirm}>
                    {confirmLabel ?? 'Confirm'}
                </button>
            </div>
        ) : null,
}));

describe('BookingActions', () => {
    beforeEach(() => {
        pushMock.mockReset();
        refreshMock.mockReset();
        updateBookingStatusMock.mockReset();
        deleteBookingMock.mockReset();
        deleteBookingMock.mockResolvedValue(undefined);
        updateBookingStatusMock.mockResolvedValue(undefined);
    });

    it('deletes booking and navigates back when delete is confirmed in dialog', async () => {
        const user = userEvent.setup();
        render(<BookingActions id="booking-1" currentStatus="pending" />);

        await user.click(screen.getByRole('button', { name: /^delete$/i }));
        const confirmDelete = screen.getAllByRole('button', { name: /^delete$/i })[0];
        await user.click(confirmDelete);

        expect(deleteBookingMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith('/admin/bookings');
    });

    it('does not delete when user cancels dialog', async () => {
        const user = userEvent.setup();
        render(<BookingActions id="booking-1" currentStatus="pending" />);

        await user.click(screen.getAllByRole('button', { name: /^delete$/i })[0]);
        await user.click(screen.getByRole('button', { name: /^cancel$/i }));

        expect(deleteBookingMock).not.toHaveBeenCalled();
        expect(pushMock).not.toHaveBeenCalled();
    });
});
